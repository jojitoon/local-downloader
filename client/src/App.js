import React, { useState } from "react";
import "./App.scss";
import loader from "./assets/loading.svg";
import { useDispatch, useMappedState } from "redux-react-hook";
import { getMessages, getFile } from "./store/actions/messages";

const App = () => {
  // const pathRef = React.createRef();
  const dispatch = useDispatch();
  const { messages, loading, downloading } = useMappedState(
    ({ messages }) => messages
  );

  const [histories, setHistory] = useState([""]);
  return (
    <div className="App">
      <h2>Living word media Local Download Page </h2>

      {histories.length > 1 && (
        <div className="breadcrumb">
          <div>
            {histories.map((hist, i) => {
              const title = hist.split("/");
              if (!hist)
                return (
                  <span
                    key={i}
                    onClick={() => {
                      dispatch(getMessages());
                      setHistory([""]);
                    }}
                  >
                    Home
                  </span>
                );
              return (
                <span
                  key={i}
                  onClick={() => {
                    dispatch(getMessages(histories[i]));
                    const newHistory = [...histories];
                    newHistory.splice(i + 1, histories.length - i);
                    setHistory(newHistory);
                  }}
                >
                  {title[title.length - 1]}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {messages.length !== 0 && (
        <div className="group">
          {messages.map((message, i) => {
            if (message.isFolder === null) return null;
            if (message.isFolder) {
              return (
                <div
                  key={i}
                  className="folder"
                  onClick={() => {
                    dispatch(getMessages(message.path));
                    const newHistory = [...histories];
                    newHistory.push(message.path);
                    setHistory(newHistory);
                  }}
                >
                  {message.name}
                </div>
              );
            }
            return (
              <div
                key={i}
                className="file"
                onClick={() => dispatch(getFile(message.path))}
              >
                {" "}
                {message.name}
              </div>
            );
          })}
        </div>
      )}
      {histories.length > 1 && (
        <button
          onClick={() => {
            dispatch(getMessages(histories[histories.length - 2]));
            const newHistory = [...histories];
            newHistory.pop();
            setHistory(newHistory);
          }}
        >
          Go Back
        </button>
      )}

      {(downloading || loading) && (
        <div className="downloader">
          <img src={loader} alt="loader" />{" "}
          <div>{loading ? "Loading" : "Preparing for download"}</div>
        </div>
      )}
    </div>
  );
};

export default App;
