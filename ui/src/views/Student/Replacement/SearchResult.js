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
  Table,
} from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';
import ModalChangeDate from './ModalChangeDate';

class StudentRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      attendanceList: [],
      studentDetail: [],
      isModalOpen: false,
      attendanceId: '',
    };
  }

  componentDidMount() {
    // this.getResult();
  }

  getResultComponent = () => {
    const { selectedAttendanceId, scanAgain, studentDetail } = this.props;
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
    const { attendanceList, studentDetail, selectSlotForReplacement } = this.props;
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
          <Table>
            <thead>
              <tr>
                <th>System date</th>
                <th>Actual date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                attendanceList.map((e) => {
                  const momentAttendDateTime = moment(e.actual_attend_date);
                  const momentSystemAttendDateTime = moment(e.system_attend_date);
                  return (
                    <tr key={e.id}>
                      <td>{momentSystemAttendDateTime.format('MMM-DD, YYYY - hh:mm A')}</td>
                      <td>{momentAttendDateTime.format('MMM-DD, YYYY - hh:mm A')}</td>
                      <td>
                        <Button onClick={() => selectSlotForReplacement(e.id)}>
                          <i className="fa fa-calendar" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
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

  toggleChangeDateModal = (attendanceId) => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
    this.setState({ attendanceId });
  }

  render() {
    const { isLoading, isModalOpen, attendanceId } = this.state;
    const { qrId } = this.props;
    let component = this.getResultComponent();
    component = isLoading ? <div className="text-center"><Spinner type="grow" color="info" style={{ width: '5rem', height: '5rem' }} /></div> : component;

    return (
      <Row>
        <Col xs="12" sm={{ size: 6, offset: 3 }}>
          <ModalChangeDate isModalOpen={isModalOpen} toggleModal={this.toggleChangeDateModal} attendanceId={attendanceId} qrId={qrId} />
          {component}
        </Col>
      </Row>
    );
  }
}

export default StudentRegistration;
