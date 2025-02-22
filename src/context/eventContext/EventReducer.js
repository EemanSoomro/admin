const EventReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EVENTS_START':
            return {
                events: [],
                isFetching: true,
                error: false,
            };
        case 'GET_EVENTS_SUCCESS':
            return {
                events: action.payload,
                isFetching: false,
                error: false,

            };
        case 'GET_EVENTS_FAILURE':
            return {
                events: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_EVENT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'DELETE_EVENT_SUCCESS':
            return {
                events: state.events.filter(event => event._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case 'DELETE_EVENT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'CREATE_EVENT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'CREATE_EVENT_SUCCESS':
            return {
                events: [...state.events, action.payload],
                isFetching: false,
                error: false,
            };
        case 'CREATE_EVENT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_EVENT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'UPDATE_EVENT_SUCCESS':
            return {
                // Update only the values that have changed
                events: state.events.map(event => event._id === action.payload._id ? action.payload : event),
                isFetching: false,
                error: false,
            };
        case 'UPDATE_EVENT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}
export default EventReducer;
