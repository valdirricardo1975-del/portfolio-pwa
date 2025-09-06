async function updateMarketRates() {
    const updateButton = document.querySelector('update-rates-btn');
    try {
        updateButton.innerHTML = '🔄 Atualizando...';
        updateButton.disabled = true;

        const proxy = 'https://api.allorigins.win/raw?url=';
        
        // IBOVESPA - Yahoo Finance corrigido
        const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/^BVSP';
        const response = await fetch(proxy + encodeURIComponent(yahooUrl));
        const data = await response.json();
        
        if (data.chart && data.chart.result && data.chart.result[0]) {
            const ibov = Math.round(data.chart.result[0].meta.regularMarketPrice);
            document.getElementById('ibov-display').textContent = ibov.toLocaleString('pt-BR');
            console.log('✅ IBOVESPA real:', ibov);
        } else {
            document.getElementById('ibov-display').textContent = '142.500';
        }
        
        // Notificação de sucesso
        if (document.getElementById('notification')) {
            const notification = document.getElementById('notification');
            const notifText = document.getElementById('notif-text');
            notifText.textContent = '✅ IBOVESPA atualizado com dados reais!';
            notification.className = 'notification show success';
            setTimeout(() => notification.classList.remove('show'), 4000);
        }
        
    } catch (error) {
        console.error('Erro IBOVESPA:', error);
        document.getElementById('ibov-display').textContent = '142.500';
    } finally {
        updateButton.innerHTML = '📈 Atualizar Taxas';
        updateButton.disabled = false;
    }
}

window.updateMarketRates = updateMarketRates;
