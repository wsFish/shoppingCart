import request from "./request.js";
import {renderLoading} from "../../components/index.js";

export default function (options,el) {
  if(!el) return request(options);

  let loadingEl = renderLoading();

  el.append(loadingEl);

  return request(options).then( data => {
    loadingEl.remove();
    loadingEl = null;
    return data;
  })

}