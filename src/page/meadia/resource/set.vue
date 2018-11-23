<template>
    <!-- 基础数据报表 -->
    <div class="media-create" >
        <el-main>
            <el-col :span="24">
                <h1 class="template-hd">资源优选规则</h1>
                <div class="border-bottom-2">
                    <div class="base-bd" v-for="rulelist in ruleLists">
                    <!-- 媒体： start -->
                    <div class="create-row">
                        <label for="" class="data-item">媒体：</label>
                        <el-input :disabled="true"
                             v-model="rulelist.media_name"
                        ></el-input>
                    </div>
                    <!-- 媒体： end -->
                    <!-- 广告位 start -->
                    <div class="create-row">
                        <label for="" class="data-item">广告位：</label>
                        <el-input :disabled="true" 
                        v-model="rulelist.ad_id"
                        ></el-input>
                    </div>
                    <!-- 广告位 end -->
                    <!-- 每日PV总量： start -->
                    <div class="create-row">
                        <label for="" class="data-item-wider">每日PV总量：</label>
                        <el-input :disabled="true"
                             v-model="rulelist.pv"
                        ></el-input>
                        <!-- <input  :disabled="true" 
                        v-model="rulelist.pv" 
                        ref="dailyTotalpv" 
                        class="el-input__inner" /> -->
                        <!-- k -->
                    </div>
                    <!-- 每日PV总量： end -->
                    <!-- 每日可分配PV总量： start -->
                    <div class="create-row">
                        <label for="" class="data-item-wider">每日可分配PV量：</label>
                        <el-input :disabled="true"
                             v-model="rulelist.residuepv" 
                             @change="changeDate(rulelist.residuepv, 'z')"
                        ></el-input>
                        <!-- <input v-model="rulelist.residuepv" 
                        :readonly="true"
                        @change="changeDate(rulelist.residuepv, 'z')"
                        class="el-input__inner" /> -->
                        <!-- z -->
                        <span class="row-tip">注：总量将根据规则分配而减少</span>
                    </div>
                    <!-- 每日可分配PV总量： end -->
                    <!-- 规则 start -->
                    <div class="create-row rule-set">
                        <label for="" class="data-item left">规则：</label>
                        <table width="77%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr 
                                  class="space-under"
                                  v-for='rule,ruleindex in rulelist.resource_config'
                                  >
                                    <td>
                                        <div class="set-second-row">
                                            <label for="" class="inferior-title left">客户：</label>
                                        
                                            <el-select 
                                            class="ajust-full-width" 
                                            v-model="rule.name" 
                                            @change="changeAdvertiser"
                                            placeholder="请选择客户">
                                                <el-option v-for="item  in advertiser_info_list"
                                                :key="item"
                                                :label="item"
                                                :value="item"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="set-second-row">
                                            <label for="" class="inferior-title left">量级：</label>
                                            <div class="per-unit" :class="{ 'error-border': rule.isError1}">
                                                <div class="unit-setting i-blue">
                                                    <el-input v-model="rule.pv" 
                                                    @keyup.native="changeDate(rule.pv,'x', rule.single_flag)"></el-input>
                                                    <span class="unit">PV/每天</span>
                                                </div>
                                                <p class="error-tip">请填写大于零的整数</p>
                                            </div>
                                        
                                        </div>
                                    </td>
                                    <td>
                                        <div class="set-second-row">
                                            <label for="" class="inferior-title left">优先级：</label>
                                            <el-select 
                                            class="ajust-full-width" 
                                            placeholder="请选择" 
                                            v-model='rule.priority'
                                            >
                                                <el-option 
                                                 v-for='item in 10'
                                                 :key='item'
                                                 :value='item'
                                                 :label='item'
                                                >
                                                </el-option>
                                            </el-select>
                                            <el-button 
                                            v-if="rulelist.resource_config.length>1 && ruleindex > 0 "
                                            type="danger"
                                            @click="delRule(rulelist.id,rule.single_flag)"
                                            >删除</el-button>
                                            <!-- 
                                            <el-button 
                                            v-if="rulelist.resource_config.length>1 && ruleindex > 0 "
                                            type="danger"
                                            @click="delRule(rulelist.id,rule.advertiser_id)"
                                            >删除</el-button> -->
                                        </div>
                                        
                                <div class="set-second-row price-location">
                                    <label for="" class="inferior-title left">出价：</label>
                                    <div class="per-unit" :class="{ 'error-border': rule.isError2}">
                                        <div class="unit-setting i-yellow">
                                            <el-input v-model="rule.price" 
                                                @keyup.native="changePrice(rule.single_flag, rule.price)">
                                            </el-input>
                                            <span class="unit meta">元/CPM</span>
                                        </div>
                                        <p class="error-tip">请填写大于零的数字,精确到0.01</p>
                                    </div>
                                    <!-- v-if="rulelist.resource_config.length>1 && ruleindex > 0 " -->
                                    <el-button 
                                    type="confirm"
                                    @click="addRule(rulelist.id)"
                                    >添加</el-button>
                                </div>
                                        
                                    </td>
                               </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <!-- 规则 end -->
                </div>
                </div>
                
                <div class="is-confirm">
                    <el-button 
                    type="confirm"
                    @click="saveChangeMediaRuleConfig"
                    >确认</el-button>
                    <el-button 
                    type="cancel"
                    @click="cancelChangeMediaRuleConfig"
                    >取消</el-button>
                </div>
                
            </el-col>
        </el-main>
    </div>
