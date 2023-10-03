import React from 'react';
import styles from './TopBar.module.css';
import { Link } from 'react-router-dom';

export default function TopBar() {
  const user = false;
  return (
    <div className={styles.top}>
      <div className={styles.topLeft}>
        <i className={`${styles.topIcon} fa-brands fa-square-facebook`}></i>
        <i className={`${styles.topIcon} fa-brands fa-square-x-twitter`}></i>
        <i className={`${styles.topIcon} fa-brands fa-square-pinterest`}></i>
        <i className={`${styles.topIcon} fa-brands fa-square-instagram`}></i>
      </div>
      <div className={styles.topCenter}>
        <ul className={styles.topList}>
          <li className={styles.topListItem}>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          <li className={styles.topListItem}>
            <Link className='link' to='/'>
              ABOUT
            </Link>
          </li>
          <li className={styles.topListItem}>
            <Link className='link' to='/'>
              CONTACT
            </Link>
          </li>
          <li className={styles.topListItem}>
            <Link className='link' to='/write'>
              WRITE
            </Link>
          </li>
          <li className={styles.topListItem}>{user && 'LOUGOUT'}</li>
        </ul>
      </div>
      <div className={styles.topRight}>
        {user ? (
          <img
            className={styles.topImg}
            src='https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt=''
          />
        ) : (
          <ul className={styles.topList}>
            <li className={styles.topListItem}>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
            <li className={styles.topListItem}>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i
          className={`${styles.topSearchIcon} fa-solid fa-magnifying-glass`}
        ></i>
      </div>
    </div>
  );
}
