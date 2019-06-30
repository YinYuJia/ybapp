<template>
    <div class="download">
        <Title :title="'打印参保证明'" :backRouter="'/searchPrint'"></Title>
        <!-- 按钮 -->
        <div class="img">
            <img :src="imgurl" alt="">
        </div>
        <footer class="Btn active" @click="saveImage()">
            下载PDF
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgurl: '',
                pdfUrl: ''
            }
        },
        created() {
            this.epFn.setTitle('打印参保证明')
            console.log(JSON.parse(sessionStorage.getItem("searchPrintData")))
            const data = JSON.parse(sessionStorage.getItem("searchPrintData"))
            if (data.enCode == 1000) {
                this.imgurl = data.imgUrl
                this.pdfUrl = data.pdfUrl
                console.log('data.imgUrl', data.imgUrl)
                console.log('data.pdfUrl', data.pdfUrl)
            }
        },
        methods: {
            search() {
                window.location.href = this.pdfUrl
            },
            saveImage() {
                console.log(2222)
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

                if ( isiOS ) {
                        window.location.href = this.pdfUrl

                }else{
                    window.location.href = this.pdfUrl 
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .download {
        .Title {
            height: 1.2rem;
            background-color: #05AEF0;
            font-size: .36rem;
            line-height: 1.2rem;
            overflow: hidden;
            .NameTitle {
                color: white;
            }
        }
        img {
            height: 100%;
            width: 100%;
        }
        .Btn {
            height: 1rem;
            width: 100%;
            background: rgb(124, 206, 250);
            font-size: .34rem;
            color: white;
            line-height: 1rem;
            text-align: center;
            position: fixed;
            bottom: 0;
        }
        .active {
            background: #05AEF0;
        }
    }
</style>
