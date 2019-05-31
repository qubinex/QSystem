import React, { Component } from 'react';
import axios from 'axios';

import Search from './Search';
import Result from './Result';

class StdentAttendancePrintIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: 1,
      selectedTime: '',
      result: [],
      step: 1,
    };
  }

  getComponent = () => {
    const { step, result, selectedTime } = this.state;
    const SearchComponent = <Search getAttendanceList={this.getAttendanceList} />;
    const ResultComponent = <Result result={result} setFlag={this.setFlag} selectedTime={selectedTime} />;

    let component = SearchComponent;
    switch (step) {
      case 2:
        // Select class schedule
        component = ResultComponent;
        break;
      default:
        component = SearchComponent;
    }
    return component;
  }

  setFlag = (stepI) => {
    this.setState({ step: stepI });
  }

  getAttendanceList = (dayI, timeI) => {
    this.setState({ selectedDay: dayI, selectedTime: timeI });
    axios.post('student/attendance/getAttendanceListByTime', { day: dayI, time: timeI })
      .then((response) => {
        // console.log(response);
        const { data } = response;
        this.setState({ result: data });
        this.setFlag(2);
      })
      .catch((err) => {
        //
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

export default StdentAttendancePrintIndex;
