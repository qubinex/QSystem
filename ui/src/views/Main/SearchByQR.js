import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

import MainContext from './MainContext';
import QRReaderComponent from './QRReader';
import SearchResultComponent from './SearchResult';
import SearchResultInvalidComponent from './SearchResultInvalid';

class SearchByQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrId: '',
      vendorDetail: null,
      step: '1.0',
    };
  }

  setVendorDetails = (qrId, vendorDetail) => {
    this.setState({ qrId, vendorDetail });
    this.setStep('2.1');
  }

  setStep = (step) => {
    this.setState({ step });
  }

  getComponent = () => {
    let component = null;
    const { step } = this.state;
    const { history } = this.props;
    switch (step) {
      case '2.1':
        alert(step);
        component = <SearchResultComponent history={history} />;
        break;
      case '2.2':
        component = <SearchResultInvalidComponent />;
        break;
      default:
        component = <QRReaderComponent setVendorDetails={this.setVendorDetails} setStep={this.setStep} />;
        break;
    }
    return component;
  }

  handleSearch = () => {

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

export default SearchByQR;
