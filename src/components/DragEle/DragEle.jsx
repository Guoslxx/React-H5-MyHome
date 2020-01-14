import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ImgLoader from '../ImgLoader/ImgLoader';

let onMove = 'mousemove';
let onDown = 'mousedown';
let onUp = 'moseUp'
let isMobile = 'ontouchmove' in document;
if (isMobile) {
    onMove = 'touchmove';
    onDown = 'touchstart';
    onMove = 'touchend';
}
// const onmove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
// const onmove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
export default class DragEle extends React.Component {

    constructor(props) {
        super(props);
        this.eleRef = React.createRef();

    }

    state = {
        displayX: 0,
        displayY: 0
    }

    render() {
        const { name, containerRect: { width, height } } = this.props;
        const { displayX, displayY } = this.state;
        const eleStyle = {
            transform: `translate(${displayX}px,${displayY}px)`
        }
        return (
            <div className='app-dragele' ref={this.eleRef} style={eleStyle} data-x={displayX} data-y={displayY}>
                <ImgLoader alt="img" name={name} key={name} />
            </div>
        )
    }
    componentDidMount() {
        this.bindEvent()
    }

    bindEvent() {
        const { current: ele } = this.eleRef;
        let initPosition = {
            x: 0,
            y: 0
        }
        const { parentNode: { offsetWidth: parentOffsetWidth, offsetHeight: parentOffsetHeight } } = ele;
        ele.addEventListener('touchstart', e => {
            let rect = e.targetTouches[0];
            const { displayX, displayY } = this.state;
            const { clientX, clientY } = rect;

            // 按下时记录初始坐标点,当前点击位置减去当前显示位置
            initPosition = {
                x: clientX - displayX,
                y: clientY - displayY
            }
        });
        ele.addEventListener('touchmove', e => {
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
        // ele.addEventListener('touchend', e => {
        //     // console.log('end', e)
        //     // let rect = e.targetTouches[0];
        //     // console.log('end', rect.clientX)
        // });
        // ele.addEventListener('touchmove', e => { this.handleMouseDown(e) });

    }

    isDraging = false

    displayX = 0

    displayY = 0

    handleMouseDown(e) {
        const { current: ele } = this.eleRef;
        console.log('down', e.clientX, e);


        // e.target.ontouchmove = function (moveEvent) {
        //     console.log('move');
        // }

        // e.target.ontouchend = function (endEvent) {
        //     console.log('end');
        // }

        // document.addEventListener(onMove, this.handleMouseMove.bind(this));
        // document.addEventListener(onUp, this.handleMouseUp.bind(this));
    }

    handleMouseMove(e) {
        console.log('move', e);
        this.isDraging = true;
    }

    handleMouseUp() {
        const { current: ele } = this.eleRef;
        if (this.isDraging === true) {
            this.isDraging = false;
        }
        document.removeEventListener(onMove, this.handleMouseMove.bind(this));
        document.removeEventListener(onUp, this.handleMouseUp.bind(this));
    }

}


DragEle.propTypes = {
    name: PropTypes.string.isRequired,
    containerRect: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired
}