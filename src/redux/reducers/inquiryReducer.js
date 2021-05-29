const INQUIRIES = {
  inquiries: [],
  text: '',
  created: '',
  id: '',
};

const inquiryReducer = (state = INQUIRIES, action) => {
  switch (action.type) {
    case 'INQUIRY_SET_INQUIRIES':
      const item = action.payload;

      return {
        ...state,
        inquiries: [...state.inquiries, item],
      };
    case 'INQUIRY_SET_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'INQUIRY_SET_CREATED':
      return {
        ...state,
        created: action.created,
      };
    case 'INQUIRY_SET_ID':
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export default inquiryReducer;
