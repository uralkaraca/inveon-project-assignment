import { fromJS } from 'immutable';

const storeActions = {
  ADD_TO_CART: (state, action) => {
    const currentCart = state.getIn(['header', 'cart'], fromJS([]));
    let updatedCart = currentCart;

    if (!currentCart.find(e => e.get('id') === action.data.get('id'))) {
      updatedCart = currentCart.push(action.data);
    } 

    return state.setIn(['header', 'cart'], updatedCart);
  },
  REMOVE_FROM_CART: (state, action) => {
    const currentCart = state.getIn(['header', 'cart'], fromJS([]));
    const updatadCart = currentCart.filter((item) => item.get('id') !== action.id);
    const updatedState = state.setIn(['header', 'cart'], updatadCart);

    return updatedState;
  },
  SET_FILTERS: (state, action) => state.setIn(['productListPage', 'filters'], fromJS(action.data)),
  SET_ALL_DATA: (state, action) => state.setIn(['productListPage', 'allData'], fromJS(action.data)),
  SET_PRODUCTS: (state, action) => state.setIn(['productListPage', 'productList'], fromJS(action.data)),
  SET_SELECTED_FILTER: (state, action) => {
    const currentFilters = state.getIn(['productListPage', 'selectedFilters'], fromJS([]));
    let updatedFilters;

    if (currentFilters.find(e => e.id === action.data.id)) {
      updatedFilters = currentFilters.filter(e => e.id !== action.data.id);
    } else {
      updatedFilters = currentFilters.push(action.data);
    }

    return state.setIn(['productListPage', 'selectedFilters'], updatedFilters);
  },
  SET_UI_ACTION: (state, action) => state.setIn(['uiActions', action.key], action.data),
  TOGGLE_DROPDOWN: (state, action) => state.setIn(['uiActions', 'dropdown', action.key], action.data),
};
export default storeActions;

