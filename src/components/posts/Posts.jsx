import React from 'react';
import styles from './Posts.module.css';
import Post from '../post/Post';

export default function Posts() {
  return (
    <div className={styles.posts}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
