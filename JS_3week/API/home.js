import requestWithLoading from "./vender/requestWithLoading.js";
import {API_HOME_NAV_DATA,API_HOME_SHOP_DATA} from "./vender/URLS.js";
import {shuffle,_} from '../utils/index.js';

export const getHomeNavData = () =>{
  return requestWithLoading({url:API_HOME_NAV_DATA},_('.swiper-wrapper')).then(data => {
    if(data){
      const {primary_filter} = data;
      return primary_filter;
    }
    else return [];
  });
};

export const getHomeShopData = (() => {
    const params = {
      page:1,
      pageSize:10
    };

    const options = {
      url:API_HOME_SHOP_DATA,
      params
    };

    let loading = false;
    return function () {
        if(loading) return Promise.resolve([]);
        loading = true;

      return requestWithLoading(options,_('.shoplist')).then(data => {
        params.page++;
        loading = false;
        const {poilist} = data;
        return shuffle(poilist).slice(0,10);
      })
    }
})();       //使用立即执行函数来保留状态，否则无法执行之后的步骤，每次都会重新定义params和options