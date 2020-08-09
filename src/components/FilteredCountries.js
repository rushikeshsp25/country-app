import React from 'react';
import Row from './common/Grid/Row';
import Col from './common/Grid/Col';
import CountryCard from './CountryCard';
import './FilteredCountries.css';

function FilteredCountries(props) {
    return (
        <div className="filtered-countries">
            {
                props.countries ?
                    <Row>
                        {
                            props.countries.map(country => (
                                <Col key={`county-${country.name}`} span={2}>
                                    <CountryCard country={country}></CountryCard>
                                </Col>
                            ))
                        }
                    </Row>
                    : <p style={{textAlign:"center"}} className="info-text">No Countries Are Found!</p>
            }
        </div>
    );
}

export default FilteredCountries;