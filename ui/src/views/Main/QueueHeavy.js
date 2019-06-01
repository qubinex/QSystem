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

export default QueueHeavy;
