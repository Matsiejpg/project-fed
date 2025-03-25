import { FaGlobe, FaFileAlt } from "react-icons/fa";
import styles from "./IconButton.module.css";

function IconButton({ href, icon: Icon, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.buttondesign}
    >
      <Icon className={styles.icon} />
      <span>{children}</span>
    </a>
  );
}

export default IconButton;
