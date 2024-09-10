import { combineReducers } from 'redux';
import { advertisementsReducer } from './slices/advertisements';

const rootReducer = combineReducers({
  advertisements: advertisementsReducer
});

export default rootReducer;
