import vue from 'vue'
import toastComponent from './toast.vue'

// 返回一个 扩展实例构造器
const ToastConstructor = vue.extend(toastComponent);

function showToast(text, duration = 2000) {
    // 实例化一个 toast.vue
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data(){
            return{
                text: text,
                show: true,
                showContent: true
            }
        }
    })

    // 把实例化的 toast.vue添加到body里
    document.body.appendChild(toastDom.$el);

    // 提前执行动画
    setTimeout(() => {
        toastDom.showContent = false;
    },duration-250);
    // 经过duration时间后隐藏
    setTimeout(() => {
        toastDom.show = false;
    },duration);
}

// 注册为全局组件
function RegistToast(){
    // 将组件注册到Vue的 原型链中
    vue.prototype.$toast = showToast
}

export default RegistToast