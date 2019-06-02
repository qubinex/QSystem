import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Col,
  Button,
} from 'reactstrap';
import socketIOClient from 'socket.io-client';

import MainContext from './MainContext';

class QueueStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      // endpoint: '/', //'/queue/getQueueStatus',
      endpoint: '/',
    };
  }

  componentDidMount() {
    const { qrId } = this.context;
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, { query: `param=${qrId}` });
    // socket.emit('getQueueStatus', { query: 'param=bar' });
    socket.on('queueStatusUpdate', (data) => {
      this.setState({ response: data });
      console.log(data);
    });
  }

  getCurrentStatus = () => {

  }

  render() {
    return (

      <Card>
        <CardHeader>
          Current queue status
        </CardHeader>
        <CardBody>
          <FormGroup row>
            <Col xs={{ size: 3 }}>
              <Label>Vendor:</Label>
            </Col>
            <Col xs={{ size: 6 }}>
              <Label>Vendor 1</Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={{ size: 3 }}>
              <Label>Current queue number:</Label>
            </Col>
            <Col xs={{ size: 6 }}>
              <Label>102</Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={{ size: 3 }}>
              <Label>Your queue number</Label>
            </Col>
            <Col xs={{ size: 6 }}>
              <Label>200</Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={{ size: 3 }}>
              <Label>Est. time</Label>
            </Col>
            <Col xs={{ size: 6 }}>
              <Label>20 mins</Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={{ size: 6 }}>
              <Button>Cancel queue</Button>
            </Col>
          </FormGroup>
        </CardBody>
      </Card>
    );
  }
}

QueueStatus.contextType = MainContext;
export default QueueStatus;
