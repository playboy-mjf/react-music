import React from 'react'
import { Link } from 'react-router-dom'
import Progress from '../components/progress'
import './player.less'
import { Layout } from 'antd'
import MusicList from './musiclist'
import Pubsub from 'pubsub-js'
const { Header, Footer, Sider, Content } = Layout;
let duration=0;//全部时长




class Player extends React.Component {
  
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
        progress: '0',
        volume:0,
        isPlay:true,
        leftTime:''
    };
  }
  componentDidMount(){
    
    $('#player').bind($.jPlayer.event.timeupdate,(e) => {
      //console.log(e.jPlayer.status.currentPercentAbsolute)
      duration = e.jPlayer.status.duration;//总时长
      this.setState({
        volume:e.jPlayer.options.volume*100,
        progress:e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTine(duration*(1 - e.jPlayer.status.currentPercentAbsolute/100))
      })
    })
  }
  componentWillUnMount(){
    $('#player').unbind($.jPlayer.event.timeupdate)
  }
  progressChangeHandler(progress){
    $('#player').jPlayer( 'play',duration*progress*0.01);
    this.setState({
      isPlay:true
    })
  }
  volumeChangeHandler(progress){
    $('#player').jPlayer('volume',progress*0.01)
  }
  play(){
    if(this.state.isPlay){
      $('#player').jPlayer('pause')
    }else{
      $('#player').jPlayer('play')
    }
    this.setState({
      isPlay:!this.state.isPlay
    })
  }
  playPrev(type) {
    PubSub.publish('CHANGE_MUSIC', type)
  }
  formatTine(s){
    s = Math.floor(s);
    let miniutes = Math.floor(s/60);
    let seconds = Math.floor(s%60);
    seconds < 10 ? `0${seconds}`:seconds;
    return `${miniutes}:${seconds}`
  }
  render() {
    return(
          <div className="player-page">
                
        <h1 className="caption"><Link to='/list'>我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row wrapper">
                  <div className="controll-wrapper">
                    <h2 className="music-title">{this.props.currentMusicitem.title}</h2>
                    <h3 className="music-artist mt10">{this.props.currentMusicitem.artist}</h3>
                    <div className="row mt20">
                    <div className="left-time -col-auto">-{this.state.leftTime}</div>
                      <div className="volume-container">
                        <i className="icon-volume rt" style={{top:  -8, left: -5}}></i>
                        <div className="volume-wrapper">
                          <Progress
                            progress={this.state.volume}
                            onProgressChange={this.volumeChangeHandler.bind(this)}
                            isPlay = {this.state.isPlay}
                          >
                          </Progress>
                        </div>
                      </div>
                    </div>
                    <div style={{height: 10, lineHeight: '10px'}}>
                      <Progress
                        progress={this.state.progress}
                        onProgressChange={this.progressChangeHandler.bind(this)}
                        isPlay = {true}
                      >
                      </Progress>
                    </div>
                    <div className="mt35 row">
                      <div>
                        <i className="icon prev" onClick={this.playPrev.bind(this,'prev')}></i>
                        <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
                        <i className="icon next ml20" onClick={this.playPrev.bind(this, 'next')}></i>
                      </div>
                      <div className="-col-auto icon repeat-cycle">
                        
                      </div>
                    </div>
                  </div>
                  <div className="-col-auto cover">
                    <img src={this.props.currentMusicitem.cover} className={`${this.state.isPlay ? '' : 'stop'}`}/>
                  </div>
                </div>
            </div>
    )
    
  }
}



export default Player;