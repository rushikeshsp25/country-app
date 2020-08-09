export function getAllRegionNames(allCountries) {
    if (!allCountries)
        return null;
    let nameOfAllRegions = new Set();
    allCountries.forEach(country => {
        if (country.region)
            nameOfAllRegions.add(country.region);
    });
    return [...nameOfAllRegions];
}

export function getAllCountryNames(allCountries) {
    if (!allCountries)
        return null;
    let nameOfAllCountries = new Set();
    allCountries.forEach(country => {
        if (country.name)
            nameOfAllCountries.add(country.name);
    });
    return [...nameOfAllCountries];
}

export function getAlpha3ToCtrNameMapping(allCountries) {
    if (!allCountries)
        return null;
    let mapping = {}
    allCountries.forEach(country => {
        mapping[country.alpha3Code] = country.name
    });
    return mapping;
}

export function getPaginatedFilteredCountries(filteredCountries, pageNo, pageSize) {
    if (!filteredCountries)
        return null;
    return filteredCountries.slice((pageNo - 1) * pageSize, pageNo * pageSize);
}

export function getFilteredCountries(allCountries, filters) {
    if (!allCountries)
        return null;
    let result = allCountries.filter(country => {
        if (filters.country && country.name === filters.country) {
            if (!filters.region || (filters.region && country.region === filters.region)) {
                return true;
            }
        } else if (!filters.country
            && (!filters.region || (filters.region && country.region === filters.region))) {
            return true;
        }
        return false;
    });
    return result.length > 0 ? result : null;
}