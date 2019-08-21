
import { 
  GET_MESSAGES_REQUEST,
  GET_MESSAGE_REQUEST,
  GET_MESSAGES_ERROR,
  GET_MESSAGES_SUCCESS
 } from "../actions/types/messages";
const INITIAL_STATE = {
  messages: [],
  loading: false,
  downloading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: action.state,
        error: null
      };
    case GET_MESSAGE_REQUEST:
      return {
        ...state,
        downloading: action.state,
        error: null
      };
    case GET_MESSAGES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        loading: false
      };

    default:
      return state;
  }
};
