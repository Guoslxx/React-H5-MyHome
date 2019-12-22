import React, { PureComponent } from 'react';
import './style.less';

class AppLoading extends PureComponent {
    constructor(props) {
        super(props);
        console.log(props)
    }
    state = {
        showMarkList: new Array(8).fill(false),
        currentShowIndex: 0,
        loading: 0,
    }
    imgSrcArr = [
        require('../../assets/images/loading_8.png'),
        require('../../assets/images/loading_9.png'),
        require('../../assets/images/loading_10.png'),
        require('../../assets/images/loading_11.png'),
        require('../../assets/images/loading_12.png'),
        require('../../assets/images/loading_13.png'),
        require('../../assets/images/loading_14.png'),
        require('../../assets/images/loading_15.png'),
    ]
    timer = null
    componentDidMount() {
        this.timer = setInterval(() => {
            const { currentShowIndex, loading } = this.state;
            const _currentShowIndex = currentShowIndex >= 7 ? 0 : currentShowIndex + 1;
            const _loading = loading >= 100 || loading == 'finshed' ? 'finshed' : loading + 10;
            this.setState({
                currentShowIndex: _currentShowIndex,
                loading: _loading
            })
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
    cycleShowImg() {
        const { currentShowIndex } = this.state;
        return this.imgSrcArr.map((src, idx) => (<img style={{ display: currentShowIndex == idx ? 'block' : 'none' }} key={idx} src={src} alt='loading' />))
    }

    renderLoading(progress) {
        return (
            <div className="app-loading-progress">
                <div className="app-loading-progress-inner">
                    <div className="progress-bg"></div>
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    <div className="progress-text">loading...</div>
                </div>
            </div>
        )
    }

    render() {
        const { loading, history } = this.props;
        return (
            <main className='app-loading'>
                <div className="app-loading-container">
                    <section className='app-loading-table'>
                        <img className='ele-table' src={require('../../assets/images/loading_5.png')} />
                        {this.cycleShowImg()}
                    </section>
                    <section className='app-loading-text'>
                        <img style={{ margin: '0 auto', display: 'block', width: '200px' }} src={require('../../assets/images/loading_6.png')} alt="loading" />
                    </section>
                    <section className='app-loading-progress-btn'>
                        {loading >= 100 ?
                            <button onClick={() => { history.push('/main-secne')}}>START</button>
                            :
                            this.renderLoading(loading)
                        }
                    </section>
                </div>
            </main>
        )
    }
}

export default AppLoading;