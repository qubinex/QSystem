import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Button, Row, Table, ButtonGroup } from 'reactstrap';
import Axios from 'axios';
import { LoadingSpinner } from '../_common/component';
import ButtonSubmit from '../_common/component/buttonSubmit';

class StudentIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      isModalOpen: false,
      isSubmitting: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  deleteData = (id) => {
    const { resetAlert, setDangerAlert, setSuccessAlert } = this.props;
    const r = window.confirm("Are you sure?");
    resetAlert();
    if (r === true) {
      this.setState({ isSubmitting: true });
      Axios.delete('/annoucement/employee/delete', { data: { target: id } })
        .then((response) => {
          setSuccessAlert(true, response.data);
          this.getData();
        })
        .catch((err) => {
          setDangerAlert(true, err.response.data.error);
          // send message to remote
        })
        .finally(() => {
          this.setState({ isSubmitting: false });
        });
    }
  }

  getData = () => {
    this.setState({
      isLoading: true,
      data: null,
    });
    Axios.get('/student/student/getList')
      .then((response) => {
        this.setState({
          data: response.data,
          isLoading: false,
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleModal = () => {
    const { isModalOpen, isSubmitting } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  getComponent = () => {
    const { data, isSubmitting } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-bullhorn" />
                Student list
                <Button color="primary" className="float-right" onClick={this.toggleModal}>New registration</Button>
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Idenity</th>
                      <th>Gender</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((row) => {
                        return (
                          <tr key={row.id}>
                            <td>
                              {row.id}
                            </td>
                            <td>
                              {row.last_name}
                              /
                              {row.first_name}
                            </td>
                            <td>
                              {row.identification_id}
                            </td>
                            <td>
                              {row.gender}
                            </td>
                            <td>
                              +
                              {row.contact_country_code}
                              -
                              {row.contact_number}
                            </td>
                            <td>
                              {row.email}
                            </td>
                            <td>
                              <ButtonGroup size="sm">
                                <Button
                                  color="primary"
                                  className="btn-square"
                                  onClick={() => this.deleteData(row.id)}
                                >
                                  <i className="fa fa-info-circle" />
                                </Button>
                                <ButtonSubmit
                                  type="submit"
                                  color="danger"
                                  text=""
                                  className="btn-square"
                                  iconInButton="fa fa-trash-o"
                                  isSaving={isSubmitting}
                                  onClick={() => this.deleteData(row.id)}
                                />
                              </ButtonGroup>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    const component = isLoading ? <LoadingSpinner /> : this.getComponent();
    return component;
  }
}

export default StudentIndex;
