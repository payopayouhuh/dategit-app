import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy ,where} from 'firebase/firestore';
import { db } from './firebase.js';

import './styles.css';
import homeIcon from './images/home_icon.png';
import searchIcon from './images/search_icon.png';
import userIcon from './images/user_icon.png';


const TopPage = () => {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), where('isPublic', '==',true ),orderBy('timestamp', 'desc'));



      const querySnapshot = await getDocs(q);
      const postData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postData);
    };
  
    fetchPosts();
  }, []);
  

  /*
  const history = useHistory();

  const goToUserPage = () => {
    history.push('/user-page');
  };

  */

  const initialPosts = [
    {
      id: 1,
      title: 'First Date Plan',
      content: 'Movie and dinner.',
      userId: 'john25',
      likes: 5,
      forkedFrom: null,
      isPublic: true,
    },
    {
      id: 2,
      title: 'Beach Day',
      content: 'Go to the beach and have a picnic.',
      userId: 'sarah_1990',
      likes: 3,
      forkedFrom: null,
      isPublic: true,
    },


    {
      id: 3,
      title: 'Mountain Hiking',
      content: 'Hiking in the mountains and campfire.',
      userId: 'tom_hiker',
      likes: 7,
      forkedFrom: null,
      isPublic: true,
    },
    {
      id: 4,
      title: 'Amusement Park Day',
      content: 'Spend the day at the amusement park.',
      userId: 'alice_fun',
      likes: 8,
      forkedFrom: null,
      isPublic: true,
    }


  ];

//  const [posts, setPosts] = useState(initialPosts);

const handleLike = (postId) => {
  const updatedPosts = posts.map((post) => {
    if (post.id === postId) {
      return { ...post, likes: post.likes + 1 };
    }
    return post;
  });
  setPosts(updatedPosts);
};

  /*

  return (
    <div>
      <div className="header">
        <div className="left-icons">
          <img src={homeIcon} alt="Home" className="header-icon"/>
          <img src={searchIcon} alt="Search" className="header-icon"/>
          <input type="text" placeholder="Search" className="search-bar"/>
        </div>
        <h1 className="small-text">GitDate-plan</h1>
        <a href="/user-page">
        <img className="user-icon" src={userIcon} alt="user" />
        </a>

      </div>


      
      <h2 className="small-text">Date Repositories: {posts.length}</h2>
      <div>
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-body">

              <a href="/post-page">
              <h3 className="card-title">{post.title}</h3>
              </a>
              

              <h4 className="card-subtitle">Posted by: {post.userId}</h4>
              <p className="card-text">{post.content}</p>
              <p className="card-text">Likes: {post.likes}</p>
              <button className="button-fork">Fork</button>
              <button className="button-like" onClick={() => handleLike(post.id)}>Like</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
*/

return (
  <div>
    <div className="header">
      <div className="left-icons">
        <img src={homeIcon} alt="Home" className="header-icon"/>
        <img src={searchIcon} alt="Search" className="header-icon"/>
        <input type="text" placeholder="Search" className="search-bar"/>
      </div>
      <h1 className="small-text">GitDate-plan</h1>
      <a href="/user-page">
        <img className="user-icon" src={userIcon} alt="user" />
      </a>
    </div>
    
    <h2 className="small-text">Date Repositories: {posts.length}</h2>
    <div>
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <div className="card-body">
            <a href="/post-page">
              <h3 className="card-title">{post.title}</h3>
            </a>
            <h4 className="card-subtitle">Posted by: {post.user_name}</h4>
            <p className="card-text">{post.content}</p>
            <p className="card-text">Likes: {post.likes}</p>
            <button className="button-fork">Fork</button>
            <button className="button-like" onClick={() => handleLike(post.id)}>Like</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default TopPage;