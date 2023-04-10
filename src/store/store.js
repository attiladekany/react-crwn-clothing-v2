import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

// const middleWares = [logger];

const customLoggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
    
    next(action);
    
    console.log('next state: ', store.getState());
}

const middleWares = [customLoggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleWares));

// Todo rework legacy solution
export const store = createStore(rootReducer, undefined, composedEnhancers);