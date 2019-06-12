import React, { Component } from 'react';
import {
  Card,
  ButtonGroup,
  CardBody,
  Row,
  Col,
  Button,
  Alert,
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
      .then(() => history.push('/dashboard'))
      .catch((err) => {
        this.setState({ isSaving: false });
      });
  }

  render() {
    const { qrId, vendorDetail } = this.context;
    const { setStep } = this.props;
    const { queueStatus, isSaving } = this.state;
    const latestQueueNr = queueStatus ? queueStatus.maxQueueNr : 0;
    const queueCount = queueStatus ? queueStatus.queueNr : 0;
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            {
              (parseInt(queueCount, 0) * vendorDetail.system_waiting_time_minute) > 30 ? (
                <Alert color="danger">
                  The selected vendor is current having longer than usual waiting time.
                </Alert>
              ) : undefined
            }
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
                {parseInt(vendorDetail.avg_waiting_time, 0) === 0 ? vendorDetail.waiting_time_minute : vendorDetail.avg_waiting_time}
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
              <Col xs={{ offset: 5, size: 7 }}>
                <ButtonGroup className="btn-block">
                  <Button type="button" color="success" onClick={this.handleSubmit} disabled={isSaving}>
                    Queue now
                  </Button>
                  <Button color="warning" onClick={() => setStep('1.0')}>
                    <i className="fa fa-refresh" />
                  </Button>
                </ButtonGroup>
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
