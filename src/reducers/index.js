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
    case "UPDATE_ACTIVE_PAGE":
      return {
        ...state,
        activePage: action.payload,
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications + 1,
      };
    case "RESET_NOTIFICATIONS":
      return {
        ...state,
        notifications: 0,
      };
    case "UPDATE_LIKES":
      const tweet = state.tweets.find((tweet) => tweet._id === action.payload);
      const tweetIndex = state.tweets.findIndex(
        (tweet) => tweet._id === action.payload
      );
      const filteredTweets = [
        ...state.tweets.slice(0, tweetIndex),
        ...state.tweets.slice(tweetIndex + 1),
      ];
      tweet.likes += 1;
      filteredTweets.splice(tweetIndex, 0, tweet);
      console.log(filteredTweets);
      return {
        ...state,
        tweets: filteredTweets,
      };
    default:
      return state;
  }
}
