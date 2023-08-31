import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from '../firebase.js';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Display_user = () => {
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [showUserData, setShowUserData] = useState(false);
    const [showPostData, setShowPostData] = useState(false);

    const fetchUserData = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid)
                const userDoc = await getUserDataByUid(uid);
                if (userDoc) {
                    setUserData(userDoc);
                    setShowUserData(true);
                }
            }
        });
    };

    const fetchPostData = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid)
                const postDoc = await getPostDataByUid(uid);
                if (postDoc) {
                    setPostData(postDoc);
                    setShowPostData(true);
                }
            }
        });
    };





    const getUserDataByUid = async (uid) => {
        try {
            const q = query(collection(db, 'users'), where('user_id', '==', uid));
            console.log(q)
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                return userData;
            } else {
                return null;
            }
        } catch (error) {
            console.error('データの検索中にエラーが発生しました:', error);
            return null;
        }
    };

    const getPostDataByUid = async (uid) => {
        try {
            const q = query(collection(db, 'posts'), where('user_id', '==', uid));
            console.log(q)
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const postData = querySnapshot.docs[0].data();
                return postData;
            } else {
                return null;
            }
        } catch (error) {
            console.error('データの検索中にエラーが発生しました:', error);
            return null;
        }
    };

    return (
        <div>
            <div>
                <h1>ユーザー情報表示</h1>
                <button onClick={fetchUserData}>ユーザー情報を表示</button>
                {showUserData && userData ? (
                    <div>
                        <p>名前: {userData.name}</p>
                        <p>年齢: {userData.age}</p>
                        <p>性別: {userData.gender}</p>
                        <p>職業: {userData.profession}</p>
                    </div>
                ) : (
                    showUserData && <p>ユーザー情報がありません</p>
                )}
            </div>
            <div>
                <h1>投稿情報表示</h1>
                <button onClick={fetchPostData}>ユーザー情報を表示</button>
                {showPostData && postData ? (
                    <div>
                        <p>タイトル: {postData.title}</p>
                        <p>本文: {postData.text}</p>
                        <p>投稿日時: {postData.timestamp}</p>
                        <p>post_id: {postData.post_id}</p>
                    </div>
                ) : (
                    showUserData && <p>ユーザー情報がありません</p>
                )}
            </div>

        </div>
    );
};

export default Display_user;
