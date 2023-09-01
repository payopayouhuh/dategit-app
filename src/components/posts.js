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
    const [title, setTitle] = useState('うめだでーと');
    const [text, setText] = useState(`
    ### デートプラン: 梅田で過ごす一日
    
    #### 午前
    - **11:00 集合**: JR大阪駅または梅田駅で集合。
    - **11:15 ブランチ**: ヨドバシカメラの上層階にあるフードコートでカジュアルなブランチ。
    - **12:00 ショッピング**: 阪急デパートやルクア大阪でショッピングタイム。
    
    #### 午後
    - **14:00 梅田スカイビル・空中庭園展望台**: 素晴らしい景色を楽しみながら、2人の時間を過ごす。
    - **15:00 カフェタイム**: 人気のカフェで一息つき、ケーキやコーヒーを楽しむ。
    
    #### 夕方・夜
    - **18:00 ディナー**: 梅田ダイニングで美味しいディナー。
    - **19:30 映画**: TOHOシネマズ梅田で選んだ映画を鑑賞。
    - **21:30 バーで一杯**: 居心地のいいバーで1日の終わりにカクテルやワインを楽しむ。
    
    #### 22:30 解散・送り出し
    注意: COVID-19の影響により、営業時間や入店制限が変更されている可能性があります。事前確認をお勧めします。
    `);
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
                    user_name: "Tarou",
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
        <div className="post-container">
          <Header />
          <h1>投稿情報入力</h1>
          <div className="input-section">
            <label>
              タイトル
              <input type="text" value={title} onChange={handleTitleChange} className="input-field"/>
            </label>
            <label>
              公開範囲
              <select value={open_range} onChange={handleOpenrangeChange} className="input-field">
                <option value="">公開範囲を選択してください</option>
                <option value="0">public</option>
                <option value="1">private</option>
              </select>
            </label>
          </div>
    
          <label className="text-area-label">
            本文
            <textarea value={text} onChange={handleTextChange} rows="15" cols="70" className="text-area"></textarea>
          </label>
    
          <div className="input-section">
            <button onClick={() => execute()}>投稿</button>
          </div>
        </div>
    );
    

};



export default Post;