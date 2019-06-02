import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import Axios from 'axios';

class MerchantMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }

  componentDidMount () {
    this.getQueueList();
  }

  getQueueList = () => {
    Axios.get('/merchant/main/getMerchantQueueList')
      .then((res) => {
        const { data } = res;
        this.setState({ list: data });
      })
      .catch((err) => {

      });
  }

  getListComponent = () => {
    const { list } = this.state;
    let component = <tr><td>Waiting for queue. Good luck!</td></tr>
    if (list && list.length > 0) {
      component = (
        list.map(e => (
          <tr>
            <td>{e.nickname === '' ? e.username : e.nickname}</td>
            <td>{e.reserve_capacity}</td>
            <td>{e.other_detail}</td>
            <td>
              <Button type="button" color="warning">
                <i className="fa fa-bell" />
              </Button>
              <Button type="button" color="success">
                <i className="fa fa-check" />
              </Button>
              <Button type="button" color="danger">
                <i className="fa fa-remove" />
              </Button>
            </td>
          </tr>
        ))
      )
    }
  }

  render() {
    return(
      <Col md={{ size:12 }}>
        <Card>
          <CardHeader>
            Marchant dashboard
          </CardHeader>
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <td>Customer name</td>
                  <td>Reserve capacity</td>
                  <td>Other info</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {this.getListComponent()}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default MerchantMain;
