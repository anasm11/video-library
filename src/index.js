import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom"
import { WatchLaterProvider } from "./contexts/watchlater-context"
import { LikedVideosProvider } from "./contexts/liked-videos-context"

makeServer()
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WatchLaterProvider>
        <LikedVideosProvider>
          <App/>
        </LikedVideosProvider>
      </WatchLaterProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
