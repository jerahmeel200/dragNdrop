import { createContext, useState } from "react";
// import { auth } from "firebase/auth";

export const AuthContext = createContext({
  login: (user) => {},
  logout: () => {},
  isLoggedIn: false,
  user: ''
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userIsLoggedIn = !!user;

  const loginHandler = (user) => {
    setUser(user);
  };

  const logoutHandler = () => {
    setUser(null);
  };


  const contextValue = {
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: userIsLoggedIn,
    user: user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
