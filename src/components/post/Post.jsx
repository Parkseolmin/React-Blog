import React from 'react';
import styles from './Post.module.css';

export default function Post() {
  return (
    <div className={styles.post}>
      <img
        className={styles.postImg}
        src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        alt=''
      />
      <div className={styles.postInfo}>
        <div className={styles.postCats}>
          <span className={styles.postCat}>Music</span>
          <span className={styles.postCat}>Life</span>
        </div>
        <span className={styles.postTitle}>Lorem ipsum dolor, sit amet</span>
        <hr />
        <span className={styles.postDate}>1 hour ago</span>
      </div>
      <p className={styles.postDesc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nobis
        nemo sapiente ullam, omnis illum quaerat esse corporis, et ducimus
        debitis. Praesentium repudiandae soluta deserunt quo eos fugiat autem
        tempora?
      </p>
    </div>
  );
}
