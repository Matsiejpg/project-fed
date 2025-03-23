import { useState, useEffect } from "react";

function NewTopList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
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
      <h2>Top 10 coins</h2>
      <ul className="coins">
        {coins.map((coin) => (
          <li key={coin.id} className="coin">
            <p>{coin.rank}</p>
            <img src={coin.image} alt={coin.name} className="coin-logo" />
            <div className="coin-info">
              <h3>{coin.name}</h3>
              <p>{coin.symbol}</p>
            </div>
            <div>
              <h3>Price</h3>
              <p>
                ${coin.current_price.toFixed(getDecimal(coin.current_price))}
              </p>
            </div>
            <div>
              <h3>Market Cap</h3>
              <p>${coin.market_cap}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NewTopList;
