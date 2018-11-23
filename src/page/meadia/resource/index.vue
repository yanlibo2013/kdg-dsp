<template>
<div class="resource-list">
        <el-main>
            <el-row class="resource-list-content">
                <el-col :span="24">
                    <div class="resource-bd">
                        <div class="template-hd">资源列表</div>
                        <!-- checkboxs group -->
                        <div class="creative-param">
                            <div class="creative-nav-row c-size clear" v-show="mediaName.length > 0">
                                <span class="hd left">选择媒体：</span>
                                <div class="bd">
                                    <!-- <el-checkbox :indeterminate="meadiaisIndeterminateType" v-model="meadiacheckAllType" @change="meadiaHandleCheckAllChangeType">全选</el-checkbox> -->
                                    <el-checkbox-group v-model="selectMeadia" @change="handleCheckedMeadiaChange">
                                        <el-checkbox v-for="size in mediaName" :label="size" :key="size">{{size}}</el-checkbox>
                                    </el-checkbox-group>
                                    <span class="fold-iron"></span>
                                </div>
                            </div>
                            <div class="creative-nav-row c-type clear">
                                <span class="hd left">资源类型：</span>
                                <div class="bd">
                                     <!-- <el-checkbox :indeterminate="resourceisIndeterminateType" v-model="resourcecheckAllType" @change="resourceHandleCheckAllChangeType">全选</el-checkbox> -->
                                    
                                    <el-checkbox-group v-model="selectResource" @change="handleResourceTypesChange">
                                        <el-checkbox v-for="type in resoureType" :label="type" :key="type">{{type}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="resource-bd border-bottom-2">
                        <!-- 批量配置 搜索 -->
                        <div class="creative-btn-control">
                            <div class="creative-btn-row">
                                <el-button 
                                type="click" 
                                :class="{'open-clicked1':isLighten}"
                                @click='batchSwithResource'
                                >批量配置</el-button>
                                <div class="search-input">
                            <!-- <el-input placeholder="搜索内容..." prefix-icon="el-icon-search" @keyup.native="searchDataBykeyword(keyword)" v-model="keyword"> -->
<div class="el-input el-input--prefix">

  <input autocomplete="off" placeholder="请输入关键词" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="searchkey" @keyup="keySearchData" />
    <span class="el-input__prefix">
        <i class="el-input__icon el-icon-search"></i>
    </span>
    <span class="el-input__prefix custom__close" v-show="clearIt">
        <span class="el-input__prefix-inner">
            <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearInput"></i>
        </span>
    </span>
</div>
                                    <!-- <el-input placeholder="请输入媒体名称" prefix-icon="el-icon-search" v-model="searchkey" clearable 
                                    @change="keySearchData">
                                    </el-input> -->

                                </div>
                            </div>
                        </div>
                        <!-- 数据表格 -->
                        <el-table 
                        :data="pageList.data" 
                        style="width: 100%"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        >
                            <el-table-column 
                            type="selection"
                            >
                            </el-table-column>
                            <el-table-column prop="media_name" label="媒体名称">
                            </el-table-column>
                            <el-table-column label="APP id">
                                <template slot-scope="scope">
                                    <span>
                                    android:{{scope.row.package_A}},
                                    ios:{{scope.row.package_I || ''}}
                                   </span>
                                    
                <!-- current_app_pid:null,//当前广告位AppId的id
                current_row_id:null,//当前列表中操作的行的id
                current_app_pid_input:null,//当前广告位AppId的input值
                 -->

<!--     <el-input type="textarea" v-model="scope.row.media_domain" 
    v-show='scope.row.media_domain != current_app_pid || scope.row.id != current_row_id' autosize 
    placeholder="请输入内容" resize="none" 
    @blur="saveapp_id(scope.row.id, scope.row.media_domain)">
    {{ scope.row.media_domain }}
    </el-input> -->
                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_name" label="广告位名称">
                            </el-table-column>
                            <el-table-column label="广告位id">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.ad_id }}</span>


                                   <!--  <span>{{ scope.row.ad_pid1 }}</span>
                                    <br v-if="scope.row.ad_pid2 && scope.row.ad_pid1">
                                    <span>{{ scope.row.ad_pid2 }}</span> -->

           <!--  <el-input type="textarea" v-model="scope.row.ad_pid"  
      v-show='scope.row.ad_pid != current_ad_pid || scope.row.id != current_row_id' autosize 
      placeholder="请输入内容" resize="none"
      @blur="savead_pid(scope.row.id, scope.row.ad_pid)">
    {{ scope.row.ad_pid }}
    </el-input> -->
                                </template>
                            </el-table-column>
                            <el-table-column prop="sources_type" label="类型">
                            </el-table-column>
                            <!-- <el-table-column prop="sources_standard" label="素材规范">
                            </el-table-column> -->
                            <el-table-column label="每日预估总pv">
                                  <template slot-scope="scope">
                                    {{
                                       (scope.row.pv.toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
                                    }}
                                  </template>
                            </el-table-column>
                            <el-table-column label="采购成本">
                                <template slot-scope="scope">
                                    <span>{{scope.row.settlement_price}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pv" label="销售成本">
                                  <template slot-scope="scope">
                                    <span>{{scope.row.cost.toFixed(2)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="规则">
                                <template slot-scope="scope">
                                    <div class="address-row">
                                       <a href="#" 
                                       class="setLink"
                                       @click="swithResource(scope.row.id)"
                                       v-show="setPermission(29)"
                                       >配置</a> 
                                    </div>
                                </template>
                                
                            </el-table-column>
                        </el-table>
                        <!-- paganation -->
                        <div class="block resourcePage">
                             <el-pagination 
                             @size-change="handleSizeChange" 
                             @current-change="handleCurrentChange" 
                    :current-page="pageList&&pageList.current_page" 
                    :page-sizes="[10, 20, 30, 40]" 
                    :page-size="pageList&&pageList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="pageList&&pageList.total">
                    </el-pagination>
                        </div>
                    </div>
                </el-col> 
            </el-row>
        </el-main>
    </div>
</template>
<script>
    import { meadia } from "../../../service/index"
    import {isPermission} from "../../../common/utils";
    import {
        mapState,
        mapActions
    } from "vuex";
   
    
    export default {
        data: function(){
            return {//所有的展示的数据形式
               
                /*new start*/
                pagesize:10,//每页显示多少条
                meadiaNameOrigin:[],//媒体的原始数据
                resourctTypeOrigin:[{"id":1,"name":"Banner"},{"id":3,"name":"Video"},{"id":2,"name":"Native"}],//资源类型原始值
                mediaName:[],//所有的媒体
                selectMeadia:[],//选择的媒体
                meadiaisIndeterminateType:true,//媒体是否是多选
                meadiacheckAllType:false,//媒体是否是全选的状态
                resourceisIndeterminateType:true,
                selectResource:[],
                resoureType:['Banner', 'Video', 'Native'],//选择的资源类型
                resourcecheckAllType:false,
                searchkey:'',//表格的搜索关键词
                pageList: {
                    current_page:null,
                    data:[],
                    total:null,
                    pre_page:null,
                },//列表的数据展示
                postArgument:{//向后台提交的参数
                    'page': 1,//当前页
                    'pagesize': 10,//每页显示条数
                    'plat_id': null,// 媒体id
                    'sources_type': null,//资源类型
                    'search': null,//搜索的关键词
                },
                show_ad_icon:true,//当前广告是否是显示状态
                current_ad_pid:null,//当前广告位的id
                current_ad_pid_input:null,//当前广告位的input值
                show_app_icon:true,//当前广告appID是否是显示状态
                current_app_pid:null,//当前广告位AppId的id
                current_app_pid_input:null,//当前广告位AppId的input值
                current_row_id:null,//当前列表中操作的行的id
                multipleSelection: [],//表单的多选
                isLighten: false,
                clearIt: false,//关闭图标设置

            }
        },
        computed:{
            current_ad_pid1:function(id){
                this.current_ad_pid = id
            }
        },
        mounted(){//挂在完成之后执行的函数
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            var that = this;
            //获得媒体类型
             meadia.meadiaType().then(res => {
                if (res.data.code == 0) {//将从后台取到的值放进data中
                    let arr =[];
                    that.meadiaNameOrigin = res.data.data;
                    res.data.data.map((item,index)=>{
                       arr.push(item["name"]) 
                    })
                    this.mediaName = arr;
                }
            });
            //获得资源列表的数据
            this.getList(this.postArgument);
        },
        methods:{//点击和默认加载的事件
            ...mapActions(["setBreadCrumb"]),
            clearInput(){
                this.clearIt  = false;
                this.searchkey = "";
                this.postArgument['search'] = "";
                this.getList(this.postArgument);
            }, 
            setPermission(val){
                    return isPermission(val);
                    },
            meadiaHandleCheckAllChangeType(val){//选择媒体的全选
                console.log(val)
                this.selectMeadia = val ? this.mediaName : [];
                this.meadiaisIndeterminateType = false;
                
                if(val){
                    let plat_id = this.ObjSwitchArray(this.meadiaNameOrigin);
                    this.postArgument['plat_id'] = plat_id;
                    
                }else{
                    let plat_id = null;
                    this.postArgument['plat_id'] = null;
                }
                this.getList(this.postArgument);
               
            },
            resourceHandleCheckAllChangeType(val){
                this.selectResource = val ? this.resoureType : [];
                this.resourceisIndeterminateType = false;
                if(val){
                    let sources_type = this.ObjSwitchArray(this.resourctTypeOrigin);
                    this.postArgument['sources_type'] = sources_type;
                    
                }else{
                    let sources_type = null;
                    this.postArgument['sources_type'] = null;
                }
                this.getList(this.postArgument);
            },
            ObjSwitchArray(arr){//将对象转成数组的形式
                let result =[];
                arr.map(function(item){
                    result.push(item.id)
                });
                return result;
            },
            getIdByValue(value,originObj){
               let ary =[];
               value.forEach(function(val){
                     originObj.forEach(function(item){
                          if(item.name == val){
                            ary.push(item.id)
                          }
                    })
               });
               return ary;
            },
            handleCheckedMeadiaChange(value){//媒体类型的改变
                let plat_id = this.getIdByValue(value,this.meadiaNameOrigin);
                 console.log("选中的值"+value+";;;媒体的id是："+plat_id);
                //获得选中的值对应的id
               
                let checkedCount = value.length;
                 this.meadiacheckAllType = checkedCount === this.mediaName.length;
                 this.meadiaisIndeterminateType = checkedCount > 0 && checkedCount < this.mediaName.length;
                if(plat_id.length == 0){
                    plat_id = null;
                } 
                this.postArgument['plat_id'] = plat_id;
                this.getList(this.postArgument);
            },
            handleResourceTypesChange(value){//资源类型的改变
                 let sources_type = this.getIdByValue(value,this.resourctTypeOrigin);
                 let checkedCount = value.length;
                 this.resourcecheckAllType = checkedCount === this.resoureType.length;
                 this.resourceisIndeterminateType = checkedCount > 0 && checkedCount < this.resoureType.length;
                if(sources_type.length == 0){
                    sources_type = null;
                } 
                this.postArgument['sources_type'] = sources_type;
                this.getList(this.postArgument);
            },
            keySearchData(){//关键词搜索
                this.searchkey? this.clearIt = true: this.clearIt = false;
                this.postArgument['search'] = this.searchkey;
                this.getList(this.postArgument);
            },
            //修改appid和广告位的id
            changeAppId(id,rowId){//
                this.current_app_pid = id;
                this.current_app_pid_input = id;
                this.current_row_id = rowId
            },
            saveapp_id(id,media_domain){
                let that = this;
                meadia.changeMeadiaResourcePage({
                    id:id,media_domain:media_domain
                }).then(res => {
                    
                    if (res.data.code == 0) {
                        that.$message({
                          message: '恭喜你，修改成功',
                          type: 'success'
                        });
                        that.current_app_pid= null;
                        that.getList(that.postArgument);
                        
                     }else{
                       that.$message({
                          message: '未作变动',
                          type: 'warning'
                        });
                        return false;
                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    this.show_ad_icon=true;
              });
            },
            savead_pid(id,ad_pid){
                let that = this;
                meadia.changeMeadiaResourcePage({
                    id:id,ad_pid:ad_pid
                }).then(res => {
                    if (res.data.code == 0) {
                        that.$message({
                          message: '恭喜你，修改成功',
                          type: 'success'
                        });
                        that.current_ad_pid= null;
                        that.getList(that.postArgument);
                    }else{
                       that.$message({
                          message: '未作变动',
                          type: 'warning'
                        });
                        return false;
                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    this.show_ad_icon=true;
              });
            },
            handleSizeChange(val){//每页显示多少条
                this.postArgument['pagesize'] = val
                this.getList(this.postArgument);
            },
            handleCurrentChange(val) {//点击当前的页吗
                this.postArgument['page'] = val
                this.getList(this.postArgument);
            },
            swithResource(id){//切换到资源配置页面
                 this.$router.push({ 
                    path: '/resourseSet/'+id
                 })
            },
            batchSwithResource(){//实现批量配置页面
                if(this.multipleSelection.length == 0){//显示提示信息
                   this.$message({
                          message: '请选择要配置的媒体信息',
                          type: 'warning'
                        });
                    return false;
                }
                let checkedOption =this.multipleSelection;
                let selectIds=[];
                let resultIds='';
                checkedOption.map(function(item,index){
                    selectIds.push(item.id);
                });
                 resultIds = selectIds.join(",");
                 this.$router.push({ 
                    path: '/resourseSet/'+resultIds,
                   
                 });
            },
            getList(data){
              let that = this;
              meadia.meadiaResourcePage(data).then(res => {
                if (res.data.code == 0) {
                      res.data.data.data.forEach(function(item,index){
                            if(item.ad_pid == '' || item.ad_pid == undefined || item.ad_pid == null){
                                 item.ad_pid1 = '';
                                 item.ad_pid2 = '';
                            }else{
                                 let tempAry = JSON.parse(item.ad_pid);
                                //ad_pid:"["1267","2323"]"  
                                if(item.ad_type == 1){
                                     item.ad_pid1 = 'A:'+tempAry[0];
                                }else if(item.ad_type == 2){
                                     item.ad_pid2 = 'I:'+tempAry[0];
                                }else if(item.ad_type == 3){
                                    for(var i=0;i<tempAry.length;i++){
                                         if(i ==0){
                                            tempAry[i] = 'A:'+tempAry[i];
                                         }else if(i ==1){
                                            tempAry[i] = 'I:'+tempAry[i];
                                         }
                                     }
                                    item.ad_pid1 = tempAry[0];
                                    item.ad_pid2 = tempAry[1];
                                }
                            }
                           

                            let str = "";//处理广告位规范
                            item.sources_standard = JSON.parse(item.sources_standard).map(function(item){
                                switch(item.imagetype){
                                    case "image":
                                        str+=`类型:图片,宽:${item.W},高:${item.H},格式:${item.imagetype},浮动系数:${item.float_x}`
                                        break;
                                     case "imagetext":
                                       str+=`类型:图文,宽:${item.W},高:${item.H},格式:${item.imagetype},标题:${item.title},描述:${item.desc},浮动系数:${item.float_x}`
                                        break;
                                    case 'imagegroup':
                                        str+=`类型:组图,宽:${item.W},高:${item.H},格式:${item.imagetype},个数:${item.imagenumber},标题:${item.title},描述:${item.desc},浮动系数:${item.float_x}`
                                        break;
                                     case "shortvideo":
                                         str+=`类型:短视频,封面宽:${item.W},封面高:${item.H},封面格式:${item.imagetype},视频宽:${item.videowidth},视频高:${item.videoheight},视频格式:${item.videotype},视频时长:${item.videotime},标题:${item.title},描述:${item.desc},浮动系数:${item.float_x}`
                                        break;
                                    case 'longvideo':
                                        str+=`类型:视频,视频宽:${item.videowidth},视频高:${item.videoheight},视频格式:${item.videotype},视频时长:${item.videotime},浮动系数:${item.float_x}`
                                        break;
                                        
                                         case "gif,png":
                                        str+=`类型:视频,视频宽:${item.videowidth},视频高:${item.videoheight},视频格式:${item.videotype},视频时长:${item.videotime},浮动系数:${item.float_x}`
                                        break;  
                                   }
                                return str;



                            })


                        })
                       
                    that.pageList = res.data.data;

                }

                  if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
              });
             },
             handleSelectionChange(val) {//表格的多选
                this.multipleSelection = val;
                console.log(this.multipleSelection)
                // buttons light
                if (this.multipleSelection.length != 0) {
                    this.isLighten = true;
                } else {
                    this.isLighten = false;
                }
            }
        }
    }
    //广告位的id是重复值的时候，可以将对应的列的id进行传递
</script>
<style lang="scss">
    @import '../../../style/mixin';
    .resource-list{
        .el-main{
            background-color: transparent;
        }
        // background
        .resource-bd{
            background-color: #ffffff;
        }
        // head padding
        .template-hd{
            padding: 17px 0 18px 30px;
            border-bottom: 1px solid $bc;
        }
        // checkbox group
        .creative-param{
            padding: 9px 0 10px 30px;
            border-bottom: 2px solid #e1e7f0;
            span{
                font-size: 12px;
                line-height: 20px;
            }
            .hd{
                margin-right: 6px;
                font-size: 14px;
                font-weight: bold;
            }
            .align-right{
                margin-right: 30px;
            }
            .creative-nav-row {
                padding: 15px 0;
                position: relative;
            }
            .el-checkbox-group {
               // padding-left: 78px;
            }
            .el-collapse-item__arrow {
                float: none;
                position: absolute;
                top: 1px;
                right: 35px;
                z-index: 20;
                color: #ffffff;
            }
            .el-checkbox__label,
            .el-checkbox__input.is-checked+.el-checkbox__label{
                color: #7f8599;
            }
        }
        // button and search
        .creative-btn-control{
            margin-top: 20px;
            .creative-btn-row{
                padding: 20px 30px;
                position: relative;
            }
            .search-input{
                position: absolute;
                width: 182px;
                right: 30px;
                top: 20px;
                border: 0 none;
                margin:0;
                text-indent: 0;
                .el-input-group__append, .el-input-group__prepend{
                    padding:0 !important;
                    background-color: #fff;
                }
                .el-input-group__append{
                    border-color: #e1e7f0;
                    .el-button{
                        padding: 3px 27px 21px!important;
                    }
                }
                .el-icon-search{
                    color: #a5a6bb !important;
                    &:before{
                        font-size: 18px!important;
                    }
                }
                // .el-input__prefix{
                //     left: 83% !important;
                // }
                .el-input__suffix{
                    right: 25px;
                }
                .el-input--prefix .el-input__inner{
                    padding-left: 20px;
                }
            }
        }
        .el-table{
            th:first-child,
            td:first-child{
                padding-left: 16px;
            }
            th:nth-child(2),
            td:nth-child(2){
                padding-left: 20px;
            }
            th:nth-child(6),
            td:nth-child(6),
            th:nth-child(8),
            td:nth-child(8),
            th:nth-child(9),
            td:nth-child(9),
            th:nth-child(10),
            td:nth-child(10){
                text-align: center;
            }
            th:nth-child(11),
            td:nth-child(11){
                text-align: right;
                padding-right: 20px;
            }
        }
        
        //new add by lq
        .el-checkbox {
            float: left;
            margin: 0 21px 10px 0;
        }
        .setLink{
            color: #1E9FFF;
            &:hover{
                text-decoration: underline;
            }
        }
        
    }
    // .el-icon-revise{
    //     cursor: pointer;
    //     background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
    //     height: 19px;
    //     width: 19px;
    //     &:hover{
    //         background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
    //     }
    // }
</style>