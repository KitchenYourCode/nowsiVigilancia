import { combineReducers, createStore } from 'redux';

const userReducer = ( state = [], action ) => {
  if (action.type === "USER_ACTIVE") {
      return Object.assign({}, state, {data: action.data })
  }
  return state;
};
const timerRefreshCoordsReducer = ( state = [], action ) => {
  if (action.type === "TIMER_REFRESH_COORDS") {
      return Object.assign({}, state, {data: action.data })
  }

  return state;
};

const rootReducer = combineReducers({
    userReducer,
    timerRefreshCoordsReducer
});
const store = createStore(rootReducer);
export default store;
