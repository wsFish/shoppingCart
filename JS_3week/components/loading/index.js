import {parseToNode} from "../../utils/index.js";

const temp = `
  <div class="loading">
    <img src="../../assets/img/loading.gif" class="loading-img" />
  </div>
`;

export default () => parseToNode(temp)[0];
