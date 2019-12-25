import React, { Component } from 'react';
import './style.less';
import move from 'move-js';
import ImgLoader from '../../components/ImgLoader/ImgLoader';
import element from './element.json';
class EleSelector extends Component {

    state = {
        isUnfold: true,
        currentTab: 'person',
        element,
        tabs: [
            { name: 'bg', icon: 'g2_0.png' },
            { name: 'person', icon: 'g2_2.png' },
            { name: 'food', icon: 'g2_3.png' },
            { name: 'gift', icon: 'g2_1.png' },
        ],
        panelSelect: {}
    }

    constructor(props) {
        super(props);
        this.initState();
    }

    initState() {
        const { element, tabs } = this.state;
        let _panelSelect = {};

        // 初始化各个面板的初始选项
        Object.keys(element).forEach(key => {
            const ele = element[key];
            if (Object.prototype.toString.call(ele) === '[object Object]') {
                const [firstKey] = Object.keys(ele);
                _panelSelect[key] = firstKey;
            }
        })
        this.state = { ...this.state, panelSelect: _panelSelect, };
    }

    changeUnfold() {
        const { isUnfold } = this.state;
        move('.footer-bar--fixed')
            .set('bottom', isUnfold ? '-125px' : '0px')
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
        const { currentTab, tabs, isUnfold } = this.state;
        return (
            <div className="ele-selector-header">
                <nav className="ele-selector-nav">
                    <ul >
                        {tabs.map(tab => (
                            <li
                                key={tab.name}
                                onClick={() => { this.selectElePanel(tab.name) }}>
                                <ImgLoader name={tab.name == currentTab ? tab.icon.replace('2', '1') : tab.icon} />
                            </li>
                        )
                        )
                        }
                    </ul>
                    <div className="ele-selector-switch" onClick={() => { this.changeUnfold() }}>
                        {
                            isUnfold ?
                                <ImgLoader className='ele-selector-switch--fold' name='ui_3.png' /> :
                                <ImgLoader className='ele-selector-switch--unfold' name='ui_333.png' />
                        }
                    </div>
                </nav>
            </div>

        )
    }



    getPanelDataByTab(tab) {
        const { element } = this.state;
        return element[tab] || {};
    }

    selectPanelAside(label) {
        const { currentTab, panelSelect } = this.state;
        const _panelSelect = Object.assign(panelSelect);
        _panelSelect[currentTab] = label;
        this.setState({
            panelSelect: _panelSelect
        })
    }

    getAsideAndMaterial() {
        const { currentTab, panelSelect } = this.state;

        const curTabPanelSelect = panelSelect[currentTab];
        const panelData = this.getPanelDataByTab(currentTab);

        if (panelData instanceof Array) {// 背景选择特殊处理
            return {
                aside: [],
                curMaterial: { isSelected: true, list: panelData }
            }
        } else {
            const aside = Object.keys(panelData)
                .map((key, index) => (
                    {
                        label: key,
                        isSelected: curTabPanelSelect ? curTabPanelSelect == key : index == 0,
                    }
                ));

            const materials = aside.map((item, index) => (
                {
                    list: panelData[item.label],
                    isSelected: curTabPanelSelect ? curTabPanelSelect == item.label : index == 0
                }
            ));

            let curMaterial = materials.filter(e => e.isSelected);
            curMaterial = curMaterial.length > 0 ? curMaterial[0] : null;

            return {
                aside, curMaterial
            }
        }
    }

    getPanel() {

        const { currentTab, panelSelect } = this.state;
        const { aside, curMaterial, isStop } = this.getAsideAndMaterial();

        let col = '';
        if (currentTab === 'bg') {
            col = 'col-4';
        } else if (panelSelect[currentTab] == '对联') {
            col = 'col-2';
        }

        return (
            <div className="ele-selector-panel">
                {
                    aside.length > 0 &&
                    <aside className='selector-panel-aside'>
                        <ul className="selector-panel-aside__list">
                            {aside.map(item => (
                                <li
                                    key={item.label}
                                    onClick={() => { this.selectPanelAside(item.label) }}
                                    className={`selector-panel-aside__item ${item.isSelected ? 'current' : ''}`}>{item.label}</li>))}

                        </ul>
                    </aside>
                }
                <div className="selector-panel-content">
                    <ul className={`panel-content__list ${col ? 'list--' + col : ''}`}>
                        {
                            curMaterial && curMaterial.list.map(item => (
                                <li className="panel-content__item" key={item}>
                                    <ImgLoader name={`n${item}.png`} />
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="footer-bar--fixed">
                <div className='ele-selector'>
                    {this.getTab()}
                    {this.getPanel()}
                </div>
            </div>
        )
    }
}

export default EleSelector;