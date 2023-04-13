import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// const middleWares = [logger];
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);