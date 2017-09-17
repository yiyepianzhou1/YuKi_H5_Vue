/**
 * Created by Administrator on 2017/9/13.
 */
//公共组件，获取userid
//设置添加uesrids
export var keys = userids
export function setitem(values) {
  var value = localStorage.getItem(keys)|| "[]";
  var newvalues =JSON.parse(value);
  newvalues.push(values)
    }
//获取userids
export function getitem(){
  var values = localStorage.getItem(keys)||"[]";
  return JSON.parse(values)
}
