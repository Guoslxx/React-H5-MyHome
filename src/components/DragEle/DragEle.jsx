import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ImgLoader from '../ImgLoader/ImgLoader';

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
        const { name, } = this.props;
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
            e.preventDefault();

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