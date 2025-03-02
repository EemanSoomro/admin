const AnnouncementReducer = (state, action) => {
  switch (action.type) {
    case "GET_ANNOUNCEMENTS_START":
      return { ...state, isFetching: true, error: false };

    case "GET_ANNOUNCEMENTS_SUCCESS":
      return { ...state, isFetching: false, announcements: action.payload, error: false };

    case "GET_ANNOUNCEMENTS_FAILURE":
      return { ...state, isFetching: false, error: true };

    case "CREATE_ANNOUNCEMENT_SUCCESS":
      return { ...state, announcements: [...state.announcements, action.payload] };

    case "UPDATE_ANNOUNCEMENT_SUCCESS":
      return {
        ...state,
        announcements: state.announcements.map((ann) =>
          ann._id === action.payload._id ? action.payload : ann
        ),
      };

    // ✅ Fixed Delete Reducer
    case "DELETE_ANNOUNCEMENT_SUCCESS":
      return { ...state, announcements: state.announcements.filter((ann) => ann._id !== action.payload) };

    default:
      return state;
  }
};

export default AnnouncementReducer;
