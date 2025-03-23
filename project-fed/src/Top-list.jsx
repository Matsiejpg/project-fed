import { useState, useEffect } from "react";

function TopList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // Stap 1: Haal de eerste 10 coins op
    fetch("https://api.coinpaprika.com/v1/coins")
      .then((response) => response.json())
      .then((data) => {
        const top10Coins = data.slice(0, 10);

        // Stap 2: Voor elke coin een fetch naar de prijs-data maken
        const pricePromises = top10Coins.map((coin) =>
          fetch(`https://api.coinpaprika.com/v1/tickers/${coin.id}`)
            .then((response) => response.json())
            .then((priceData) => ({
              ...coin, // Houd de bestaande coin info
              price: priceData.quotes.USD.price, // Voeg de prijs toe
            }))
        );

        // Stap 3: Wacht tot alle prijzen binnen zijn
        Promise.all(pricePromises).then((coinsWithPrices) => {
          setCoins(coinsWithPrices);
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Top 10 Coins</h1>
      <ul className="coins">
        {coins.map((coin) => (
          <li key={coin.id} className="coin">
            <img
              src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
              alt={coin.name}
              className="coin-logo"
            />
            <div className="coin-info">
              <h2>
                {coin.name} ({coin.symbol})
              </h2>
              <p>Prijs: ${coin.price ? coin.price.toFixed(2) : "Laden..."}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TopList;
