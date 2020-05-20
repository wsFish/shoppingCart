import {SUCCESS_CODE,TIMEOUT} from "./constants.js";
import tip from '../../components/tips/index.js';

const baseOptions = {
  method:'get',
  timeout:TIMEOUT
};

export default (options) => {
  return new Promise((resolve, reject) => {
    axios({
      ...baseOptions,
      ...options
    })
      .then(res => {
      const {status, data:{code, data}} = res;

      if(status == 200 && code == SUCCESS_CODE) {
        setTimeout(() => {
          resolve(data)
        },1000);
      }
      else {
        reject(res);
      }
    }).catch( err => {
      reject(tip(err));
    })
  })
    .then(data => data)
    .catch(err => console.log('exist err'));
}