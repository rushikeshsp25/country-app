import React from 'react';
import './ThemeToggle.css';
import { ThemeContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

function ThemeToggle(props) {
    const theme = React.useContext(ThemeContext);

    let handleThemeToggle = () => {
        if (typeof props.onThemeToggle === "function")
            props.onThemeToggle()
    }
    return (
        <span>
            <span className={`sun-icon ${theme}`} style={{marginRight:"5px", fontSize:"22px"}}><FontAwesomeIcon icon={faMoon} /></span>
            <label className={`switch ${theme}`}>
                <input type="checkbox" checked={props.isChecked} onChange={handleThemeToggle} />
                <span className={`slider ${theme}`} />
            </label>
        </span>
    )
}
export default ThemeToggle;