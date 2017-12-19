import React from 'react'
import { BrowserRouter as Router, Route, Link, IndexRoute, hashHistory,Switch } from 'react-router-dom'
import Pubsub from 'pubsub-js'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import MUSIC_LIST from './config/musiclist'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicitem: MUSIC_LIST[0]
    };
  }
  playMusic(musicItem){
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file//http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
    }).jPlayer('play');
    this.setState({
      currentMusicitem:musicItem
    })
  }
  playNext(type = 'next'){
    let index = this.findMusicIndex(this.state.currentMusicitem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if(type == 'next'){
      newIndex = (index + 1) % musicListLength
    }else{
      newIndex = (index - 1 + musicListLength) % musicListLength
    }
    this.playMusic(this.state.musicList[newIndex])
  }
  findMusicIndex(musicItem){
    return this.state.musicList.indexOf(musicItem)
  }
  componentDidMount() {
    let self = this;
    $('#player').jPlayer({//初始化
      supplied: 'mp3',
      wmode: 'window'
    });
    this.playMusic(this.state.currentMusicitem);
    $('#player').bind($.jPlayer.event.ended,(e) => {
      this.playNext()
    })
    //订阅事件
    PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    })
    PubSub.subscribe('DELETE_MUSIC',(msg,musicItem) => {
      this.setState({
        musicList:this.state.musicList.filter((item) => {
          return item != musicItem
        })
      })
    })
    PubSub.subscribe('CHANGE_MUSIC', (msg, type) => {
      this.playNext(type)
    })
  }
  componentWillUnmount(){
    //时间解绑
    
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_MUSIC'); 
    Pubsub.unsubscribe('CHANGE_MUSIC'); 
    $('#player').unbind($.jPlayer.event.ended);
  }
 
  render() {
    const Home = () => (
      <Player
        currentMusicitem={this.state.currentMusicitem}
      />
    )

    const List = () => (
      <MusicList
        currentMusicitem={this.state.currentMusicitem}
        musicList={this.state.musicList}
      />
    )
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home}/>
        <Route path="/list" component={List} />
      </div>
    )

  }
}



class Root extends React.Component {
  
  constructor(props) {
    //console.log(props)
    super(props);
  }
  
  render() {
    return(
      <Router >
       
        <Route component={App}/>
        
      </Router>     
    )
    
  }
}



export default Root;