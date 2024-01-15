"use client";

import { createContext, useReducer } from "react";
import myReducer from "./MyReducer";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const initialState = {
    posts: [],
    // originalPosts: [],
  };
  const [state, dispatch] = useReducer(myReducer, initialState);

  return (
    <MyContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
