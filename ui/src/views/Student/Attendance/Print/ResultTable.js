/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Moment from 'moment';
import AttendanceField from './AttendanceField';

class ResultTable extends Component {
  render() {
    const { result } = this.props;
    const dates = result[1];
    const attendances = result[0];
    return (
      <Table responsive bordered hover>
        <thead>
          <tr className="table-secondary">
            <td>Name</td>
            {
              dates.map(e => (
                <td key={e}>{Moment(e).format('YYYY-MMM-D')}</td>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            attendances.map(cols => (
              <tr key={cols.id}>
                <td className="table-primary">{cols.student_name}</td>
                {
                  dates.map(e => (
                    <AttendanceField key={e} attendanceInfo={cols[Moment(e).format('YYYY-MM-DD')]} />
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
  }
}

export default ResultTable;
