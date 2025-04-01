import styles from "./LoadMore.module.css";

function LoadMore({ onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={styles.loadmore}
        >
            Load the next 25 coins
        </button>
    );
}

export default LoadMore;