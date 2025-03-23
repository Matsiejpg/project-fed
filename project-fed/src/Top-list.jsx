import { useState, useEffect } from "react";

function TopList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/coins")
      .then((response) => response.json())
      .then((data) => {
        const top10Coins = data.slice(0, 10);

        const pricePromises = top10Coins.map((coin) =>
          fetch(`http://localhost:3000/tickers/${coin.id}`)
            .then((response) => response.json())
            .then((priceData) => ({
              ...coin,
              price: priceData.quotes.USD.price,
              marketCap: priceData.quotes.USD.market_cap,
            }))
        );

        Promise.all(pricePromises).then((coinsWithPrices) => {
          setCoins(coinsWithPrices);
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const getDecimal = (price) => {
    if (price >= 1) return 2;
    if (price >= 0.1) return 4;
    return 8;
  };

  return (
    <>
      <h1>Top 10 Coins</h1>
      <ul className="coins">
        {coins.map((coin) => (
          <li key={coin.id} className="coin">
            <p>{coin.rank}</p>
            <img
              src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
              alt={coin.name}
              className="coin-logo"
            />
            <div className="coin-info">
              <h2>{coin.name}</h2>
              <p>{coin.symbol}</p>
            </div>
            <div>
              <h3>Prijs</h3>
              <p>
                $
                {coin.price
                  ? coin.price.toFixed(getDecimal(coin.price))
                  : coin.price}
              </p>
            </div>
            <div>
              <h3>Market cap</h3>
              <p>
                $
                {coin.marketCap
                  ? coin.marketCap.toFixed(getDecimal(coin.marketCap))
                  : coin.marketCap}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TopList;
