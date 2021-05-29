export const setListings = listings => ({
    type: 'LISTING_SET_LISTINGS',
    listings,
});

export const setTitle = title => ({
    type: 'LISTING_SET_TITLE',
    title,
});

export const setDescription = description => ({
    type: 'LISTING_SET_DESCRIPTION',
    description,
});

export const setType = listingType => ({
    type: 'LISTING_SET_TYPE',
    listingType,
});

export const setPrice = price => ({
    type: 'LISTING_SET_PRICE',
    price,
});

export const setPurchased = purchased => ({
    type: 'LISTING_SET_PURCHASED',
    purchased,
});

export const setPassword = password => ({
    type: 'LISTING_SET_PASSWORD',
    password,
});

export const setCreated = created => ({
    type: 'LISTING_SET_CREATED',
    created,
});

export const setId = id => ({
    type: 'LISTING_SET_ID',
    id,
});
