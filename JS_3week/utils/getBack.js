export default function (el) {
  el.addEventListener('click',() => {
    history.go(-1);
  })
}    //  回退上个页面