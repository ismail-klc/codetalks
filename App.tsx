import React, { useEffect } from 'react';
import { ThemeProvider } from "react-native-rapi-ui";
import configureStore from './src/context/store';
import Navigation from "./src/navigation";
import { Provider } from 'react-redux';

const store = configureStore();

export default function App() {
  const images = [
    require("./assets/login.png"),
    require("./assets/register.png"),
    require("./assets/forget.png"),
  ];

  return (
    <ThemeProvider theme="dark" images={images}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
}