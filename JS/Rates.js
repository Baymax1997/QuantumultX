/****************************************
 
# 脚本名称: 汇率
# 脚本作者: yfamily
# 更新时间: 2024-08-12
# 仓库地址: https://raw.githubusercontent.com/deezertidal/private/main/rates.js

****************************************/






const url = "https://api.exchangerate-api.com/v4/latest/CNY";
const isQuantumultX = typeof $task !== "undefined";
const isSurge = typeof $httpClient !== "undefined";
const isLoon = typeof $loon !== "undefined";

function getExchangeRate() {
  if (isQuantumultX) {
    $task.fetch({ url: url }).then(
      (response) => {
        showNotification(response.body);
      },
      (reason) => {
        console.log(reason.error);
        $done();
      }
    );
  } else if (isSurge || isLoon) {
    $httpClient.get(url, function (error, response, data) {
      if (error) {
        console.log(error);
        $done();
      } else {
        showNotification(data);
      }
    });
  }
}

function showNotification(data) {
  const rates = JSON.parse(data).rates;
  const usdToCny = (1 / rates.USD).toFixed(2);
  const cnyToHkd = rates.HKD.toFixed(2);
  const cnyToJpy = rates.JPY.toFixed(2);
  const cnyToKrw = rates.KRW.toFixed(2);
  const eurToCny = (1 / rates.EUR).toFixed(2);
  const gbpToCny = (1 / rates.GBP).toFixed(2);
  const tryToCny = rates.TRY.toFixed(2);
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  });

  const content = `
🇺🇸1美元可兑换 ••• 🇨🇳人民币 ¥${usdToCny}
🇪🇺1欧元可兑换 ••• 🇨🇳人民币 ¥${eurToCny}
🇬🇧1英镑可兑换 ••• 🇨🇳人民币 ¥${gbpToCny}

🇨🇳1人民币兑换 ••• 🇭🇰港币 ¥${cnyToHkd}
🇨🇳1人民币兑换 ••• 🇯🇵日元 ¥${cnyToJpy}
🇨🇳1人民币兑换 ••• 🇰🇷韩元 ¥${cnyToKrw}
🇨🇳1人民币兑换 ••• 🇹🇷里拉 ¥${tryToCny}

  `;
 
  if (isQuantumultX) {
    $notify(`当前汇率信息 ${timestamp}`, "", content);
  } else if (isSurge || isLoon) {
    $notification.post(`当前汇率信息 ${timestamp}`, "", content);
  }
  $done();
}

getExchangeRate();