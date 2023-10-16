import React from 'react';
import styles from './Posts.module.css';
import Post from '../post/Post';

export default function Posts({ posts }) {
  return (
    <div className={styles.posts}>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
