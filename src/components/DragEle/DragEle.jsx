import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ImgLoader from '../ImgLoader/ImgLoader';


export default function DragEle(props) {
    const { name, containerRect: { width, height } } = props;
    console.log(width, height);
    return (
        <div className='app-dragele'>
            <ImgLoader name={name} key={name} />
        </div>
    )
}


DragEle.propTypes = {
    name: PropTypes.string.isRequired,
    containerRect: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired
}