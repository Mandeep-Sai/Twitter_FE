export default function (state = {}, action) {
  switch (action.type) {
    case "GET_USERINFO":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "DELETE_POST":
      const postToRemove = state.posts.findIndex(
        (post) => post._id === action.payload
      );
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, postToRemove),
          ...state.posts.slice(postToRemove + 1),
        ],
      };
    default:
      return state;
  }
}
