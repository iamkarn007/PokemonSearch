import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { id, name, sprites, stats, types } = pokemon;

  return (
    <div className="pokemon-card">
      <h3 className="pokemon-name">{name}</h3>
      <img
        src={sprites.other.dream_world.front_default}
        alt={name}
        className="pokemon-image"
      />
      <div className="pokemon-details">
        <div className="stat">
          <span className="stat-label">CP:</span>{" "}
          {stats.find((stat) => stat.stat.name === "hp").base_stat}
        </div>
        <div className="stat">
          <span className="stat-label">Attack:</span>{" "}
          {stats.find((stat) => stat.stat.name === "attack").base_stat}
        </div>
        <div className="stat">
          <span className="stat-label">Defense:</span>{" "}
          {stats.find((stat) => stat.stat.name === "defense").base_stat}
        </div>
        <div className="stat">
          <span className="stat-label">Type:</span>{" "}
          {types.map((type) => type.type.name).join(", ")}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
