/****************************************
 
#脚本名称: 今日辟谣
#脚本作者: yfamily
#更新时间: 2024-05-29
#仓库地址: https://raw.githubusercontent.com/deezertidal/private/main/rumors.js

****************************************/






const valueRegex = /<a href="..\/(.*?)"/;
const sourceUrl = "https://www.piyao.org.cn/jrpy/index.htm";
const targetUrl = "https://www.piyao.org.cn/";
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

if (typeof $httpClient !== "undefined") {
  $httpClient.get(sourceUrl, function (error, response, data) {
    if (error) {
      $notification.post("获取谣言辟谣内容失败", error);
      $done();
    } else {
      const match = data.match(valueRegex);
      if (!match || !match[1]) {
        $notification.post("获取${value}失败", "请检查源码是否有${value}的值");
        $done();
      } else {
        const targetValue = match[1];
        const targetContentUrl = targetUrl + targetValue;

        $httpClient.get(targetContentUrl, function (error, response, data) {
          if (error) {
            $notification.post("获取辟谣内容失败", error);
          } else {
const rumorRegex = /谣言：(.*?)<\/strong><\/span><\/p>/;
const truthRegex = /<strong>真相：<\/strong>(.*?)<\/p>/;
            const rumorMatch = data.match(rumorRegex);
            const truthMatch = data.match(truthRegex);

            if (!rumorMatch || !rumorMatch[1] || !truthMatch || !truthMatch[1]) {
              $notification.post("解析辟谣内容失败", "请检查辟谣内容的源码是否有变化");
            } else {
              const rumor = rumorMatch[1].replace(/<[^>]+>/g, "").trim();
              const truth = truthMatch[1].replace(/<[^>]+>/g, "").trim();
              const notificationContent = `今日谣言：${rumor}\n🔍真相：${truth}`;
              $notification.post("","",notificationContent);
            }
          }
          $done();
        });
      }
    }
  });
} else if (typeof $task !== "undefined") {
  $task.fetch({ url: sourceUrl }).then(
    function (response) {
      const data = response.body;
      const match = data.match(valueRegex);
      if (!match || !match[1]) {
        $notify("获取${value}失败", "请检查源码是否有${value}的值");
        $done();
      } else {
        const targetValue = match[1];
        const targetContentUrl = targetUrl + targetValue;

        $task.fetch({ url: targetContentUrl }).then(
          function (response) {
            const data = response.body;
            const rumorRegex = /<p tabindex="0">&emsp;&emsp;<span style="color: .+?;"><strong>谣言：(.*?)<\/strong><\/span><\/p>/;
            const truthRegex = /<strong>真相：<\/strong>(.*?)<\/p>/;
            const rumorMatch = data.match(rumorRegex);
            const truthMatch = data.match(truthRegex);

            if (!rumorMatch || !rumorMatch[1] || !truthMatch || !truthMatch[1]) {
              $notify("解析辟谣内容失败", "请检查辟谣内容的源码是否有变化");
            } else {
              const rumor = rumorMatch[1].replace(/<[^>]+>/g, "").trim();
              const truth = truthMatch[1].replace(/<[^>]+>/g, "").trim();
              const notificationContent = `今日谣言：${rumor}\n🔍真相：${truth}`;
              $notify("","",notificationContent);
            }
            $done();
          },
          function (error) {
            $notify("获取辟谣内容失败", error);
            $done();
          }
        );
      }
    },
    function (error) {
      $notify("获取谣言辟谣内容失败", error);
      $done();
    }
  );
}