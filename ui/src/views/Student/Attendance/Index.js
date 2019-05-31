import React, { Component } from 'react';
import moment from 'moment';
import ClassSchedule from './ClassSchedule';
import QRScan from './QRScan';
import CompletedAnimation from './Success';
import SearchResult from './SearchResult';

class StdentAttendanceIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScheduleId: '',
      selectedScheduleStartTime: moment().startOf('hour'),
      selectedScheduleDay: '',
      selectedStudentInClassId: '',
      selectedStudentDetail: [],
      selectedAttendanceId: 0,
      qrCode: '',
      step: 1,
    };
  }

  getComponent = () => {
    const {
      step,
      selectedScheduleId,
      selectedAttendanceId,
      selectedStudentInClassId,
      qrCode,
      selectedScheduleStartTime,
      selectedScheduleDay,
      selectedStudentDetail,
    } = this.state;
    const classSchedule = <ClassSchedule selectedSchedule={selectedScheduleId} selectSchedule={this.setSchedule} />;
    const qrScan = (
      <QRScan
        changeSchedule={this.changeSchedule}
        setQRCodeData={this.setQRCodeData}
        selectedScheduleDay={selectedScheduleDay}
        selectedScheduleStartTime={selectedScheduleStartTime}
        {...this.props}
      />
    );
    const searchResult = (
      <SearchResult
        qrCode={qrCode}
        scanAgain={this.scanAgain}
        selectedScheduleStartTime={selectedScheduleStartTime}
        setAttendanceId={this.setAttendanceId}
        selectedAttendanceId={selectedAttendanceId}
        selectedStudentInClassId={selectedStudentInClassId}
        setSuccessSubmit={this.setSuccessSubmit}
        {...this.props}
      />
    );
    const completeComponent = (
      <CompletedAnimation
        scanAgain={this.scanAgain}
        selectedStudentDetail={selectedStudentDetail}
        selectedScheduleDay={selectedScheduleDay}
        selectedScheduleStartTime={selectedScheduleStartTime}
      />
    )
    let component = classSchedule;
    switch (step) {
      case 1:
        // Select class schedule
        component = classSchedule;
        break;
      case 2:
        // QRScan
        component = qrScan;
        break;
      case 3:
        // Summary
        component = qrScan;
        break;
      case 4:
        component = searchResult;
        break;
      case 5:
        // Completed
        component = completeComponent;
        break;
      default:
        component = classSchedule;
    }
    return component;
  }

  setSchedule = (scheduleId, scheduleStartTime, scheduleDay) => {
    this.setState({
      selectedScheduleId: scheduleId,
      selectedScheduleStartTime: scheduleStartTime,
      selectedScheduleDay: scheduleDay,
      step: 2,
    });
  }

  setSuccessSubmit = (selectedStudentDetail) => {
    this.setState({
      step: 5,
      selectedStudentDetail,
    });
  }

  scanAgain = () => {
    this.setState({
      selectedScheduleId: '',
      selectedStudentInClassId: '',
      selectedAttendanceId: '',
      step: 2,
    });
  }

  changeSchedule = () => {
    this.setState({ step: 1 });
  }

  setAttendanceId = (attendanceId, studentInClassId) => {
    this.setState({
      selectedAttendanceId: attendanceId,
      selectedStudentInClassId: studentInClassId,
    });
  }

  setQRCodeData = (data) => {
    this.setState({
      qrCode: data,
      step: 4,
    });
  }

  render() {
    const component = this.getComponent();
    return (
      <React.Fragment>
        { component }
      </React.Fragment>
    );
  }
}

export default StdentAttendanceIndex;
