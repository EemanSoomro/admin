const AnnouncementReducer = (state, action) => {
    switch (action.type) {
      case "GET_ANNOUNCEMENTS_START":
        return {
          announcements: [],
          isFetching: true,
          error: false,
        };
      case "GET_ANNOUNCEMENTS_SUCCESS":
        return {
          announcements: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_ANNOUNCEMENTS_FAILURE":
        return {
          announcements: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_ANNOUNCEMENT_SUCCESS":
        return {
          announcements: [...state.announcements, action.payload],
          isFetching: false,
          error: false,
        };
      case "DELETE_ANNOUNCEMENT_SUCCESS":
        return {
          announcements: state.announcements.filter(
            (announcement) => announcement._id !== action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPDATE_ANNOUNCEMENT_SUCCESS":
        return {
          announcements: state.announcements.map((announcement) =>
            announcement._id === action.payload._id ? action.payload : announcement
          ),
          isFetching: false,
          error: false,
        };
      default:
        return state;
    }
  };
  
  export default AnnouncementReducer;
  