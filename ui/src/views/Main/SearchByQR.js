import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

import QRReader from 'react-qr-reader';

class SearchByQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrId: '',
    };
  }

  handleScan = data => {
    if (data) {
      this.makeBeepSound();
      this.setState({
        qrId: data
      })
    }
  }

  makeBeepSound = () => {
    const vol = 100;
    const freq = 520;
    const duration = 200;

    const sound = new AudioContext();
    const v = sound.createOscillator();
    const u = sound.createGain();
    v.connect(u);
    v.frequency.value = freq;
    v.type = 'square';
    u.connect(sound.destination);
    u.gain.value = vol * 0.01;
    v.start(sound.currentTime);
    v.stop(sound.currentTime + duration * 0.001);
  }

  handleSearch = () => {

  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={{ offset: 3, size: 6 }}>
            <Card>
              <CardHeader>
                Scan QR code
              </CardHeader>
              <CardBody>
                <QRReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: '100%' }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </React.Fragment>
    )
  }
}

export default SearchByQR;
