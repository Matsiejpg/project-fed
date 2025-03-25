import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <section className={styles.herosection}>
      <h1>
        Explore the <span>Top 100</span> Cryptocurrencies
      </h1>
      <p>
        Curious about crypto but unsure where to begin? Explore the top 100
        cryptocurrencies and dive deeper into the world of the{" "}
        <span>future</span>
      </p>
    </section>
  );
}

export default HeroSection;
