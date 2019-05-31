import React, { Component } from 'react';
/* eslint-disable object-curly-newline */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  FormGroup,
  CustomInput,
} from 'reactstrap';

class ExistingUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isCreateFamilyMember: null,
      isReadytoSubmit: false,
      isSearching: false,
      selectedStudents: [],
    };
    this.myForm = React.createRef();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  selectStudent = (event, id) => {
    const target = event.target;
    const checked = target.checked;
    const { selectedStudents } = this.state;
    const { students } = this.props;
    let newArr = selectedStudents;
    if (checked) {
      const newStudent = students.find((value) => {
        return value.id === id;
      });
      newArr.push(newStudent);
    } else {
      newArr = newArr.filter((value) => {
        return value.id !== id;
      });
    }

    this.setState({
      selectedStudents: newArr,
      isReadytoSubmit: newArr.length > 0,
    });
  }

  setIsCreateFamilyMember = (createFamily) => {
    this.setState({ isCreateFamilyMember: createFamily });
  }

  handleSubmit_ = (event) => {
    event.preventDefault();
    const { selectedStudents, isCreateFamilyMember } = this.state;
    const { setFlags, setStudentDetail, setCreateFamily } = this.props;
    let step = 1;
    if (selectedStudents.length > 0) {
      step = 4;
      setFlags(step);
      setStudentDetail(selectedStudents);
    } else if (isCreateFamilyMember) {
      step = 3.2;
      setFlags(step);
      setCreateFamily(isCreateFamilyMember);
    }
  }

  render() {
    const { isReadytoSubmit, isCreateFamilyMember } = this.state;
    const { students } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <strong>Find existing user</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  {
                    students.map((e) => {
                      return <CustomInput key={e.id} type="checkbox" id={`student-${e.id}`} label={`${e.name}`} onChange={event => this.selectStudent(event, e.id)} />;
                    })
                  }
                </FormGroup>
                <FormGroup row>
                  <Col xs={6}>
                    <Button
                      type="button"
                      outline={!isCreateFamilyMember}
                      color="success"
                      size="lg"
                      block
                      onClick={() => this.setIsCreateFamilyMember(true)}
                    >
                      {isCreateFamilyMember ? <i className="fa fa-check" /> : ''}
                      New family member
                      {' '}
                      <i className="fa fa-child" />
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button
                      type="button"
                      outline={isCreateFamilyMember}
                      color="success"
                      size="lg"
                      block
                      onClick={() => this.setIsCreateFamilyMember(false)}
                    >
                      {!isCreateFamilyMember ? <i className="fa fa-check" /> : ''}
                      Class assignment
                      {' '}
                      <i className="fa fa-calendar" />
                    </Button>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  type="button"
                  className="pull-right"
                  onClick={this.handleSubmit_}
                  disabled={!(isReadytoSubmit || isCreateFamilyMember)}
                >
                  Next step
                  {' '}
                  <i className="fa fa-arrow-circle-right" />
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ExistingUser;
