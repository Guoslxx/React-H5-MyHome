import React from 'react';
import EleSelector from '../../components/EleSelector/EleSelector';
function handleChange(props, payload) {
    const { onChange } = props;
    onChange && onChange(payload);
}

export default function FooterBar(props) {
    return (<EleSelector onChange={payload => { handleChange(props, payload) }} />)
}