import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ImgLoader from '../ImgLoader/ImgLoader';

const onmove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
export default class DragEle extends React.Component {

    constructor(props) {
        super(props);
        this.eleRef = React.createRef();
    }

    render() {
        const { name, containerRect: { width, height } } = this.props;
        console.log(width, height);
        const eleStyle = {

        }
        return (
            <div className='app-dragele' ref={this.eleRef}>
                <ImgLoader alt="img" style={eleStyle} name={name} key={name} />
            </div>
        )
    }
    componentDidMount() {
        this.bindEvent()
    }

    bindEvent() {
        console.log(onmove)
        const { current: ele } = this.eleRef;
        ele.addEventListener('mousedown', e => { this.handleMouseDown(e) });
        // ele.addEventListener('mouseup', function () {
        //     console.log('mouseup');
        // });
    }

    isDraging = false
    
    displayX = 0

    displayY = 0

    handleMouseDown() {
        const { current: ele } = this.eleRef;
        ele.addEventListener(onmove, e => { this.handleMouseMove(e) });
        ele.addEventListener('mouseup', e => { this.handleMouseUp(e) });
    }

    handleMouseMove() {
        console.log(this.isDraging)
        this.isDraging = true;
    }

    handleMouseUp() {
        const { current: ele } = this.eleRef;
        if (this.isDraging === true) {
            this.isDraging = false;
        }
        ele.removeEventListener(onmove, e => { this.handleMouseMove(e) });
    }

}


DragEle.propTypes = {
    name: PropTypes.string.isRequired,
    containerRect: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired
}