const myReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    /* case "SET_ORG_POSTS":
      return {
        ...state,
        originalPosts: action.payload,
      }; */

    default:
      return state;
  }
};

export default myReducer;
