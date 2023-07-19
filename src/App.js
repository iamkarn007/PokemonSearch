import React, { useState, useEffect } from 'react';
import './PokemonSearchApp.css';
import SearchBar from './SearchBar';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
import pokemonLogo from './pokemonlogo.png'; // Import the PNG image

const PokemonSearchApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();
    setTotalPages(Math.ceil(data.count / 10));
    const allPokemons = await fetchAllPokemonDetails(data.results);
    setPokemons(allPokemons);
  };

  const fetchAllPokemonDetails = async (pokemonList) => {
    const promises = pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    });
    const results = await Promise.all(promises);
    return results;
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * 10;
  const displayedPokemons = filteredPokemons.slice(startIndex, startIndex + 10);

  return (
    <div className="container">
      <div className="heading-container">
        <h1 className="heading">Pokemon Search App</h1>
      </div>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="pokemon-list">
        {displayedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default PokemonSearchApp;
