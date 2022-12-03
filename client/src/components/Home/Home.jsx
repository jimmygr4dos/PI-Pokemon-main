import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions/index";
// import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import CardsContainer from "../CardsContainer/CardsContainer";
import Pagination from "../Pagination/Pagination";
import "./Home.css";
// import FilterByType from "../FilterByType/FilterByType";
// import SortByName from "../SortByName/SortByName";
// import SortByAttack from "../SortByAttack/SortByAttack";
// import FilterButton from "../FilterButton/FilterButton";
// import FilterByCreated from "../FilterByCreated/FilterByCreated";
import CreatePokemonButton from "../CreatePokemonButton/CreatePokemonButton";
import FilterBar from "../FilterBar/FilterBar";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);

  //Pagination constants
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, ] = useState(12);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = pokemons.slice(firstPostIndex, lastPostIndex);

  //Load Pokemons
  useEffect(() => {
    dispatch(getPokemons())
  }, []);

  return (
      <div className="home">
        <div className="home-filters">
          <div>
            {/* <FilterByType />
            <SortByName />
            <SortByAttack />
            <FilterByCreated />
            <FilterButton setCurrentPage={setCurrentPage}
                        currentPage={currentPage} /> */}
            
            {(Array.isArray(pokemons) && pokemons.length > 0) &&
              <FilterBar setCurrentPage={setCurrentPage}
                        currentPage={currentPage} />
            }
          </div>
          <div>
            {(Array.isArray(pokemons) && pokemons.length > 0) &&
              <CreatePokemonButton />
            }
          </div>
        </div>
          <div>
            {(Array.isArray(pokemons) && pokemons.length > 0) &&
              <SearchBar />
            }
          </div>

          {
          (Array.isArray(pokemons) && pokemons.length > 0) &&
          <Pagination totalPosts={pokemons.length} postsPerPage={postsPerPage} 
                      setCurrentPage={setCurrentPage} currentPage={currentPage} />
          }

          <div className="cards">
            {Array.isArray(currentPosts) && currentPosts.length > 0 ?
              <CardsContainer pokemons={currentPosts} />
            :
            <CardsContainer pokemons={pokemons} loading={loading} />
            }
          </div>

      </div>
  );
}