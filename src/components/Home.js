import React from 'react';
import config from '../config';
import FilterMenu from './filters'
import FilteredCountries from './FilteredCountries';
import {
    getAllRegionNames,
    getAllCountryNames,
    getPaginatedFilteredCountries,
    getFilteredCountries
} from '../helper/coutryResultProcessing';
import { getAllCountriesData } from '../services/api';
import Loader from './common/Loader';
import Pagination from './common/Pagination';

let getInitialState = () => {
    const oldFilters = JSON.parse(localStorage.getItem("filters"));
    const oldPaginationOptions = JSON.parse(localStorage.getItem("paginationOptions"));
    return {
        filters: {
            country: oldFilters && "country" in oldFilters ? oldFilters.country : null,
            region: oldFilters && "region" in oldFilters ? oldFilters.region : null
        },
        pagination: {
            totalRecords: oldPaginationOptions && "totalRecords" in oldPaginationOptions ? oldPaginationOptions.totalRecords : config.ui.defaultTotalRecords,
            pageNo: oldPaginationOptions && "pageNo" in oldPaginationOptions ? oldPaginationOptions.pageNo : 1,
            pageSize: oldPaginationOptions && "pageSize" in oldPaginationOptions ? oldPaginationOptions.pageSize : config.ui.defaultPageSize
        }
    }
}

function Home() {
    const didMountRef = React.useRef(false);
    const [allCountries, setAllCountries] = React.useState(null);
    const [filteredCountries, setFilteredCountries] = React.useState(null);
    const [filters, setFilters] = React.useState(getInitialState().filters)
    const [pagination, setPageNo] = React.useState(getInitialState().pagination);

    React.useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem("filters", JSON.stringify(filters));
            localStorage.setItem("paginationOptions", JSON.stringify(pagination));
        } else didMountRef.current = true
    }, [filters, pagination]);

    React.useEffect(() => {
        try {
            (async () => {
                let countries = await getAllCountriesData();
                setAllCountries(countries);
                if (filters && (filters.country || filters.region)) {
                    let filterRes = getFilteredCountries(countries, filters)
                    setFilteredCountries(filterRes);
                    setPageNo(pagination => ({ ...pagination, totalRecords: filterRes ? filterRes.length : 0 }))
                } else {
                    setFilteredCountries(countries);
                    setPageNo(pagination => ({ ...pagination, totalRecords: countries.length }))
                }
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleCountrySearch = (countryName) => {
        setFilters((filters) => ({ ...filters, country: countryName }));
        let result = getFilteredCountries(allCountries, { ...filters, country: countryName });
        setPageNo(pagination => ({ ...pagination, pageNo: 1, totalRecords: result ? result.length : 0 }))
        setFilteredCountries(result);
    }

    const handleRegionChange = (regionName) => {
        setFilters((filters) => ({ ...filters, region: regionName }));
        let result = getFilteredCountries(allCountries, { ...filters, region: regionName });
        setPageNo(pagination => ({ ...pagination, pageNo: 1, totalRecords: result ? result.length : 0 }))
        setFilteredCountries(result);
    }

    const handlePageChange = (pageNo) => {
        setPageNo(pagination => ({ ...pagination, pageNo: pageNo }))
    }

    return (
        <>
            {
                allCountries ?
                    <>
                        <FilterMenu
                            initialCountry={filters.country}
                            initialRegion={filters.region}
                            countries={getAllCountryNames(allCountries)}
                            onCountrySearch={handleCountrySearch}
                            regions={getAllRegionNames(allCountries)}
                            onRegionChange={handleRegionChange}
                        >
                        </FilterMenu>
                        <Pagination
                            totalRecords={100}
                            {...pagination}
                            onPageChange={handlePageChange}
                        >
                        </Pagination>
                        <FilteredCountries
                            countries={getPaginatedFilteredCountries(filteredCountries, pagination.pageNo, pagination.pageSize)}
                        >
                        </FilteredCountries>
                    </>
                    : <Loader message={"Fetching Countries"} />
            }
        </>
    );
}

export default Home;