import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterByTypes } from "../../redux/actions";
import "./FilterByType.css";

function FilterByType() {
  
    const dispatch = useDispatch();
    const typeFilter = useSelector((state) => state.types);
    
    useEffect(() => {
        dispatch(getTypes());
    }, []);
    
    //Alphabetic sorting
    if (typeFilter) {
        typeFilter.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    const handleTypeFilter = (e) => {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value));
    }

    return (
        <>
            <select className="select" id="types" key="types" onChange={(e) => handleTypeFilter(e)}>
                <option value="none">Filter by Type</option>
                <option value="all">All</option>
                {typeFilter && typeFilter.map((type) => 
                    (<option key={type.id} value={type.name}>{type.name}</option>
                ))}
            </select>
        </>
    );
}

export default React.memo(FilterByType)