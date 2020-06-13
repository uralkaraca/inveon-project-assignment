import React, { useEffect } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';

import Product from './Product';
import fetcher from '../services/fetcher';

const List = (props) => {
  const {
    setProductList, allData, setAllData, productList, selectedFilters,
  } = props;

  const getProductList = async () => {
    try {
      const products = await fetcher.get('products.json');
     
      setProductList(products.data);
      setAllData(products.data);
    } catch (err) {
      console.log('fetch failed', err);
    }
  };

  const filterProducts = () => {
    let filteredProducts = [];

    selectedFilters.forEach((item) => {
     filteredProducts = allData.toJS().filter((val) => {
        return item.text === val[item.type];
      })
    });
    
    setProductList(selectedFilters.size ? filteredProducts : allData);
}

  useEffect(() => {
    getProductList();
  }, []); // eslint-disable-line

  useEffect(() => {
    filterProducts();
  }, [selectedFilters]); // eslint-disable-line


  return (
    <div className="product-list">
      <h1>Product List</h1>
      <div className="products">
        {
          productList && productList.map((item) => <Product info={item} key={item.get('id')} />)
        }
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  const productListPage = state.get('productListPage', fromJS([]));

  return {
    allData: productListPage.get('allData', fromJS([])),
    productList: productListPage.get('productList', fromJS([])),
    selectedFilters: productListPage.get('selectedFilters', fromJS([])),
  }
}

const mapDispatchToProps = (dispatch) => ({
  setProductList: (data) => dispatch({ type: 'SET_PRODUCTS', data }),
  setAllData: (data) => dispatch({ type: 'SET_ALL_DATA', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

