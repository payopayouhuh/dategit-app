import React, { Component } from 'react';
import './Post.css'; // CSSファイルをインポート
import './styles.css'
import Header from './Header';
import someImage from './forkorigin.jpg';
import MarkdownIt from 'markdown-it';


class FunMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      forks: 7,
      boyLikes: 28, // 男の子用いいね数
      girlLikes: 29, // 女の子用いいね数
      totalLikes: 57, //トータルいいね数
      likeflag : 0,
      forkflag : 0,
      boyRatio : 0,
      girlRatio : 0,
      isPopupVisible: false,
    };
    // boyLikesとgirlLikesの合計を計算
    this.state.totalLikes = this.state.boyLikes + this.state.girlLikes;
    this.state.boyRatio = (this.state.boyLikes / this.state.totalLikes)*100;
    this.state.girlRatio = (this.state.girlLikes / this.state.totalLikes)*100
    this.md = new MarkdownIt();
  }


  handleLikeClick = () => {
    if(this.state.likeflag === 0){
        this.setState((prevState) => ({
         likes: prevState.likes + 1,
         boyLikes: prevState.boyLikes + 1,
         totalLikes : prevState.totalLikes + 1,
         likeflag : prevState.likeflag + 1
        
      /*
      boylikes: prevState.boylikes + 1,
      totalLikes : prevState.boyLikes + prevState.girlLikes,
      boyRatio : prevState.totalLikes === 0 ? 0 : (prevState.boyLikes / prevState.totalLikes) * 100,
      girlRatio : prevState.totalLikes === 0 ? 0 : (prevState.girlLikes / prevState.totalLikes) * 100
      */
         }),() => {
            // 割合を計算
            this.calculateRatios();
          });
    }
    else{
            this.setState((prevState) => ({
            likes: prevState.likes - 1,
            boyLikes: prevState.boyLikes - 1,
            totalLikes : prevState.totalLikes - 1,
            likeflag : prevState.likeflag - 1
           
         /*
         boylikes: prevState.boylikes + 1,
         totalLikes : prevState.boyLikes + prevState.girlLikes,
         boyRatio : prevState.totalLikes === 0 ? 0 : (prevState.boyLikes / prevState.totalLikes) * 100,
         girlRatio : prevState.totalLikes === 0 ? 0 : (prevState.girlLikes / prevState.totalLikes) * 100
         */
        }),() => {
            // 割合を計算
            this.calculateRatios();
          });
    }
  };

    handleForkClick = () => {
        if(this.state.forkflag === 0) {
        this.setState((prevState) => ({
            forks: prevState.forks + 1,
            forkflag: prevState.forkflag + 1
        }), () => { // 状態が更新された後に呼び出されるコールバック関数
            window.location.href = "/post";
        });
        }
    
  
    else{
        this.setState((prevState) => ({
            forks: prevState.forks - 1,
            forkflag : prevState.forkflag - 1
        }));        
    }
  };

  handleForkOriginClick = () => {
    this.setState({ isPopupVisible: true });
  };

  closePopup = () => {
    this.setState({ isPopupVisible: false });
  };

  calculateRatios() {
    const {boyLikes, girlLikes, totalLikes} = this.state;
    const boyRatio = (boyLikes / totalLikes) * 100;
    const girlRatio = (girlLikes / totalLikes) * 100;
    this.setState({
      boyRatio,
      girlRatio
    });
  }

  render() {
    const {boyRatio, girlRatio} = this.state;

    const markdown = `
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
`;

    return (

      <div>
        <Header />
      <div className="fun-message">
        <h2>First Date Plan</h2>
        <p className="author">Posted by: john25</p>
        <div dangerouslySetInnerHTML={{ __html: this.md.render(markdown) }} />
        <button className="button-like"  onClick={this.handleLikeClick}>Like</button>

        <button className="button-fork"  onClick={this.handleForkClick}>Fork</button>

        <button className="button-fork-origin" onClick={this.handleForkOriginClick}>Fork元確認</button>
        <p>Like:  {this.state.totalLikes}</p>
        <p>Fork: {this.state.forks}</p>
        <div className="gender-ratio">
        <p>性別ごとのいいね比率:</p>
        <div className="bar">
          <div className="boy-bar" style={{ width: `${this.state.boyRatio}%` }}>
            Boys: {this.state.boyRatio.toFixed(2)}%({this.state.boyLikes}人)
          </div>
          <div className="girl-bar" style={{ width: `${this.state.girlRatio}%` }}>
            Girls: {this.state.girlRatio.toFixed(2)}%({this.state.girlLikes}人)
          </div>
        </div>
        </div>
        {this.state.isPopupVisible && (
            <div className="popup">
              <div className="popup-inner">
              <button className="close-button" onClick={this.closePopup}>&times;</button>
                <img className="popup-image" src={someImage} alt="Fork Origin" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FunMessage;