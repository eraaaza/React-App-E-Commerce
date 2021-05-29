export const addListing = (id, password) => {
  return {
    type: 'OWNER_ADD_LISTING',
    payload: {
      id: id,
      password: password,
    },
  };
};
