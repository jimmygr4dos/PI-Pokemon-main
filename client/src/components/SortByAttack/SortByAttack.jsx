import React from "react";
import { useDispatch } from "react-redux";
import { sortByAttack } from "../../redux/actions";
import "./SortByAttack.css";

function SortByAttack() {
  
    const dispatch = useDispatch();
    
    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(sortByAttack(e.target.value));
    }

    return (
        <>
            <select className="select" id="sortByAttack" key="sortByAttack" onChange={(e) => handleOrderByName(e)}>
                <option value="none">Sort by Attack</option>
                <option value="asc">Weak to Strong</option>
                <option value="desc">Strong to Weak</option>
            </select>
        </>
    );
}

export default React.memo(SortByAttack)