# PokéInfo

**PokéInfo** is a web app built with **Vite**, **React**, **Tailwind CSS**, and **TypeScript**. It allows users to explore Pokémon data by fetching information from the **PokeAPI**. The app also features a simple login system where the username and password are stored in environment variables.

## Features
- Explore Pokémon data using the PokeAPI.
- Simple login system with environment variables.
- Fully responsive UI with Tailwind CSS.
- Real-time data fetching for Pokémon details.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

## Getting Started

### 1. Clone the repository

Clone the project to your local machine:

```bash
git clone https://github.com/AayuStha/pokeinfo.git
cd pokeinfo
```

### 2. Install dependencies

Install the necessary dependencies:
```
npm install
```

### 3. Set up environment variables

Create a .env file in the root directory and add your username and password:
```
VITE_USERNAME=yourUsername
VITE_PASSWORD=yourPassword
```

These variables will be used for authentication on the login page.

### 4. Start the development server

Run the development server:

```
npm run dev
```

Your app should now be available at http://localhost:5173.


## Project Structure

Here’s the project structure for PokéInfo:


```
├── public/                   # Public assets (index.html, etc.)
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── PokemonDetail.tsx # Component to display detailed Pokémon info
│   │   ├── Login.jsx         # Login component
│   │   ├── PokemonCard.tsx   # Single Card Component 
│   │   ├── Dashboard.tsx     # Homepage
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── vite.config.ts        # Tailwind / React configuration
├── .env                      # Environment variables (VITE_USERNAME, VITE_PASSWORD)
├── package.json              # Project metadata and dependencies
└── README.md                 # Project documentation
```

## How it Works

### Authentication

The app uses environment variables (**VITE_USERNAME** and **VITE_PASSWORD**) for a basic login system. When the user tries to log in, the credentials are checked against the values stored in the .env file.

### Fetching Pokémon Data

Once logged in, users can search for Pokémon by name or ID. The app fetches data from the PokeAPI, including information such as abilities, moves, and stats.

### Tailwind CSS

Tailwind CSS is used to style the app, ensuring a clean and responsive design.

## Technologies Used
```
Vite: A fast build tool for modern web development.
React: A JavaScript library for building user interfaces.
ailwind CSS: A utility-first CSS framework for building custom designs.
TypeScript: A statically typed superset of JavaScript.
PokeAPI: A public API for retrieving Pokémon data.
```

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Contributing
```
	1.	Fork the repository to your own GitHub account.
	2.	Create a new branch for your changes.
	3.	Make your changes and commit them with a clear message.
	4.	Push your changes and open a pull request to the original repository.