import React from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';

const Product = (props) => {
  const { info = {}, addToCart, setUiAction } = props;

  const addProductToCart = (product) => {
    setUiAction('isBlockUiOpen', true);

    setTimeout(() => setUiAction('isBlockUiOpen', false), 500);
    addToCart(product);
  };

  return (
    <div className="product">
      <figure className="product-image">

      </figure>
      <div className="product-info">
        <div className="product-name">{info.get('name', '')}</div>
        <div className="product-title">{info.get('price', 0)}</div>
        <button className="add-to-cart" type="button" onClick={() => addProductToCart(info)}>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  cart: state.getIn(['header', 'cart'], fromJS([])),
});

const mapDispatchToProps = (dispatch) => ({
  setUiAction: (key, data) => {
    dispatch({
      type: 'SET_UI_ACTION',
      data,
      key,
    });
  },
  addToCart: (data) => dispatch({ type: 'ADD_TO_CART', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
