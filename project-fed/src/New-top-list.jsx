import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./search";

function NewTopList() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  async function fetchCoins() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchCoins();

    const interval = setInterval(() => {
      fetchCoins();
    }, 60000); // 60 seconden

    // Ruim het interval op wanneer de component wordt ontkoppeld
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCoinClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  return (
    <div className="container">
      <h2 className="top-list-title">Cryptocurrencies</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className="top-list">
        <ul className="coins">
          <li className="coin-header list-grid">
            <p>#</p>
            <p></p>
            <p>Name</p>
            <p>Price</p>
            <p>24h%</p>
            <p>Market Cap</p>
          </li>
          {filteredCoins.map((coin) => {
            const priceChange = coin.price_change_percentage_24h;
            const textColor = priceChange >= 0 ? "#668925" : "#E33E33";

            return (
              <li
                key={coin.id}
                className="coin list-grid"
                onClick={() => handleCoinClick(coin.id)}
                style={{ cursor: "pointer" }}
              >
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
