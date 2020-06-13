
import React from 'react';
import SVG from 'react-inlinesvg';
import spinner from '../images/logo.svg';

class BlockUi extends React.PureComponent {
  render() {
    const { isOpen } = this.props;

    return (
      <div className={`block-ui-wrapper ${isOpen ? 'is-open' : ''}`}>
        {
        isOpen
        && (
          <div className="block-ui-container">
            <div className="block-ui-spinner">
              <SVG src={spinner} />
            </div>
          </div>
        )
        }
      </div>
    );
  }
}

export default BlockUi;
