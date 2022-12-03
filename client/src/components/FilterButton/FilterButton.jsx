import React from "react";
import { useDispatch } from "react-redux";
import { apllyFilters } from "../../redux/actions";
import "./FilterButton.css";

function FilterButton({setCurrentPage, currentPage}) {
  
    const dispatch = useDispatch();
    
    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(apllyFilters(e.target.value));
        setCurrentPage(1);
    }

    return (
        <>
            <button key='filterButton' id='filterButton' onClick={(e) => handleFilter(e)}>
                Filter
            </button>
        </>
    );
}

export default React.memo(FilterButton)