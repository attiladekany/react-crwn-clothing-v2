import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// Todo rework legacy solution
export const store = createStore(rootReducer, undefined, composedEnhancers);