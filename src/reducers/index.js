export default function (state = {}, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "GET_USERINFO":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_TWEETS":
      return {
        ...state,
        tweets: action.payload,
      };
    case "DELETE_TWEET":
      const postToRemove = state.tweets.findIndex(
        (tweet) => tweet._id === action.payload
      );
      return {
        ...state,
        tweets: [
          ...state.tweets.slice(0, postToRemove),
          ...state.tweets.slice(postToRemove + 1),
        ],
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SEARCH_USER":
      return {
        ...state,
        searchUsername: action.payload,
      };
    default:
      return state;
  }
}
