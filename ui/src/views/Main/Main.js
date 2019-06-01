import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from 'reactstrap';

import HomePageWidget from '../_common/component/homePageWidget';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            Good Day! What would you like to do today?
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="6">
                <HomePageWidget mainText="" header="Scan QR code" icon="fa fa-qrcode" />
              </Col>
              <Col xs="6">
                <HomePageWidget mainText="" header="Search" icon="fa fa-search" />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default MainPage;
