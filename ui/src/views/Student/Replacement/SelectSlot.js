import React, { Component } from 'react';
import { Card, CardHeader, CardBody, FormGroup, Col, Button } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import { DateTimePicker } from 'react-widgets';
import momentLocalizer from 'react-widgets-moment';
import Moment from 'moment';
import Axios from 'axios';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-widgets/dist/css/react-widgets.css';

import ButtonSaving from '../../_common/component/buttonSubmit';

const localizer = BigCalendar.momentLocalizer(Moment);
Moment.locale('en');
momentLocalizer();

class SelectSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving : false,
      slots: [],
      selectedSlot: null,
      selectedDate: Moment(),
      selectedAttendace: null,
      operationHourStart: new Date(),
      operationHourEnd: new Date(),
    };
  }

  componentWillMount() {
    this.getOperationHour();
    this.getClassScheduleSlots(Moment().format('YYYY-MM-DD'));
  }

  getClassScheduleSlots = (date) => {
    Axios.post('/lesson/lesson/getLessonSlotsByDay', { date })
      .then((response) => {
        const { data } = response;
        const responseData = data;
        console.log(data)
        for (let i = 0; i < responseData.length; i++) {
          // Modify the original string date to javascript date
          responseData[i].start = new Date(responseData[i].start);
          responseData[i].end = new Date(responseData[i].end);
        }
        this.setState({ slots: responseData });
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

  handleDateOnChange = (date) => {
    this.setState({ selectedDate: Moment(date) });
    this.getClassScheduleSlots(Moment(date).format('YYYY-MM-DD'));
  }

  onSelectEvent = (event) => {
    const { id } = event;
    this.setState({ selectedSlot: event });
  }

  submitReplacement = () => {
    const { selectedSlot } = this.state;
    const { attendanceId, qrId, showCompleted } = this.props;
    this.setState({ isSaving: true });
    const args = {
      selectedSlot,
      attendanceId,
      qrId,
    };
    Axios.post('/student/replacement/submitReplacement', args)
      .then((res) => {
        showCompleted();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isSaving: false });
      });
  }

  render() {
    const { operationHourStart, operationHourEnd, slots, selectedDate, isSaving } = this.state;
    const { currentAttendanceDate, scanAgain } = this.props;
    return (
      <Card>
        <CardHeader>
          Select a replacement slot
          <div className="pull-right">
            <Button color="warning" onClick={() => scanAgain()}>Scan again</Button>
            <ButtonSaving onClick={this.submitReplacement} isSaving={isSaving} text="Submit" />
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Col md="4">
              <FormGroup>
                <DateTimePicker
                  name="replacementDate"
                  time={false}
                  placeholder="Replacement date"
                  value={selectedDate.toDate()}
                  onChange={value => this.handleDateOnChange(value)}
                  required
                />
              </FormGroup>
            </Col>
          </div>
          <div>
            <Col md="12">
              <BigCalendar
                selectable
                localizer={localizer}
                min={operationHourStart}
                max={operationHourEnd}
                events={slots}
                defaultView={BigCalendar.Views.DAY}
                defaultDate={new Date()}
                date={selectedDate.toDate()}
                onNavigate={() => {}}
                onSelectEvent={event => this.onSelectEvent(event)}
                views={['day']}
              />
            </Col>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default SelectSlot;
