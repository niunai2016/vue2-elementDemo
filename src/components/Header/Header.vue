<template>
    <div id="header">
        <div class="seller">
            <img :src="seller.avatar" alt="">
            <div class="seller-info">
                <h2><i></i>{{seller.name}}</h2>
                <p class="delivery">{{seller.description}}/{{seller.deliveryTime}}分种送达</p>
                <p class="pay" v-if="seller.supports.length"><i></i>{{seller.supports[0].description}}</p>
            </div>
            <div class="btn" @click="detailShow =true">5个 ></div>
        </div>
        <div class="bulletin" @click="detailShow =true">
            <p><i></i>{{seller.bulletin}}</p>
        </div>
        <div class="bg">
            <img :src="seller.avatar" alt="">
        </div>
        <transition name="fade">
        <div v-show="detailShow" class="detail">
            <div class="wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <ele-star :size="18" :score="5" :click="false" :numStar="selScore"></ele-star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,ind) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[ind].type]"></span>
                            <span class="text">{{seller.supports[ind].description}}</span>
                        </li>
                    </ul>
  
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletind">
                        <p class="contt">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="close" @click="detailShow =false">&times;</div>
        </div>
        </transition>
    </div>
</template>

<script>
    import Star from '../Star/star.vue'
    export default {
        name: '',
        props:{
            seller:{
                type:Object
            }
        },
        data () {
            return {
                detailShow:false,
                classMap:['decrease','discount','special','invoice','guarantee']
            }
        },
        computed:{
            selScore:function () {
                var s = Math.round(this.seller.score)
                return s
            }
        },
        components:{
            eleStar:Star
        }
        
    }
</script>

<style lang="less" scoped>
    #header{
        height:134px;
        width:100%;
        background:rgba(7,17,27,.5);
        padding-top:1px;
        color:#fff;
        position:relative;
        overflow: hidden;
      
        .seller{
            margin: 24px 12px 18px 24px;
            display:flex;
          
            img {
                width: 64px;
                height: 64px;
                margin-right: 16px;
                border-radius:4px;
            }
            
            .seller-info{
                flex-grow:1;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
              
                h2{
                    font-size:16px;
                    font-weight:bold;
                    vertical-align:top;
                    line-height:18px;
                    
                    i{
                        display:inline-block;
                        width: 30px;
                        height: 18px;
                        background:url("brand@2x.png") no-repeat center/contain;
                        margin-right:5px;
                        vertical-align:top;
                      
                    }
                }
                .delivery{
                    font-size:12px;
                }
                .pay{
                    font-size:10px;
                    line-height:12px;
                    vertical-align:top;
                    i{
                        display:inline-block;
                        width:12px;
                        height:12px;
                        background:url("decrease_1@2x.png") no-repeat center/contain;
                        margin-right:5px;
                        vertical-align:top;
                    }
                }
            }
            .btn{
                align-self:flex-end;
                background:rgba(0,0,0,.2);
                font-size: 10px;
                padding:6px 10px;
                border-radius: 20px;
              
            }
        }
        .bg{
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            z-index:-1;
            filter: blur(10px);
          
            img{
                width:100%;
                height:100%;
            }
            
        }
        .bulletin{
            height:28px;
            line-height: 28px;
            overflow: hidden;
            background:rgba(7,17,27,.2);
            font-style: 10px;
            
            p{
                text-overflow:ellipsis;
                white-space:nowrap;
                overflow:hidden;

                i{
                    display:inline-block;
                    width:22px;
                    height:12px;
                    background:url("bulletin@2x.png") no-repeat 0 0 /contain;
                    margin:8px;
                    vertical-align:middle;
                }
            }
        }
        .detail{
            position: fixed;
            width:100%;
            height:100%;
            left:0;
            top:0;
            z-index: 100;
            background:rgba(1,17,27,.8);
            overflow: auto;
            backdrop-filter:blur(10px);
          
            .wrapper{
                min-height:100%;
                width:100%;
              
                .detail-main{
                    margin-top:64px;
                    padding-bottom: 64px;
                  
                    .name{
                        line-height:16px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    
                    .star-wrapper{
                        margin-top:18px;
                        padding:2px 0;
                        text-align: center;
                    }
                    
                    .title{
                        display:flex;
                        width:80%;
                        margin:28px auto 24px auto;
                        .line{
                            flex:1;
                            border-top:1px solid #f1f1f1;
                            opacity: 0.2;
                        }
                        .text{
                            padding:0 12px;
                            font-size:14px;
                            margin-top:-9px;
                            font-weight: 700;
                        }
                        
                        
                    }
                    
                    .supports{
                        width:80%;
                        margin:0 auto;
                        
                        .support-item{
                            padding:0 12px;
                            margin-bottom: 12px;
                            
                            .icon {
                                display: inline-block;
                                width:16px;
                                height:16px;
                                margin-right:6px;
                                vertical-align: middle;
                            }
                            
                            .text{
                                line-height: 12px;
                                font-size:12px;
                            }
                            
                            .decrease{
                              background:url('decrease_2@2x.png') no-repeat center/contain;
                            }

                            .discount{
                                background:url('discount_2@2x.png') no-repeat center/contain;
                            }

                            .special{
                                background:url('special_2@2x.png') no-repeat center/contain;
                            }

                            .invoice{
                                background:url('invoice_2@2x.png') no-repeat center/contain;
                            }
                        
                            .guarantee{
                                background:url('guarantee_2@2x.png') no-repeat center/contain;
                            }

                        }
                    }
    
                    .bulletind{
                        width:80%;
                        margin:0 auto;
                      
                        .contt{
                            padding:0 12px;
                            line-height: 24px;
                            font-size:12px;
                        }
                    }
                    
                }
            }
            
            .close{
                position: relative;
                width:32px;
                height:32px;
                margin:-64px auto 0 auto;
                font-size: 32px;
                margin-left:50%;
                transform:translateX(-50%);
            }
        }

        .fade-enter-active, .fade-leave-active {
            transition: 1s all ease;
        }
        .fade-leave-active,.fade-enter{
            transform:translateX(500px);
            opacity: 0.4
        }


    }
</style>
