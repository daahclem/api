import React, { useState, useEffect, createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import apiConnectionParams from './utils/apiConnectionParams';
import reducer from './reducer';

const url = 'https://gateway.marvel.com/v1/public/characters';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [alphabeticOrder, setAlphabeticOrder] = useState(true);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const initialState = {
    loading: false,
    favorites: [],
    amount: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const id = Number(e.target.id);
    dispatch({
      type: 'REMOVE_FAVORITE',
      payload: id,
    });
  };

  const addFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const name = e.target.name;
    const id = Number(e.target.id);
    const image = document.getElementById(`${id}portrait`).src;
    const hero = {
      name,
      id,
      image,
    };
    dispatch({
      type: 'ADD_FAVORITE',
      payload: hero,
    });
  };

  const fetchHeroes = useCallback(async () => {
    let params = { ...(searchTerm ? { nameStartsWith: searchTerm, ...apiConnectionParams } : { ...apiConnectionParams }) };
    params = { ...(alphabeticOrder ? { ...params } : { orderBy: '-name', ...params }) };
    setLoading(true);

    try {
      const response = await axios.get(url, {
        params: params,
      });
      const data = response.data.data.results;

      if (data) {
        const newHero = data.map((item) => {
          const { name, thumbnail, id, resourceURI } = item;
          return {
            id,
            name,
            image: `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`,
            resourceURI,
          };
        });
        setHeroes(newHero);
      } else {
        setHeroes([]);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [searchTerm, alphabeticOrder]);

  useEffect(() => {
    fetchHeroes();
  }, [searchTerm, fetchHeroes]);

  return (
    <AppContext.Provider
      value={{
        loading,
        heroes,
        setSearchTerm,
        searchTerm,
        setAlphabeticOrder,
        alphabeticOrder,
        ...state,
        removeFavorite,
        addFavorite,
        setOnlyFavorites,
        onlyFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
