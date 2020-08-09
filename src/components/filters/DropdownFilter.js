import React from 'react';

function DropdownFilter(props) {
    let handleRegionChange = (event) => {
        event.persist();
        let region = event.target.value !== "All Regions" ? event.target.value : null
        props.onRegionChange(region);
    }
    return (
        <label className="region-select">
            <select value={props.initialRegion||""} onChange={handleRegionChange}>
                <option value={""}>All Regions</option>
                {
                    props.regions && props.regions.map((region, index) => (
                        <option key={`region-${index}`} value={region}>{region}</option>
                    ))
                }
            </select>
        </label>
    );
}

export default DropdownFilter;