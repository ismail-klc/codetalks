const initialState = {
    user: null,
    authenticated: null
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'USER':
            return {
                ...initialState,
                user: action.payload.user,
                authenticated: action.payload.auth
            }
        default:
            return state;
    }
};

export default authReducer;