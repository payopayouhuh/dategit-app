import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, onSnapshot, where} from 'firebase/firestore';
import { db } from '../firebase.js';

const Display_Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const postData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postData);
      console.log(postData)
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>投稿一覧</h1>
      {posts.map((post) => (
        <div key={post.post_id}>
          <h2>{post.title}</h2>
          <p>{post.likes}</p>
          <p>{post.text}</p>
          <p>投稿ID: {post.post_id}</p>
          <p>ユーザーID: {post.user_id}</p>
          <p>投稿日時: {post.timestamp.toDate().toLocaleString()}</p>
          <p>公開範囲: {post.open_range}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Display_Post;
