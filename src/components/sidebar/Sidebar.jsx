import React from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>ABOUT ME</span>
        <img src={process.env.PUBLIC_URL + '/img/sidebar.jpg'} alt='' />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>CATEGORIES</span>
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarListItem}>Life</li>
          <li className={styles.sidebarListItem}>Music</li>
          <li className={styles.sidebarListItem}>Style</li>
          <li className={styles.sidebarListItem}>Sport</li>
          <li className={styles.sidebarListItem}>Tech</li>
          <li className={styles.sidebarListItem}>Cinema</li>
        </ul>
      </div>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>FOLLOW US</span>
        <div className={styles.sidebarSocial}>
          <i
            className={`${styles.sidebarIcon} fa-brands fa-square-facebook`}
          ></i>
          <i
            className={`${styles.sidebarIcon} fa-brands fa-square-x-twitter`}
          ></i>
          <i
            className={`${styles.sidebarIcon} fa-brands fa-square-pinterest`}
          ></i>
          <i
            className={`${styles.sidebarIcon} fa-brands fa-square-instagram`}
          ></i>
        </div>
      </div>
    </div>
  );
}
