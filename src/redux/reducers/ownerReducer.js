const STATE = {
    items: [],
};

const ownerReducer = (state = STATE, action) => {
    switch (action.type) {
        case 'OWNER_ADD_LISTING':
            const item = action.payload

            return {
                ...state,
                items: [...state.items, item],
            }
        default:
            return state;
    }
};

export default ownerReducer;
