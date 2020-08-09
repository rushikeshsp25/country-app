import React from 'react';
import { getSingleCountryData } from '../services/api';
import Loader from './common/Loader';
import './CountryDetailCard.css';
import { ThemeContext } from '../App';
import Row from './common/Grid/Row';
import Col from './common/Grid/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CountryDetails(props) {
    const theme = React.useContext(ThemeContext);
    const [countryData, setCountryData] = React.useState();
    React.useEffect(() => {
        setCountryData(null);
        try {
            (async () => {
                let country = await getSingleCountryData(props.match.params.name);
                setCountryData(country);
            })();
        } catch (error) {
            console.log(error);
        }
    }, [props.match.params.name])

    return <div>
        {
            countryData ?
                <div className={`country-detail-card ${theme}`}>
                    <div className="heading" style={{textAlign:"center",padding:"20px",marginBottom:"20px",borderBottom:"1px solid #d5d5d5"}}>COUNTRY DETAILS</div>
                    <Row>
                        <Col span={6} type={"lg"}>
                            <img width="100%" src={countryData.flag} alt={"Country Flag"}></img>
                        </Col>
                        <Col span={6} type={"lg"}>
                            <p className="heading">{countryData.name}{countryData.name !== countryData.nativeName ? " | " + countryData.nativeName : null}</p>
                            <p className="sub-heading">
                                <FontAwesomeIcon icon={faCity} />
                                <span style={{ marginLeft: "10px" }}>{countryData.capital}</span>
                            </p>
                            <div className="country-info-table-conatainer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><b>Region</b></td>
                                            <td>{countryData.region} - {countryData.subregion}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Area</b></td>
                                            <td>{countryData.area} km²</td>
                                        </tr>
                                        <tr>
                                            <td><b>Population</b></td>
                                            <td>{countryData.population.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Timezones</b></td>
                                            <td>{countryData.timezones.join(', ')}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Languages</b></td>
                                            <td>{countryData.languages.map(lang => lang.name).join(', ')}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Currencies</b></td>
                                            <td>{countryData.currencies.map(currency => currency.symbol + " - " + currency.name).join(', ')}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Baorder Shared With</b></td>
                                            <td>
                                                {
                                                    countryData.borders.map((country, index) => (
                                                        <span key={`outer-span-${index}`}>
                                                            <Link key={`link-${index}`} to={`/country/${country}`}>{country}</Link>
                                                            {
                                                                index !== countryData.borders.length - 1 ?
                                                                    <span key={`span-${index}`} style={{ marginRight: "6px" }}>,</span>
                                                                    : null
                                                            }
                                                        </span>
                                                    ))
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </div>
                : <Loader message={"Breathe In, Breathe Out :D"} />
        }
    </div>
}
export default CountryDetails;