import React, { Component } from 'react';
import ImgLoader from '../../components/ImgLoader/ImgLoader';

export default class StagePanel extends Component {

    state = {
        bgMaterial: {
            's1_8': { wall: 's1_8.jpg', table: 's1_88.png' },
            's1_9': { wall: 's1_9.jpg', table: 's1_99.png' },
            's1_10': { wall: 's1_10.jpg', table: 's1_1010.png' },
            's1_11': { wall: 's1_11.jpg', table: 's1_1111.png' },
        },
        bgNames:['s1_8','s1_9','s1_10','s1_11',],
        currentBg:0,
    }

    changeScene() {
        const {currentBg} = this.state;
        // console.log(currentBg);
        this.setState({
            currentBg:currentBg >= 3 ? 0 : currentBg + 1,
        })
    }

    render() {
        const { currentBg, bgMaterial ,bgNames} = this.state;
        console.log(currentBg,bgNames[currentBg],bgMaterial[bgNames[currentBg]])
        const { wall, table } = bgMaterial[bgNames[currentBg]] || {};

        return (
            <div className="main-scene-inner">
                <section className="main-scene-container">
                    <ImgLoader
                        className='container-bg container-bg-wall'
                        name={wall}
                    />
                    <ImgLoader
                        className='container-bg container-bg-table'
                        name={table}
                    />
                </section>
                <section className="main-scene-footer">
                    我的H5
                    <button onClick={() => { this.changeScene() }}>切换场景</button>
                </section>
            </div>
        )
    }
}