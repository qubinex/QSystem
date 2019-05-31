import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardHeader,
  FormGroup,
  Input,
  Col,
  Row,
} from 'reactstrap';

function SuccessAnimation(props) {
  const { scanAgain, selectedStudentDetail, selectedScheduleDay, selectedScheduleStartTime } = props;
  return (
    <Row>
      <Col xs="12" sm={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader>
            <Button color="primary" size="sm" className="pull-right" onClick={scanAgain}>Scan again</Button>
          </CardHeader>
          <CardBody>
            <FormGroup row>
              <Col sm={6}>
                <Input readOnly value={(`${selectedStudentDetail.name}`) || ''} />
              </Col>
              <Col sm={6}>
                <Input readOnly value={(`${selectedStudentDetail.academy_group} | ${selectedStudentDetail.academy_level}`) || ''} />
              </Col>
              <Col sm={6}>
                <Input readOnly value={(`${selectedScheduleDay} | ${selectedScheduleStartTime.format('hh:mm A')}`) || ''} />
              </Col>
              <Col sm={6}>
                <Input readOnly value={(`${selectedStudentDetail.schedule_name}`) || ''} />
              </Col>
            </FormGroup>
          </CardBody>
          <CardImg top width="30%" height="30%" src="/icons/completed2.gif" alt="Completed" />
        </Card>
      </Col>
    </Row>
  );
}

export default SuccessAnimation;
