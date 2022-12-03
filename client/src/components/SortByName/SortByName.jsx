import React from "react";
import { useDispatch } from "react-redux";
import { sortByNames } from "../../redux/actions";
import "./SortByName.css";

function SortByName() {
  
    const dispatch = useDispatch();
    
    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(sortByNames(e.target.value));
    }

    return (
        <>
            <select className="select" id="sortByName" key="sortByName" onChange={(e) => handleOrderByName(e)}>
                <option value="none">Sort by Name</option>
                <option value="asc">Ascendant</option>
                <option value="desc">Descendant</option>
            </select>
        </>
    );
}

export default React.memo(SortByName)