import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap';
import Axios from 'axios';
import socketIOClient from 'socket.io-client';

import MainContext from './MainContext';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '/',
      queueStatus: null,
      isSaving: false,
    };
  }

  componentDidMount() {
    const { qrId } = this.context;
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, { query: `param=${qrId}` });
    // socket.emit('getQueueStatus', { query: 'param=bar' });
    socket.on('queueStatusUpdate', (data) => {
      this.setState({ queueStatus: JSON.parse(data) });
    });
  }

  componentWillUnmount() {
    const { qrId } = this.context;
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, { query: `param=${qrId}` });
    // socket.emit('getQueueStatus', { query: 'param=bar' });
    socket.on('disconnect');
  }

  handleSubmit = () => {
    this.setState({ isSaving: true });
    const { history } = this.props;
    const { vendorDetail } = this.context;
    Axios.post('/queue/submitQueue', { vendorId: vendorDetail.id })
      .then((res) => {
        console.log('success');
        return history.push('/dashboard');
      })
      .catch((err) => {
        this.setState({ isSaving: false });
      });
  }

  render() {
    const { qrId, vendorDetail } = this.context;
    const { queueStatus, isSaving } = this.state;
    const latestQueueNr = queueStatus ? queueStatus.maxQueueNr : 0;
    const queueCount = queueStatus ? queueStatus.queueNr : 0;
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <Row>
              <Col xs={{ offset: 6, size: 4 }}>
                <b>{vendorDetail.name}</b>
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 1, size: 4 }}>
                Average queueing time:
              </Col>
              <Col>
                {vendorDetail.waiting_time_minute}
                 mins
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 1, size: 4 }}>
                Today average:
              </Col>
              <Col>
                {vendorDetail.system_waiting_time_minute}
                 mins
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 1, size: 4 }}>
                Nr of queue in front:
              </Col>
              <Col>
                {queueCount}
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 1, size: 4 }}>
                Lastest queue:
              </Col>
              <Col>
                {latestQueueNr}
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 1, size: 4 }}>
                ETA:
              </Col>
              <Col>
                {parseInt(queueCount, 0) * vendorDetail.system_waiting_time_minute}
                  mins
              </Col>
            </Row>
            <Row>
              <Col xs={{ offset: 6, size: 4 }}>
                <Button type="button" color="success" onClick={this.handleSubmit} disabled={isSaving}>
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
