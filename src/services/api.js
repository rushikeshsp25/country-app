import axios from 'axios';
import config from '../config';

export function getAllCountriesData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(config.apiEndpoint + "/all?fields=name;alpha3Code;capital;region;population;flag")
                .then(result => {
                    resolve(result.data);
                }).catch(error => {
                    reject(error);
                })
        }, config.ui.apiDelay)
    })
}

export function getSingleCountryData(countryName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(config.apiEndpoint + `/alpha/${countryName}`)
                .then(result => {
                    resolve(result.data);
                }).catch(error => {
                    reject(error);
                })
        }, config.ui.apiDelay);
    })
}