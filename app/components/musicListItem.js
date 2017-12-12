import React from 'react'

import './musicListItem.less'

class MusicListItem extends React.Component {
  constructor(props) {
  	//console.log(props)
    super(props);
   
  }
  
  render() {
    let musicItem = this.props.musicItem;
    return (
      <li className={`components-listitem row ${this.props.focus ? 'focus' : ''}`}>
        	<p>
          {musicItem.title} —— {musicItem.artist}
        	</p>
        	<p className="-col-auto delete"></p>
      </li>
    );
  }
}


export default MusicListItem;