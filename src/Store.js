import { combineReducers, createStore } from 'redux';

const userReducer = ( state = [], action ) => {
  if (action.type === "USER_ACTIVE") {
      return Object.assign({}, state, {data: action.data })
  }
  return state;
};

const rootReducer = combineReducers({
    userReducer
});
const store = createStore(rootReducer);
export default store;
