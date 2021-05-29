export const setInquiries = (inquiries) => ({
    type: 'INQUIRY_SET_INQUIRIES',
    payload: inquiries,
});

export const setText = text => ({
    type: 'INQUIRY_SET_TEXT',
    text,
});

export const setCreated = created => ({
    type: 'INQUIRY_SET_CREATED',
    created,
});

export const setId = id => ({
    type: 'INQUIRY_SET_ID',
    id,
});