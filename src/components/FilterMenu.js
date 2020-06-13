import React, { useEffect } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';
import fetcher from '../services/fetcher';

const FilterMenu = (props) => {
  const {
    setFilterList, setSelectedFilter, filterList, uiActions, toggleDropdown,
  } = props;

  const getFilterList = async () => {
    try {
      const filters = await fetcher.get('filters.json');

      setFilterList(filters.data);
    } catch (err) {
      console.log('fetch failed', err);
    }
  };

  const toggleFilterMenu = (item) => {
    setSelectedFilter(item);
  };

  useEffect(() => {
    getFilterList();
  }, []); // eslint-disable-line

  return (
    <div className="filter-menu">
      {
        filterList.toJS().map((item) => (
          <div className="one-filter" key={item.id}>
            <Dropdown
              title={item.title}
              list={item.values}
              toggleItem={toggleFilterMenu}
              toggleDropdown={() => toggleDropdown(item.title, !uiActions.getIn(['dropdown', item.title], false))}
              isOpen={uiActions.getIn(['dropdown', item.title], false)}
            />
          </div>
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const productListPage = state.get('productListPage', fromJS([]));

  return {
    uiActions: state.get('uiActions', fromJS([])),
    filterList: productListPage.get('filters', fromJS([])),
    selectedFilters: productListPage.get('selectedFilters', fromJS([])),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedFilter: (data) => dispatch({ type: 'SET_SELECTED_FILTER', data }),
  setFilterList: (data) => dispatch({ type: 'SET_FILTERS', data }),
  toggleDropdown: (key, data) => dispatch({ type: 'TOGGLE_DROPDOWN', key, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
