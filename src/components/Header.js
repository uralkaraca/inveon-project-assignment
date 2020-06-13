import React, { useState } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import SVG from 'react-inlinesvg';
import basket from '../images/basket-icon.svg';


const Header = (props) => {
  const { cart, removeItemFromCart } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header className="header">
      <div className="logo-centering-class"></div>
      <div className="logo">
        <h1>Inveon</h1>
        <h2>ReactJS Assigment</h2>
      </div>
      <div className="basket">
        <button type="button" onClick={handleClick}>
          <SVG src={basket} />
          <span className="cart-size">{cart.size}</span>
        </button>
        <Popover
          id={id}
          open={cart.size && open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div className="chosen-products">
            {
              cart.size && cart.map((item) => (
                <div className="chosen-item">
                  <span>{item.get('name', '')}</span>
                  <span>{item.get('price', 0)}</span>
                  <button type="button" onClick={() => removeItemFromCart(item.get('id'))}>Remove From Cart</button>
                </div>
              ))
            }
          </div>
        </Popover>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  cart: state.getIn(['header', 'cart'], fromJS([])),
});

const mapDispatchToProps = (dispatch) => ({
  removeItemFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
