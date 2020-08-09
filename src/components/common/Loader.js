import React from 'react';
import rotatingGlobe from '../../images/rotating-globe-light.gif';

function Loader(props) {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img className="globe" src={rotatingGlobe} alt="Loader..."></img>
            <p style={{ color: "gray" }}>{props.message}</p>
        </div>
    )
}

export default Loader;