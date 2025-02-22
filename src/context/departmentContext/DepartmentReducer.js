const DepartmentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_DEPARTMENTS_START':
            return {
                departments: [],
                isFetching: true,
                error: false,
            };
        case 'GET_DEPARTMENTS_SUCCESS':
            return {
                departments: action.payload,
                isFetching: false,
                error: false,

            };
        case 'GET_DEPARTMENTS_FAILURE':
            return {
                departments: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_DEPARTMENT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'DELETE_DEPARTMENT_SUCCESS':
            return {
                departments: state.departments.filter(department => department._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case 'DELETE_DEPARTMENT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'CREATE_DEPARTMENT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'CREATE_DEPARTMENT_SUCCESS':
            return {
                departments: [...state.departments, action.payload],
                isFetching: false,
                error: false,
            };
        case 'CREATE_DEPARTMENT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_DEPARTMENT_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'UPDATE_DEPARTMENT_SUCCESS':
            return {
                // Update only the values that have changed
                departments: state.departments.map(department => department._id === action.payload._id ? action.payload : department),
                isFetching: false,
                error: false,
            };
        case 'UPDATE_DEPARTMENT_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}
export default DepartmentReducer;
