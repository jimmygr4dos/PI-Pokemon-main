import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card(props) {
  const { name, image, types, id } = props;
  // console.log('types[0]', types[0]);
  const styleType = types[0];
  // console.log('styleType: ', styleType);

  const cardStyle = 'cardPokemon';
  const topCardStyle = 'topCard';
  const typeStyle = 'type';

  return (
    <div className={`${cardStyle} ${styleType}`}>
      <div className={`${topCardStyle} ${topCardStyle}${styleType}`}>
        <div>{name}</div>
        <div className="typeContainer">
            {types.map(type => (
              <div key={type} className={`${typeStyle} ${typeStyle}${type}`}>
                {type}
              </div>
            ))}
        </div>
        <img className="photo" src={image} alt={image} width="200px" height="250px"></img>
      </div>
      <div className="bottomCard">
        <Link to={`pokemons/${id}`} className="link">
          <div className="moreinfo">
              More info
          </div>
        </Link>
      </div>
    </div>
  );
}

