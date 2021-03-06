import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import Axios from 'axios';
import QRReader from 'react-qr-reader';

class QRReaderComponent extends Component {
  handleScan = (qrCode) => {
    const { history, setVendorDetails, setStep } = this.props;
    if (qrCode) {
      this.makeBeepSound();
      Axios.post('main/searchByQRCode', { qrId: qrCode })
        .then((res) => {
          const { data } = res;
          if (data.length === 0) {
            setStep('2.2');
          } else {
            setVendorDetails(qrCode, data[0]);
            // setStep('2.1');
          }
        })
        .catch((err) => {

        });
    }
  }

  handleError = () => {

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
    );
  }
}

export default QRReaderComponent;
