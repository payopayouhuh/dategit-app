import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebase.js';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

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

            try {
                const docRef = addDoc(collection(db, "posts"), {
                    title: title,
                    text: text,
                    timestamp: serverTimestamp(),
                    post_id: post_id,
                    origin_postid: 'xxxxxxxxxx',
                    user_id: uid,
                    likes: 0,
                    open_range : open_range
                });

                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

    };



    return (
        <div>
            <h1>投稿情報入力</h1>
            <p>タイトル<input type="text" value={title} onChange={handleTitleChange} /></p>
            <p>本文<input type="text" value={text} onChange={handleTextChange} /></p>
            <select value={open_range} onChange={handleOpenrangeChange}>
                <option value="">公開範囲を選択してください</option>
                <option value="0">public</option>
                <option value="1">private</option>
            </select>
            <p>user_id</p>
            <button onClick={() => execute()}>
                投稿
            </button>
        </div>
    );

};



export default Post;