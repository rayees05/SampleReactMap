import React from 'react';
import {Provider} from 'react-redux';
import {store} from './App/redux/Store';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './App/BottumTab/tab';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
