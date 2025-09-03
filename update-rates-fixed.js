window.updateMarketRates = async function() {
    console.log('Atualizando taxas...');
    const icon = document.getElementById('rates-update-icon');
    if (icon) icon.innerHTML = '<span class="spinner"></span>';
    
    try {
        // Usar proxy para evitar CORS
        const proxy = 'https://api.allorigins.win/raw?url=';
        const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json';
        
        const response = await fetch(proxy + encodeURIComponent(url));
        const data = await response.json();
        
        if (data && data[0]) {
            // CDI diário para anual: (1 + taxa/100)^252 - 1
            const cdiDiario = parseFloat(data[0].valor);
            const cdiAnual = ((Math.pow(1 + cdiDiario/100, 252) - 1) * 100);
            
            // Atualizar display
            document.getElementById('cdi-rate').textContent = cdiAnual.toFixed(2) + '% a.a.';
            document.getElementById('cdi-display').textContent = cdiAnual.toFixed(2).replace('.', ',') + '%';
            document.getElementById('cdi-annual-display').textContent = (cdiAnual * 1.05).toFixed(2).replace('.', ',') + '%';
            
            // Atualizar header
            const ratesDisplay = document.getElementById('rates-display');
            if (ratesDisplay) {
                ratesDisplay.innerHTML = `CDI: <strong>${cdiAnual.toFixed(2)}% a.a.</strong> • IPCA e SELIC em breve`;
            }
            
            showNotification('✅ CDI atualizado: ' + cdiAnual.toFixed(2) + '% a.a.');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('❌ Erro ao atualizar taxas', 'error');
    }
    
    if (icon) icon.innerHTML = '🔄';
}

// Chamar ao carregar
setTimeout(() => {
    updateMarketRates();
}, 2000);
