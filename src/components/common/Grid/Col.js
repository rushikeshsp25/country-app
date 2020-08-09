import React from 'react';
import './Col.css';
function Col(props) {
    return (
        <div className={`col-${props.type?props.type+"-":""}${props.span} ${props.className||""}`}>
            {props.children}
        </div>
    );
}

export default Col;