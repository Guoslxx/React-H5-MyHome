import React, { PureComponent } from 'react';
import './style.less';

class LoadingMusic extends PureComponent {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

    state = {
        stop: false
    }

    componentDidMount() {
        this.toggleMusic();
    }

    toggleMusic() {
        const { stop } = this.state;
        if (stop) {
            this.audioRef.current.play()
                .catch(e => {
                    console.warn('背景音乐播放失败', e)
                })
        } else {
            this.audioRef.current.pause();
        }

        this.setState({
            stop: !stop
        })
    }

    render() {
        const { stop } = this.state;

        return (
            <div className='app-loading-music' onClick={() => { this.toggleMusic() }}>
                <img style={{ visibility: stop ? 'hidden' : 'visible' }} className={`loading-music ${stop ? 'loading-music--stop' : ''}`} src='/material/dft_music_play.png' alt='icon-loading-music' />
                <img style={{ visibility: !stop ? 'hidden' : 'visible' }} className={`loading-music ${stop ? 'loading-music--stop' : ''}`} src='/material/dft_music_stop.png' alt='icon-loading-music' />
                <audio ref={this.audioRef} src='/material/loading.mp3'></audio>
            </div>
        )
    }
}

export default LoadingMusic;