import { useState, useEffect } from "react";
import SearchBar from "./search";

function NewTopList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const formatCurrency = (value, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(value);
  };

  return (
    <div className="container">
      <h2 className="top-list-title">Cryptocurrencies</h2>
      <SearchBar />
      <section className="top-list">
        <ul className="coins">
          <li className="coin-header list-grid">
            <p>#</p>
            <p></p>
            <p>Name</p>
            <p>Price</p>
            <p>Change</p>
            <p>Market Cap</p>
          </li>
          {coins.map((coin) => {
            const priceChange = coin.price_change_percentage_24h;
            const textColor = priceChange >= 0 ? "green" : "red";

            return (
              <li key={coin.id} className="coin list-grid">
                <p>{coin.market_cap_rank}</p>
                <img src={coin.image} alt={coin.name} className="coin-logo" />
                <div className="coin-info">
                  <h3>{coin.name}</h3>
                  <p>{coin.symbol.toUpperCase()}</p>
                </div>
                <p>{formatCurrency(coin.current_price)}</p>
                <p style={{ color: textColor }}>{priceChange.toFixed(2)}%</p>
                <p>{formatCurrency(coin.market_cap)}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default NewTopList;
