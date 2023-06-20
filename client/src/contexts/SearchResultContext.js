import React from 'react';

export const SearchResultContext = React.createContext({
  searchResult: [],
  setSearchResult: () => {},
});
