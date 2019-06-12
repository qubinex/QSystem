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

class QueueHeavy extends Component {
  getCurrentStatus = () => {

  }

  render() {
    return (
      <Card>
        <CardHeader>
          Long waiting time expected
        </CardHeader>
        <CardBody>
          <span>
            <i className="fa fa-warning" />
            <b>
              The selected vendor is current having longer than usual waiting time. Are you sure you want to proceed?
            </b>
            <i className="fa fa-warning" />
          </span>
          <FormGroup row>
            <Col xs={{ size: 3 }}>
              <Label>Current queue:</Label>
            </Col>
            <Col xs={{ size: 6 }}>
              <Label>123</Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={{ size: 3 }}>
              <Label>Latest queue</Label>
            </Col>
            <Col xs={{ size: 6 }}>
              <Label>223</Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={{ size: 3 }}>
              <Label>Est. time</Label>
            </Col>
            <Col xs={{ size: 6 }}>
              <Label>120 mins</Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={{ size: 6 }}>
              <Button>Queue now!</Button>
            </Col>
          </FormGroup>
        </CardBody>
      </Card>
    );
  }
}

export default QueueHeavy;