</template>
<script>
    import { meadia } from "../../../service/index";
    import {
        mapState,
        mapActions
    } from "vuex";
    export default {
        data: function(){
            return {
                advertiser_info_list:{
                        "5":"派瑞",
                        "15":"广州考拉网络科技有限公司",
                },//广告名称列表
                ruleLists:[//可能是多个对象的形式
                    {
                    ad_id:'',//广告位id
                    id:'',//当前列表的id
                    media_name:"",//媒体名称
                    pv:'100',//量级
                    residuepv:'100',//每日可分配pv
                    resource_config:[//规则，新增的时候增加一条信息
                            
                    ]
                    }
                ],
                date: "",
                value: "",
                price: "",
                error: "",
                isCorrect1: true,//pv
                isCorrect2: true,//price
                iUp: -1
            }
        },
        /*请求参数的形式*/
        mounted(){
            this.setBreadCrumb(this.$route.path.replace("/", ""));
              //请求成功之后，将后台的数据，重新改变data 然后页面进行渲染
              let meadiaid = this.$route.params.id;
              let data = {id:meadiaid};
              let that = this;
              let totalPv = 0;
              meadia.getMediaRuleConfig(data).then(res => {
                if (res.data.code == 0) {
                    let Data = res.data.data;
                    that.advertiser_info_list = Data.advertiser_info_list;
                    // console.log(Data.media_list)
                    Data.media_list.forEach(function(item){
                            item.residuepv = item.pv;
                        
                        
                        if(item.resource_config){
                            item.resource_config = JSON.parse(item.resource_config);
                        }else{//不存在的时候，进行新增
                            item.resource_config=[{
                                name:'请选择客户',
                                pv:'',
                                advertiser_id:'',
                                price:'',//出价
                                priority:'',//优先级别
                                single_flag: 0
                            }]
                        }
                        item.resource_config.forEach(function(inneritem,index){
                            inneritem.name = that.getNameById(inneritem.advertiser_id,that.advertiser_info_list );
                            inneritem.advertiser_id = inneritem.advertiser_id;
                            inneritem.priority = inneritem.priority || '';
                            totalPv += inneritem.pv;
                            inneritem.single_flag = inneritem.advertiser_id;
                            inneritem.isError1 = false;
                            inneritem.isError2 = false;
                        })
                        if(totalPv){//当有PV的数据值时，用总量减去PV的值才等于可分配PV量
                            item.residuepv = Number(item.pv) - totalPv;
                        }
                    })
                    that.ruleLists = Data.media_list;
                }

                  if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
              });
              
        },
        methods:{
            ...mapActions(["setBreadCrumb"]),
            changeAdvertiser(val){ 
                //this.addFlag =true; 实现数据的更新
               // console.log(val) 
                //this.media_lists= this.media_lists.slice(0);
            },
           addRule(id){
            this.ruleLists =  this.ruleLists.slice(0)
            // console.log(this.ruleLists);
            let that = this;
           
            //新增的时候，判断是否是
             this.ruleLists.forEach(function(item,index){
                if(item.id == id){
                //   console.log(item.resource_config[item.resource_config.length-1].name);
                    if(!item.resource_config[item.resource_config.length-1].name){
                      that.$message({
                        message: '请选择客户信息',
                        type: 'warning'
                      });
                      return;
                    };
                    for(let i=0;i<item.resource_config.length-1;i++){
                       for(let j=i+1;j<item.resource_config.length;j++){
                         if(item.resource_config[i].name == item.resource_config[j].name){
                             that.$message({
                                message: '客户名字重复,重新选择',
                                type: 'warning'
                              });
                             item.resource_config[j].name = "";
                             return;
                         }
                       }
                     
                    };
                    item.resource_config.push(
                        {
                            name:'',//客户名称，
                            pv:'',//量级
                            advertiser_id:id,
                            priority:'',
                            price:'',
                            single_flag:that.iUp,
                            isError1: false,
                            isError2: false
                        }
                    );
                    that.iUp--;
                }
             });
             
            },
            delRule(listId,adId){//删除规则
                let resetPv = 0;
                this.ruleLists.forEach(function(item,index){
                    
                    if(item.id == listId){
                        item.resource_config.forEach(function(innerItem,inndeIndex){
                            if(innerItem.single_flag == adId){
                                item.resource_config.splice(inndeIndex,1)
                                //将每日可分配PV量重新计算
                                item.resource_config.forEach(function(newItem,newIndex){
                                    resetPv += Number(newItem.pv);
                                    item.residuepv = Number(item.pv) - resetPv;
                                });
                                
                            }
                        });
                    }
                })
                 
            },
            getIdByName(name,obj){//通过name获得id
                if(!name){
                    return
                }
                let id = null;
                for(var attr in obj){
                    if(obj[attr] == name){
                        id = attr;
                        break;
                    }
                }
                return id;
             },
             getNameById(id,obj){//通过获得name
                if(!id){
                    return
                }
                let name = null;
                for(var attr in obj){
                    if(attr == id){
                        name = obj[attr];
                        break;
                    }
                }
                return name;
             },
             //保存配置项目
             saveChangeMediaRuleConfig(){
                let that = this;
                let meadiaid = this.$route.params.id;
                let flag = true;//判断是否可以提交数据
                let resource_config = [];
                let resource_config_item = [];
                // let pvRegex = /^(0|([1-9]\d*))$/;
                let pvRegex = /^\+?[1-9]\d*$/;
                let priceRegex = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                // console.log(this.ruleLists)
                let iNow=0;
                this.ruleLists.forEach(function(o,i){
                        let resource_config_item = new Array();
                        
                        for(var i=0;i<o.resource_config.length-1;i++){
                            for(var j=i+1;j<o.resource_config.length;j++){
                                if(o.resource_config[i].name == o.resource_config[j].name ){
                                    that.$message({
                                        message: '客户名字重复,重新选择',
                                        type: 'warning'
                                        });
                                    o.resource_config[j].name = "";
                                    flag = false;
                                    return;
                                }
                                
                                if(o.resource_config[j].name ==""){
                                    that.$message({
                                      message: '请重新选择客户',
                                      type: 'warning'
                                    });
                                    o.resource_config[j].name = "";
                                    flag = false;
                                    return;
                                }
                            }
                     
                          };
                        
                        o.resource_config.forEach(function(oo,ii){
                            if(!oo.name){
                            that.$message({
                                message: '请选择客户信息',
                                type: 'warning'
                                });
                                // debugger
                                    flag = false;
                                return;
                            };
                            if(!oo.priority){
                            that.$message({
                                message: '请选择优先级',
                                type: 'warning'
                                });
                                    flag = false;
                                return;
                            };
                            if(!oo.pv){
                            that.$message({
                                message: '请填写量级',
                                type: 'warning'
                                });
                                    flag = false;
                                return;
                            } else {//判断数值是否合法
                                if(!pvRegex.test(oo.pv)) {
                                    flag = false;
                                    return;
                                }
                                
                            }
                            if(!oo.price){
                                that.$message({
                                    message: '请填写出价',
                                    type: 'warning'
                                });
                                    flag = false;
                                return;
                            } else {
                                if(!priceRegex.test(oo.price)){
                                    flag = false;
                                    return;
                                }
                            }
                            
                            resource_config_item.push({
                                'advertiser_id':that.getIdByName(oo.name,that.advertiser_info_list),
                                'pv':oo.pv,
                                'priority':oo.priority,//优先级
                                'price': oo.price,
                                'single_flag': oo.single_flag
                            });
                            // iNow++;
                           
                        });
                      resource_config.push(resource_config_item)
                 });
                let data = {
                    media_id:meadiaid,
                    resource_config:JSON.stringify(resource_config)
                };
                    // debugger;
                console.log(flag)
                if(!flag){
                    return;
                }
               meadia.doEditMediaRuleConfig(data).then(res => {
                if (res.data.code == 0) {
                    that.advertiser_info_list = res.data.data.advertiser_info_list;
                    that.media_lists = res.data.data.media_list;
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.$router.push({ 
                        path: '/resourse'
                    })
                 }

                   if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
               });
            },
            cancelChangeMediaRuleConfig(){//取消媒体优选的配置
                this.$router.push({ 
                    path: '/resourse'
                })
            },
            changePrice(id, val){//价格的改变的约束
                let yuanRegex = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                
                if(!yuanRegex.test(val)){//true 
                    this.checkNumber(id, val, '', '1');
                    return;
                } else {
                    this.checkNumber(id, val, '', '', '', this.isCorrect2);
                }
            },
            checkNumber(id, val, isError1, isError2, isCorrect1, isCorrect2) {// id = single_flag
                let cycleLists = this.ruleLists;
                  for(let i=0;i<cycleLists.length;i++) {
                    for(var j=0;j<cycleLists[i].resource_config.length;j++){
                        if(id == cycleLists[i].resource_config[j].single_flag){
                            if(isError1){//pv报错
                                cycleLists[i].resource_config[j].isError1 = true;
                            } else if(isError2){//price报错
                                cycleLists[i].resource_config[j].isError2 = true;
                            } else if(isCorrect1){//pv正确
                                cycleLists[i].resource_config[j].isError1 = false;
                            } else{//price正确
                                cycleLists[i].resource_config[j].isError2 = false;
                            }
                        }
                    }
                }
            },
            changeDate(val, key, id){
                //pv
                let regex = /^\+?[1-9]\d*$/;
                if(val){
                    if(!regex.test(val)){//数字判断
                        this.checkNumber(id, val, '1');
                        return;
                    } else {
                        this.checkNumber(id, val, '', '', this.isCorrect1);
                    }
                }
                
                let z = null;
                let x = null;
                let k = null;
                let overNum = null;
                if(key == 'z') {//每日可分配PV
                    z = val;
                }
                this.ruleLists.forEach(function(item,index){
                    if(item.pv){//k值:每日PV总量，z=k-x(n个x)
                        k = Number(item.pv);
                    }
                });
                if(key == 'x') {//量级
                    let circleObj = this.ruleLists;
                    for(let i=0,l=circleObj.length;i<l;i++) {
                        for(let m= 0,t=circleObj[i].resource_config.length;m<t;m++) {
                            if(t<2) {//如果只有一条记录
                                x = Number(circleObj[i].resource_config[m].pv);
                            } else {//如果有多条记录
                                x += Number(circleObj[i].resource_config[m].pv);
                            }
                            if(k-x >= 0){
                                circleObj[0].residuepv = k - x;
                            } else {// 数值大于总数时
                                //输入数值或者合值超过总数，当前数值删除一位
                                circleObj[i].resource_config[m].pv = 
                                circleObj[i].resource_config[m].pv.substr(0, circleObj[i].resource_config[m].pv.length - 1);
                                // 重新取所有量级数，赋值给每日可分配PV值
                                for(var f=0,g=circleObj.length;f<g;f++) {
                                    for(var s=0,n=circleObj[f].resource_config.length;s<n;s++){
                                        overNum += Number(circleObj[f].resource_config[s].pv);
                                    }
                                }
                                
                                circleObj[0].residuepv = k - overNum;
                                this.$message({
                                    message: '请输入小于或等于每日可分配PV量',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                    }
                }
                       
            }
             
        },
    }
</script>
<style lang="scss">
    @import '../../../style/mixin';
    @import '../../../style/common';
    
.media-create{
    .template-hd{
        padding: 20px 0 20px 30px;
        border-bottom-width: 1px;
        background-color: #ffffff;
    }
    .base-bd{
        padding: 20px 30px 0 30px;
        background-color: #ffffff;
        &:last-child .create-row{
            border-bottom: 0 none;
        }
    }
    // single row
    .create-row{
        margin-bottom: 13px;
        .el-input{
            width: 240px;
        }
        .el-checkbox__label{
            @include sc(12px,
            $firstc);
        }
        &:last-child{
            margin-bottom: 0;
            border-bottom: 1px solid $bc;
        }
    }
    // single row title
    .data-item,
    .data-item-wider{
        color:$firstc;
        font-weight: bold;
        width: 62px;
        display: inline-block;
    }
    .data-item-wider{
        width: 120px;
    }
    .row-tip{
        margin-left: 8px;
        @include sc(12px, #7f8599);
    }
    // remove button
    .el-button--danger{
        vertical-align: -1px;
        margin-left: 4px;
    }
    // set price
    .rule-set{
        padding-bottom: 5px;
        // basic row
        .set-second-row{
            padding-bottom: 13px;
            .el-button--confirm{
                vertical-align: -1px;
                margin-left: 6px;
            }
            .per-unit .error-tip{
                padding: 6px 0 0 0;
            }
        }
        // adjust add button space
        .price-location{
            position: relative;
            .el-button--confirm{
                position: absolute;
                margin-left: 10px;
            }
        }
        .data-item{
            margin: 9px 3px 0 0;
        }
        // title
        .inferior-title{
            color:$secondc;
            margin-top: 9px;
            width: 61px;
        }
        .space-under>td{
            padding: 20px 0 7px 20px;
            border-bottom: 10px solid #fff;
            &:first-child{
                width: 326px;
            }
            &:last-child{
                padding: 20px 20px 7px 0;
            }
        }
        .unit-setting{
            display: inline-block;
            width: 240px;
        }
        // unit style
        .unit{
            @include topRightRadius(5px);
            @include bottomRightRadius(5px);
            font-size: 12px;
            height: 38px;
            padding: 13px 14px;
            top: 0;
        }
        .resource-wrap{
            background-color: #fbfbfb;
            margin-bottom: 10px;
        }
    }
    // adjust border with 0
    .border-none{
        border-bottom: 0 none;
        padding-bottom: 15px;
    }
    .el-input--suffix{
        margin-right: 2px;
    }
    // confirm and cancel
    .is-confirm{
        padding-left: 30px;
    }
}
</style>