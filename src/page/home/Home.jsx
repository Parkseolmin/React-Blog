import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
      console.log(res);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className={styles.home}>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
