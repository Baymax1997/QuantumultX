/****************************************
 
#脚本名称: 快速水印
#脚本作者: chxm1023
#更新时间: 2024-05-30
#仓库地址: https://raw.githubusercontent.com/chxm1023/Rewrite/main/kuaisushuiyin.js

*****************************************

[rewrite_local]
^https?:\/\/api-qsy\.iiitool\.com\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/kuaisushuiyin.js

[mitm]
hostname = api-qsy.iiitool.com

使用声明：⚠️仅供参考，🈲转载与售卖！

****************************************/






var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  ...chxm1023.data,
  "is_forever" : true,
  "remaining_times" : 999,
  "vip_level" : 2,
  "vip_end_time" : 4092599349,
  "annual_fee" : 1,
  "vip_start_time" : 1716859131,
  "is_vip" : true
};

$done({body : JSON.stringify(chxm1023)});