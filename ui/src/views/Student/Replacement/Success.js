import React from 'react';
import {
  Button,
  Card,
  CardImg,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

function SuccessAnimation(props) {
  const { scanAgain } = props;
  return (
    <Row>
      <Col xs="12" sm={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader>
            <Button color="primary" onClick={scanAgain}>Start again</Button>
          </CardHeader>
          <CardImg top width="100%" src="/icons/completed.gif" alt="Completed" />
        </Card>
      </Col>
    </Row>
  );
}

export default SuccessAnimation;
