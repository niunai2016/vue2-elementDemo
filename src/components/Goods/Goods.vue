<template>
    <div id="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,ind) in goods" class="menu-item" :class="{'curr':currentIndex == ind}" @click="selectMenu(ind,$event)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item" @click.stop="selectFood(food,$event)">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div>
                            <div class="cont">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <ele-cartcontrol :food="food"  @cart-add="dropF"></ele-cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <ele-showcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></ele-showcart>
        <ele-food ref="food" :food="selectedFood" @food-add="dropFF"></ele-food>
        
    </div>
</template>

<script>
    import data from '../../data/data.json'
    import BScroll from 'better-scroll'
    import shopcart from '../../components/Shopcart/Shopcart.vue'
    import food from '../../components/Food/Food.vue'
    import cartcontrol from '../Cartcontrol/Cartcontrol.vue';
    console.log(data)
    export default {
        name: 'goods',
        props:{
            seller:{
                type:Object
            }
        },
        data () {
            return {
                goods: data.goods,
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                listHeight:[],
                scrollY:0,
                selectedFood:{}
               
            }
        },
        computed:{
            currentIndex(){
                for(var i=0;i<this.listHeight.length;i++){
                    var height1=this.listHeight[i];
                    var height2=this.listHeight[i+1];
                    
                    if(!height2 || (this.scrollY >= height1 && this.scrollY<height2)){
                        return i;
                    }
                }
                return 0;
            },
            selectFoods(){
                var foods = [];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count){
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        components:{
            'ele-showcart':shopcart,
            'ele-cartcontrol':cartcontrol,
            'ele-food':food
        },
        mounted(){
            this.$nextTick(function () {
                this.initScroll();
                this.calculateHeight();
            })
        },
        methods:{
            selectMenu(n,event){
                if(!event._constructed){
                    return;
                }
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[n];
                this.foodsScroll.scrollToElement(el,500);
                
            },
            initScroll(){
                this.meunScroll = new BScroll(this.$refs.menuWrapper,{
                    click:true
                });

                this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                    probeType:3,
                    click:true
                });
                
                this.foodsScroll.on('scroll',function (pos){
                    this.scrollY = Math.abs(Math.round(pos.y));
                }.bind(this));
            },
            calculateHeight(){
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height=0;
                this.listHeight.push(height);
                for(var i=0;i<foodList.length;i++){
                    var item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            dropF(target){
                this.$nextTick(()=>{
                    this.$refs.shopcart.drop(target)
                });
            },
            dropFF(target){
                this.$nextTick(()=>{
                    this.$refs.shopcart.drop(target)
                });
            },
            selectFood(food,event){
                if(!event._constructed){
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            }
        }
    }
</script>

<style lang="less" scoped>
    #goods {
        display: flex;
        position: absolute;
        top: 176px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            
            .menu-item {
                display: table;
                height: 54px;
                width: 56px;
                line-height: 14px;
                padding: 0 12px;
                
                .text {
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    
                    border-bottom: 1px solid rgba(7, 17, 27, .1);
                }
            }
            
            .curr{
                margin-top: -1px;
                background:#fff;
                font-weight:700;
                
                .text{
                    border-bottom: 1px solid #fff;
                }
            }
        }
        .foods-wrapper {
            
            flex: 1;
            
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
            }
            
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                
                .icon {
                    flex: 0 0 57px;
                    margin-right: 10px;
                    
                }
                .cont {
                    flex: 1;
                    position: relative;
                    
                    .name {
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    
                    .desc, .extra {
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        margin-bottom: 8px;
                        line-height: 16px;
                    }
                    
                    .extra {
                        
                        .count {
                            margin-right: 8px;
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
                        right:0;
                        bottom:-12px;
                    }
                }
            }
            
            .food-item:last-child {
                border-bottom: 0;
                margin-bottom: 0;
            }
        }
    }

    
    
    .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        vertical-align: middle;
    }
    
    .decrease {
        background: url('decrease_3@2x.png') no-repeat center/contain;
    }
    
    .discount {
        background: url('discount_3@2x.png') no-repeat center/contain;
    }
    
    .special {
        background: url('special_3@2x.png') no-repeat center/contain;
    }
    
    .invoice {
        background: url('invoice_3@2x.png') no-repeat center/contain;
    }
    
    .guarantee {
        background: url('guarantee_3@2x.png') no-repeat center/contain;
    }
</style>
