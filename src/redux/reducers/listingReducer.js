const LISTINGS = {
    listings: [],
    title: '',
    description: '',
    type: '',
    price: 0,
    purchased: false,
    password: '',
    created: '',
    id: '',
};

const listingReducer = (state = LISTINGS, action) => {
    switch (action.type) {
        case 'LISTING_SET_TITLE':
            return {
                ...state,
                title: action.title,
            };
        case 'LISTING_SET_DESCRIPTION':
            return {
                ...state,
                description: action.description,
            };
        case 'LISTING_SET_TYPE':
            return {
                ...state,
                type: action.type,
            };
        case 'LISTING_SET_PRICE':
            return {
                ...state,
                price: action.price,
            };
        case 'LISTING_SET_PURCHASED':
            return {
                ...state,
                purchased: action.purchased,
            };
        case 'LISTING_SET_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        case 'LISTING_SET_CREATED':
            return {
                ...state,
                created: action.created,
            };
        case 'LISTING_SET_ID':
            return {
                ...state,
                id: action.id,
            };

        case 'LISTING_SET_LISTINGS':
            return {
                ...state,
                listings: action.listings,
            };
        default:
            return state;
    };
};

export default listingReducer;
