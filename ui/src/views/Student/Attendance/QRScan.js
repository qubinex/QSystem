import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  FormGroup,
  Row,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import QrReader from 'react-qr-reader';
import CustomInputForm from '../../_common/component/formikReactStrapInput';
import ValidateSearch from './ValidateSearch';

class StudentRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrId: '',
      delay: 200,
      result: 'No result',
      hasScanned: false,
    };
    this.handleScan = this.handleScan.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    // debug purpose
    // this.handleScan('ezy-000000001');
  }

  getQrCodeComponent = () => {
    const { hasScanned, qrId } = this.state;
    const { changeSchedule, selectedScheduleDay, selectedScheduleStartTime, setQRCodeData } = this.props;
    return (
      <Formik
        ref={this.myRef}
        map
        initialValues={{ qrId: '' }}
        validationSchema={ValidateSearch}
        onSubmit={(values) => {
          setQRCodeData(values.qrId);
        }}
        render={({ handleSubmit, isValid, submitForm, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <strong>Scan student card QR code</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="qrId" sm={4}>QR ID</Label>
                  <Col sm={6}>
                    <Field
                      name="qrId"
                      id="qrId"
                      placeholder="QR ID"
                      component={CustomInputForm}
                      onChange={(e) => {
                        this.setState({ qrId: e.target.value });
                        setFieldValue('qrId', e.target.value);
                      }}
                      value={qrId}
                    />
                  </Col>
                  <Col sm="2">
                    <Button
                      color="primary"
                      type="button"
                      className="pull-right"
                      onClick={() => submitForm()}
                      disabled={!(isValid)}
                      block
                    >
                      <i className="fa fa-arrow-circle-right" />
                    </Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4">
                    <Label>Selected schedule</Label>
                  </Col>
                  <Col sm={6}>
                    <Input readOnly value={(`${selectedScheduleDay} | ${selectedScheduleStartTime.format('hh:mm A')}`) || ''} />
                  </Col>
                  <Col sm="2">
                    <Button
                      color="warning"
                      type="button"
                      className="pull-right"
                      onClick={() => changeSchedule()}
                      block
                    >
                      <i className="fa fa-undo" />
                    </Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                    showViewFinder={!hasScanned}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Form>
        )}
      />
    );
  }

  handleScan(data) {
    const { setQRCodeData } = this.props;
    // const { setQRCodeData } = this.props;
    if (data) {
      this.setState({ qrId: data });
      // setQRCodeData(data);
      this.myRef.current.setFieldValue('qrId', data);
      this.myRef.current.submitForm();
    }
  }

  handleError(err) {
    console.error(err);
  }

  render() {
    const component = this.getQrCodeComponent();

    return (
      <Row>
        <Col xs="12" sm={{ size: 6, offset: 3 }}>
          {component}
        </Col>
      </Row>
    );
  }
}

export default StudentRegistration;
