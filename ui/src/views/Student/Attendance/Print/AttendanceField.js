import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './custom.css';

function AttendanceField(props) {
  const { attendanceInfo } = props;
  const noAttendance = attendanceInfo === null;
  const info = noAttendance ? [] : attendanceInfo.split(';');
  const isTaken = info[0] === '1' || false;
  const isReplaced = info[1] === '1' || false;
  const actualAttendDate = info[1] || '';
  const className = classNames({
    'table-success': isTaken,
    'table-default': !isTaken,
    // 'table-dark': noAttendance,
    stripe: noAttendance,
  });

  return (
    <td className={className}>
      {isTaken ? <i className="fa fa-check-circle-o fa-lg mt-4" /> : ''}
      {isReplaced ? actualAttendDate : ''}
    </td>
  );
}

AttendanceField.propTypes = { attendanceInfo: PropTypes.string };

AttendanceField.defaultProps = { attendanceInfo: '' };

export default AttendanceField;
