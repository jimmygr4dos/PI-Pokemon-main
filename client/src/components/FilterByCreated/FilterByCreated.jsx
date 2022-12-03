import React from "react";
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../../redux/actions";
import "./FilterByCreated.css";

function FilterByCreated() {
  
    const dispatch = useDispatch();
    
    const handleFilterByCreated = (e) => {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value));
    }

    return (
        <>
            <select className="select" id="filterByCreated" key="filterByCreated" onChange={(e) => handleFilterByCreated(e)}>
                <option value="none">Filter by Origin</option>
                <option value="ext">Existing</option>
                <option value="crt">Created</option>
            </select>
        </>
    );
}

export default React.memo(FilterByCreated)