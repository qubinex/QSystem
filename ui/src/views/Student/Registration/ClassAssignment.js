import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Alert, Button } from 'reactstrap';
import Axios from 'axios';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

class Selectable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lessonSchedule: [],
      selectedSchedule: [],
      operationHourStart: new Date(),
      operationHourEnd: new Date(),
    };
  }

  componentWillMount() {
    this.getClassSchedule();
    this.getOperationHour();
  }

  getClassSchedule = () => {
    Axios.get('/lesson/lesson/getLessonSchedule')
      .then((response) => {
        const { data } = response;
        let responseData = data;
        for (let i = 0; i < responseData.length; i++) {
          // Modify the original string date to javascript date
          responseData[i].start = new Date(responseData[i].start);
          responseData[i].end = new Date(responseData[i].end);
        }
        this.setState({ lessonSchedule: responseData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getOperationHour = () => {
    Axios.get('/school/school/getOperationHour')
      .then((response) => {
        const { data } = response;
        const startTimeArr = data[0].operation_start.split(':');
        const endTimeArr = data[0].operation_end.split(':');
        this.setState({
          operationHourStart: new Date(2017, 10, 0, startTimeArr[0], startTimeArr[1], startTimeArr[2] ),
          operationHourEnd: new Date(2017, 10, 0, endTimeArr[0], endTimeArr[1], endTimeArr[2] ),
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  getStudentInfoComponent = () => {
    const { selectedStudents, newStudentInfo } = this.props;
    const { selectedSchedule } = this.state;
    const selectedScheduleStart = moment(selectedSchedule.start).format('HH:mm:SS');
    const selectedScheduleEnd = moment(selectedSchedule.end).format('HH:mm:SS');
    let component = <Row />;
    if (selectedStudents.length > 0) {
      component = (
        <React.Fragment>
          {
            selectedStudents.map((e) => {
              return (
                <Row key={e.id}>
                  <Col xs={3}>Name: {e.name}</Col>
                  <Col xs={6}>Class: {selectedSchedule.id === undefined ? '' : `${selectedSchedule.title} [${selectedScheduleStart}-${selectedScheduleEnd}]`}</Col>
                </Row>
              );
            })
          }
        </React.Fragment>
      );
    } else {
      component = (
        <Row>
          <Col xs={3}>Name: {newStudentInfo.lastName}, {newStudentInfo.firstName}</Col>
          <Col xs={6}>Class: {selectedSchedule.id === undefined ? '' : `${selectedSchedule.title} [${selectedScheduleStart}-${selectedScheduleEnd}]`}</Col>
        </Row>
      );
    }
    return component;
  }

  onSelectEvent = (event) => {
    const { setSelectedClass } = this.props;
    this.setState({ selectedSchedule: event });
    setSelectedClass(event);
  }

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    handleSubmit();
    //
  }

  render() {
    const { lessonSchedule, operationHourStart, operationHourEnd, selectedSchedule } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Class assignment
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={12}>
                <Alert color="info">
                  {
                    this.getStudentInfoComponent()
                  }
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <BigCalendar
                  selectable
                  localizer={localizer}
                  min={operationHourStart}
                  max={operationHourEnd}
                  events={lessonSchedule}
                  defaultView={BigCalendar.Views.WEEK}
                  defaultDate={new Date()}
                  onSelectEvent={event => this.onSelectEvent(event)}
                  views={['week', 'day']}
                />
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              type="button"
              className="pull-right"
              onClick={this.handleSubmit}
              disabled={(selectedSchedule.length === 0)}
            >
              Summary
              {' '}
              <i className="fa fa-arrow-circle-right" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Selectable;
