import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Header from './components/Header';
import reducer from './store/reducer';
import BlockUi from './components/BlockUi';

import './app.scss';

const ProductList = lazy(() => import('./pages/ProductList.js'));

const App = () => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Header />
      <Router>
        <Suspense fallback={<BlockUi />}>
          <Switch>
            <Route path="/" component={ProductList} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
