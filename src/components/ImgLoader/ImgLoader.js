import React from 'react';
import PropTypes from 'prop-types';
import source from './source.json';
const imgSource = source.filter(e => e.type == 'image');

const AppMaterialMap = new Map();
export const loadImg = (cb) => {
    const list = [];
    const loadedList = [];
    const status = {
        success: 0,
        error: 0,
        errorList: []
    }
    imgSource.forEach(rce => {
        const name = rce.url.split('/').slice(-1);
        if (rce.type == 'image') {
            list.push(new Promise((resolve) => {
                const img = new Image();
                const obj = {};
                img.onload = (e) => {
                    obj.isLoad = true;
                    obj.imgSrc = img.src;
                    obj.name = name[0];
                    loadedList.push(obj);
                    status.success = status.success + 1;
                    const loading = Math.floor(loadedList.length / imgSource.length * 100);
                    cb && cb({ loading });
                    resolve(obj);
                }
                img.onerror = (e) => {
                    obj.isLoad = false;
                    obj.name = name[0];
                    status.error = status.error + 1;
                    status.errorList.push(obj);
                    loadedList.push(obj);
                    const loading = Math.floor(loadedList.length / imgSource.length * 100);
                    cb && cb({ loading });
                    resolve(obj);
                }
                img.src = `material/${name[0]}`;
            }))
        }
    })
    return Promise.all(list)
        .then(res => {
            res.forEach(material => {
                if (material.isLoad) {
                    AppMaterialMap.set(material.name, material.imgSrc);
                }
            })
        })
}

export const getImg = name => AppMaterialMap.get(name);

const ImgLoader = props => {
    const { name, ...restProps } = props;
    const isHas = AppMaterialMap.has(name);
    if (isHas) {
        const imgSrc = AppMaterialMap.get(name);
        return (<img className='app-img-loader' {...restProps} src={imgSrc} />)
    } else {
        console.warn('material not found:', name);
        return '';
    }
}

export default ImgLoader;