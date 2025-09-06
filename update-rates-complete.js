async function updateMarketRates() {
    console.log('🚀 Iniciando busca do IBOVESPA...');
    
    try {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/^BVSP';
        
        const response = await fetch(proxy + encodeURIComponent(yahooUrl));
        const data = await response.json();
        
        if (data.chart && data.chart.result && data.chart.result[0]) {
            const ibov = Math.round(data.chart.result[0].meta.regularMarketPrice);
            
            alert(`✅ IBOVESPA REAL: ${ibov.toLocaleString('pt-BR')} pontos`);
            
            console.log('✅ IBOVESPA obtido:', ibov);
            
        } else {
            throw new Error('Dados não encontrados');
        }
        
    } catch (error) {
        console.error('❌ Erro:', error);
        alert('❌ Erro ao buscar IBOVESPA: ' + error.message);
    }
}

window.updateMarketRates = updateMarketRates;
console.log('✅ Script carregado');
