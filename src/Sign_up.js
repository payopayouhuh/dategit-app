import { collection, addDoc, } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth } from './firebase.js';
import { useState, Component} from 'react';
import './Signup.css'; // CSSファイルをインポート

/*
class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false, // ログイン状態を管理
        gender: '', // 性別
      };
    }
*/

const SignUp = () => {

    const provider = new GoogleAuthProvider();
    const [isLogin, setLoginState] = useState(false);

    // ユーザー情報を利用者から取得
    const [user, setUser] = useState(null);
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

                const { uid, displayName: name } = user;
                setUser({ uid, name });

                console.log(uid)

                // データベースにデータを書き込む処理
                // usersにuser_idがあるかを確認して情報登録を行うかどうかの処理が必要
                setLoginState(!isLogin);

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

    const handleSaveData = async () => {
        if (user) {


                    if (user_name.includes('<') || user_name.includes('>')  || user_name.includes(';') ||isNaN(Number(age))) {
                        // 不正な入力の場合、ポップアップメッセージを設定
                        //setPopupMessage('不正な入力です');
                        alert('Invalid input');
                        return; // データベースへの登録を中止
                      }


                    



          try {
              const docRef = addDoc(collection(db, "users"),{
              uid: user.uid,
              name: user.name,
              user_name,
              age,
              profession,
            });
            console.log("Document written with ID: ", docRef.id);
            window.location.href = "/";



          } catch (error) {
            console.error('Error:', error);
          }
        }
      };

    // 職業もselect的なものを使ってカテゴライズするのはありじゃないか
    return (
        <div>
            {isLogin ? (
                <center>
                <div>
                <h1>Sign Up</h1>
                <p><input class = "textbox" placeholder="user name" type="text" value={user_name} onChange={handleUsernameChange} /></p>
                <p><input class = "textbox" placeholder="age" type="number" value={age} onChange={handleAgeChange} /></p>
                <p><input class = "textbox" placeholder="profession" type="text" value={profession} onChange={handleProfessionChange} /></p>
                <select class = "textbox" value={gender} onChange={handleGenderChange}>
                    <option value="">Please specify your gender:</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <p></p>
                <button className="button" onClick={handleSaveData}>
                {/* <a href="/">
                <h3 >Go to ForkinLove!</h3>
                 </a> */}
                Go to ForkinLove!
                </button>
                </div>
                </center>
            ):(
                <center>
                <div>
                <h1>Sign Up</h1>
                <button className="form_button" onClick={() => clickLogin()}>
                Log in with Google Account
                </button>
                </div>
                </center>
            )
            }
        </div>
    )
};

export default SignUp;