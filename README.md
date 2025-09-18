
# Pokémon Router App

A modern React app for browsing Pokémon, featuring:
- Responsive grid and card UI
- Animated collapsible moves list
- Persistent trainer login (localStorage)
- Type color coding and stat bars
- **Loading skeletons for smooth UX**
- Modern CSS and Google Fonts


## Usage & Launch

1. **Install dependencies:**
	```sh
	npm install
	```
2. **Start the app in development mode:**
	```sh
	npm start
	```
	The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for production:**
	```sh
	npm run build
	```
	The optimized build will be in the `build/` folder.

4. **Run tests:**
	```sh
	npm test
	```

5. **Customize:**
	- Edit CSS in `src/App.css` for global styles
	- Add or modify React components in `src/components/`

---

## Features

- **Trainer Login:** Enter your name to access the Pokédex. Name is saved in browser memory.
- **Pokémon List:** Browse all Pokémon with responsive grid and search.
- **Pokémon Card:** Click a Pokémon to view details, stats, types, and all moves.
- **Collapsible Moves:** Expand/collapse the full moves list for each Pokémon.
- **Loading Skeletons:** See animated placeholders while data loads.
- **Modern UI:** Clean, responsive design with custom fonts and color coding.

## Project Structure

- `src/components/` — React components (Home, Pokemon, PokemonCard, etc.)
- `src/services/` — API and data utilities
- `src/context/` — React context for global state
- `public/` — Static files and HTML

## Customization

- Edit CSS in `src/App.css` for global styles
- Add new features or tweak UI in `src/components/`

## License

MIT
