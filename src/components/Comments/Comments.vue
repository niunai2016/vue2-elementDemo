<template>
    <div id="comments" ref="ratings">
        <div class="comment-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <ele-star :size="18" :score="5" :color="'#eee'" :click="false" :numStar="seller.serviceScore"></ele-star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <ele-star :size="18" :score="5" :color="'#eee'" :click="false" :numStar="seller.foodScore"></ele-star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分种</span>
                    </div>
                </div>
            </div>
            <ele-split></ele-split>
            <ele-ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="descs" :ratings="ratings.ratings" @rating-type="rattype" @switch-toggle="switcht"></ele-ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28">
                        </div>
                        <div class="cont">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <ele-star :size="12" :score="5" :color="'#eee'" :click="false" :numStar="rating.score"></ele-star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分种送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <i class="iconfont up">&#xe65e;</i>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                                
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            
                            
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>

<script>
    import data from '../../data/data.json'
    import BScroll from 'better-scroll'
    import formatData from '../../../src/assets/js/date'
    import star from '../../components/Star/star.vue'
    import split from '../Split/Split.vue'
    import ratingselect from '../Ratingselect/Ratingselect.vue'
    const ALL = 2;
    
    export default {
        name: '',
        props:{
            seller:{
                type:Object
            }
        },
        data () {
            return {
                ratings:data,
                selectType:ALL,
                onlyContent:true,
                descs:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.scroll = new BScroll(this.$refs.ratings,{
                    click:true
                });
            });
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatData(date,'yyyy-MM-dd hh:mm');
            }
        },
        methods:{
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
            eleStar:star,
            'ele-split':split,
            'ele-ratingselect':ratingselect
        }
    }
</script>

<style lang="less" scoped>
    #comments{
        position: absolute;
        top:176px;
        bottom:0;
        left:0;
        width:100%;
        overflow: hidden;
        
        .comment-content{
            
            .overview{
                display:flex;
                padding:18px 0;
                
                .overview-left{
                    flex:0 0 137px;
                    padding:6px 0;
                    width:137px;
                    border-right:1px solid rgba(7,17,27,.1);
                    text-align: center;
                    
                    @media only screen and (max-width:320px){
                        flex: 0 0 100px;
                        width:100px;
                    }
                    
                    .score{
                        margin-bottom:6px;
                        line-height: 28px;
                        font-size:24px;
                        color:rgb(255,153,0);
                    }
                    
                    .title{
                        margin-bottom:8px;
                        line-height:12px;
                        font-size:12px;
                        color:rgb(7,17,27);
                    }
                    .rank{
                        padding-bottom:6px;
                        font-size:10px;
                        color:rgb(147,153,159);
                        line-height: 20px;
                    }
                }
                
                .overview-right{
                    flex:1;
                    padding:6px 0 6px 24px;
                    @media only screen and (max-width:320px){
                        padding:6px 0 6px 6px;
                    }
                    
                    .score-wrapper{
                        margin-bottom:8px;
                        font-size:0;
                        
                        .title{
                            display: inline-block;
                            font-size:12px;
                            line-height:18px;
                            color:rgb(7,17,27);
                            font-weight:700;
                        }
                        .star{
                            display: inline-block;
                            vertical-align: top;
                            margin-left:4px;
                        }
                        .score{
                            display: inline-block;
                            line-height:18px;
                            vertical-align: top;
                            font-size:12px;
                            color:rgb(255,153,0)
                        }
                    }
                    .delivery-wrapper{
                        font-size:0;
                        
                        .title{
                            line-height:18px;
                            vertical-align: top;
                            font-size:12px;
                            color:reb(7,17,27);
                            font-weight:700;
                        }
                        .delivery{
                            margin-left:12px;
                            font-size:12px;
                            color:rgb(147,153,159);
                        }
                        
                    }
                }
            }
            .rating-wrapper{
                padding:0 18px;
                
                .rating-item{
                    display: flex;
                    padding: 18px 0;
                    border-bottom:1px solid rgba(7,17,27,.1);
                    
                    .avatar{
                        flex:0 0 28px;
                        width:28px;
                        margin-right:12px;
                        
                        img{
                            border-radius:50%;
                        }
                    }
                    
                    .cont{
                        position: relative;
                        flex:1;
                        
                        .name{
                            margin-bottom:4px;
                            line-height:12px;
                            font-size:10px;
                            color:rgb(7,17,27);
                        }
                        .star-wrapper{
                            margin-bottom:6px;
                            font-size:0;
                            
                            .star{
                                display: inline-block;
                                vertical-align: top;
                                margin-right:6px;
                            }
                            .delivery{
                                display: inline-block;
                                vertical-align: top;
                                line-height:12px;
                                font-size:10px;
                                color:rgb(147,153,159);
                                
                            }
                        }
                        
                        .text{
                            line-height:18px;
                            margin-bottom:8px;
                            font-size:12px;
                            color:rgb(7,17,27);
                        }
                        .recommend{
                            line-height:18px;
                            font-size:0;
                            
                            i,.item{
                                margin:0 8px 4px 0;
                                font-size:9px;
                            }
                            i{
                                color:rgb(0,160,220)
                            }
                            .item{
                                padding:0 6px;
                                border:1px solid rgba(7,17,27,.1);
                                border-radius: 1px;
                                color:rgb(147,153,159);
                                background:#fff;
                            }
                            
                        }
                        .time{
                            position: absolute;
                            top:0;
                            right:0;
                            line-height:12px;
                            font-size: 12px;
                            color:rgb(147,153,159);
                        }
                        
                    }
                }
            }
        }
    }
</style>
