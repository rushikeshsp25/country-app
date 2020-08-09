import React from 'react';
import './Filters.css';

function getSearchMatchingSuggestions(searchArr, searchValue) {
    if (!searchValue || !searchArr)
        return null;
    let suggestions = searchArr.filter(country => {
        return country.match(new RegExp(searchValue, 'i'));
    })
    return suggestions.slice(0, 5);
}

function SearchBox(props) {
    const [searchValue, setSearchValue] = React.useState(props.initialCountry || "")
    const [searchSuggestions, setSearchSuggestions] = React.useState(null);

    function handelSearchClick(event) {
        event.preventDefault();
        if (typeof props.onCountrySearch === "function")
            props.onCountrySearch(searchValue);
    }

    let handleValueChange = (val) => {
        setSearchValue(val);
        if (!val) {
            setSearchSuggestions(null);
        }
        let suggestions = getSearchMatchingSuggestions(props.countries, val);
        if (suggestions) {
            setSearchSuggestions(suggestions);
        }
    };

    let handleSuggestionClick = (value) => {
        setSearchValue(value);
        setSearchSuggestions(null);
    }
    // let handleOnBlur = () => {
    //     // setSearchSuggestions(null);
    // }

    return (
        <div className="search-container">
            <div className="search">
                <form className="search-form">
                    <input type="text" placeholder="Search For Countries.."
                        value={searchValue}
                        onChange={(event) => handleValueChange(event.target.value)}
                    />
                    <input type="submit" value="Search" onClick={handelSearchClick} />
                </form>
            </div>
            <div className="search-suggestions">
                {
                    searchSuggestions ?
                        <ul>
                            {
                                searchSuggestions.map((suggestion, index) => (
                                    <li key={`suggestion-${index}`}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >{suggestion}</li>
                                ))
                            }
                        </ul>
                        : null
                }
            </div>
        </div>
    );
}

export default SearchBox;