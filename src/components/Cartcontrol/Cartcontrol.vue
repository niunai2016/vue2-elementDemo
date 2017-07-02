<template>
    <div id="cartcontrol">
        <transition name="move">
            <div class="cart-d" v-show="food.count>0" @click.stop="decreaseCart($event)">
                <i class="iconfont">&#xe615;</i>
            </div>
        </transition>
        <div class="cart-c" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-a iconfont" @click.stop="addCart($event)">&#xe600;</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        name: 'Cartcontrol',
        props:{
            food:{
                type:Object
            }
        },
        data () {
            return {}
        },
        methods:{
            addCart(event){
                if(!event._constructed){
                    return;
                }
                if(!this.food.count){
                    Vue.set(this.food,'count',1);
                }else{
                    this.food.count++;
                }
                
                this.$emit('cart-add',event.target)
            },
            decreaseCart(event){
                if(!event._constructed){
                    return;
                }
                
                if(this.food.count){
                    this.food.count--;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #cartcontrol{
        font-size:0;
        .cart-d,.cart-a{
            display: inline-block;
            padding:6px;
            
            i{
                display: inline-block;
                line-height: 24px;
                font-size: 24px;
                color:rgb(0,160,220);
                transition: 0.3s all linear;
                transform:rotate(0);
            }
            
        }
    
        .move-enter-active, .move-leave-active {
            transition: 0.3s all linear;
            transform:translate3D(0,0,0);
        }
    
        .move-leave-active,.move-enter{
            transform:translate3D(30px,0,0);
            opacity: 0;
            
            i{
                transform:rotate(360deg);
            }
        }
        
        .cart-c{
            display: inline-block;
            vertical-align: top;
            width:12px;
            padding-top:6px;
            line-height:24px;
            text-align: center;
            font-size:10px;
            color:rgb(147,153,159);
        }
        
        .cart-a{
            display: inline-block;
            padding:6px;
            line-height: 24px;
            font-size: 24px;
            color:rgb(0,160,220);
        }
    }
</style>
