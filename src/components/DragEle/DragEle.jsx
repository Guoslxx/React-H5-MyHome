import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ImgLoader from '../ImgLoader/ImgLoader';

// const onmove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
// const onmove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
export default class DragEle extends React.Component {

    state = {
        displayX: 0,
        displayY: 0,
        dWidth: 200,
        dHeight: 133,
        selected: false
    }

    constructor(props) {
        super(props);
        this.eleRef = React.createRef();
        this.startPosition = {
            x: 0,
            y: 0
        }
        const { dWidth, dHeight } = this.state;
        this.startRect = {
            width: dWidth,
            height: dHeight
        }

        this.rectRange = {
            minWidth: dWidth * 0.5,
            minHeight: dHeight * 0.5
        }

    }


    render() {
        const { name, } = this.props;
        const { dWidth, dHeight, displayX, displayY, selected } = this.state;
        const eleStyle = {
            width: `${dWidth}px`,
            height: `${dHeight}px`,
            transform: `translate(${displayX}px,${displayY}px)`
        }
        return (
            <div className={`app-dragele ${selected ? 'app-dragele--selected' : ''}`}
                ref={this.eleRef} style={eleStyle}
                onClick={() => { this.handleClickSelected() }}
            >
                <ImgLoader className='app-dragele-view' alt="img" name={name} key={name} />
                <div className="app-dragele-tool"
                    onClick={e => { e.stopPropagation(); this.handleToolClick(e); return false; }}
                    onTouchStart={e => { e.stopPropagation(); this.handleToolTouchStart(e); }}
                    onTouchMove={e => this.handleToolTouchMove(e)}>
                    <div className="app-dragele-tool__close"></div>
                    <div className="app-dragele-tool__rotate"></div>
                    <div className="app-dragele-tool__stretch"></div>
                </div>
            </div >
        )
    }

    handleClickSelected() {
        this.setState({
            selected: !this.state.selected
        })
    }

    handleToolClick(e) {
        e.preventDefault();
        const { className } = e.target;
        if (className.indexOf('__close') >= 0) {
            this.processClose();
        }
        return false;
    }



    handleToolTouchStart(e) {
        console.log('start', e);
        const { clientX, clientY } = e.targetTouches[0];

        this.startPosition = {
            x: clientX,
            y: clientY
        }
        const { dWidth, dHeight } = this.state;
        this.startRect = {
            width: dWidth,
            height: dHeight
        }
        // const { className } = e.target;
        // if (className.indexOf('__rotate') >= 0) {
        //     this.processRotate();
        // } else if (className.indexOf('__stretch') >= 0) {
        //     this.processStretch(e);
        // }

    }

    handleToolTouchMove(e) {
        const { className } = e.target;
        if (className.indexOf('__rotate') >= 0) {
            this.processRotate();
        } else if (className.indexOf('__stretch') >= 0) {
            this.processStretch(e);
        }
    }

    getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
    processStretch(e) {
        e.persist()
        const { clientX: endX, clientY: endY } = e.targetTouches[0];
        const { x: startX, y: startY } = this.startPosition;
        const angle = this.getAngle(endX - startX, endY - startY);
        let stretch = null;
        if (angle > 0 && angle < 180) {
            stretch = '+';
        }

        if (angle > -180 && angle <= 0) {
            stretch = '-';
        }
        if (stretch) {
            let len = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
            len = stretch === '+' ? len : -len;
            const { width, height } = this.startRect;
            let _width = width + len * 0.8;
            let _height = height + len * 0.8;

            const { minHeight, minWidth } = this.rectRange;
            _width = _width < minWidth ? minWidth : _width;
            _height = _height < minHeight ? minHeight : _height;
            this.setState({
                dWidth: _width,
                dHeight: _height
            })
        }
    }

    processRotate() {

    }

    processClose() {

    }

    componentDidMount() {
        this.bindEvent();
    }

    checkCanMove(e) {
        const { className } = e.target;
        // 必须拖动的是img才能移动
        if (className.indexOf('app-dragele-view') >= 0) {
            // 选中才可以移动
            return this.state.selected;
        } else {
            return false;
        }

    }

    bindEvent() {
        let { current: ele } = this.eleRef;
        let initPosition = {
            x: 0,
            y: 0
        }
        const { parentNode: { offsetWidth: parentOffsetWidth, offsetHeight: parentOffsetHeight } } = ele;
        ele.addEventListener('touchstart', e => {
            if (!this.checkCanMove(e)) return;

            let rect = e.targetTouches[0];
            const { clientX, clientY } = rect;
            // 按下时记录初始坐标点,当前点击位置减去当前显示位置
            const { displayX, displayY } = this.state;
            initPosition = {
                x: clientX - displayX,
                y: clientY - displayY
            }
        });
        ele.addEventListener('touchmove', e => {
            if (!this.checkCanMove(e)) return;
            e.preventDefault();

            const { offsetWidth: eleOffsetWidth, offsetHeight: eleOffsetHeight } = ele;
            let rect = e.targetTouches[0];
            const { clientX, clientY } = rect;
            const { x: ix, y: iy } = initPosition;
            let moveX = clientX - ix;
            let moveY = clientY - iy;

            // 边界判断
            const minX = -(eleOffsetWidth * (1 / 2));
            const minY = -(eleOffsetHeight * (1 / 2));
            const maxX = moveX + (eleOffsetWidth * (1 / 2));
            const maxY = moveY + (eleOffsetHeight * (1 / 2));

            // 负数表示元素向左移出了视图,否则判断是否超出了最大视图
            if (moveX < 0) {
                moveX = moveX < minX ? minX : moveX;
            } else {
                moveX = maxX > parentOffsetWidth ? parentOffsetWidth + minX : moveX;
            }

            // 负数表示元素向下移出了视图
            if (moveY < 0) {
                moveY = moveY < minY ? minY : moveY;
            } else {
                moveY = maxY > parentOffsetHeight ? parentOffsetHeight + minY : moveY;
            }

            // 更新视图
            this.setState({
                displayX: moveX,
                displayY: moveY
            })
        });
    }
}


DragEle.propTypes = {
    name: PropTypes.string.isRequired,
    containerRect: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired
}