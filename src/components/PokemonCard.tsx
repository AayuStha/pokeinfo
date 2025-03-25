import React from 'react'; 
import { useNavigate } from 'react-router-dom';  // Importing 'useNavigate' hook to navigate to different routes programmatically.
import { Pokemon } from '../types';  // Importing the 'Pokemon' interface from the types file to type the props.

interface PokemonCardProps {
  pokemon: Pokemon;  // Declaring the 'pokemon' prop, which will be passed into the component. It's typed using the 'Pokemon' interface.
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();  // Using 'useNavigate' to get the navigate function to navigate to other pages.

  // Function to determine the background color based on the Pokémon's type.
  const getTypeColor = (type: string): string => {
    // Mapping Pokémon types to corresponding background colors.
    const colors: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-orange-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-400',
      ice: 'bg-cyan-300',
      fighting: 'bg-indigo-700',
      poison: 'bg-purple-500',
      ground: 'bg-amber-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-lime-500',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dark: 'bg-gray-800',
      dragon: 'bg-violet-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    // Returning the color for the given type or a default color if type doesn't match.
    return colors[type] || 'bg-gray-400';  
  };

  return (
    // The outer div that represents the Pokémon card with hover effects and transition.
    <div 
      className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-white/20"
      // When the card is clicked, navigate to the specific Pokémon's detailed page using the Pokémon's id.
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      {/* Overlay gradient effect that becomes visible when hovering over the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="relative overflow-hidden rounded-xl mb-4 transform group-hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl" />
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}  
            alt={pokemon.name}  
            className="w-full h-48 object-contain relative z-10" 
            loading="lazy"
          />
        </div>
        
        <h2 className="text-xl font-bold capitalize mb-3 text-white group-hover:text-indigo-300 transition-colors">
          {pokemon.name} 
          <span className="text-indigo-300/70 ml-2">
            {pokemon.id.toString().padStart(3, '0')}  {/*// Displaying the Pokémon's ID, padded to always show 3 digits. */}
          </span>
        </h2>
        
        {/* Type tags displaying Pokémon types */}
        <div className="flex flex-wrap gap-2">
          {/* Mapping over the Pokémon's types to display each type as a colored tag */}
          {pokemon.types.map((type, index) => (
            <span
              key={index}  // Unique key for each type tag.
              className={`${getTypeColor(type.type.name)} px-3 py-1 rounded-full text-white text-sm capitalize shadow-lg shadow-indigo-900/20`}
              // Using the getTypeColor function to get the background color for the type.
            >
                {type.type.name}  {/* // Displaying the name of the Pokémon type (e.g., "fire", "water"). */}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;  // Exporting the PokemonCard component so it can be used in other parts of the application.