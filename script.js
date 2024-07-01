document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://api.coincap.io/v2/assets';
    const cryptoContainer = document.getElementById('contener_coin');

    const fetchData = () => {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                cryptoContainer.innerHTML = '';
                const cryptocurrencies = data.data.slice(0, 10);
                cryptocurrencies.forEach(crypto => {
                    const coin_item = document.createElement('div');
                    coin_item.className = 'coin_item';

                    const logoURL = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

                    coin_item.innerHTML = `
                        <img src="${logoURL}" alt="${crypto.name} logo">
                        <h1>${crypto.name} (${crypto.symbol})</h2>
                        <p>Rank: ${crypto.rank}</p>
                        <p>Price: $${parseFloat(crypto.priceUsd).toFixed(2)}</p>
                        <p>Change: ${parseFloat(crypto.changePercent24Hr).toFixed(2)}%</p>
                    `;
                    cryptoContainer.appendChild(coin_item);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    fetchData();

    setInterval(fetchData, 15000);
});
