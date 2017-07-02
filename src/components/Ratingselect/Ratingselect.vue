<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" :class="{'active':sel == 2}" @click="select(2,$event)">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':sel == 0}" @click="select(0,$event)">{{desc.positive}} <span class="count">{{positives.length}}</span></span>
            <span class="block negative" :class="{'active':sel == 1}" @click="select(1,$event)">{{desc.negative}} <span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" :class="{'on':swit}" @click="toggleContent($event)">
            <i class="iconfont">&#xe62a;</i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const ALL = 2;
    const POSITIVE = 0;
    const NEGATIVE = 1;
    
    
    export default {
        name: '',
        props:{
            ratings:{
                type:Array,
                default(){
                    return [];
                }
            },
            selectType:{
                type:Number,
                default:ALL
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            desc:{
                type:Object,
                default(){
                    return {
                        all:'全部',
                        positive:'满意',
                        negative:'不满意'
                    }
                }
            }
        },
        data () {
            return {
                sel:-1,
                swit:null
            }
        },
        mounted(){
            this.sel = this.selectType;
            this.swit = this.onlyContent;
        },
        computed:{
            positives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType == POSITIVE;
                });
            },
            negatives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType == NEGATIVE;
                });
            }
        },
        methods:{
            select(type,event){
                if(!event._constructed){
                    return;
                }
                this.sel = type;
                this.$emit('rating-type',this.sel);
            },
            toggleContent(event){
                if(!event._constructed){
                    return;
                }
                this.swit = !this.swit;
                this.$emit('switch-toggle',this.swit);
            }
        }
    }
</script>

<style lang="less" scoped>
    .ratingselect{
        .rating-type{
            padding:18px 0;
            margin:0 18px;
            border-bottom: 1px solid rgba(7,17,27,.1);
            font-size:0;
            
            .block{
                display:inline-block;
                padding: 8px 12px;
                margin-right:8px;
                border-radius:1px;
                color:rgb(77,85,93);
                font-size:12px;
                
                .count{
                    font-size:8px;
                    margin-left:2px;
                    line-height:16px;
                }
            }
            .block.active{
                 color:#fff;
            }
            .positive{
                background:rgba(0,160,220,.2);
            }
            .positive.active{
                 background:rgba(0,160,220,.7);
            }
            .negative{
                background:rgba(77,85,93,.2);
            }
            .negative.active{
                 background:rgba(77,85,93,.7);
            }
            
            
        }
        
        .switch{
            padding:12px 18px;
            color:rgb(147,153,159);
            line-height:24px;
            border-bottom: 1px solid rgba(7,17,27,.1);
            font-size:0;
            
            i{
                display:inline-block;
                vertical-align: top;
                font-size:24px;
                margin-right:4px;
            }
            
            .text{
                display:inline-block;
                vertical-align: top;
                font-size:12px;
            }
        }
        
        .on{
            i{
                color:#00c850;
            }
        }
    }
</style>
