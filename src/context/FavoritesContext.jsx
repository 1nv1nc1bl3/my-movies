import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'cinemate:favorites';

function loadFavorites() {
    // if the key doesn't exist yet, return an empty array as the default value
    if (!localStorage.getItem(STORAGE_KEY)) return [];
    try {
        // parse stored JSON string into JS value
        // if it returns a falsy value, fall back to an empty array
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        // if value not a valid JSON, return empty array
        return [];
    }
}

export const FavoritesContext = createContext(null);

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error(
            'useFavorites must be used within a FavoritesContext.Provider'
        );
    }
    return ctx;
}

export function FavoritesProvider({ children }) {
    // initialize state / loadFavorites runs only once on initial render
    const [favorites, setFavorites] = useState(() => loadFavorites());

    // sync the favorites state to localStorage whenever favorites changes (dependency array)
    useEffect(() => {
        // convert the favorites array into a JSON string and store in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // toggle movie state (favorite/not favorite)
    const toggleFavorite = (movie) => {
        setFavorites((prev) => {
            // check if the movie already exists in favorites by id
            const exists = prev.some((fav) => fav.id === movie.id);
            return exists
                ? prev.filter((fav) => fav.id !== movie.id) // remove movie from favorites
                : [...prev, movie]; // add movie to favorites
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}
