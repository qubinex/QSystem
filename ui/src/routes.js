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

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard/Dashboard'),
  loading: Loading,
});

const MainPage = Loadable({
  loader: () => import('./views/Main/Main'),
  loading: Loading,
});

const SearchByQR = Loadable({
  loader: () => import('./views/Main/SearchByQR'),
  loading: Loading,
});

const SearchByText = Loadable({
  loader: () => import('./views/Main/SearchByText'),
  loading: Loading,
});

const SearchResult = Loadable({
  loader: () => import('./views/Main/SearchResult'),
  loading: Loading,
});

const QueueStatus = Loadable({
  loader: () => import('./views/Main/QueueStatus'),
  loading: Loading,
});

const QueueStatusHeavy = Loadable({
  loader: () => import('./views/Main/QueueHeavy'),
  loading: Loading,
});

const MerchantMain = Loadable({
  loader: () => import('./views/Merchant/Main'),
  loading: Loading,
});

const RewardsMerchantMain = Loadable({
  loader: () => import('./views/Rewards/MerchantList'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-condg
const routes = [
  /*
    Project start
  */

  /* eslint-disable */
  // { path: '/Main', exact: true, name: 'Main', component: RequireAuth(MainPage) },
  { path: '/Main', exact: true, name: 'MainPage', component: RequireAuth(MainPage) },
  { path: '/Main/SearchByQR', exact: true, name: 'SearchByQR', component: RequireAuth(SearchByQR) },
  { path: '/Main/SearchByText', exact: true, name: 'SearchByText', component: RequireAuth(SearchByText) },
  { path: '/Main/SearchResult', exact: true, name: 'SearchResult', component: RequireAuth(SearchResult) },
  { path: '/Queue/Status', exact: true, name: 'Queue status', component: RequireAuth(QueueStatus) },
  { path: '/Queue/StatusHeavy', exact: true, name: 'Queue heavy', component: RequireAuth(QueueStatusHeavy) },
  { path: '/Rewards', exact: true, name: 'Merchant rewards', component: RequireAuth(RewardsMerchantMain) },


  { path: '/Merchant/Main', exact: true, name: 'Queue heavy', component: RequireAuth(MerchantMain) },
 
  // Project End
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  /* eslint-enable */
];

export default routes;
