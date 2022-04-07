import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom"
import {
  WatchLaterProvider
  , LikedVideosProvider
  , HistoryProvider
  , PlaylistProvider
} from "./contexts/index"

makeServer()
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WatchLaterProvider>
        <LikedVideosProvider>
          <HistoryProvider>
            <PlaylistProvider>
              <App />
            </PlaylistProvider>
          </HistoryProvider>
        </LikedVideosProvider>
      </WatchLaterProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
