export default  {
     setTitle(title) {
        dd.ready({
            developer: 'daip@dtdream.com',
            usage: [
              'dd.biz.navigation.setTitle',
            ],
            remark: '描述业务场景'
          }, function() {
            dd.biz.navigation.setTitle({
              title: title,
              onSuccess: function(data) {
              },
              onFail: function(error) {}
          })
          })
     },
     chooseImage( onSuccess , onFail ) {
          dd.ready({
            developer: 'daip@dtdream.com',
            usage: [
              'dd.device.notification.chooseImage',
            ],
            remark: '描述业务场景'
          }, function() {
            dd.device.notification.chooseImage ({
                onSuccess: (data) => {
                    onSuccess(data)
                },
                onFail: (error) => {
                    onFail(error)
                }
              })
          })
     },
     selectLocalCity(onSuccess,onFail ) {
        dd.ready({
            developer: 'daip@dtdream.com',
            usage: [
              'dd.biz.util.selectLocalCity',
            ],
            remark: '描述业务场景'
          }, function() {
            dd.biz.util.selectLocalCity ({
                onSuccess: (data) => {
                    onSuccess(data)
                },
                onFail: (error) => {
                    onFail(error)
                }
              })
          })
     },
     locationGet(onSuccess,onFail ) {
        dd.ready({
            developer: 'daip@dtdream.com',
            usage: [
              'dd.device.location.get',
            ],
            remark: '描述业务场景'
          }, function() {
            dd.device.location.get ({
                onSuccess: (data) => {
                    onSuccess(data)
                },
                onFail: (error) => {
                    onFail(error)
                }
              })
          })
     },
}