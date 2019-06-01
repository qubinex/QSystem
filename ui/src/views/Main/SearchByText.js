import React, { Component } from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

import MainContext from './MainContext';
import SearchVendor from './SearchVendor';
import SearchResult from './SearchResult';

class SearchByText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      qrId: '',
      vendorDetail: null,
    };
  }

  getComponent = () => {
    const { step } = this.state;
    let component = null;
    switch (step) {
      case 2:
        component = <SearchResult />;
        break;
      default:
        component = <SearchVendor />;
    }

    return component;
  }

  render() {
    const { qrId, vendorDetail } = this.state;
    return (
      <React.Fragment>
        <MainContext.Provider
          value={{ qrId, vendorDetail }}
        >
          <Row>
            <Col md={{ offset: 3, size: 6 }}>
              {this.getComponent()}
            </Col>
          </Row>
        </MainContext.Provider>
      </React.Fragment>
    );
  }
}

SearchByText.contextType = MainContext;
export default SearchByText;
