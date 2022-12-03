import React from "react";
import { Link } from "react-router-dom";
import pikachu from "../../img/pikachu.png";
import icon from "../../img/pokemon-icon.png";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="lDivPrincipal">
      <div className="lDivSecundario">
        <div className="lDivLeft">
          <img src={icon} alt={icon} />
          <p>Henry Pokemon</p>
          <p>Single Page Application</p>
          <p className="label">Developed by</p>
          <p className="label">Jimmy Grados Ramírez</p> 
          <Link to="/home">
            <button>Gotta catch 'em all!</button>
          </Link>
        </div>
        <div className="lDivRight">
          <img src={pikachu} alt={pikachu} />
        </div>
      </div>
    </div>
  );
}