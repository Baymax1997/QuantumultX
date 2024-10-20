/****************************************
 
# 脚本名称: 节点位置查询
# 脚本作者: xiaomao
# 更新时间: 2024-08-12
# 仓库地址: https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/rewrite/script/txt/ipinfo.txt

****************************************/






var title = "XiaoMao节点位置信息查询";
$task
  .fetch({
    url: "https://apis.jxcxin.cn/api/bjip",
    timeout: 3000,
    opts: {
      policy: $environment.params,
    },
  })
  .then(
    (response) => {
      console.log("获取ip成功:" + response.body);
      getIpInfo(response.body);
    },
    (reason) => {
      $done({
        title: title,
        htmlMessage: errMsg("🛑 查询超时"),
      });
    }
  );

function getIpInfo(val) {
  const url = `https://www.dynu.com/zh-CN/NetworkTools/LocationByIP`;
  const method = `POST`;
  const body = {
    SubmitButton: "继续",
    Popup: false,
    Host: val,
    SubmitButton: "继续",
    "X-Requested-With": "XMLHttpRequest",
  };

  const myRequest = {
    url: url,
    method: method,
    body: JSON.stringify(body),
    timeout: 8000,
    opts: {
      policy: $environment.params,
    },
  };

  $task.fetch(myRequest).then(
    (response) => {
      let string = JSON.stringify(response);
      let start = string.indexOf("<pre>");
      let end = string.indexOf("</pre>");
      let stringDeal = string
        .substring(start + 5, end)
        .replace(/<\/?.+?>/g, "")
        .replace(/ /g, "");
      let stringArr = stringDeal.split("\\r\\n");

      $done({
        title: title,
        htmlMessage: ipFormat(stringArr),
      });

      $done();
    },
    (reason) => {
      $done({
        title: title,
        htmlMessage: errMsg("🛑 查询超时"),
      });
    }
  );
}
function errMsg(reason) {
  return (
    `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;"></br></br>` +
    reason +
    `</p>`
  );
}

function ipFormat(arr) {
  var html = "";
  if (arr.length) {
    arr.forEach((el) => {
      html += "</br><b><font>" + el + "</font>";
    });
  }

  return (
    `<p style="text-align: left; font-family: -apple-system; font-size: medium; font-weight: thin">` +
    html +
    `</p>`
  );
}