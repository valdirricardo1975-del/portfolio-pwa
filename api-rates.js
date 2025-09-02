// Sistema de atualização de taxas com fallback
const RatesAPI = {
  // Cache local
  cache: {
    data: null,
    timestamp: null,
    maxAge: 30 * 60 * 1000 // 30 minutos
  },

  // API Principal - Banco Central
  async fetchFromBCB() {
    try {
      const [cdiRes, selicRes, ipcaRes] = await Promise.all([
        fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json'),
        fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'),
        fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/1?formato=json')
      ]);

      const [cdi, selic, ipca] = await Promise.all([
        cdiRes.json(),
        selicRes.json(),
        ipcaRes.json()
      ]);

      return {
        cdi: parseFloat(cdi[0].valor),
        selic: parseFloat(selic[0].valor),
        ipca: parseFloat(ipca[0].valor),
        source: 'BCB'
      };
    } catch (error) {
      console.error('Erro BCB:', error);
      throw error;
    }
  },

  // API HG Finance para IBOVESPA
  async fetchFromHG() {
    try {
      // Use sua própria key registrando em https://hgbrasil.com/apis
      const response = await fetch('https://api.hgbrasil.com/finance?format=json-cors&key=SUA-KEY-AQUI');
      const data = await response.json();
      
      return {
        ibov: data.results.stocks.IBOVESPA.points,
        ibovVariation: data.results.stocks.IBOVESPA.variation
      };
    } catch (error) {
      console.error('Erro HG:', error);
      return { ibov: null, ibovVariation: null };
    }
  },

  // API Backup - BrasilAPI
  async fetchFromBrasilAPI() {
    try {
      const response = await fetch('https://brasilapi.com.br/api/taxas/v1');
      const data = await response.json();
      
      return {
        cdi: data.find(t => t.nome === 'CDI')?.valor,
        selic: data.find(t => t.nome === 'SELIC')?.valor,
        ipca: null, // BrasilAPI não tem IPCA
        source: 'BrasilAPI'
      };
    } catch (error) {
      console.error('Erro BrasilAPI:', error);
      throw error;
    }
  },

  // Função principal com fallback
  async updateRates() {
    // Verificar cache
    if (this.cache.data && this.cache.timestamp) {
      const age = Date.now() - this.cache.timestamp;
      if (age < this.cache.maxAge) {
        return this.cache.data;
      }
    }

    let rates = {
      cdi: null,
      cdiAnnual: null,
      selic: null,
      ipca: null,
      ibov: null,
      ibovVariation: null,
      lastUpdate: new Date().toLocaleString('pt-BR'),
      isRealData: false
    };

    try {
      // Tentar BCB primeiro
      const bcbData = await this.fetchFromBCB();
      rates = { ...rates, ...bcbData, isRealData: true };
      
      // Calcular CDI anualizado
      rates.cdiAnnual = rates.cdi * 1.0465; // Aproximação

      // Tentar HG Finance para IBOV
      const hgData = await this.fetchFromHG();
      rates = { ...rates, ...hgData };

    } catch (error) {
      // Fallback para BrasilAPI
      try {
        const brasilData = await this.fetchFromBrasilAPI();
        rates = { ...rates, ...brasilData, isRealData: true };
        rates.cdiAnnual = rates.cdi * 1.0465;
      } catch (fallbackError) {
        // Usar cache se disponível
        if (this.cache.data) {
          return { ...this.cache.data, source: 'Cache' };
        }
      }
    }

    // Salvar no cache
    this.cache.data = rates;
    this.cache.timestamp = Date.now();
    
    // Salvar no localStorage
    localStorage.setItem('marketRates', JSON.stringify(rates));
    
    return rates;
  }
};

