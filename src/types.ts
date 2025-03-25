// defining interface types for pokemon data

//the interface defines the structure of a single Pokémon's data.
export interface Pokemon {
    id: number; //the unique identifier for pokemon (eg: number 1 for Bulbasaur)
    name: string; // name of the pokemon (eg: Pikachu)

    // sprites are the images that represent the Pokémon, such as the front-facing sprite or other artworks.
    sprites:{
        other:{
            'official-artwork':{
                front_default: string; // the URL of the Pokémon's official front-facing artwork
            };
        };
    };

    // Types of the Pokémon(eg: "fire", "water", 'electric)
    types: {
        type: {
            name: string; //The name of the type (eg: "fire")
        }
    }[];

    height: number; // The height of the Pokémon (measured in decimeters, so 1m = 10).
    weight: number; // The weight of the Pokémon (measured in hectograms, so 1kg = 10).
    
    // Abilities are special features or powers the Pokémon has (eg: "static", "overgrow").
    abilities: {
        ability: {
        name: string; // The name of the ability (eg: "static").
        };
    }[];

    // Stats include the base values for different attributes of the Pokémon like HP, attack, defense, etc.
    stats: {
        base_stat: number; // The base value for the stat (eg: 60 for Attack).
        stat: {
        name: string; // The name of the stat (eg: "hp", "attack").
        };
    }[];

    // Species is a URL pointing to more detailed information about the Pokémon's species.
    species: {
        url: string; // The URL to fetch more details about the Pokémon species.
    };
}

// define the structure of the response that contains a list of Pokémon.
export interface PokemonListResponse {
    count: number; // The total number of Pokémon available (used for pagination).
    next: string | null; // The URL for the next page of Pokémon data, or null if there are no more pages.
    previous: string | null; // The URL for the previous page of Pokémon data, or null if there are no previous pages.
    
    // The results array contains the names and URLs of the Pokémon in the current page.
    results: {
      name: string; // The name of the Pokémon (eg: "Bulbasaur").
      url: string; // The URL for more detailed information about this Pokémon.
    }[];
}
  
// define the structure of Pokémon species information (eg: flavor text).
export interface PokemonSpecies {
    flavor_text_entries: { 
      flavor_text: string; // The flavor text is a short description of the Pokémon, usually from the games or Pokedex.
      language: { 
        name: string; // The language of the flavor text (eg: "en" for English).
      };
    }[];
}