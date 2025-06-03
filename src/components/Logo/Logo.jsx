import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <img
      className={styles.logo}
      src="../../../src/assets/logo.svg"
      alt="Logo"
      style={{ width: "136px", height: "16px" }}
    />
  );
};

export default Logo;
