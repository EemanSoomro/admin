const MaterialReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MATERIALS_START':
            return {
                materials: [],
                isFetching: true,
                error: false,
            };
        case 'GET_MATERIALS_SUCCESS':
            return {
                materials: action.payload,
                isFetching: false,
                error: false,

            };
        case 'GET_MATERIALS_FAILURE':
            return {
                materials: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_MATERIAL_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'DELETE_MATERIAL_SUCCESS':
            return {
                materials: state.materials.filter(material => material._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case 'DELETE_MATERIAL_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'CREATE_MATERIAL_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'CREATE_MATERIAL_SUCCESS':
            return {
                materials: [...state.materials, action.payload],
                isFetching: false,
                error: false,
            };
        case 'CREATE_MATERIAL_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_MATERIAL_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'UPDATE_MATERIAL_SUCCESS':
            return {
                // Update only the values that have changed
                materials: state.materials.map(material => material._id === action.payload._id ? action.payload : material),
                isFetching: false,
                error: false,
            };
        case 'UPDATE_MATERIAL_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}
export default MaterialReducer;
