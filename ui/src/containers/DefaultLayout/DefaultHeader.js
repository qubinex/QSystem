import React, { Component } from 'react';
import Axios from 'axios';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/q.png';
import sygnet from '../../assets/img/brand/q.png';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      profilePic: 'default.png',
      isLoading: false,
      category: 'Home',
    };
  }

  componentWillMount() {
    // this.getProfile();
  }

  getProfile = () => {
    this.setState({ isLoading: false });
    Axios.post('/employee/employee/getProfile')
      .then((res) => {
        console.log(res);
        const { data } = res;
        const { username, email, profile_pic } = data[0];
        this.setState({
          username,
          email,
          profilePic: !profile_pic ? 'default.png' : profile_pic,
        });
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
  }

  setCategory = (category) => {
    const { getNavigationComponent } = this.props;
    this.setState({ category });
    getNavigationComponent(category);
  }

  handleLogout = () => {
    const { history } = this.props;
    history.push('/logout');
  }

  render() {
    // eslint-disable-next-line
    const { children, handleLogout, headers, ...attributes } = this.props;
    const { isLoading, category, profilePic, username, email } = this.state;
    return (
      <React.Fragment>
        <AppNavbarBrand
          className="d-md-down-none"
          full={{
            src: logo,
            width: 89,
            height: 25,
            alt: 'CoreUI Logo',
          }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="" navbar>
          {
            // category navigation
            headers.map((e, idx) => (
              <NavItem className="px-3" key={e.url}>
                <NavLink href={`#/${e.url}`} onClick={() => this.setCategory(e.name)} active={e.name === category}>
                  <i className={`fa fa-${e.icon} fa-lg`} aria-hidden="true" title={e.name} />
                </NavLink>
              </NavItem>
            ))
          }
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="fa fa-envelope-o" />
              <Badge pill color="danger">
              5
              </Badge>
            </NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              {isLoading || !profilePic ? <Spinner color="primary" /> : <img src={`assets/img/avatars/${profilePic}`} className="img-avatar" alt={email} />}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Welcome! </strong>
                {username}
              </DropdownItem>
              <DropdownItem><i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments" /> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user" /> Profile</DropdownItem>
              <DropdownItem href="#/logout">
                <i className="fa fa-lock" />
                Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
