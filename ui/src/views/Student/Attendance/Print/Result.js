import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
} from 'reactstrap';
import Moment from 'moment';
import ReactToPrint from 'react-to-print';
import ResultTable from './ResultTable';

class StudentRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isExistingUser: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { setDangerAlert, resetAlert } = this.props;
    const { isExistingUser } = this.state;
    const { setFlags } = this.props;

    resetAlert();
    if (isExistingUser === 1) {
      setFlags(2.2);
    } else if (isExistingUser === 0) {
      setFlags(2.1);
    } else {
      setDangerAlert(true, 'Please select a value');
    }
  }

  render() {
    const { result, setFlag, selectedTime } = this.props;
    const dates = result[1];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 12 }} md={{ size: 12 }} lg={{ size: 12 }} xl={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader>
                Attendances - {Moment(dates[0]).format('dddd')} {Moment(selectedTime, 'HH:mm:ss').format('hh:mm A')}
                <div className="pull-right">
                  <ReactToPrint
                    trigger={() => <Button>Print</Button>}
                    content={() => this.componentRef}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <ResultTable result={result} ref={el => (this.componentRef = el)} />
              </CardBody>
              <CardFooter>
                <div>
                  <Button onClick={() => setFlag(1)}>Reset</Button>
                </div>
              </CardFooter>
            </Card>

          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentRegistrationStep1;
