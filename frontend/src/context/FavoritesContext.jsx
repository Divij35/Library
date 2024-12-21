import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
  
    const addFavorite = (book) => {
      setFavorites((prev) => [...prev, book]);
    };
  
    const removeFavorite = (id) => {
      setFavorites((prev) => prev.filter((book) => book.id !== id));
    };
  
    return (
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
        {children}
      </FavoritesContext.Provider>
    );
  };

  export const useFavorites= () => useContext(FavoritesContext);
  