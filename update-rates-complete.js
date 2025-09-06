async function updateMarketRates() {
    console.log('🚀 Atualizando todas as taxas...');
    
    try {
        const proxy = 'https://api.allorigins.win/raw?url=';
        
        // 1. IBOVESPA - Yahoo Finance
        console.log('Buscando IBOVESPA...');
        const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/^BVSP';
        const ibovResponse = await fetch(proxy + encodeURIComponent(yahooUrl));
        const ibovData = await ibovResponse.json();
        
        if (ibovData.chart && ibovData.chart.result && ibovData.chart.result[0]) {
            const ibov = Math.round(ibovData.chart.result[0].meta.regularMarketPrice);
            
            // Encontrar e atualizar o elemento que mostra 128.500
            const ibovElements = document.querySelectorAll('*');
            for (let el of ibovElements) {
                if (el.textContent && el.textContent.trim() === '128.500') {
                    el.textContent = ibov.toLocaleString('pt-BR');
                    console.log(`✅ IBOVESPA atualizado: 128.500 → ${ibov.toLocaleString('pt-BR')}`);
                    break;
                }
            }
        }
        
        // 2. CDI - Banco Central
        console.log('Buscando CDI...');
        const cdiUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json';
        const cdiResponse = await fetch(proxy + encodeURIComponent(cdiUrl));
        const cdiData = await cdiResponse.json();
        const cdi = parseFloat(cdiData[0].valor);
        
        // Atualizar CDI na página (procurar por elementos que contenham "11,65%")
        for (let el of document.querySelectorAll('*')) {
            if (el.textContent && el.textContent.includes('11,65%')) {
                el.textContent = el.textContent.replace('11,65%', cdi.toFixed(2) + '%');
                console.log(`✅ CDI atualizado: 11,65% → ${cdi.toFixed(2)}%`);
                break;
            }
        }
        
        // 3. IPCA - Banco Central (12 meses)
        console.log('Buscando IPCA...');
        const ipcaUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json';
        const ipcaResponse = await fetch(proxy + encodeURIComponent(ipcaUrl));
        const ipcaData = await ipcaResponse.json();
        const ipca12m = ipcaData.slice(-12).reduce((acc, item) => acc + parseFloat(item.valor), 0);
        
        // Atualizar IPCA na página (procurar por "4,82%")
        for (let el of document.querySelectorAll('*')) {
            if (el.textContent && el.textContent.includes('4,82%')) {
                el.textContent = el.textContent.replace('4,82%', ipca12m.toFixed(2) + '%');
                console.log(`✅ IPCA atualizado: 4,82% → ${ipca12m.toFixed(2)}%`);
                break;
            }
        }
        
        // 4. SELIC - Banco Central
        console.log('Buscando SELIC...');
        const selicUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json';
        const selicResponse = await fetch(proxy + encodeURIComponent(selicUrl));
        const selicData = await selicResponse.json();
        const selic = parseFloat(selicData[0].valor);
        
        console.log(`✅ SELIC obtida: ${selic}%`);
        
        // Mostrar resumo
        alert(`✅ Todas as taxas atualizadas!
        
🏛️ SELIC: ${selic.toFixed(2)}%
💰 CDI: ${cdi.toFixed(2)}%  
📊 IBOVESPA: ${ibov.toLocaleString('pt-BR')} pontos
📈 IPCA 12m: ${ipca12m.toFixed(2)}%
        
Dados atualizados com sucesso!`);
        
    } catch (error) {
        console.error('❌ Erro:', error);
        alert('❌ Erro ao atualizar taxas: ' + error.message);
    }
}

window.updateMarketRates = updateMarketRates;
console.log('✅ Script completo carregado - todas as taxas');
