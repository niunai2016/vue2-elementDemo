<template>
    <transition name="move">
        <div id="food" v-show="showFlag" ref="food">
            <div class="food-countent">
                <div class="image-header">
                    <img :src="food.image" width="100%" alt="">
                    <div class="back">
                        <i class="iconfont" @click="showFlag=false">&#xe79f;</i>
                    </div>
                </div>
                <div class="cont">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <ele-cartcontrol :food="food" @cart-add="dropF"></ele-cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy" v-show="!food.count || food.count == 0" @click.stop.prevent="addFirst($event)">加入购物车</div>
                    </transition>
                </div>
                <ele-split  v-show="food.info"></ele-split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <ele-split></ele-split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ele-ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="descs" :ratings="food.ratings" @rating-type="rattype" @switch-toggle="switcht"></ele-ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <i class="iconfont up" v-if="rating.rateType == 0">&#xe65e;</i>
                                    <i class="iconfont down" v-else>&#xe639;</i>
                                    <span>{{rating.text}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="on-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import formatData from '../../../src/assets/js/date'
    import cartcontrol from '../Cartcontrol/Cartcontrol.vue'
    import split from '../Split/Split.vue'
    import ratingselect from '../Ratingselect/Ratingselect.vue'

    const ALL = 2;
    
    
    export default {
        name: '',
        props:{
            food:{
                type:Object
            }
        },
        data () {
            return {
                showFlag:false,
                selectType:ALL,
                onlyContent:true,
                descs:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatData(date,'yyyy-MM-dd hh:mm');
            }
        },
        methods:{
            show(){
                this.showFlag = true;
                this.selectType=ALL;
                this.onlyContent = true;
                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.food,{
                            click:true
                        });
                    }else{
                        this.scroll.refresh();
                    }
                });
            },
            addFirst(event){
                if(!event._constructed){
                    return;
                }
                Vue.set(this.food,'count',1);
                this.$emit('food-add',event.target);
            },
            dropF(target){
                this.$emit('food-add',target)
            },
            rattype(a){
                this.selectType = a;
                this.$nextTick( ()=>{
                    this.scroll.refresh();
                });
            },
            switcht(s){
                this.onlyContent = s;
                this.$nextTick( () => {
                    this.scroll.refresh();
                });
            },
            needShow(type,text){
                if(this.onlyContent && !text){
                    return false;
                };
                
                if(this.selectType == ALL){
                    return true;
                }else{
                    return type == this.selectType;
                }
            }
        },
        components:{
            'ele-cartcontrol':cartcontrol,
            'ele-split':split,
            'ele-ratingselect':ratingselect
        }
    }
</script>

<style lang="less" scoped>
    #food{
        position: fixed;
        top:0;
        left:0;
        bottom:48px;
        z-index: 1;
        width:100%;
        background:#fff;
        .food-countent{
            .image-header{
                position: relative;
                width:100%;
                height:0;
                padding-top:100%;
                
                img{
                    position: absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                }
                
                .back{
                    position: absolute;
                    top:10px;
                    left:0;
                    
                    i{
                        color:#fff;
                        padding:10px;
                        font-size:20px;
                        opacity:.8;
                    }
                }
            }
            
            .cont{
                padding:18px;
                position: relative;
                
                .title{
                    line-height:14px;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight:700;
                    color:rgb(7,17,27);
                }
                
                .detail{
                    margin-bottom:18px;
                    line-height:10px;
                    height:10px;
                    font-size:0;
                    
                    .sell-count,.rating{
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                    
                    .sell-count{
                        margin-right:12px;
                    }
                }
    
                .price {
                    font-weight: 700;
                    line-height: 24px;
        
                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20)
                    }
        
                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
    
                .cartcontrol-wrapper{
                    position: absolute;
                    right:12px;
                    bottom:12px;
                }
    
                .buy{
                    position: absolute;
                    right:18px;
                    bottom:18px;
                    z-index: 10;
                    height:24px;
                    line-height: 24px;
                    padding:0 12px;
                    box-sizing:border-box;
                    font-size:10px;
                    border-radius: 12px;
                    color:#fff;
                    background:rgb(0,160,220);
                }
    
                .fade-enter-active, .fade-leave-active {
                    transition: .2s all ease;
                }
                .fade-leave-active,.fade-enter{
                    opacity: 0
                }
            }
            
            .info{
                padding:18px;
                
                .title{
                    line-height:14px;
                    margin-bottom:6px;
                    font-size:14px;
                    color:rgb(7,17,27);
                }
                
                .text{
                    line-height:24px;
                    padding:0 8px;
                    font-size:12px;
                    color:rgb(177,177,177);
                }
            }
            
            .rating{
                padding-top:18px;
                
                .title{
                    line-height:14px;
                    margin-left:8px;
                    font-size:14px;
                    color:rgb(7,17,27);
                }
                
                .rating-wrapper{
                    padding:0 18px;
                    .rating-item{
                        position: relative;
                        padding:16px 0 ;
                        border-bottom:1px solid rgba(7,17,27,.1);
                        
                        .user{
                            position: absolute;
                            right:0;
                            top:16px;
                            font-size:0;
                            line-height:12px;
                            
                            .name{
                                display: inline-block;
                                margin-right:6px;
                                vertical-align: top;
                                font-size:10px;
                                color:rgb(147,153,159);
                            }
                            
                            .avatar{
                                border-radius:50%;
                            }
                            
                            img{
                                display: inline-block;
                            }
                        }
                        
                        .time{
                            margin-bottom:6px;
                            line-height:12px;
                            font-size:10px;
                            color:rgb(147,153,159);
                        }
    
                        .text{
                            line-height:16px;
                            font-size:12px;
                            color:rgb(7,17,27);
        
                            i{
                                margin-right:4px;
                                line-height:24px;
                                font-size:16px;
                                color:rgb(0,160,220);
                            }
        
                            i.down{
                                font-size:20px;
                                color:rgb(147,153,159);
                            }
                        }
                    }
                    
                    .on-rating{
                        padding:16px 0;
                        font-size:12px;
                        color:rgb(17,153,159);
                        text-align: center;
                    }
                }
            }
        }
        
    }

    .move-enter-active, .move-leave-active {
        transition: .5s all ease;
    }
    .move-leave-active,.move-enter{
        transform:translate3d(100%,0,0);
        opacity: 0
    }
</style>
