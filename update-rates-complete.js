async function updateMarketRates() {
    const updateButton = document.getElementById('update-rates-btn');
    try {
        updateButton.innerHTML = '🔄 Atualizando...';
        const proxy = 'https://api.allorigins.win/raw?url=';
        const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/^BVSP';
        const response = await fetch(proxy + encodeURIComponent(yahooUrl));
        const data = await response.json();
        const ibov = Math.round(data.chart.result[0].meta.regularMarketPrice);
        document.getElementById('ibov-display').textContent = ibov.toLocaleString('pt-BR');
        alert('✅ IBOVESPA atualizado: ' + ibov.toLocaleString('pt-BR'));
    } catch (error) {
        document.getElementById('ibov-display').textContent = '142.500';
        alert('❌ Erro, usando valor padrão');
    } finally {
        updateButton.innerHTML = '📈 Atualizar Taxas';
    }
}
window.updateMarketRates = updateMarketRates;
