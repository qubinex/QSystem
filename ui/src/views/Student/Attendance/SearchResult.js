import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Input,
  Label,
  Form,
  FormGroup,
  Row,
  Spinner,
} from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';

class StudentRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      attendanceList: [],
      studentDetail: [],
    };
  }

  componentDidMount() {
    this.getResult();
  }

  getResultComponent = () => {
    const { selectedAttendanceId, scanAgain } = this.props;
    const { studentDetail } = this.state;
    return (
      <Card body outline color="primary">
        <CardHeader>
          Attendance
        </CardHeader>
        { studentDetail ? this.getResultFound() : this.getResultNotFound() }
        <CardFooter>
          <Button color="danger" onClick={scanAgain}>Scan again</Button>
          <div className="pull-right">
            <Button
              color="primary"
              onClick={this.handleSubmit}
              disabled={!studentDetail || selectedAttendanceId === ''}
            >
              Submit
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  getResultNotFound = () => {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <CardBody>
          { isLoading ? <Spinner type="grow" color="info" /> : 'No result found' }
        </CardBody>
      </React.Fragment>
    );
  }

  getResultFound = () => {
    const { attendanceList, studentDetail } = this.state;
    const { selectedScheduleStartTime, selectedAttendanceId } = this.props;
    return (
      <React.Fragment>
        <CardBody>
          <FormGroup row>
            <Col sm={3}>
              <Label>Name</Label>
            </Col>
            <Col sm={9}>
              <Input readOnly value={studentDetail.name || ''} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={3}>
              <Label>Class</Label>
            </Col>
            <Col sm={9}>
              <Input readOnly value={(`${studentDetail.academy_group} | ${studentDetail.academy_level} | ${studentDetail.schedule_name}`) || ''} />
            </Col>
          </FormGroup>
        </CardBody>
        <CardHeader>
          Available attendance
        </CardHeader>
        <CardBody>
          <Form>
            {
              attendanceList.map((e) => {
                const todayDate = moment().get('date');
                const momentAttendDateTime = moment(e.actual_attend_date);
                const isSameStartTime = selectedScheduleStartTime.format('HH:mm:ss') === momentAttendDateTime.format('HH:mm:ss');
                const isSameDate = todayDate === momentAttendDateTime.get('date');
                const radioClass = classNames({ 'bg-info': isSameStartTime && isSameDate });
                const disable = (e.is_valid_attendance === 0 && e.canSubmitInvalidAttendance === 0) || e.is_taken === 1;
                const isNotValidAttendanceAndHasRightToSubmit = (e.is_valid_attendance === 0 && e.canSubmitInvalidAttendance === 1) && !e.is_taken === 1;
                return (
                  <FormGroup check key={e.id}>
                    <Label check className={radioClass}>
                      <Input
                        type="radio"
                        name="radio2"
                        value={e.id}
                        checked={Number(selectedAttendanceId) === Number(e.id)}
                        onChange={event => this.setAttendanceId(event, isNotValidAttendanceAndHasRightToSubmit)}
                        disabled={disable}
                      />
                      {' '}
                      {momentAttendDateTime.format('MMM-DD, YYYY - hh:mm A')}
                    </Label>
                  </FormGroup>
                );
              })
            }
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }

  setAttendanceId = (e, isNotValidAttendanceAndHasRightToSubmit) => {
    const { studentDetail } = this.state;
    const { setAttendanceId } = this.props;
    const target = e.target;
    const value = target.value;
    let confirm = true;
    if (isNotValidAttendanceAndHasRightToSubmit) {
      confirm = window.confirm('Press a button!');
    }
    if (confirm) {
      setAttendanceId(value, studentDetail.student_in_class_id);
    }
  }

  handleSubmit = () => {
    const { setDangerAlert, resetAlert, setSuccessSubmit } = this.props;
    const { selectedAttendanceId, selectedStudentInClassId } = this.props;
    resetAlert();
    const data = { attendanceId: selectedAttendanceId, studentInClassId: selectedStudentInClassId };
    axios.post('student/attendance/submitAttendance', data)
      .then((response) => {
        // console.log(response);
        setSuccessSubmit();
      })
      .catch((err) => {
        setDangerAlert(true, err.response.data.error);
      });
  }

  getResult = () => {
    const { qrCode, selectedScheduleStartTime, setSuccessSubmit } = this.props;
    let isAlreadyTaken = false;
    if (qrCode) {
      this.setState({ isLoading: true });
      // straight submit when the attendance is match
      axios.post('student/attendance/scanQRCode', { qrId: qrCode, selectedScheduleStartTime })
        .then((response) => {
          this.setState({ isLoading: false });
          const { data } = response;
          const attendanceList = data[0];
          const studentDetail = data[1][0];
          isAlreadyTaken = !!data[2];
          if (isAlreadyTaken) {
            // this array will only have value when it has matching attendance and auto submit
            setSuccessSubmit(studentDetail);
          } else {
            this.setState({
              attendanceList,
              studentDetail,
            });
          }
        })
        .catch((err) => {
          //
        })
        .finally(() => {
          if (!isAlreadyTaken) {
            this.setState({ isLoading: false });
          }
          
        });
    }
  }

  render() {
    const { isLoading } = this.state;
    let component = this.getResultComponent();
    component = isLoading ? <div className="text-center"><Spinner type="grow" color="info" style={{ width: '5rem', height: '5rem' }} /></div> : component;

    return (
      <Row>
        <Col xs="12" sm={{ size: 6, offset: 3 }}>
          {component}
        </Col>
      </Row>
    );
  }
}

export default StudentRegistration;
