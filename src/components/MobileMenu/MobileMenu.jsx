import { useState } from "react";
import styles from "./MobileMenu.module.css";

import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
const MobileMenu = ({ isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        className={styles.burger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isAuthenticated ? <FaUserCircle /> : isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li className={styles.fadeIn}>
            <a href="/" onClick={closeMenu} className={styles.link}>
              Home
            </a>
          </li>
          <li className={styles.fadeIn}>
            <a href="/catalog" onClick={closeMenu} className={styles.link}>
              Catalog
            </a>
          </li>

          <li className={styles.fadeIn}>
            <a href="/favorites" onClick={closeMenu} className={styles.link}>
              Favorites
            </a>
          </li>
          <li className={styles.fadeIn}>
            <a href="/contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {isOpen && <div className={styles.backdrop} onClick={closeMenu}></div>}
    </>
  );
};

export default MobileMenu;
