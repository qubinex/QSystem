import React from 'react';
import {
  Button,
  Card,
  CardImg,
  CardFooter,
  Col,
  Row,
} from 'reactstrap';

function SuccessAnimation(props) {
  const { startAgain } = props;
  return (
    <Row>
      <Col xs="12" sm={{ size: 6, offset: 3 }}>
        <Card>
          <CardImg top width="100%" src="/icons/completed.gif" alt="Completed" />
          <CardFooter>
            <Button color="primary" onClick={startAgain}>Start again</Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
}

export default SuccessAnimation;
