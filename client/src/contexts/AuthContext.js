// contexts/AuthContext.js

import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

export default AuthContext;
