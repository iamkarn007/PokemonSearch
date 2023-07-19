import React, { useState, useEffect } from 'react';
import './PokemonSearchApp.css';
import SearchBar from './SearchBar';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';

const PokemonSearchApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      const data = await response.json();
      const totalPages = Math.min(100, Math.ceil(data.count / 10)); // Limit to 100 pages
      setTotalPages(totalPages);
      const allPokemons = await fetchAllPokemonDetails(data.results.slice(0, totalPages * 10));
      setPokemons(allPokemons);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      // Handle the error or display an error message to the user
    }
  };

  const fetchAllPokemonDetails = async (pokemonList) => {
    try {
      const promises = pokemonList.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon details');
        }
        return response.json();
      });
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      // Handle the error or display an error message to the user
      return [];
    }
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

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * 10;
  const displayedPokemons = filteredPokemons.slice(startIndex, startIndex + 10);

  return (
    <div className="container">
      <h1 className="heading">Pokemon Search App</h1>
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
        onPageClick={handlePageClick}
      />
    </div>
  );
};

export default PokemonSearchApp;
