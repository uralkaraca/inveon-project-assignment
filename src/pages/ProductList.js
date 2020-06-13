import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import FilterMenu from '../components/FilterMenu';
import List from '../components/List';
import BlockUi from '../components/BlockUi';


class ProductList extends React.PureComponent {
  render() {
    const { uiActions } = this.props;
    return (
      <div className="product-list-container">
        <BlockUi isOpen={uiActions.get('isBlockUiOpen', false)} />
        <FilterMenu />
        <List />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uiActions: state.get('uiActions', Map())
  };
};

export default connect(mapStateToProps)(ProductList);

