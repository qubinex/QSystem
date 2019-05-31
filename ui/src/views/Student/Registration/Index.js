import React, { Component } from 'react';

import Axios from 'axios';
import Step1 from './Step1';
import Registration from './Registration';
import Medication from './Medication';
import ExistingUser from './ExistingUser';
import ClassAssignment from './ClassAssignment';
import Success from './Success';

class StudentRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      currentStep: 1,
      isSearching:false,
      isExistingUser: false,
      isCreateNewFamily: false,
      isCreateNewUser: false,
      uid: null,
      email: '',
      contactLast4Digits: '',
      students: [],
      selectedStudents: [],
      selectedClass: null,
      newStudentInfo: [],
      newStudentMedicationInfo: []
    };
  }

  searchExistingUser = (email_, contactLast4Digits_) => {
    const { setDangerAlert, resetAlert } = this.props;
    resetAlert();

    this.setState({
      email: email_,
      contactLast4Digits: contactLast4Digits_,
      isSearching: true,
      selectedStudents: [],
    });

    Axios.post('/student/student/getExistingStudentAndChildDetails', { email: email_, contactLast4Digits: contactLast4Digits_ })
      .then((response) => {
        const { data } = response;
        // console.log(data);
        if (data.length > 0) {
          this.setState({ students: data });
          this.setFlags(2.2);
        } else {
          this.setFlags(2.1);
        }
      })
      .catch((err) => {
        setDangerAlert(true, err.response.data.error);
      })
      .finally(() => {
        this.setState({ isSearching: false });
      });
  }

  getCurrentComponent = () => {
    const { currentStep, selectedStudents, students, newStudentInfo, newStudentMedicationInfo, email } = this.state;
    let component = null;
    switch (currentStep) {
      case 2.1:
        // New user
        component = <Registration setFlags={this.setFlags} {...this.props} setNewStudentInfo={this.setNewStudentInfo} newStudentInfo={newStudentInfo} email={email} />;
        break;
      case 2.2:
        // Exisiting user/ new family
        component = <ExistingUser email={email} setFlags={this.setFlags} students={students} {...this.props} setStudentDetail={this.setStudentDetail} setCreateFamily={this.setCreateFamily} />;
        break;
      case 3:
        // New student medication details
        component = <Medication setFlags={this.setFlags} {...this.props} setNewStudentMedicationinfo={this.setNewStudentMedicationinfo} newStudentMedicationInfo={newStudentMedicationInfo} />;
        break;
      case 4:
        component = (
          <ClassAssignment
            setFlags={this.setFlags}
            {...this.props}
            selectedStudents={selectedStudents}
            newStudentInfo={newStudentInfo}
            setSelectedClass={this.setSelectedClass}
            handleSubmit={this.handleSubmit}
          />
        );
        break;
      case 999:
        component = <Success startAgain={this.startAgain} />;
        break;
      default:
        component = (
          <Step1
            setFlags={this.setFlags}
            {...this.props}
            searchExistingUser={this.searchExistingUser}
          />
        );
    }

    return component;
  }

  setCreateFamily = (flag) => {
    this.setState({ isCreateNewFamily: flag });
  }

  setFlags = (step) => {
    this.setState({ currentStep: step });
  }

  setStudentDetail = (selectedStudents_) => {
    this.setState({ selectedStudents: selectedStudents_ });
  }

  setSelectedClass = (event) => {
    this.setState({ selectedClass: event });
  }

  setNewStudentInfo = (info) => {
    this.setState({ newStudentInfo: info });
    this.setFlags(3);
  }

  setNewStudentMedicationinfo = (info) => {
    this.setState({
      newStudentMedicationInfo: info,
      currentStep: 4,
    });
  }

  startAgain = () => {
    // const { history, location } = this.props;
    // history.push(location.pathname);
    this.setFlags(1);
  }

  handleSubmit = () => {
    const {
      selectedStudents,
      selectedClass,
      newStudentInfo,
      newStudentMedicationInfo,
    } = this.state;

    if (selectedStudents.length > 0) {
      console.log('assigning class only');
      const payload = {selectedClass: selectedClass, selectedStudents: selectedStudents};
      Axios.post('/student/student/assignClass', payload)
        .then((response) => {
          // console.log(response);
          this.setFlags(999);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else if (Object.keys(newStudentInfo).length > 0) {
      console.log('creating new student');
      const payload = {
        selectedClass: selectedClass,
        newStudentInfo: newStudentInfo,
        newStudentMedicationInfo: newStudentMedicationInfo
      };
      Axios.post('/student/student/createStudentAndAssignClass', payload)
        .then((response) => {
          // Rensponse of creating new student
          console.log(response);
          this.setFlags(999);
        })
        .catch((err) => {

        });
    }
  }

  render() {
    const component = this.getCurrentComponent();
    return (
      <React.Fragment>
        {component}
      </React.Fragment>

    );
  }
}

export default StudentRegistration;
