import React from 'react'
import Pubsub from 'pubsub-js'
import './musicListItem.less'
import { Icon } from 'antd';
class MusicListItem extends React.Component {
  constructor(props) {
  	//console.log(props)
    super(props);
   
  }
  playMusic(musicItem){
    PubSub.publish('PLAY_MUSIC',musicItem)
  }
  deleteMusic(musicItem,e){
    e.stopPropagation();
    PubSub.publish('DELETE_MUSIC', musicItem)
  }
  render() {
    let musicItem = this.props.musicItem;
    return (
      <li onClick={this.playMusic.bind(this,musicItem)} className={`components-listitem row ${this.props.focus ? 'focus' : ''}`}>
        	<p>
          {musicItem.title} —— {musicItem.artist}
        	</p>
        <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"><Icon type="close" /></p>
      </li>
    );
  }
}


export default MusicListItem;