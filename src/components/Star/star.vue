<template>
    <div class="star" :class="starType">
        <i class="star-item iconfont" v-for="(item,ind) in numb" ref="tt" :index="ind" :style="[itemClass,{'red':ind<ns?red:''}]" @click="pitchOn(ind)">&#xe61f;</i>
    </div>
</template>

<script>
    export default {
        props:{
            //星星大小
            size:{
                type:Number
            },
            //星星的个数
            score:{
                type:Number
            },
            //未选中的时星星的颜色
            color:{
                type:String
            },
            //选中的时星星的颜色
            Acolor:{
                type:String
            },
            //是否可以点击评分,必填
            click:{
                type:Boolean
            },
            //配合不能评分来用，不能评分时，选中星星的个数
            numStar:{
                type:Number
            }
        },
        computed:{
            itemClass(){
                var s=null;
                var c=null;
                var style = {};
                if(this.size){
                    s = parseInt(this.size);
                }else{
                    s = 16;
                };
                
                if(this.color){
                    c = this.color;
                }else{
                    c = '#fff';
                };
  
                return style = {
                    'font-size': s+'px',
                    'margin-right': s*0.5 + 'px',
                    'color':c,
                };
            } ,
            numb(){
                var n = 1;
                if(this.score){
                    n = parseInt(this.score);
                }else{
                    n = 5;
                };
                
                return n;
            }
        },
        data () {
            return {
                itemClasses:'',
                starType:'',
                ns:0
            }
        },
        mounted(){
            this.numS();
        },
        methods:{
            pitchOn(n){
                if(!this.click){
                    return false;
                }
                
                var A=null;
                var c=null;
                if(this.Acolor){
                    A = this.Acolor;
                }else{
                    A = '#dd6224';
                };
  
                if(this.color){
                    c = this.color;
                }else{
                    c = '#fff';
                };
                
                for(var i=0;i<this.$refs.tt.length;i++){
                    if(this.$refs.tt[i].getAttribute("index")<=n){
                        this.$refs.tt[i].style.color=A;
                    }else{
                      this.$refs.tt[i].style.color=c;
                    }
                }
            },
            numS(){
                var s=0;
                var A=null;
                
                if(this.numStar >0 && this.numStar){
                    s = Math.round(this.numStar);
                }
              
                if(this.Acolor){
                    A = this.Acolor;
                }else{
                    A = '#dd6224';
                };
                
                for(var i=0;i<s;i++){
                    this.$refs.tt[i].style.color=A;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .star{
        .star-item{
            color: #dd6224;
        }
    }

</style>
