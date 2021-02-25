import React from 'react';
import './App.css';
import ImageScreen from './screens/imageScreen';
import { Provider } from 'react-redux';

import { store } from './store/index';

function App() {
  return (
      <Provider store={store}>
        <div className="app center-it">
          <ImageScreen />
        </div>
      </Provider>
  );
}

export default App;
