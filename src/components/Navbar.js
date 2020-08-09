import React from 'react';
import logoLight from '../images/logo-light.png';
import logoDark from '../images/logo-dark.png';
import ThemeToggle from './common/ThemeToggle';
import { ThemeContext } from '../App';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(props) {
    const theme = React.useContext(ThemeContext);
    return (
        <nav className={`topnav ${theme}`}>
            <Link to="/">
                <img className={"logo"} src={theme === "light" ? logoLight : logoDark} alt={"World"}></img>
            </Link>
            <ThemeToggle isChecked={theme === "light" ? false : true} onThemeToggle={props.onThemeToggle}></ThemeToggle>
        </nav>
    );
}

export default Navbar;