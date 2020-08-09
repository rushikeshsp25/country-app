import React from 'react';
import Row from '../common/Grid/Row';
import Col from '../common/Grid/Col';
import DropdownFilter from './DropdownFilter';
import SearchBox from './SearchBox';
import { ThemeContext } from '../../App';
import './Filters.css';

function FilterMenu(props) {
    const theme = React.useContext(ThemeContext);
    return (
        <div className={`filter-menu ${theme}`}>
            <Row>
                <Col span={6} type="lg">
                    <SearchBox
                        onCountrySearch={props.onCountrySearch}
                        countries={props.countries}
                        initialCountry={props.initialCountry}
                    >
                    </SearchBox>
                </Col>
                <Col span={6} type="lg">
                    <DropdownFilter
                        onRegionChange={props.onRegionChange}
                        regions={props.regions}
                        initialRegion={props.initialRegion}
                    >
                    </DropdownFilter>
                </Col>
            </Row>
        </div>
    );
}

export default FilterMenu;