import styles from "./NavSection.module.css";

function NavSection() {
  return (
    <nav className={styles.nav}>
      <h2>
        <span>Coin</span>explorer
      </h2>
      <p>By Mats de Vegt</p>
    </nav>
  );
}

export default NavSection;
