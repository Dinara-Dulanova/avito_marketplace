import { combineReducers } from 'redux';
import { advertisementsReducer } from './slices/advertisements';
import { ordersReducer } from './slices/orders';

const rootReducer = combineReducers({
  advertisements: advertisementsReducer,
  orders: ordersReducer
});

export default rootReducer;
