import {ERROR_TIMEOUT,ERROR_NETWORK,ERROR_UNKNOWN} from './constants.js'

export default function (message) {
  if(message.toLowerCase().includes('timeout')) return ERROR_TIMEOUT;
  else if(message.toLowerCase().includes('network')) return ERROR_NETWORK ;
  return ERROR_UNKNOWN;
}