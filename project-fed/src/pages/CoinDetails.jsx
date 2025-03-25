import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CoinDetails.module.css";
import TradingviewWidget from "../components/TradingviewWidget";
import NavSection from "../components/NavSection";
import IconButton from "../components/IconButton";
import { FaGlobe, FaFileAlt } from "react-icons/fa";

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState("btc");

  async function fetchCoinDetails() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin:", error);
    }
  }

  useEffect(() => {
    fetchCoinDetails();

    const interval = setInterval(() => {
      console.log("Refreshing coin data...");
      fetchCoinDetails();
    }, 60000);

    return () => {
      console.log("Clearing interval...");
      clearInterval(interval);
    };
  }, [id]);

  if (!coin) {
    return <p></p>;
  }

  const formatCurrency = (value, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(value);
  };

  const priceChange = coin.market_data.price_change_percentage_24h;
  const textColor = priceChange >= 0 ? "#668925" : "#E33E33";
  const checkWhitepaper = coin.links.whitepaper ? "" : "hidden";

  return (
    <>
      <div>
        <NavSection />
      </div>
      <section className={`container ${styles.coindetails}`}>
        <div>
          <div className={styles.basicinfowrapper}>
            <div className={styles.basicinfo}>
              <img src={coin.image.large} alt={coin.name} />
              <div>
                <h1>{coin.name}</h1>
                <p>{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            <div className={styles.rank}>#{coin.market_cap_rank}</div>
          </div>
          <h2>{formatCurrency(coin.market_data.current_price.usd)}</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            {coin.description.en.split(".").slice(0, 2).join(". ")}
          </p>
          <div className={styles.coinmetrics}>
            <div className={styles.coindetailsgrid}>
              <div>
                <h4>24h%</h4>
                <p style={{ color: textColor }}>
                  {coin.market_data.price_change_percentage_24h}%
                </p>
              </div>
              <div>
                <h4>Market cap</h4>
                <p>{formatCurrency(coin.market_data.market_cap.usd)}</p>
              </div>
            </div>
            <div className={styles.coindetailsgrid}>
              <div>
                <h4>All-time high</h4>
                <p>{formatCurrency(coin.market_data.ath.usd)}</p>
              </div>
              <div>
                <h4>Total supply</h4>
                <p>{coin.market_data.total_supply}</p>
              </div>
            </div>
          </div>
          <div className={styles.coindetailsgrid}>
            <IconButton href={coin.links.homepage} icon={FaGlobe}>
              Website
            </IconButton>
            <IconButton
              href={coin.links.whitepaper}
              icon={FaFileAlt}
              className={checkWhitepaper}
            >
              Whitepaper
            </IconButton>
          </div>
        </div>
        <div>
          <h3>Tradingview chart</h3>
          <TradingviewWidget symbol={coin.symbol.toUpperCase()} />
        </div>
      </section>
    </>
  );
}

export default CoinDetails;
