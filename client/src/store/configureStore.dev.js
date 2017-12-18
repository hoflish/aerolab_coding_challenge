import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import DevTools from '../components/DevTools';
import rootReducer from '../reducers/rootReducer';

const configureStore = preloadState => {
  const store = createStore(
    rootReducer,
    preloadState,
    compose(
      applyMiddleware(createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default;
    });
  }

  return store;
};

export default configureStore;
