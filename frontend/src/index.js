import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { PostsContextProvider } from './context/postContext';
import {ReplysContextProvider} from './context/replyContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <ReplysContextProvider>
          <App />
        </ReplysContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


