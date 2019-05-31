import React, { Component } from 'react';
import moment from 'moment';
import Axios from 'axios';
import QRScan from './QRScan';
import SearchResult from './SearchResult';
import SelectSlot from './SelectSlot';
import Success from './Success';

class StdentAttendanceIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentDetail: [],
      attendanceList: [],
      isLoading: false,
      qrCode: '',
      step: 1,
      attendanceId: null,
    };
  }

  getComponent = () => {
    const { step, qrCode, attendanceList, studentDetail, attendanceId } = this.state;
    const searchResultComponent = (
      <SearchResult
        attendanceList={attendanceList}
        studentDetail={studentDetail}
        qrId={qrCode}
        selectSlotForReplacement={this.selectSlotForReplacement}
      />
    );
    const qrScanComponent = <QRScan setQRCodeData={this.setQRCodeData} />;
    const selectSlotComponent = <SelectSlot attendanceId={attendanceId} qrId={qrCode} showCompleted={this.showCompleted} scanAgain={this.scanAgain} />;
    const successComponent = <Success scanAgain={this.scanAgain} />;
    let component = qrScanComponent;
    switch (step) {
      case 2:
        component = searchResultComponent;
        break;
      case 3:
        component = selectSlotComponent;
        break;
      case 99:
        component = successComponent;
        break;
      default:
        component = qrScanComponent;
    }
    return component;
  }

  scanAgain = () => {
    this.setState({
      qrCode: '',
      step: 1,
    });
  }

  showCompleted = () => {
    this.setState({ step: 99 });
  }

  selectSlotForReplacement = (attendanceId) => {
    this.setState({ 
      step: 3,
      attendanceId,
    })
  }

  setQRCodeData = (data) => {
    this.setState({ isLoading: true, qrCode: data });
    Axios.post('student/replacement/scanQRCode', { qrId: data })
      .then((response) => {
        const { data } = response;
        this.setState({
          attendanceList: data[0],
          studentDetail: data[1][0],
          step: 2,
        });
      })
      .catch((err) => {
        // 
      })
      .finally(() => {
        this.setState({ isLoading: false });
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
