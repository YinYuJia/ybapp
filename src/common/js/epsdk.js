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
    //  移动支付
     mobelPay(onSuccess,onFail) {
        dd.ready({
            developer: 'daip@dtdream.com',
            usage: [
              'dd.biz.navigation.open',
            ],
            remark: '移动支付'
          }, function() {
            dd.biz.navigation.open ({
                pageId: 'card',
                params:{
                    id:"medicalPayCard",
                    functionType:1//1医保SDK
                },
                onSuccess: (data) => {
                    onSuccess(data)
                },
                onFail: (error) => {
                    onFail(error)
                }
              })
          })
     },
    //  支付码
     payCode(onSuccess,onFail) {
        dd.ready({
            developer: 'daip@dtdream.com',
            usage: [
              'dd.biz.navigation.open',
            ],
            remark: '支付码'
          }, function() {
            dd.biz.navigation.open ({
                pageId: 'card',
                params:{
                    id:"medicalPayCard",
                    functionType:2//1社保卡首页 2打开社保卡支付码 3打开社保卡关联页
                    },
                onSuccess: (data) => {
                    onSuccess(data)
                },
                onFail: (error) => {
                    onFail(error)
                }
              })
          })
     },
    //  电子社保卡
     socialCard(onSuccess,onFail) {
        dd.ready({
            developer: 'daip@dtdream.com',
            usage: [
              'dd.biz.navigation.open',
            ],
            remark: '支付码'
          }, function() {
            dd.biz.navigation.open ({
                pageId: 'card',
                params:{
                    id:"socialCard",
                    functionType:1//1社保卡首页 2打开社保卡支付码 3打开社保卡关联页
                },
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