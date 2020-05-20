import {API_SHOPPING_SORT_ITEM_DATA} from './vender/URLS.js';
import requestWithLoading from "./vender/requestWithLoading.js";

export const shop_item_list = () => {
  return requestWithLoading({url:API_SHOPPING_SORT_ITEM_DATA}).then(data => {
    // console.log(data);
    const {food_spu_tags} = data;
    return food_spu_tags;
  })
};

export const deliverFee = () => {
  return requestWithLoading({url:API_SHOPPING_SORT_ITEM_DATA}).then(data =>{
    const {shopping_cart:{shipping_fee_cart_tip}} = data;
    return shipping_fee_cart_tip;
  })
};