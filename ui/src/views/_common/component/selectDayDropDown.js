import React, { Component } from 'react';
import { Input } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

class SelectDayDropDown extends Component {

  getComponent = () => {
    const dayOption = [];
    const currentDay = moment().startOf('isoWeek');
    for (let i = 1; i <= 7; i += 1) {
      const d = (<option key={i} value={i}>{currentDay.format('dddd')}</option>);
      dayOption.push(d);
      currentDay.add(1, 'days');
    }
    return dayOption;
  }

  render() {
    const { onChange, SelectedDay, disabled } = this.props;
    const dayOptions = this.getComponent();
    return (
      <Input type="select" name="selectDay" id="selectDay" disabled={disabled} defaultValue={SelectedDay} onChange={e => onChange(e)}>
        <option disabled value="0">Please select a day</option>
        {
          dayOptions.map(e => e)
        }
      </Input>
    );
  }
}
SelectDayDropDown.propTypes = {
  onChange: PropTypes.func,
  SelectedDay: PropTypes.number,
  disabled: PropTypes.bool,
};

SelectDayDropDown.defaultProps = {
  onChange: () => {},
  SelectedDay: 1,
  disabled: false,
};

export default SelectDayDropDown;
