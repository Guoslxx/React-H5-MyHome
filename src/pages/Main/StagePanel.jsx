import React, { Component } from 'react';
import ImgLoader from '../../components/ImgLoader/ImgLoader';
import DragEle from '../../components/DragEle/DragEle';

export default class StagePanel extends Component {

    constructor(props) {
        super(props);
        this.sceneContainer = React.createRef();
    }

    state = {
        bgMaterial: {
            's1_8': { wall: 's1_8.jpg', table: 's1_88.png' },
            's1_9': { wall: 's1_9.jpg', table: 's1_99.png' },
            's1_10': { wall: 's1_10.jpg', table: 's1_1010.png' },
            's1_11': { wall: 's1_11.jpg', table: 's1_1111.png' },
        },
        bgNames: ['s1_8', 's1_9', 's1_10', 's1_11',],
        currentBg: 0,
        containerReact: {}
    }

    changeScene() {
        const { currentBg } = this.state;
        // console.log(currentBg);
        this.setState({
            currentBg: currentBg >= 3 ? 0 : currentBg + 1,
        })
    }

    listenSceneContainer() {
        const { current } = this.sceneContainer;
        const { width, height } = current.getBoundingClientRect();
        this.setState({
            containerReact: { width, height }
        })
    }

    componentDidMount() {
        this.listenSceneContainer();
        window.addEventListener('resize', this.listenSceneContainer.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.listenSceneContainer.bind(this));
    }

    render() {
        const { currentBg, bgMaterial, bgNames, containerReact } = this.state;
        const { wall, table } = bgMaterial[bgNames[currentBg]] || {};

        return (
            <div className="main-scene-inner">
                <section className="main-scene-container" ref={this.sceneContainer}>
                    <ImgLoader
                        className='container-bg container-bg-wall'
                        name={wall}
                    />
                    <ImgLoader
                        className='container-bg container-bg-table'
                        name={table}
                    />

                    <DragEle containerReact={containerReact} name={['s2_23.png']} />
                </section>
                <section className="main-scene-footer">
                    我的H5
                    <button onClick={() => { this.changeScene() }}>切换场景</button>
                </section>
            </div>
        )
    }
}