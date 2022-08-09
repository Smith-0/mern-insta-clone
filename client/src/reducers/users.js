const userReducer = (state = { userData: [], users: [] }, action) => {
  switch (action.type) {
    case "SIGN_UP":
    case "SIGN_IN":
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
    case "UPDATE_USER":
    case "UPDATE_PROFILE_PIC":
      var userDataUpdated = JSON.parse(localStorage.getItem("userData"));
      userDataUpdated = { ...userDataUpdated, result: action.payload };
      localStorage.setItem("userData", JSON.stringify(userDataUpdated));
      return {
        ...state,
        userData: userDataUpdated,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_USER_BY_ID":
      return { ...state, user: action.payload };
    case "FOLLOW":
      var userDataFollowed = JSON.parse(localStorage.getItem("userData"));
      userDataFollowed = {
        ...userDataFollowed,
        result: action.payload.updatedCurrentUser,
      };
      localStorage.setItem("userData", JSON.stringify(userDataFollowed));
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.updatedCurrentUser._id
            ? action.payload.updatedCurrentUser
            : user._id === action.payload.updatedOtherUser._id
            ? action.payload.updatedOtherUser
            : user
        ),
      };
    case "LOGOUT":
      localStorage.clear();
      return null;
    default:
      return state;
  }
};

export default userReducer;
