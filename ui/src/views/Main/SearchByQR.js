import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import Axios from 'axios';
import QRReader from 'react-qr-reader';

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
      step: 1,
    };
  }

  setVendorDetails = (qrId, vendorDetail) => {
    this.setState({ qrId, vendorDetail });
  }

  setStep = (step) => {
    this.setState({ step });
  }

  getComponent = () => {
    let component = null;
    const { step } = this.state;
    switch (step) {
      case 2.1:
        component = <SearchResultComponent />;
        break;
      case 2.2:
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
