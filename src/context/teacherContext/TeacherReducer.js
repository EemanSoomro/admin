const TeacherReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TEACHERS_START':
            return {
                teachers: [],
                isFetching: true,
                error: false,
            };
        case 'GET_TEACHERS_SUCCESS':
            return {
                teachers: action.payload,
                isFetching: false,
                error: false,

            };
        case 'GET_TEACHERS_FAILURE':
            return {
                teachers: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_TEACHER_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'DELETE_TEACHER_SUCCESS':
            return {
                teachers: state.teachers.filter(teacher => teacher._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case 'DELETE_TEACHER_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'CREATE_TEACHER_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'CREATE_TEACHER_SUCCESS':
            return {
                teachers: [...state.teachers, action.payload],
                isFetching: false,
                error: false,
            };
        case 'CREATE_TEACHER_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_TEACHER_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'UPDATE_TEACHER_SUCCESS':
            return {
                // Update only the values that have changed
                teachers: state.teachers.map(teacher => teacher._id === action.payload._id ? action.payload : teacher),
                isFetching: false,
                error: false,
            };
        case 'UPDATE_TEACHER_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}
export default TeacherReducer;
