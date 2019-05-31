import React, { Component } from 'react';
import { Spinner, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import { DateTimePicker } from 'react-widgets';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import Axios from 'axios';

import SelectDayDropDown from '../../_common/component/selectDayDropDown';
import CustomInputForm from '../../_common/component/formikReactStrapInput';

moment.locale('en');
momentLocalizer();

class GroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
      selectedDay: 1,
      slots: [],
    };
    this.myRef = React.createRef();
  }

  getSlotByDay = (day) => {
    Axios.post('/lesson/lesson/getClassTime', { day })
      .then((response) => {
        console.log(response.data);
        this.setState({
          slots: response.data,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  handleSubmit = (values) => {
    // qrId, attendanceId, replacementSlotId, replaceDate,
    const { attendanceId, toggleModal, qrId } = this.props;
    const { replacementDate, replacementSlotId } = values;

    const args = {
      qrId,
      attendanceId,
      replacementSlotId,
      replacementDate,
    };

    this.setState({ isSaving: true });
    Axios.post('student/replacement/submitReplacement', args)
      .then((res) => {
        toggleModal();
      })
      .catch((err) => {

      })
      .finally(() => {
        this.setState({ isSaving: false });
      });
  }

  render() {
    const { isSaving, slots } = this.state;
    const { isModalOpen, toggleModal } = this.props;
    return (
      <Formik
        ref={this.myRef}
        initialValues={{
          replacementDate: moment(),
          replacementSlotId: 0,
        }}
        enableReinitialize
        onSubmit={(values, actions) => {
          this.handleSubmit(values);
        }}
        render={({ values, handleSubmit, isValid, submitForm, setFieldValue }) => (
          <Modal isOpen={isModalOpen} toggle={() => toggleModal()}>
            <ModalHeader>
              Delete
            </ModalHeader>
            <ModalBody>
              <FormGroup row>
                <DateTimePicker
                  name="replacementDate"
                  time={false}
                  placeholder="Replacement date"
                  value={values.replacementDate.toDate()}
                  onChange={value => setFieldValue('replacementDate', moment(value))}
                  required
                />
              </FormGroup>
              <FormGroup row>
                <Col xs="6">
                  <SelectDayDropDown onChange={e => this.getSlotByDay(e.target.value)} />
                </Col>
                <Col xs="6">
                  <Field
                    type="select"
                    name="replacementSlot"
                    id="replacementSlot"
                    onChange={(e) => {
                      setFieldValue('replacementSlot', e.target.value);
                    }}
                    component={CustomInputForm}
                  >
                    <option value="0" disabled>Select a time</option>
                    {slots.map((item) => {
                      return (<option key={item.start_time} value={item.start_time}>{item.start_time}</option>);
                    })}
                  </Field>
                </Col>
                
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={isSaving} onClick={() => submitForm()}>
                {isSaving ? <Spinner color="light" type="grow" size="sm" /> : 'Save'}
              </Button>
              {' '}
              <Button color="secondary" onClick={() => toggleModal()}>Cancel</Button>
            </ModalFooter>
          </Modal>
        )}
      />
    );
  }
}

export default GroupModal;
