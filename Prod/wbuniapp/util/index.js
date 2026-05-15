//引入vue
import Vue from "vue"
//必须实例化
var vm = new Vue()
// 获取当前日期
export function getDate() {
  const yy = new Date().getFullYear();
  const mm = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
  const dd = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
  const dateTime = yy + "-" + mm + "-" + dd;
  return dateTime;
}
export function getDateTime() {
  const yy = new Date().getFullYear();
  const mm = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
  const dd = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
  const hh = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
  const mf = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
  const ss = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
  const dateTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
  return dateTime;
}
export function uploadFilePromise(url) {//上传图片
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: uni.getStorageSync('imgUrl') + '/api/CommonCall/UploadCommon?userToken=' + uni.getStorageSync('UserToken'), // 仅为示例，非真实的接口地址
	  //url: uni.getStorageSync('imgUrl') + '/UploadCommon?userToken=' + uni.getStorageSync('UserToken'), // 仅为示例，非真实的接口地址
      filePath: url,
      name: 'file',
      formData: {},
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}
export function traObjKey(Obj) {//递归转小写
  if (typeof (Obj) == 'string') return Obj
  if (Array.isArray(Obj)) {
    //数组
    Obj.forEach((e, i) => {
      e = traObjKey(e)
    })
  } else {
    //对象
    for (var key in Obj) {
      Obj[key.toLowerCase()] = Obj[key];
      traObjKey(Obj[key])
    }
  }
  return Obj;

}
export function mergeObj(Obj1, Obj2) {//合并两个对象中相同的属性
  for (const key1 in Obj1) {
    for (const key2 in Obj2) {
      if (key1 == key2) Obj1[key1] = Obj2[key2]
    }
  }

}
export function updateApp(downloadUrl, updateType, newVersion, currentVersion) {//更新安装app
  uni.showModal({
                confirmText:uni.$vue.$t('common.确定'),
                cancelText:uni.$vue.$t('common.取消'),
    title: uni.$vue.$t('other.已发现新版本'),
    content: `${uni.$vue.$t('other.当前版本')}${currentVersion} ${uni.$vue.$t('other.最新版本') + newVersion}  ${uni.$vue.$t('other.立即更新')}`,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        var downloadTask = uni.downloadFile({
          url: downloadUrl,
          success: (downloadResult) => {
            waiting.close();
            plus.nativeUI.closeWaiting();
            plus.runtime.install(
              downloadResult.tempFilePath,
              {
                force: true
              },
              function () {
                //1是增量包 2是全包
                // if (updateType == 1) uni.setStorageSync('currentVersion', newVersion)
                // uni.setStorageSync('currentVersion', newVersion)
                // 应用热重启，重新启动进入首页。
                plus.runtime.restart();
                if (updateType == 2) return
                uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                  title: uni.$vue.$t('other.安装成功'),
                  content: uni.$vue.$t('other.已重新进入应用'),
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定');
                    } else if (res.cancel) {
                      console.log('用户点击取消');
                    }
                  }
                });
              },
              function (e) {
                console.log('安装失败');
                uni.showToast({
                  title: uni.$vue.$t('other.安装失败') + e.code + e.message,
                  icon: 'none'
                })
              })
          },
          fail: (err) => {
            console.log(err)
            uni.showToast({
              title: uni.$vue.$t('other.下载失败') + err.code + e.message,
              icon: 'none'
            })
          }
        })
        let waiting = plus.nativeUI.showWaiting(uni.$vue.$t('other.开始下载'));
        downloadTask.onProgressUpdate(item => {
          if (item.progress < 100 && item.totalBytesExpectedToWrite) {
            waiting.setTitle(uni.$vue.$t('other.正在下载') + item.progress + '% \n' + uni.$vue.$t('other.已下载') + (item.totalBytesWritten / 1024).toFixed(0) + 'kb/' + (item.totalBytesExpectedToWrite / 1024).toFixed(0) + 'kb');
          } else {
            waiting.close();
            plus.nativeUI.closeWaiting();
          }
        })
      } else if (res.cancel) {

      }
    }
  })

}

