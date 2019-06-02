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

class Dashboard extends Component {
  handleConnection = () => {

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
                <td>Vendor</td>
                <td>Current queue</td>
                <td>Your turn</td>
                <td />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-middle">Aloha vendor</td>
                <td className="align-middle">102 / 202</td>
                <td className="align-middle">
                  <Progress style={{ height: '20px' }} animated color={() => this.getProgressbarColor(50)} value={50}>Hang on! Est. 20 Mins</Progress>
                </td>
                <td className="align-middle">
                  <ButtonGroup>
                    <Button color="danger" type="button" size="sm">Leave queue</Button>
                    <Button color="warning" type="button" size="sm">
                      <i className="fa fa-warning" />
                      Cut Queue
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default Dashboard;
