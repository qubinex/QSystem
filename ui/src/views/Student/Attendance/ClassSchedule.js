import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  Form,
  FormGroup,
  Row,
  Spinner,
} from 'reactstrap';
import SelectDayDropDown from '../../_common/component/selectDayDropDown';

class StudentRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      selectedDay: parseInt(moment().format('E'), 10),
      isLoadingSchedule: false,
    };
  }

  componentDidMount() {
    this.getClassSchedule(moment().format('E'));
  }

  getClassSchedule = (currentDay) => {
    this.setState({
      selectedDay: currentDay,
      isLoadingSchedule: true,
    });
    axios.post('student/attendance/getClassSchedule', { day: currentDay })
      .then((response) => {
        const { data } = response;
        console.log(data);
        this.setState({ schedules: data });
      })
      .catch((err) => {

      })
      .finally(() => {
        this.setState({ isLoadingSchedule: false });
      });
  }

  getScheduleComponent = () => {
    const { schedules, selectedDay, isLoadingSchedule } = this.state;
    const currentTime = moment();
    const { selectSchedule } = this.props;
    let component = <div className="text-center">{isLoadingSchedule ? <Spinner type="grow" color="info" /> : 'No schedule'}</div>;
    if (schedules.length > 0) {
      component = (
        <React.Fragment>
          {
            schedules.map((e) => {
              const timeBefore = moment(e.start_time, 'HH:mm:ss');
              const timeAfter = moment(e.end_time, 'HH:mm:ss');
              const selectedDayString = moment().startOf('isoWeek').add(selectedDay - 1, 'days').format('dddd');
              return (
                <Button
                  block
                  outline
                  active={currentTime.isBetween(timeBefore, timeAfter)}
                  color="dark"
                  key={e.id}
                  onClick={() => selectSchedule(e.id, timeBefore, selectedDayString)}
                >
                  {timeBefore.format('hh:mm:ss A')} - {timeAfter.format('hh:mm:ss A')}
                </Button>
              );
            })
          }
        </React.Fragment>
      );
    }
    return component;
  }

  handleDayChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.getClassSchedule(value);
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <Row>
        <Col xs="12" sm={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              Select class schedule
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="selectDay">Select day</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <SelectDayDropDown onChange={this.handleDayChange} SelectedDay={selectedDay} />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label>
                    Current time:
                    {' '}
                    <strong>
                      {moment().format('dddd') } | {moment().format('hh:mm A') }
                    </strong>
                  </Label>
                  {this.getScheduleComponent()}
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default StudentRegistration;
