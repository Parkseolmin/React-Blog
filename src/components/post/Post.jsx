import React from 'react';
import styles from './Post.module.css';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const PF = 'http://localhost:5000/images/';
  console.log(post.photo);
  return (
    <div className={styles.post}>
      {post.photo && (
        <img className={styles.postImg} src={PF + post.photo} alt='' />
      )}
      <div className={styles.postInfo}>
        <div className={styles.postCats}>
          {post.categories ? (
            post.categories.map((category) => (
              <span key={category._id} className={styles.postCat}>
                {category.name}
              </span>
            ))
          ) : (
            <span className={styles.postCat}>No Categories</span>
          )}
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className={styles.postTitle}>{post.title}</span>
        </Link>
        <hr />
        <span className={styles.postDate}>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className={styles.postDesc}>{post.desc}</p>
    </div>
  );
}
