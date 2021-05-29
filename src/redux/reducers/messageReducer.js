const MESSAGES = {
  messages: [],
  text: '',
};

const messageReducer = (state = MESSAGES, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        messages: action.messages,
      };
    case 'UPDATE_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'INSERT_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};

export default messageReducer;