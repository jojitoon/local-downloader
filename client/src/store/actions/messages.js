import Axios from "axios";
import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGE_REQUEST,
  // GET_MESSAGES_ERROR,
  GET_MESSAGES_SUCCESS
} from "./types/messages";

const getMessagesRequest = state => ({
  type: GET_MESSAGES_REQUEST,
  state
});

const getMessageRequest = state => ({
  type: GET_MESSAGE_REQUEST,
  state
});

export const getMessagesSuccess = messages => ({
  type: GET_MESSAGES_SUCCESS,
  messages
});

export const getMessages = path => dispatch => {
  dispatch(getMessagesRequest(true));
  return Axios.get(`/api/getList${path ? `?path=${path}` : ""}`)
    .then(({ data }) => {
      dispatch(getMessagesSuccess(data));
    })
    .catch(error => {});
};

export const getFile = path => dispatch => {
  dispatch(getMessageRequest(true));
  const files = path.split("/");
  return Axios.get(`/api/getFile${path ? `?path=${path}` : ""}`, {
    responseType: "blob"
  })
    .then(({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", files[files.length - 1]); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      dispatch(getMessageRequest(false));
    })
    .catch(error => {
      dispatch(getMessageRequest(false));
      console.log(error);
    });
};
