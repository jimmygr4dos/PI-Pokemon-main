import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPokemon } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux";
// import imgDefault from "../../img/wtpokemon.jpg"
import "./CreatePage.css";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required!";
    }
    else if (!input.hp) {
        errors.hp = "HP is required!";
    }
    else {

    }
    return errors;
}


function CreatePage() {
    
    const dispatch = useDispatch();
    
    const types = useSelector((state) => state.types);
//   const history = useHistory();
  
    const [input, setInput] = useState({
      name: "", hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, image: "", types: []
    });

    const [errors, setErrors] = useState({});

    function handleInputChange(e) {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}));
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    }

    function handleSelect(e) {
        if (!input.types.includes(e.target.value)) {
            setInput({...input, types: [...input.types, e.target.value]});
        }
    }
    
    function handleDelete(e) {
        setInput({...input, types: input.types.filter((types) => types !== e)});
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log('input: ', input);
        dispatch(createPokemon(input));
        // setInput({...input, success: true});
        alert("The Pokemon was successfully created!");
        setInput({name: "", hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, image: "", types: []});
        // history.push("/home");
    }

    return (
        <div className="cpForm">
            <Link to="/home">
                <button className="cpButton">Back</button>{" "}
            </Link>
            
            {/* onSubmit={(e) => handleSubmit(e)} */}
            <div className="cpGrid" >

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        <label className="required">Name:</label>
                    </div>
                    <div>
                        <input type="text" value={input.name} name="name" onChange={(e) => handleInputChange(e)} />
                        {errors.name && (<span className="cpInputRequired">&emsp;{errors.name}</span>)}
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        <label className="required">HP:</label>
                    </div>
                    <div>
                        <input type="number" value={input.hp} name="hp" onChange={(e) => handleInputChange(e)} />
                        {errors.hp && (<span className="cpInputRequired">&emsp;{errors.hp}</span>)}
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        Attack:
                    </div>
                    <div>
                        <input type="number" value={input.attack} name="attack" onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        Defense:
                    </div>
                    <div>
                        <input type="number" value={input.defense} name="defense" onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        Speed:
                    </div>
                    <div>
                        <input type="number" value={input.speed} name="speed" onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        Height:
                    </div>
                    <div>
                        <input type="number" value={input.height} name="height" onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        Weight:
                    </div>
                    <div>
                        <input type="number" value={input.weight} name="weight" onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        Image:
                    </div>
                    <div>
                        <input type="text" value={input.image} name="image" onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>

                <div className="cpGridRow">
                    <div className="cpGridLabel">
                        Types:
                    </div>
                    <div>
                        <select onChange={(e) => handleSelect(e)}>
                            {types.map((type) => (
                                <option key={type.id} value={type.name}> {type.name} </option>
                            ))}
                        </select>
                    </div>

                </div>
                {input.types.length > 0 && 
                    <div className="cpGridLabelSelected">
                            Selected types:
                    </div>
                }
                <div className="cpGridTypes">
                    {input.types.map((el) => (
                        <li key={el}>
                            <span>{el}</span> <button className="cpButtonDelete" onClick={(e) => handleDelete(e)}>x</button>&emsp;
                        </li>
                    ))}
                </div>

                <button className="cpButton" disabled={!input.name || !input.hp} onClick={(e) => handleSubmit(e)}>
                    Create Pokemon
                </button>

            </div>
        </div>
    );
}

export default React.memo(CreatePage);
