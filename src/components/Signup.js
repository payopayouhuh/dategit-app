import { collection, addDoc, } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth } from '../firebase.js';
import { useState } from 'react';

const SignUp = () => {

    const provider = new GoogleAuthProvider();

    // ユーザー情報を利用者から取得
    const [user_name, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [profession, setProfession] = useState('');
    const [gender, setGender] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };
    const handleProfessionChange = (e) => {
        setProfession(e.target.value);
    };
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }

    const clickLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                const name = user.displayName
                const uid = user.uid

                console.log(uid)

                // データベースにデータを書き込む処理
                // usersにuser_idがあるかを確認して情報登録を行うかどうかの処理が必要
                try {
                    const docRef = addDoc(collection(db, "users"), {
                        user_id: uid,
                        name: name,
                        user_name: user_name,
                        age: age,
                        profession: profession,
                        gender: gender
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(error)
            });
    }

    // 職業もselect的なものを使ってカテゴライズするのはありじゃないか
    return (
        <div>
            <div>
                <button onClick={() => clickLogin()}>
                    googleログイン
                </button>
            </div>
            <h1>個人情報入力</h1>
            <p>ニックネーム<input type="text" value={user_name} onChange={handleUsernameChange} /></p>
            <p>年齢<input type="number" value={age} onChange={handleAgeChange} /></p>
            <p>職業<input type="text" value={profession} onChange={handleProfessionChange} /></p>
            <p>
                <select value={gender} onChange={handleGenderChange}>
                    <option value="">性別を選択してください</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                </select>
            </p>
        </div>
    );
};

export default SignUp;