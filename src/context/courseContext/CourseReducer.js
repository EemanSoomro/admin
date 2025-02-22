const CourseReducer = (state, action) => {
    switch (action.type) {
        case 'GET_COURSES_START':
            return {
                courses: [],
                isFetching: true,
                error: false,
            };
        case 'GET_COURSES_SUCCESS':
            return {
                courses: action.payload,
                isFetching: false,
                error: false,

            };
        case 'GET_COURSES_FAILURE':
            return {
                courses: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_COURSE_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'DELETE_COURSE_SUCCESS':
            return {
                courses: state.courses.filter(course => course._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case 'DELETE_COURSE_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'CREATE_COURSE_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'CREATE_COURSE_SUCCESS':
            return {
                courses: [...state.courses, action.payload],
                isFetching: false,
                error: false,
            };
        case 'CREATE_COURSE_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_COURSE_START':
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case 'UPDATE_COURSE_SUCCESS':
            return {
                // Update only the values that have changed
                courses: state.courses.map(course => course._id === action.payload._id ? action.payload : course),
                isFetching: false,
                error: false,
            };
        case 'UPDATE_COURSE_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}
export default CourseReducer;
