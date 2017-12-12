import React from 'react'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import MUSIC_LIST from './config/musiclist'

class App extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicitem: MUSIC_LIST[1]
        };
    }
    componentDidMount() {
        let self = this;
        $('#player').jPlayer({
            ready() {
                $(this).jPlayer('setMedia', {
                    mp3: self.state.currentMusicitem.file//http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });

    }
    componentWillUnMount() {

    }

    render() {
        console.log(this.props.children)
        return (
            <div>
                <Header />
                {React.cloneElement(this.props.children, this.state)}
            </div>
        )

    }
}




export default App;