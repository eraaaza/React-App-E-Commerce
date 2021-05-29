export const addItem = (id) => ({
    type: 'CART_ADD_ITEM',
    payload: id,
});

export const clearItem = () => ({
    type: 'CART_CLEAR_ITEM',
    payload: [],
});
