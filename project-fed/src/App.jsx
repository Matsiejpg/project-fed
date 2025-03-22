import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/coins")
      .then((response) => response.json())
      .then((data) => setCoins(data.slice(0, 10)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Top 10 Coins</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <h2>{coin.name}</h2>
            <p>{coin.symbol}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
