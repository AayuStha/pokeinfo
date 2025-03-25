// Importing necessary hooks and components from React and libraries

import { useState, useEffect } from 'react'; // useState and useEffect are React hooks for managing state and side-effects
import { useNavigate } from 'react-router-dom'; // React Router for navigation between pages
import { Search, LogOut } from 'lucide-react'; // Search, LogOut, and Sparkles.
import PokemonCard from './PokemonCard'; // A component to display individual Pokémon
import { Pokemon, PokemonListResponse } from '../types'; // Importing TypeScript types for Pokémon data

function Dashboard(){
  //Dashboard is the main page component taht displpays a list of Pokémon.
  const navigate = useNavigate(); //react-router-dom hook to navigate betwen routes.
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); //state to store fetched poekmon data.
  const [loading, setLoading] = useState(true); //state to track if data is still loading
  const [error, setError] = useState<string | null>(null); //state to store error message if any
  const [searchTerm, setSearchTerm ] = useState(''); //State to store search input value
  const [offset, setOffset] = useState(0); // state for pagination (which page of Pokemon data to fetch)
  const limit = 12 //Number of pokemon to display per page (pagiantion limit)

  useEffect(()=>{
    //fetch function that is triggered whrn the component is mounted or the `ffset changes 
    const fetchPokemon =async()=>{
      try{
        setLoading(true); //start loading
        //fetch the list of pokemon with a limit and offset for pagination
        const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const listData: PokemonListResponse = await listResponse.json() //parse the list repsonse

        //fetch detailed data fro each pokemon using the URL from the list response
        const pokemonData = await Promise.all(
          listData.results.map(async(pokemon) =>{
            const response = await fetch(pokemon.url); //fetch details for each pokemon
            return response.json(); //parse each pokemon detailed data
          })
        );
        setPokemon(pokemonData); // set the fetched pokemon data into state
        setError(null); // clear any previous error
      }catch {
        setError('Failed to fetch Pokémon. Please try again later.'); //error message to show in case of failure
      } finally{
          setLoading(false); //end loading state
      }
    };
    fetchPokemon(); //call teh function to fetch pokeom data
  }, [offset]); //re-run the effect whenever the `offset changes (pagination)

  // filter pokemon based on user search
  const filteredPokemon = pokemon.filter((p)=>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // removes the use rfrom localStorage
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false'); // Set authentication status to false in localStorage
    navigate('/'); //navigates to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-800 to-purple-900">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/10 py-6 shadow-2xl border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">

            <div className="flex items-center gap-3">
              <img src="/pokemon.png" alt="Pokédex" className="h-15 md:h-18" />
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors text-white border border-white/20"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button> {/* Logout button */}
          </div>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
            <input
              type="text"
              placeholder="Search Pokémon ..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term when the user types
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-indigo-300 text-center mb-4 bg-indigo-500/20 p-4 rounded-xl border border-indigo-500/30">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-300 border-t-transparent mx-auto"></div> {/* Loading Spinner */}
            <p className="mt-4 text-indigo-200">Loading Pokemon...</p> {/* Loading Text */}
          </div>
        ) : (
          <>
            {/* Display Pokémon Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} /> // Render each Pokémon using the PokemonCard component
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                className="px-6 py-3 bg-white/10 text-white rounded-xl disabled:opacity-50 hover:bg-white/20 transition-colors border cursor-pointer border-white/20 disabled:hover:bg-white/10"
                onClick={() => setOffset((prev) => Math.max(0, prev - limit))}
                disabled={offset === 0}
              >
                Previous
              </button>
              <button
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
                onClick={() => setOffset((prev) => prev + limit)}
              >
                Next
              </button>
            </div>
            
          </>
        )}
      </main>
    </div>
    );
  }


export default Dashboard;