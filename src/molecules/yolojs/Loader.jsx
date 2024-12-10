import React from 'react';
import './Loader.scss';

const Loader = (props) => {
    return (
        <div className="yolo-loader wrapper" {...props}>
            <div className="spinner"></div>
            <p>{props.children}</p>
        </div>
    );
};

export default Loader;