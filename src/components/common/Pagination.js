import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import { ThemeContext } from '../../App';

function Pagination(props) {
    const theme = React.useContext(ThemeContext);
    const maxPageNo = Math.ceil(props.totalRecords / props.pageSize);
    const handlePageNoClick = (event, page) => {
        event.preventDefault();
        props.onPageChange(page);
    }
    const handlePrevClick = (event) => {
        if (props.pageNo === 1)
            return
        event.preventDefault();
        props.onPageChange(props.pageNo - 1);
    }
    const handleNextClick = (event) => {
        if (props.pageNo === maxPageNo)
            return
        event.preventDefault();
        props.onPageChange(props.pageNo + 1);
    }
    if (!props.totalRecords || !props.pageSize)
        return null;
    return (
        <div className={`pagination-container ${theme}`}>
            <span className="pagination">
                <a href="#"
                    onClick={handlePrevClick}
                    className={props.pageNo === 1 ? "disabled" : ""}>&laquo;</a>
                {
                    [...Array(maxPageNo)].map((el, index) => (
                        <a href="#"
                            key={index + 1}
                            className={props.pageNo === index + 1 ? "active" : ""}
                            onClick={(e) => handlePageNoClick(e, index + 1)}
                        >{index + 1}</a>
                    ))
                }
                <a href="#"
                    onClick={handleNextClick}
                    className={props.pageNo === maxPageNo?"disabled":""}>&raquo;</a>
            </span>
        </div>
    )
}

Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageNo: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;