import React from "react";
import styles from './Navbar.module.css'; 
import {NavLink} from "react-router-dom";
function Header() {
    return (
        <nav className={styles.nav}>
              <div className={styles.item}>
              <NavLink to="/profile" activeClassName={styles.activeLink}>Provile</NavLink>
              </div>
              <div className={styles.item}>
              <NavLink to="/communities" activeClassName={styles.activeLink}>Community</NavLink>
              </div>
              <div className={styles.item}>
              <NavLink to="/users" activeClassName={styles.activeLink}>Friends</NavLink>
              </div>
              <div className={styles.item}>
              <NavLink to="/news" activeClassName={styles.activeLink}>News</NavLink>
              </div>
         </nav>
    );
  }

  export default Header