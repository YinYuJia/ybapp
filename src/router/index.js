import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/First';
import IndexComponent from '@/components/IndexComponent';
import My from '@/components/My';
import Healthy from '@/components/Healthy';
import dianzishebaoka from '@/components/dianzishebaoka'
import ChooseHos from '@/components/Bespeak/chooseHos'
import DocInfo from '@/components/Bespeak/DocInfo'
import ChooseDepartment from '@/components/Bespeak/chooseDepartment'
import DocList from '@/components/Bespeak/docList'
import Rule from '@/components/Bespeak/rule'
import RegisterConfirm from '@/components/Bespeak/registerConfirm'
import BespeakConfirm from '@/components/Bespeak/bespeakConfirm'
import PayDetails from '@/components/Bespeak/payDetails'
import LunbotuTest from '@/components/Lunbotu/LunbotuTest'
import BespeakDetails from '@/components/Bespeak/bespeakDetails'
import RegisterDetails from '@/components/Bespeak/RegisterDetails'
import PayPsw from '@/components/Bespeak/payPsw'
import PayConfirm from '@/components/Bespeak/payConfirm'
import PaySuccess from '@/components/Bespeak/paySuccess'
import Outpatient from '@/components/Outpatient'
import YiyaoIndex from '@/components/yiyao/yiyaoIndex'
import JianchaBaogao from '@/components/yiyao/baogao/JianchaBaogao'
import Paiduijiaohao from '@/components/yiyao/Paiduijiaohao'
import Work from '@/components/Work/WorkIndex'
import Daiyubaoxiao from '@/components/Work/daiyubaoxiao'
import Login from '@/components/Login'
import Canbaofuwu from '@/components/Work/Canbaofuwu'
import Beianfuwu from '@/components/Work/Beianfuwu'
import Qita from '@/components/Work/Qita'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Beianfuwu',
      name: 'Beianfuwu',
      component: Beianfuwu
    },
    {
      path: '/Qita',
      name: 'Qita',
      component: Qita
    },
    {
      path: '/first',
      name: 'FirstComponent',
      component: First
    },
    {
      path: '/IndexComponent',
      name: 'IndexComponent',
      component: IndexComponent
    },
    {
      path: '/My',
      name: 'My',
      component: My
    },
    {
      path: '/Healthy',
      name: 'Healthy',
      component: Healthy
    },
    {
      path: '/YiyaoIndex',
      name: 'YiyaoIndex',
      component: YiyaoIndex
    },
    {
      path: '/Work',
      name: 'Work',
      component: Work
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },

    {
      path: '/Daiyubaoxiao',
      name: 'Daiyubaoxiao',
      component: Daiyubaoxiao
    },
    {
      path: '/Paiduijiaohao',
      name: 'Paiduijiaohao',
      component: Paiduijiaohao
    },
    {
      path: '/Canbaofuwu',
      name: 'Canbaofuwu',
      component: Canbaofuwu
    },

    {
      path: '/LunbotuTest',
      name: 'LunbotuTest',
      component: LunbotuTest
    },
    {
      path: '/ChooseHos',
      name: 'ChooseHos',
      component: ChooseHos
    },
    {
      path: '/ChooseDepartment',
      name: 'ChooseDepartment',
      component: ChooseDepartment
    },
    {
      path: '/DocList',
      name: 'DocList',
      component: DocList
    },
    {
      path: '/DocInfo',
      name: 'DocInfo',
      component: DocInfo
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/RegisterConfirm',
      name: 'RegisterConfirm',
      component: RegisterConfirm
    },
    {
      path: '/BespeakConfirm',
      name: 'BespeakConfirm',
      component: BespeakConfirm
    },
    {
      path: '/PayDetails',
      name: 'PayDetails',
      component: PayDetails
    },
    {
      path: '/BespeakDetails',
      name: 'BespeakDetails',
      component: BespeakDetails
    },
    {
      path: '/PayPsw',
      name: 'PayPsw',
      component: PayPsw
    },
    {
      path: '/PayConfirm',
      name: 'PayConfirm',
      component: PayConfirm
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    },
    {
      path: '/RegisterDetails',
      name: 'RegisterDetails',
      component: RegisterDetails
    },
    {
      path: '/dianzishebaoka',
      name: 'dianzishebaoka',
      component: dianzishebaoka
    },
    {
      path: '/jianchabaogao',
      name: 'jianchabaogao',
      component: JianchaBaogao
    },
    {
      path: '/Outpatient',
      name: 'Outpatient',
      component: Outpatient
    }
  ]
})
