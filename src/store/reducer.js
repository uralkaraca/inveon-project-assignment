import { Map } from 'immutable';
import storeActions from './actions';

const reducer = (state = Map(), action) => {
  const actor = storeActions[action.type];
  if (actor) {
    return actor(state, action);
  }
  return state;
};

export default reducer;
