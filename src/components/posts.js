import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebase.js';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles.css'
import Header from '../Header';

// ランダムな文字列の生成
const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }

    return randomString;
};

// ユーザーidの取得
const checkLoginStatus = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("ログインしているよ", user.uid)
            return user.uid
        } else {
            console.log('User is not logged in');
        }
    });
};

const Post = () => {
    // ユーザー情報を利用者から取得
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [open_range, setOpenrange] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleTextChange = (e) => {
        setText(e.target.value);
    };
    const handleOpenrangeChange = (e) => {
        setOpenrange(e.target.value);
    };

    const getLoggedInUserId = async () => {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user.uid);
                } else {
                    resolve(null);
                }
            });
        });
    };

    // 投稿ボタンを押したらデータベースへ情報を格納
    const execute = async () => {
        const uid = await getLoggedInUserId();
        console.log(uid)

        if (uid) {
            const post_id = generateRandomString(10);

                // open_rangeに基づいてisPublicの値を設定
                const isPublicValue = open_range === "0" ? true : false;  // 公開範囲が "0"（public）ならtrue、それ以外（"1"、つまりprivate）ならfalse

            try {
                const docRef = addDoc(collection(db, "posts"), {
                    title: title,
                    text: text,
                    timestamp: serverTimestamp(),
                    post_id: post_id,
                    origin_postid: 'xxxxxxxxxx',
                    user_id: uid,
                    likes: 0,
                    open_range : open_range,
                    isPublic: isPublicValue
                });

                console.log("Document written with ID: ", docRef.id);
                window.location.href = "/";



            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

    };



    return (
        <div>
          <Header />
          <h1>投稿情報入力</h1>
          <label>
            タイトル
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <label>
            本文
            <input type="text" value={text} onChange={handleTextChange} />
          </label>
          <label>
            公開範囲
            <select value={open_range} onChange={handleOpenrangeChange}>
              <option value="">公開範囲を選択してください</option>
              <option value="0">public</option>
              <option value="1">private</option>
            </select>
          </label>
          <p>user_id</p>
          <button onClick={() => execute()}>投稿</button>
        </div>
      );

};



export default Post;