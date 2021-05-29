const CART = {
    items: [],
};

const cartReducer = (state = CART, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const item = action.payload

            return {
                ...state,
                items: [...state.items, item],
            }
        case 'CART_CLEAR_ITEM':
            return {
                ...state,
                items: [],
            }
        default:
            return state;
    }
};

export default cartReducer;
