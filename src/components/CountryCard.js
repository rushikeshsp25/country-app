import React from 'react';
import { Link } from "react-router-dom";
import './CountryCard.css';
import { ThemeContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCity } from '@fortawesome/free-solid-svg-icons';
function CountryCard(props) {
    const theme = React.useContext(ThemeContext);
    return (
        <>
            {
                props.country ?
                    <Link to={`/country/${props.country.alpha3Code}`}>
                        <div className={`card ${theme}`}>
                            <div className="card-image" style={{ backgroundImage: `url(${props.country.flag})` }}>
                            </div>
                            <div className="card-description">
                                <p className="sub-heading no-text-overflow">{props.country.name}</p>
                                <div>
                                    <span className="capital no-text-overflow">
                                        <FontAwesomeIcon className="info-text" icon={faCity} />
                                        <span className="info-text" style={{ marginLeft: "5px" }}>{props.country.capital}</span>
                                    </span>
                                    <span className="population no-text-overflow">
                                        <FontAwesomeIcon className="info-text" icon={faUsers} />
                                        <span className="info-text" style={{ marginLeft: "5px" }}>{props.country.population}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    :
                    null
            }
        </>
    );
}

export default CountryCard;