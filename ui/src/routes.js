import React from 'react';
import Loadable from 'react-loadable';
import { Spinner, Row, Col } from 'reactstrap';
import RequireAuth from './utils/authHOC';

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return (
    <div>
      <Row>
        <Col size="12" className="text-center">
          <Spinner style={{ width: '10rem', height: '10rem' }} type="grow" color="primary" />
        </Col>
      </Row>
    </div>
  );
}
/*
const Breadcrumbs = Loadable({
  loader: () => import('./views/Base/Breadcrumbs'),
  loading: Loading,
});
*/
const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});
/*
const MainPage = Loadable({
  loader: () => import('./views/Main/main'),
  loading: Loading,
});
*/
const StudentIndex = Loadable({
  loader: () => import('./views/Student/Index'),
  loading: Loading,
});

const StudentRegistrationIndex = Loadable({
  loader: () => import('./views/Student/Registration/Index'),
  loading: Loading,
});

const StudentAttendanceIndex = Loadable({
  loader: () => import('./views/Student/Attendance/Index'),
  loading: Loading,
});

const StudentReplacementIndex = Loadable({
  loader: () => import('./views/Student/Replacement/Index'),
  loading: Loading,
});

const StudentAttendancePrintIndex = Loadable({
  loader: () => import('./views/Student/Attendance/Print/Index'),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  /*
    Project start
  */
  /* eslint-disable */
  // { path: '/Main', exact: true, name: 'Main', component: RequireAuth(MainPage) },
  { path: '/Student/Index', exact: true, name: 'StudentIndex', component: RequireAuth(StudentIndex) },
  { path: '/Student/Registration', exact: true, name: 'Student registration', component: RequireAuth(StudentRegistrationIndex) },
  { path: '/Student/Attendance', exact: true, name: 'Student attendance', component: RequireAuth(StudentAttendanceIndex) },
  { path: '/Student/Attendance/Print', exact: true, name: 'Print attendance', component: RequireAuth(StudentAttendancePrintIndex) },
  { path: '/Student/Replacement', exact: true, name: 'Attendance replacement', component: RequireAuth(StudentReplacementIndex) },

  // Project End
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  /* eslint-enable */
];

export default routes;
