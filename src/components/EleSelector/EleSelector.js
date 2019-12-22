import React, { Component } from 'react';
import './style.less';
import move from 'move-js';
import ImgLoader from '../../components/ImgLoader/ImgLoader';

class EleSelector extends Component {

    state = {
        isUnfold: true,
        currentTab: 'g2_0.png'
    }

    changeUnfold() {
        const { isUnfold } = this.state;
        move('.footer-bar--fixed')
            .set('bottom', isUnfold ? '-108px' : '0px')
            .duration('2s')
            .duration('0.5s')
            .end(() => {
                this.setState({
                    isUnfold: !isUnfold
                })
            });
    }

    selectElePanel(tab) {
        const { currentTab } = this.state;
        if (tab != currentTab) {
            this.setState({
                currentTab: tab
            })
        }
    }

    getTab() {
        const { currentTab } = this.state;
        let tabs = ['g2_0.png', 'g2_1.png', 'g2_2.png', 'g2_3.png',]

        return (
            <ul >
                {tabs.map(tab => (
                    <li
                        key={tab}
                        onClick={() => { this.selectElePanel(tab) }}>
                        <ImgLoader name={tab == currentTab ? tab.replace('2', '1') : tab} />
                    </li>
                )
                )
                }
            </ul>
        )
    }

    render() {
        const { isUnfold } = this.state;

        return (
            <div className="footer-bar--fixed">
                <div className='ele-selector'>
                    <div className="ele-selector-header">
                        <nav className="ele-selector-nav">
                            {this.getTab()}
                            <div className="ele-selector-switch" onClick={() => { this.changeUnfold() }}>
                                {
                                    isUnfold ?
                                        <ImgLoader className='ele-selector-switch--fold' name='ui_3.png' /> :
                                        <ImgLoader className='ele-selector-switch--unfold' name='ui_333.png' />
                                }
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default EleSelector;