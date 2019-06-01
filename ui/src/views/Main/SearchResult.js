import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap';

import MainContext from './MainContext';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { qrId, vendorDetail} = this.context;
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <Row>
              <Col xs={{ offset: 3, size: 3 }}>
                <b>{vendorDetail.name}</b>
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 3, size: 3 }}>
                Current queue:
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 3, size: 3 }}>
                ETA:
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 3, size: 6 }}>
                <Button type="button" color="success">
                  Queue now
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

SearchResult.contextType = MainContext;
export default SearchResult;
