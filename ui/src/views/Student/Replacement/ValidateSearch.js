import * as Yup from 'yup';
import axios from 'axios';

/*
 how to use async in yup https://github.com/jquense/yup/issues/7
*/
const ValidateSearch = Yup.object().shape({
  qrId: Yup.string()
    .test('existingStudent', 'Please enter valid QRID', (value) => {
      return axios.post('student/attendance/scanQRCode', { qrId: value })
        .then((response) => {
          const { data } = response;
          const studentDetails = data[1];
          const hasValidData = studentDetails.length > 0;
          return hasValidData;
        })
        .catch((err) => {
          return false;
        });
    })
    .required('Required'),
});

export default ValidateSearch;
