const SocietyReducer = (state, action) => {
    switch (action.type) {
        case 'GET_SOCIETYS_START':
            return {
                societys: [],
                isFetching: true,
                error: false,
            };
        case 'GET_SOCIETYS_SUCCESS':
            return {
                societys: action.payload,
                isFetching: false,
                error: false,

            };
        case 'GET_SOCIETYS_FAILURE':
            return {
                societys: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_SOCIETY_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'DELETE_SOCIETY_SUCCESS':
            return {
                societys: state.societys.filter(society => society._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case 'DELETE_SOCIETY_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'CREATE_SOCIETY_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'CREATE_SOCIETY_SUCCESS':
            return {
                societys: [...state.societys, action.payload],
                isFetching: false,
                error: false,
            };
        case 'CREATE_SOCIETY_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_SOCIETY_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'UPDATE_SOCIETY_SUCCESS':
            return {
                // Update only the values that have changed
                societys: state.societys.map(society => society._id === action.payload._id ? action.payload : society),
                isFetching: false,
                error: false,
            };
        case 'UPDATE_SOCIETY_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}
export default SocietyReducer;
