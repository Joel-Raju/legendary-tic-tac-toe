import React, { useReducer } from 'react';
import './App.css';
import Game from './components/Game';
import {
  GlobalStoreContext,
  globalReducer,
  InitialState
} from './context/globalReducer';

const App: React.FC = () => {
  const [globalState, dispatchToGlobal] = useReducer(
    globalReducer,
    InitialState
  );

  return (
    <GlobalStoreContext.Provider
      value={{ state: globalState, dispatch: dispatchToGlobal }}
    >
      <Game />
    </GlobalStoreContext.Provider>
  );
};

export default App;
