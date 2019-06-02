import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap';
import socketIOClient from 'socket.io-client';

import MainContext from './MainContext';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '/',
      queueStatus: null,
    };
  }

  componentDidMount() {
    const { qrId } = this.context;
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, { query: `param=${qrId}` });
    // socket.emit('getQueueStatus', { query: 'param=bar' });
    socket.on('queueStatusUpdate', (data) => {
      this.setState({ queueStatus: data });
      console.log(data);
    });
  }

  render() {
    const { qrId, vendorDetail } = this.context;
    const{ queueStatus } = this.state;
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
                Average queueing time:
              </Col>
              <Col>
                {vendorDetail.waiting_time_minute}
                 mins
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 3, size: 3 }}>
                Current queue:
              </Col>
              <Col>
                {queueStatus}
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 3, size: 3 }}>
                ETA:
              </Col>
              <Col>
                {queueStatus}
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
