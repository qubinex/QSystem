import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  CardBody,
  CardHeader,
  Card,
  Table,
  Progress,
} from 'reactstrap';
import Axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getQueueList();
  }

  leaveQueue = (id) => {
    const a = window.confirm("Are you sure?");
    if (a) {
      this.setState({ isLoading: true });
      Axios.put('/queue/leaveQueue', { id })
        .then((res) => {
          this.getQueueList();
        })
        .catch((err) => {
          // error
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  getQueueList = () => {
    this.setState({ isLoading: true });
    Axios.get('/queue/getQueueDashBoard')
      .then((res) => {
        const { data } = res;
        this.setState({ list: data });
        console.log(data);
      })
      .catch((err) => {
        // error
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  getProgressbarColor = (percentage) => {
    let color = 'info';
    if (percentage === 100) {
      color = 'success';
    } else if (percentage >= 80) {
      color = 'primary';
    } else if (percentage >= 60) {
      color = 'warning';
    } else if (percentage >= 40) {
      color = 'danger';
    }
    return color;
  }

  getList = () => {
    const { list } = this.state;
    let component = <tr><td colSpan="4">No queue yet, </td></tr>;
    if (list && list.length > 0) {
      component = list.map(e => (
        <tr key={e.id}>
          <td className="align-middle">{e.name}</td>
          <td className="align-middle">
            {e.current_queue || e.queue_nr} / {e.queue_nr}
          </td>
          <td className="align-middle">
            <Progress style={{ height: '20px' }} animated color={() => this.getProgressbarColor(50)} value={50}>Hang on! Est. 20 Mins</Progress>
          </td>
          <td>
            {e.is_cancelled ? 'Cancelled' : ''}
            {e.is_done ? 'DONE' : ''}
          </td>
          <td className="align-middle">
            {(e.is_cancelled || e.is_done) ? undefined : (
              <ButtonGroup>
                <Button color="danger" type="button" size="sm" onClick={() => this.leaveQueue(e.id)}>
                  Leave queue
                </Button>
                <Button color="warning" type="button" size="sm">
                  <i className="fa fa-warning" />
                  Cut Queue
                </Button>
              </ButtonGroup>
            )}
            
          </td>
        </tr>
      ));
    }
    return component;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          Dashboard
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <td>Merchant</td>
                <td>Current queue</td>
                <td>Your turn</td>
                <td>Status</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {this.getList()}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default Dashboard;
