import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ImgLoader from '../ImgLoader/ImgLoader';


export default function DragEle(props) {
    const { name, containerReact: { width, height } } = props;
    console.log(width, height)
    return (
        <div className='app-dragele-panel'>
            {getDragEleList(name)}
        </div>
    )
}

function getDragEleList(name) {
    return (
        <div className='app-dragele'>
            {name.map(e => (<ImgLoader name={e} key={e} />))}
        </div>
    )
}

DragEle.propTypes = {
    name: PropTypes.arrayOf(PropTypes.string).isRequired,
    containerReact: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired
}