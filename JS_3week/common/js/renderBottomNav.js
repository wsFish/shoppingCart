import {_} from '../../utils/index.js';
import {renderNavTab} from "../../components/index.js";

const gFoooterWrapper = _('.g-footer-container');

const bottomData = [
  {
    icon:'../../assets/img/homeIcon.png',
    activeIcon:'../../assets/img/homeIconActive.png',
    text:'首页',
    to:'../home/index.html',
    alt:'home-icon',      //图标显示失败会显示的文字
    path:'home'
  },
  {
    icon:'../../assets/img/myIcon.png',
    activeIcon:'../../assets/img/myIconActive.png',
    text:'我的',
    to:'../my/index.html',
    alt:'my-icon',      //图标显示失败会显示的文字
    path:'my'
  },
  {
    icon:'../../assets/img/orderIcon.png',
    activeIcon:'../../assets/img/orderIconActive.png',
    text:'订单',
    to:'../order/index.html',
    alt:'order-icon',      //图标显示失败会显示的文字
    path:'order'
  }
];

new renderNavTab(gFoooterWrapper,bottomData);