import React, { useContext } from 'react';
import styles from './TopBar.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = 'http://localhost:5000/images/';

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
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
          <li className={styles.topListItem} onClick={handleLogout}>
            {user && 'LOUGOUT'}
          </li>
        </ul>
      </div>
      <div className={styles.topRight}>
        {user ? (
          <Link to='/settings'>
            <img className={styles.topImg} src={PF + user.profilePic} alt='' />
          </Link>
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
