import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormGroup,
  Label,
  Col,
  Card,
  CardBody,
  Table,
  Button,
} from 'reactstrap';
import Axios from 'axios';

import FormikReactStrapInput from '../_common/component/formikReactStrapInput';

class SearchVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };
  }

  handleSearch = (searchVendor) => {
    Axios.post('/main/searchByText', { text: searchVendor })
      .then((res) => {
        const { data } = res;
        console.log(data);
        this.setState({ result: data });
      })
      .catch((err) => {
        //
      });
  }

  queueNow = (qrId, vendorDetail) => {
    const { setVendorDetails } = this.props;
    setVendorDetails(qrId, vendorDetail);
  }

  getComponent = () => {
    const { result } = this.state;
    let component = <tr><td colSpan="4">No result found</td></tr>;
    if (result && result.length > 0) {
      component = result.map(e => (
        <tr key={e.id}>
          <td>
            {e.name}
          </td>
          <td>
            {e.vendor_type}
          </td>
          <td>
            <Button color="primary" onClick={() => this.queueNow(e.qr_id, e)}>
              Queue now!
            </Button>
          </td>
        </tr>
      ))
    }
    return component;
  }

  render() {
    return (
      <Formik
        initialValues={{ searchVendor: '' }}
        render={({ values, errors, handleChange, handleBlur, handleSubmit, isValid, submitForm, setFieldValue }) => (
          <Form>
            <Card>
              <CardBody>
                <FormGroup row>
                  <Col xs="12">
                    <Field
                      name="searchVendor"
                      id="searchVendor"
                      placeholder="Search vendor"
                      component={FormikReactStrapInput}
                      onKeyUp={() => this.handleSearch(values.searchVendor)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Table>
                    <tbody>
                      {this.getComponent()}
                    </tbody>
                  </Table>
                </FormGroup>
              </CardBody>
            </Card>
          </Form>
        )}
      />
    );
  }
}

export default SearchVendor;
