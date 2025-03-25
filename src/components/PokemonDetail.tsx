import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'; 
import { Pokemon, PokemonSpecies } from '../types'; // Importing types for Pokemon and species

const PokemonDetail: React.FC = () => {
  // Destructure the 'id' parameter from the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Hook to handle navigation
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);  // State to store Pokemon details
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);  // State to store Pokemon species data
  const [loading, setLoading] = useState(true);  // Loading state to manage the fetching process

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);  // Fetching Pokemon data
        const data = await response.json();
        setPokemon(data);  // Set the fetched Pokemon data to state

        // Fetch species details using the URL provided by the Pokemon API
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);  // Set the fetched species data to state
      } catch (error) {
        console.error('Error fetching pokemon details:', error);  
      } finally {
        setLoading(false);  // Set loading to false after fetching is completed
      }
    };

    fetchPokemonDetails();
  }, [id]);  // Re-run the effect when 'id' changes

  // Return loading spinner while data is being fetched
  if (loading || !pokemon || !species) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Extract the English description of the Pokemon from the species data
  const description = species.flavor_text_entries
    .find(entry => entry.language.name === 'en')  // Find the English description
    ?.flavor_text.replace(/\f/g, ' ') || 'No description available.';  // Replace form feed characters and handle case where no description exists

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-800 to-purple-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-indigo-200 hover:text-indigo-400 mb-6 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Pokédex
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-78 bg-indigo-300">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default} 
              alt={pokemon.name}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 object-contain"
            />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}  // Navigate to previous Pokemon
                disabled={pokemon.id <= 1}  // Disable button if it's the first Pokemon
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <h1 className="text-4xl font-bold capitalize text-center text-gray-800">
                {pokemon.name}
                <span className="text-gray-500 ml-2">#{pokemon.id.toString().padStart(3, '0')}</span>
              </h1>

              <button
                onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)} 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6 italic">{description}</p>  {/* Display Pokemon's description */}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Stats</h2>
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm capitalize">{stat.stat.name}</span>
                      <span className="text-sm font-medium">{stat.base_stat}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}  // Display stats with dynamic progress bars
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="space-y-3">
                  <p>Height: {pokemon.height / 10}m</p>  {/* convert height from decimeters to meters */}
                  <p>Weight: {pokemon.weight / 10}kg</p>  {/* convert weight from hectograms to kilograms */}
                  <div>
                    <p className="mb-2">Abilities:</p>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.abilities.map((ability, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-300 rounded-full text-sm capitalize"
                        >
                          {ability.ability.name}  {/* display each ability of the Pokemon */}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;