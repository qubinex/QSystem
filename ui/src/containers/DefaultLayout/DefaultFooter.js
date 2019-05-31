import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

function DefaultFooter(props) {
  // eslint-disable-next-line
  const { children, ...attributes } = props;

  return (
    <React.Fragment>
      <span>
        <a href="https://akademeet.com">Akademeet</a>
        &copy; 2019 Qubinex.
      </span>
      {/* <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span> */}
    </React.Fragment>
  );
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
