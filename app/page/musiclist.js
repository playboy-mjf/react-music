import React from 'react'
import MusicListItem from '../components/musicListItem'




class MusicList extends React.Component {
  constructor(props) {
  	console.log(props)
    super(props);
   
  }
  
  render() {
    let listEle = null;
    
    listEle = this.props.musicList.map((item)=>{
      return <MusicListItem 
                focus={item === this.props.currentMusicitem}/* 选中的歌曲 */
                key={item.id} 
                musicItem={item}
              >
                {item.title}
              </MusicListItem>
    })
    return (
      <ul>
        { listEle }
      </ul>
    );
  }
}


export default MusicList;