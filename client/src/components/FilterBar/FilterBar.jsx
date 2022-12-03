import React from "react";
import { useDispatch } from "react-redux";
// import { apllyFilters } from "../../redux/actions";
import "./FilterBar.css";
import FilterByType from "../FilterByType/FilterByType";
import SortByName from "../SortByName/SortByName";
import SortByAttack from "../SortByAttack/SortByAttack";
import FilterButton from "../FilterButton/FilterButton";
import FilterByCreated from "../FilterByCreated/FilterByCreated";


function FilterBar({setCurrentPage, currentPage}) {
  
    // const dispatch = useDispatch();
    
    // const handleFilter = (e) => {
    //     e.preventDefault();
    //     dispatch(apllyFilters(e.target.value));
    //     setCurrentPage(1);
    // }

    return (
        <>
            <FilterByType />
            <SortByName />
            <SortByAttack />
            <FilterByCreated />
            <FilterButton setCurrentPage={setCurrentPage}
                        currentPage={currentPage} />
        </>
    );
}

export default React.memo(FilterBar)