/*
  props;
    - title: text for the dropdown trigger button
    - list: dropdown list
    - toggleItem: onClick function for each item
    - toggleDropdown: toggler for dropdown
    - isOpen: open state for dropdown
*/

import React from 'react';

const Dropdown = (props) => {
  const {
    list, toggleItem, title, isOpen, toggleDropdown,
  } = props;

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header"
        onClick={toggleDropdown}
        onKeyPress={toggleDropdown}
        role="button"
        tabIndex="0"
      >
        <div className="dd-header-title">{title}</div>
        {
          isOpen ? <i className="fas fa-angle-up" /> : <i className="fas fa-angle-down" />
        }
      </div>
      {
        isOpen && (
        <ul className="dd-list">
          {
            list.map((item) => (
              <li key={item.id}>
                <div
                  className="dd-list-item"
                  onMouseDown={() => toggleItem(item)} // https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
                  onKeyPress={() => toggleItem(item)}
                  role="button"
                  tabIndex="0"
                >
                  {item.text}
                </div>
              </li>
            ))
          }
        </ul>
        )
    }
    </div>
  );
};

export default Dropdown;
