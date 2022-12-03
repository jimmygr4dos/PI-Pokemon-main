import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { useEffect } from "react";
import "./Detail.css";

export default function Detail({match}) {
    const dispatch = useDispatch();
    // const history = useHistory();
        
    const pokemonDetail = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getPokemonById(match.params.id));
    }, []);
    

    let styleType = "background-color: white;"
    if (pokemonDetail.types) {
        styleType = pokemonDetail.types[0] + 'Detail';
    }

    return (
        <div className={styleType}>

            <div className="detail-main">

                <Link to="/home">
                <button key='detail-button'>Back</button>
                {/* <button key='detail-button' onClick={() => {history.goBack()}}>Back</button> */}
                </Link>

                <div className="detail-id">
                    <span key={pokemonDetail.id}>{('#' + ('000' + pokemonDetail.id).substr(-3))}</span>
                </div>

                <div className="detail-header">
                    <div className="detail-header-left">
                        <div>
                            <div className="detail-types">
                                {pokemonDetail.types && pokemonDetail.types.map(type => (
                                <div key={type}>{type}&nbsp;&nbsp;&nbsp;</div>
                                ))}
                            </div>
                            <div className="detail-name" key={pokemonDetail.name}>{pokemonDetail.name}</div>
                        </div>
                        <div className="detail-height-weight">
                            <div key={'height' + pokemonDetail.height}>Height: {pokemonDetail.height/10} m</div>
                            <div key="detail-height-weight-blank" className="detail-height-weight-blank">&nbsp;</div>
                            <div key={'weight' + pokemonDetail.weight}>Weight: {pokemonDetail.weight/10} kg</div>
                        </div>
                    </div>
                    <div className="detail-header-right">
                        <img className="detail-img" key={pokemonDetail.image} src={pokemonDetail.image} alt={pokemonDetail.image}/>
                    </div>
                </div>

                <div className="stats-content">
                    <div className="stats-left">
                        Stats
                    </div>

                    <div className="stats-right">
                        <div className="stats">
                                <div className="stats-col-1">HP:</div> 
                                <div className="stats-bars-head">
                                    <div className="stats-bars" style={{width: pokemonDetail.hp + 'px'}}></div>
                                </div>
                                <div className="stats-col-3">{pokemonDetail.hp}</div>
                        </div>
                        <div className="stats">
                                <div className="stats-col-1">Attack:</div> 
                                <div className="stats-bars-head">
                                    <div className="stats-bars" style={{width: pokemonDetail.attack + 'px'}}></div>
                                </div>
                                <div className="stats-col-3">{pokemonDetail.attack}</div>
                        </div>
                        <div className="stats">
                            <div className="stats-col-1">Defense:</div> 
                            <div className="stats-bars-head">
                                <div className="stats-bars" style={{width: pokemonDetail.defense + 'px'}}></div>
                            </div>
                            <div className="stats-col-3">{pokemonDetail.defense}</div>
                        </div>
                        <div className="stats">
                            <div className="stats-col-1">Speed:</div> 
                            <div className="stats-bars-head">
                                <div className="stats-bars" style={{width: pokemonDetail.speed + 'px'}}></div>
                            </div>
                            <div className="stats-col-3">{pokemonDetail.speed}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}