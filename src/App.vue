<template>
    <div id="app">
        <ele-header :seller="seller"></ele-header>
        <div class="tab">
            <ul>
                <li><router-link to="/goods">商品</router-link></li>
                <li><router-link to="/comments">评论</router-link></li>
                <li><router-link to="/seller">商家</router-link></li>
            </ul>
        </div>
        <div><router-view :seller="seller"></router-view></div>
    </div>
</template>

<script>
    import urlParse from './assets/js/util'
    import Header from './components/Header/Header.vue'
    import data from './data/data.json'
    export default {
        name: 'app',
        data(){
            return{
                seller:{
                    id:(()=>{
                        let queryParam = urlParse();
                        console.log(queryParam);
                        return queryParam.id;
                    })()
                }
            }
        },
        components:{
            eleHeader:Header
        },
        created () {
            this.seller = data.seller;
//            this.seller = Object.assign({},this.seller,data);
        }
    }
</script>

<style lang="less" scoped>

    .router-link-active{
        color:red;
    }
    a{
        color:#333;
    }
    .tab{
      
        ul{
            display:flex;
            width:100%;
            height:40px;
            line-height: 40px;
            border-bottom:1px solid #ddd;
          
            li{
                flex:1;
                text-align: center;
            }
        }
    }
</style>

