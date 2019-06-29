import Footer from '@/components/serveComponent/common/Footer'
import ProgressDate from '@/components/serveComponent/common/ProgressDate'
import SearchInfoPage from '@/components/serveComponent/common/SearchInfoPage'
import SelectCity from '@/components/serveComponent/common/SelectCity'
import Title from '@/components/serveComponent/common/Title'
import UserBaseInfo from '@/components/serveComponent/common/UserBaseInfo'
import WorkProgress from '@/components/serveComponent/common/WorkProgress'
import Success from '@/components/serveComponent/common/Success'
import PhotoView from '@/components/serveComponent/common/PhotoView'

function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    Vue.component('Footer',Footer);
    Vue.component('ProgressDate',ProgressDate);
    Vue.component('SearchInfoPage',SearchInfoPage);
    Vue.component('SelectCity',SelectCity);
    Vue.component('Title',Title);
    Vue.component('UserBaseInfo',UserBaseInfo);
    Vue.component('WorkProgress',WorkProgress);
    Vue.component('Success',Success);
    Vue.component('PhotoView',PhotoView);
}

export default plugin