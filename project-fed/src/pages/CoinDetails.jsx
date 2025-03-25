import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CoinDetails.css";

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCoin(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!coin) {
    return <p></p>;
  }

  return (
    <div className="coin-details">
      <h1>{coin.name}</h1>
      <img src={coin.image.large} alt={coin.name} />
      <p>Symbol: {coin.symbol.toUpperCase()}</p>
      <p>Current Price: ${coin.market_data.current_price.usd}</p>
      <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
      <p>Description: {coin.description.en.split(".")[0]}</p>
    </div>
  );
}

export default CoinDetails;
