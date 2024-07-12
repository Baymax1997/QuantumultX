/****************************************
 
#脚本名称: QQ音乐热歌榜
#脚本作者: yfamily
#更新时间: 2024-05-29
#仓库地址: https://raw.githubusercontent.com/deezertidal/private/main/qm.js

****************************************/






let songCount = typeof $argument !== 'undefined' && $argument !== '' ? parseInt($argument) : 8;

const url = 'https://y.qq.com/n/ryqq/toplist/26';
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

if (typeof $httpClient !== 'undefined') {

  $httpClient.get(url, function(error, response, body) {
    if (error) {
      console.log('请求失败:', error);
      $done();
      return;
    }


    const pattern = /<a class="songlist__cover".*?title="(.*?)".*?<\/a>.*?<a title="(.*?)".*?href=".*?".*?<\/a>.*?<a class="playlist__author".*?>(.*?)<\/a>/g;
    let matches;
    let notificationContent = '';
    let count = 1;

    while ((matches = pattern.exec(body)) !== null && count <= songCount) {
      const songName = matches[2];
      const artistName = matches[3];
      notificationContent += `${count}.${songName}🎧${artistName}\n`;
      count++;
    }

    $notification.post('QQ音乐热歌榜', '', notificationContent);
    $done();
  });
} else if (typeof $task !== 'undefined') {

  const request = {
    url: url,
    headers: headers
  };

  $task.fetch(request).then(
    function(response) {
      const body = response.body;


      const pattern = /<a class="songlist__cover".*?title="(.*?)".*?<\/a>.*?<a title="(.*?)".*?href=".*?".*?<\/a>.*?<a class="playlist__author".*?>(.*?)<\/a>/g;
      let matches;
      let notificationContent = '';
      let count = 1;

      while ((matches = pattern.exec(body)) !== null && count <= songCount) {
        const songName = matches[2];
        const artistName = matches[3];
        notificationContent += `${count}.${songName} - ${artistName}\n`;
        count++;
      }

      $notify('QQ音乐热歌榜', '', notificationContent);
      $done();
    },
    function(reason) {
      console.log('请求失败:', reason.error);
      $done();
    }
  );
}
