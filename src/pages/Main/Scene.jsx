import React from 'react';
import './style.less';
import StagePanel from './StagePanel';
import FooterBar from './FooterBar'


const Scene = () => {

    return (
        <div className='main-scene'>
            <StagePanel />
            <FooterBar />
        </div>
    )
}

export default Scene;