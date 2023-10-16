import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get('/categories');
      setCats(res.data);
    };
    getCats();
  }, []);
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
          {cats.map((category) => (
            <Link
              to={`/?cat=${category.name}`}
              className='link'
              key={category.name}
            >
              <li className={styles.sidebarListItem}>{category.name}</li>
            </Link>
          ))}
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
