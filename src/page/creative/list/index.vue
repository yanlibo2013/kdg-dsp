<template>
    <!-- 创意列表 -->
    <div class="creative-list ">
        <el-main>
            <el-row class="creative-list-content">
                <el-col :span="24" class="margin-bottom-20">
                    <div class="creative-param">
                        <div class="creative-nav-row c-size clear" v-if="sizeData.length > 0">
                            <el-collapse>
                                <el-collapse-item name="1">
                                    <template slot="title">
                                                
                                            <span class="fold-iron"></span>
                                            <span class="hd left">创意尺寸：</span>
                                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                            <el-checkbox-group class="clear" v-model="checkedSizes" @change="handleCheckedCitiesChange">
                                                <el-checkbox v-for="size in sizeData" :label="size" :key="size">{{size}}</el-checkbox>
                                            </el-checkbox-group>
</template>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="creative-nav-row c-type clear" v-show="typeList.length>0">
                            <span class="hd left">创意样式：</span>
                            <div class="bd">
                                <el-checkbox :indeterminate="isIndeterminateType" v-model="checkAllType" @change="handleCheckAllChangeType">全选</el-checkbox>
                                <el-checkbox-group v-model="checkedType" @change="handleCheckedTypeChange">
                                    <el-checkbox v-for="type in typeList" :label="type" :key="type">{{type}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                       <!--  <div class="creative-nav-row c-status clear">
                              <span class="hd left">创意状态：</span>
                            <div class="bd">
                                <el-checkbox :indeterminate="isIndeterminateState" v-model="checkAllState" @change="handleCheckAllChangeState">全选</el-checkbox>
                                <el-checkbox-group v-model="checkedState" @change="handleCheckedStateChange">
                                    <el-checkbox v-for="status in stateList" :label="status" :key="status">{{status}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div> -->
                    </div>
                </el-col>
                <el-col :span="24" class="border-bottom-2">
                    
                    <div class="creative-btn-control" style="min-height:78px">
                        <div class="creative-btn-row">
                <a href="javascript:void(0)" class="single-link el-link-add" @click="openBanner" v-show="setPermission(24)">
                    <i class="add-iron">+</i>
                    <span class="add-msg">Banner</span>
                </a>
                <a href="javascript:void(0)" class="single-link el-link-add" @click="openVideo" v-show="setPermission(24)">
                    <i class="add-iron">+</i>
                    <span class="add-msg">Video</span>
                </a>
                <a href="javascript:void(0)" class="single-link el-link-add" @click="openNative" v-show="setPermission(24)">
                    <i class="add-iron">+</i>
                    <span class="add-msg">Native</span>
                </a>
                        </div>
                        <div class="creative-btn-row">
                            <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open" v-show="setPermission(26)">开启</el-button>
                            <el-button type="click" :class="{'open-clicked1':isLighten}" @click="close" v-show="setPermission(26)">关闭</el-button>
                            <el-button type="click" :class="{'open-clicked1':isLighten}" @click="copy" v-show="setPermission(24)">复制</el-button>
                            <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del"  v-show="setPermission(27)">删除</el-button>
                            <el-button type="click" :class="{'expose-clicked1':isLighten}" @click="openType"  v-show="setPermission(28)">修改打开类型</el-button>
                            <!-- 弹层 -->
                            
    <el-dialog 
     class="revise-monitor pop-reivse-type"
     title="修改打开类型&跳转地址" 
    :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="打开类型：" :class="{'short-form-item':form.link_type==0}">
                    <template slot-scope="scope">
                        <el-select v-model="form.link_type" placeholder="请选择" @change="modifType(form.link_type)">
                            <el-option v-for="item in linkList" :key="item.value" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                  <!-- link_type为1 H5落地页 -->
                <el-form-item label="修改到达地址：" v-if="form.link_type==1">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入H5跳转地址" v-model="form.h5address"> </el-input>
                    </template>
                </el-form-item>

                <!-- link_type为2 android应用下载 -->
                 <el-form-item label="H5跳转地址" v-if="form.link_type==2">
                    <el-input placeholder="H5跳转地址" v-model="form.h5address">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="Android应用包名" v-if="form.link_type==2">
                    <el-input placeholder="Android应用包名" v-model="form.packageName">
                    </el-input>
                <el-form-item label="Android下载地址" v-if="form.link_type==2">
                    <el-input placeholder="Android下载地址" v-model="form.androidaddress">
                    </el-input>
                </el-form-item>
                </el-form-item>

                <!-- link_type为3 ios应用下载-->

                 <el-form-item label="H5跳转地址" v-if="form.link_type==3">
                    <el-input placeholder="H5跳转地址" v-model="form.h5address">
                    </el-input>
                </el-form-item>
                 <el-form-item label="IOS应用包名" v-if="form.link_type==3">
                    <el-input placeholder="IOS应用包名" v-model="form.packageName">
                    </el-input>
                </el-form-item>
                <el-form-item label="IOS下载地址" v-if="form.link_type==3">
                    <el-input placeholder="IOS下载地址" v-model="form.iodaddress">
                    </el-input>
                </el-form-item>

                <!-- link_type为4 andriod应用直达-->
                  <el-form-item label="H5跳转地址" v-if="form.link_type==4">
                    <el-input placeholder="H5跳转地址" v-model="form.h5address">
                    </el-input>
                </el-form-item>
                <el-form-item label="修改Android启动url：" v-if="form.link_type==4">
                    <el-input placeholder="修改Android启动url" v-model="form.androidarouse">
                    </el-input>
                </el-form-item>
                <el-form-item label="修改Android应用包名" v-if="form.link_type==4">
                    <el-input placeholder="修改Android应用包名" v-model="form.packageName">
                    </el-input>
                </el-form-item>

                 <!-- link_type为5 ios应用直达-->

                <el-form-item label="H5跳转地址" v-if="form.link_type==5">
                    <el-input placeholder="H5跳转地址" v-model="form.h5address">
                    </el-input>
                </el-form-item>
                <el-form-item label="修改IOS启动url：" v-if="form.link_type==5">
                    <el-input placeholder="修改IOS启动url：" v-model="form.iosarouse">
                    </el-input>
                </el-form-item>
                <el-form-item label="修改IOS应用包名" v-if="form.link_type==5">
                    <el-input placeholder="修改IOS应用包名" v-model="form.packageName">
                    </el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                
                <div class="is-confirm">
                    <el-button type="confirm" @click="onSubmit" >确认</el-button>
                    <el-button type="cancel" @click="closeDialog(false)">取消</el-button>
                </div>
            </div>
        </el-dialog>


<div style="position:absolute;width: 188px;right: 200px;top: 0px;">
    <el-select v-model="checkedState" placeholder="状态" @change="changefilterstate">
    <el-option
      v-for="item,index in stateList"
      :key="item.label"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>

                            <div class="search-input">

<div class="el-input el-input--prefix">

    <input autocomplete="off" placeholder="请输入关键词" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="searchname" @keyup="getDataByName" />
    <span class="el-input__prefix">
        <i class="el-input__icon el-icon-search"></i>
    </span>
    
    <span class="el-input__prefix custom__close" v-show="clearIt">
        <span class="el-input__prefix-inner">
            <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearInput"></i>
        </span>
    </span>
</div>
                            </div>
                        </div>
                    </div>
    <!-- <img class="theme-pic" src="../../../style/image/creative/theme-pic.jpg" alt="" /> -->
                    <!-- table start -->
                    <div class="table-wrap">
                        <el-table :data="pageList.data" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column prop="preview" label="创意预览" width="80">
<template slot-scope="scope">
    <div v-if="scope.row.file_type == 'mp4'|| scope.row.file_type == 'flv'|| scope.row.file_type == 'swf'">
        <img @click="createPopLayer('video', scope.row.file_path, 710, 398, $event)" class="theme-pic" src="../../../style/image/creative/video-img.png" alt="" />
    </div>
    <div v-else>
        <img @click="createPopLayer('image', scope.row.file_path, scope.row.width, scope.row.height)" class="theme-pic" :src="scope.row.file_path" alt="" />
    </div>
</template>
                        </el-table-column>
                        <!-- <el-table-column prop="preview" label="创意预览" width="70">
<template slot-scope="scope">
    <img class="theme-pic" :src="scope.row.file_path" alt="" />
</template>
                        </el-table-column> -->
                        <el-table-column prop="theme" label="创意名称">
<template slot-scope="scope">
    <el-input v-model="scope.row.name" autosize placeholder="请输入内容" :readonly='currentIsEdit== scope.row.id?false:true' @focus="isActiveCurrent( scope.row.id)" @blur="editItem({id:scope.row.id,name:scope.row.name})">
        {{ scope.row.name }}
    </el-input>
    <!-- <span class="theme-name">{{ scope.row.name }}</span> -->
    <!-- <span class="see-iron"></span> -->
</template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="75">
                            
<template slot-scope="scope">
    <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
    </el-switch>
</template>
                        </el-table-column>
                        <el-table-column prop="size" label="尺寸" width="85">
<template slot-scope="scope">
     {{ scope.row.width }}x{{ scope.row.height }}
</template>
                        </el-table-column>
                        <el-table-column prop="family" label="类型" width="100">
<template slot-scope="scope">
     {{ scope.row.style_id }}
</template>
                        </el-table-column>
                        <!-- <el-table-column prop="creativeType" label="创意类型">
<template slot-scope="scope">
     图片JPG
</template>
                        </el-table-column> -->
<el-table-column prop="openType" label="打开类型" width="125">
<template slot-scope="scope">
    <el-select v-model="scope.row.link_type" 
        placeholder="请选择" 
        width="120"
        v-if="scope.row.flag==2">
        <el-option v-for="item in linkList" :key="item.key" :label="item.value" :value="item.key">
        </el-option>
    </el-select>

    <span v-else="scope.row.flag==1">
    <span v-if="scope.row.link_type==0">请选择111</span>
    <span v-if="scope.row.link_type==1">H5</span>

    <span v-if="scope.row.link_type==2">Android应用下载</span>
    <span v-if="scope.row.link_type==3">IOS应用下载</span>

    <span v-if="scope.row.link_type==4">Android应用直达</span>
    <span v-if="scope.row.link_type==5">IOS应用直达</span>

    </span>
</template>
</el-table-column>


 <el-table-column prop="address" label="点击跳转地址">
<!-- 修改到H5达地址 flag 1开启  flag 2 关闭 v-show多条件进行判断值 v-show 多条件进行判断值-->
<template slot-scope="scope">
    <el-form>
        <el-form-item label="H5地址：" v-show='scope.row.link_type==1&&scope.row.flag==2' class="single-input">
        
            <!-- <el-form-item label="H5地址：" v-if='scope.row.link_type==1' class="single-input"> -->
           <el-input  placeholder="请输入H5跳转地址"
                v-model="scope.row.h5address"  
                v-if="!scope.row.hasH5address"
                @focus="focusLink(scope.row.id)">
               
            </el-input>

          <span class="disabel-edit" v-if="scope.row.hasH5address">{{scope.row.h5address}}</span>

             <el-button type="primary" 
              v-if="!scope.row.hasH5address"
              @click="editLink({id:scope.row.id,link_type:scope.row.link_type,landing_page:scope.row.h5address})"  
              size="mini" 
            >
              <span style="color:#FFFFFF !important"> 确定</span>
              </el-button>
           
        </el-form-item>

        <el-form-item label="H5地址：" v-show='scope.row.link_type==1&&scope.row.flag==1'>
            <br>
            <span class="disabel-edit" >{{scope.row.h5address}}</span>
        </el-form-item>



        <el-form-item label="Android应用下载：" v-show="scope.row.link_type==2&&scope.row.flag==2">
            <!-- <el-form-item label="修改到APP达地址：" v-show="scope.row.link_type==2"> -->
           
            <br />
            <el-input  v-if="!scope.row.hasH5address" placeholder="请输入H5跳转地址" 
            v-model="scope.row.h5address"
            
            
             >
            </el-input>
            <span class="disabel-edit" v-if="scope.row.hasH5address">{{scope.row.h5address}}</span>
            <br />
            <el-input  v-if="!scope.row.hasAndroidaddress" placeholder="请输入Android下载地址" 
             v-model="scope.row.androidaddress"
              
            >
            </el-input>
            <span class="disabel-edit" v-if="scope.row.hasAndroidaddress">{{scope.row.androidaddress}}</span>
             <br />
            
            <el-input  v-if="!scope.row.hasappName" class="other-address" 
            v-model="scope.row.appName" 
            placeholder="请输入Android应用包名"
            >
            </el-input>
            <span class="disabel-edit" v-if="scope.row.hasappName">{{scope.row.appName}}</span>
            <br />
            <el-button  v-if="!scope.row.hasAndroidaddress"  @click="editLink({
                 id:scope.row.id,//唯一标示
                    link_type:scope.row.link_type,//链接类型
                    landing_page:scope.row.landing_page,//区别andriod和ios
                    landing_pages:scope.row.androidaddress,//andriod地址
                    pkgname:scope.row.appName,//包名
                    clickurl:scope.row.h5address,//H5跳转地址
                })" type="primary" size="small" ><span style="color:#FFFFFF !important"> 确定</span></el-button>
        </el-form-item>
        <el-form-item label="Android应用下载：" v-show='scope.row.link_type==2&&scope.row.flag==1' class="single-input">
          
            <br>
            <span class="disabel-edit">{{scope.row.h5address}}</span>
            <br>
            <span class="disabel-edit">{{scope.row.androidaddress}}</span>
           
              <br>
             <span class="disabel-edit">{{scope.row.appName}}</span>
        </el-form-item>


         <el-form-item label="IOS应用下载：" v-show="scope.row.link_type==3&&scope.row.flag==2">
          
            <br />
            <el-input v-if="!scope.row.hasH5address" placeholder="请输入H5跳转地址"
             v-model="scope.row.h5address" 
            
               @focus="focusLink(scope.row.id)">
            </el-input>
            <span class="disabel-edit" v-if="scope.row.hasH5address">{{scope.row.h5address}}</span>
            <br />
            <el-input v-if="!scope.row.hasiodaddress"  placeholder="请输入IOS下载地址" v-model="scope.row.iodaddress"   
            >
            </el-input>
            <span class="disabel-edit" v-if="scope.row.hasiodaddress">{{scope.row.iodaddress}}</span>
              <br />
            <el-input v-if="!scope.row.hasappName" appNameclass="other-address" 
            v-model="scope.row.appName"
             placeholder="请输入IOS应用包名" 
            >
            </el-input>
            <span class="disabel-edit" v-if="scope.row.hasappName">{{scope.row.appName}}</span>
            <el-button  v-if="!scope.row.hasiodaddress" @click="editLink({
               id:scope.row.id,//唯一标示
                    link_type:scope.row.link_type,//链接类型
                    deep_link:scope.row.deep_link,//区别andriod和ios
                    landing_pages:scope.row.iodaddress,//ios地址
                    pkgname:scope.row.appName,//包名
                    clickurl:scope.row.h5address,//H5跳转地址
                })" type="primary"  size="small" ><span style="color:#FFFFFF !important"> 确定</span></el-button>
        </el-form-item>
        <el-form-item label="IOS应用下载：" v-show='scope.row.link_type==3&&scope.row.flag==1' class="single-input">
          
            <br>
            <span class="disabel-edit">{{scope.row.h5address}}</span>
            <br>
            <span class="disabel-edit">{{scope.row.iodaddress}}</span>
            <br>
            <span class="disabel-edit">{{scope.row.appName}}</span>
        </el-form-item>



        <!-- 以下是应用直达的页面 -->
        <el-form-item label="Android应用直达：" 
           v-show="scope.row.link_type==4&&scope.row.flag==2 ">
             <br />
             <el-input v-if="!scope.row.hasH5address" placeholder="请输入H5跳转地址" 
              v-model="scope.row.h5address" 
                
               @focus="focusLink(scope.row.id)">
            </el-input>

            <br v-if="!scope.row.hasH5address"/>
            <span class="disabel-edit" v-if="scope.row.hasH5address">{{scope.row.h5address}}</span>
            <el-input v-if="!scope.row.hasandroidaddress" placeholder="请输入Android启动url"
             v-model="scope.row.androidaddress"
           
             >
            </el-input>
            <br v-if="scope.row.hasandroidaddress"/>
           <span class="disabel-edit" v-if="scope.row.hasandroidaddress">{{scope.row.androidaddress}}</span>
            <br v-if="scope.row.hasappName"/>
            <el-input v-if="!scope.row.hasappName" class="other-address" 
               placeholder="请输入Android应用包名" 
              v-model="scope.row.appName"
            >
            </el-input>
            <span class="disabel-edit" v-if="scope.row.hasappName">{{scope.row.appName}}</span>
            <br />
           <el-button v-if="!scope.row.hasandroidaddress"  @click="editLink({
                id:scope.row.id,//唯一标示
                    link_type:scope.row.link_type,//链接类型
                    landing_page:scope.row.deep_link,//区别andriod和ios
                    landing_pages:scope.row.androidaddress,//andriod地址
                    pkgname:scope.row.appName,//包名
                    clickurl:scope.row.h5address,//H5跳转地址
               })" type="primary"  size="small" ><span style="color:#FFFFFF !important"> 确定</span></el-button>
        </el-form-item>
        <el-form-item label="Android应用直达：" v-show="scope.row.link_type==4&&scope.row.flag==1 ">
            <br />
            <span class="disabel-edit">{{scope.row.h5address}}</span>
            <br />
            <span class="disabel-edit">{{scope.row.androidaddress}}</span>
            <br />
            <span class="disabel-edit">{{scope.row.appName}}</span>
        </el-form-item>

         <el-form-item label="IOS应用直达 ：" v-show="scope.row.link_type==5&&scope.row.flag==2 ">
              <br />
             <el-input v-if="!scope.row.hasH5address" placeholder="请输入H5跳转地址" 
             v-model="scope.row.h5address" 
            
               @focus="focusLink(scope.row.id)">
            </el-input><br v-if="!scope.row.hasH5address"/>
     <span class="disabel-edit" v-if="scope.row.hasH5address">{{scope.row.h5address}}</span>
            <el-input  v-if="!scope.row.hasiodaddress" class="other-address" 
              placeholder="请输入iOS启动url" 
                
              v-model="scope.row.iodaddress">
            </el-input><br v-if="scope.row.hasiodaddress"/>
           <span class="disabel-edit" v-if="scope.row.hasiodaddress">{{scope.row.iodaddress}}</span>
            <br />
          
            <el-input v-if="!scope.row.hasappName" class="other-address" 
               placeholder="请输入IOS应用包名" 
              v-model="scope.row.appName"
             >
            </el-input>
            <br v-if="!scope.row.hasappName"/>
            <span class="disabel-edit" v-if="scope.row.hasappName">{{scope.row.appName}}</span>
            
            
            <br  v-if="scope.row.hasiodaddress"/>
           <el-button v-if="!scope.row.hasiodaddress" @click="editLink({
                id:scope.row.id,//唯一标示
                    link_type:scope.row.link_type,//链接类型
                    deep_link:scope.row.deep_link,//区别andriod和ios
                    landing_pages:scope.row.iodaddress,//andriod地址
                    pkgname:scope.row.appName,//包名
                    clickurl:scope.row.h5address,//H5跳转地址
               })" type="primary" size="small" ><span style="color:#FFFFFF !important"> 确定</span></el-button>
        </el-form-item>
        <el-form-item label="IOS应用直达 ：" v-show="scope.row.link_type==5&&scope.row.flag==1">
             <br>
            <span class="disabel-edit">{{scope.row.h5address}}</span>
              <br>
            <span class="disabel-edit">{{scope.row.iodaddress}}</span>
              <br>
             <span class="disabel-edit">{{scope.row.appName}}</span>
            <br>
        </el-form-item>
        
    </el-form>
</template>
                            
                        </el-table-column>
                        <el-table-column prop="date" label="上传日期" width="90">
<template slot-scope="scope">
     {{ scope.row.create_time }}
</template>
                        </el-table-column>
                    </el-table>
                    </div>
                    <!-- table end -->
                    
                    <div class="block">
                          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="pageList&&pageList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="pageList&&pageList.total">
                    </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>
<script>
    import {
        creative
    } from "../../../service/index"
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        createPop,
        isPermission
    } from "../../../common/utils";
    import _ from "lodash";
    import store from 'store';
    import {
        GetUrlPara
    } from "../../../common/utils"
    export default {
        computed: {
            ...mapState({
                currentCheckedAd: "currentCheckedAd",
            }),
            statecurrentCheckedAd() {
                return this.$store.state.currentCheckedAd;
            },
        },
        watch: {
            statecurrentCheckedAd() {
                //重新客户请求创意尺寸
                this.getCreativeSizeList(this.$store.state.currentCheckedAd);
                this.getList({
                    ad_id: this.$store.state.currentCheckedAd,
                    page: 1,
                    pagesize: 10
                });

                
            }
        },
        data: function() {
            return {
                currentIsEdit: "",
                adList: [{
                    id: "",
                    com_name: "请选择"
                }], //广告主
                adUser: '',
                pageList: [],
                pageSize: 10,
                searchname: "", //
                //创意尺寸
                checkAll: false,
                checkedSizes: [],
                sizeData: [], //创意尺寸
                isIndeterminate: false,
                //创意类型
                checkAllType: false,
                checkedType: [],
                typeList: ['图片','图文','组图','视频信息流','短视频'], //类型集合 1banner 2video 3native
                isIndeterminateType: false,
                //创意状态
                checkAllState: false,
                checkedState: "0",
                //stateList: ["开启", "关闭"], //状态集合 1开启 2 关闭
                stateList: [{ //下拉选项
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '已开启'
                }, {
                    value: '2',
                    label: '已关闭'
                }], //状态集合 1开启 2 关闭
                isIndeterminateState: false,
                multipleSelection: [],
                textarea2: "",
                isLighten: false,
                value: "",
                form: {
                    type: "", //展现类型,
                    link_type: "",
                    h5address: "",//h5跳转地址
                    androidaddress: "",//andriod下载地址
                    iodaddress: "",//ios下载地址

                    androidarouse: "",//andriod启动url
                    iosarouse: "",//ios启动url

                    packageName: "",//应用包名
                    appName: ""
                },
                linkList: [{
                    key: 0,
                    value: "请选择"
                }, {
                    key: 1,
                    value: "H5"
                }, {
                    key: 2,
                    value: "Android应用下载"
                }, {
                    key: 3,
                    value: "IOS应用下载"
                }, {
                    key: 4,
                    value: "Android应用直达"
                }, {
                    key: 5,
                    value: "IOS应用直达"
                }],
                dialogFormVisible: false,
                dialogVisible: false,
                clearIt: false, //关闭图标设置
                dynamicTags: [],
                currentPage: "",
                flag: [],
                countHeight: false, //放开高度
                inputOut: false, //隐藏input
                currentIsWrite: "",
                showStatus: "",
                confirmBtnCustom: "",
                boxCustomClass: "",
            }
        },
        mounted() {
            if (GetUrlPara()) {
                console.log("if");
                this.flag = GetUrlPara().indexOf("flag") > -1 ? ["1"] : [];
            }
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            if (store.get("user")) {
                this.getCurrentUser(store.get("user"));
            }
            //创意尺寸
           this.getCreativeSizeList(this.$store.state.currentCheckedAd);
            //当前用户下所有客户
            creative.getAcountInformation().then(res => {
                if (res.data.code == 0) {
                    // this.adList = res.data.data.data;
                    this.adList = _.concat(this.adList, res.data.data.data);
                    //this.adUser = this.adList[1].id;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            //创意列表
            this.getList({
                // flag:this.flag,
                flag: [this.checkedState],
                ad_id: this.$store.state.currentCheckedAd || 0,
                page: 1,
                pagesize: 10
            });
            //console.log(GetUrlPara().indexOf("flag")>-1?["1"]:[]);
            document.getElementsByTagName("body")[0].onclick = function(vent) {
                //点击图片以外区域，弹层消失
                let imgObj = document.getElementById("el-preview_img");
                let closeObj = document.getElementById("el-close-pop");
                let dialogModal = document.getElementById("v-modal");
                let dialogWrap = document.getElementById("el-dialog__wrapper");
                if (dialogModal) {
                    var evt = window.event ? window.event : event,
                        target = evt.srcElement || evt.target;
                    if (target.id != "el-preview_img" && target.id != "el-close-pop") {
                        document.body.removeChild(dialogModal);
                        document.body.removeChild(dialogWrap);
                    } else {
                        return;
                    }
                }
            }

           
        },
        methods: {
            ...mapActions([
                "setBreadCrumb",
                "getCurrentUser"
            ]),
            setPermission(val){
                return isPermission(val);
            },
            //获得创意尺寸
            getCreativeSizeList(val){
                if(val){
                     creative.creativeSizeList({
                         ad_id:val
                     }).then(res => {
                        if (res.data.code == 0) {
                            this.sizeData = res.data.data;
                        }
                        if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });
                }else{
                    creative.creativeSizeList().then(res => {
                        if (res.data.code == 0) {
                            this.sizeData = res.data.data;
                        }
                        if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });
                }
              
            },

            //创建弹层
            createPopLayer(type, url, w, h, e) {
                createPop(type, url, w, h, document, e);
            },
            clearInput() {
                this.clearIt = false;
                this.searchname = "";
                this.getList({
                    page: 1,
                    pagesize: 10,
                    seachname: this.searchname,
                    ad_id: this.$store.state.currentCheckedAd,
                });
            },
            focusLink(val) {
                this.currentIsWrite = val;
               
            },
            editLink(val) {
               
                let data = {};
                if (val.link_type == 1) {
                   
                 if(!val.landing_page ){
                   this.$message({
                                message: "H5跳转地址不允许为空",
                                type: "warning"
                   });
                         return false;        
                }
                   
                     this.currentIsWrite = -1;
                    //console.log(val.landing_page)
                    data = {
                        id: [val.id],
                        link_type: val.link_type,
                        landing_page: val.landing_page
                    }
                    
                }
                if (val.link_type == 2) {
                    //andriod应用下载
                    
                    if(!val.landing_pages ){
                        
                   this.$message({
                                message: "andriod应用下载地址不允许为空",
                                type: "warning"
                   });
                         return false;        
                }
                    data = {
                        id: [val.id],
                        link_type: 2,
                        landing_page: JSON.stringify({
                            landing_page: val.landing_pages,
                            pkgname: val.pkgname,
                            clickurl:val.clickurl
                        }),
                    }
                }

                if (val.link_type == 3) {
                    if(!val.landing_pages ){
                        
                   this.$message({
                                message: "IOS下载地址不允许为空",
                                type: "warning"
                   });
                         return false;        
                }
                    //ios应用下载
                    data = {
                        id: [val.id],
                        link_type: 2,
                         deep_link: JSON.stringify({
                            landing_page: val.landing_pages,
                            pkgname: val.pkgname,
                            clickurl:val.clickurl
                        }),
                    }
                }



                 if (val.link_type == 4) {
                    //andriod 应用直达
                    if(!val.landing_pages ){
                        
                   this.$message({
                                message: "Android启动URL不允许为空",
                                type: "warning"
                   });
                         return false;        
                }
                    data = {
                        id: [val.id],
                        link_type: 3,
                         landing_page: JSON.stringify({
                            deep_link: val.landing_pages,
                            pkgname: val.pkgname,
                            // clickurl:val.clickurl,
                            landing_page:val.clickurl
                        }),
                    }
                }

                 if (val.link_type == 5) {
                    //ios 应用直达
                  
                     if(!val.landing_pages ){
                        
                   this.$message({
                                message: "iOS启动URL不允许为空",
                                type: "warning"
                   });
                         return false;        
                }
                    data = {
                        id: [val.id],
                        link_type: 3,
                         deep_link: JSON.stringify({
                           deep_link:val.landing_pages,
                            pkgname: val.pkgname,
                            // clickurl:val.clickurl,
                            landing_page:val.clickurl,
                        }),
                    }
                }



                if (val.link_type == 37) {
                    //scope.row.androidarouse
                    if (val.landing_page) {
                        if (!val.deep_link) {
                            this.$message({
                                message: "请输入Android唤起地址",
                                type: "warning"
                            });
                            return;
                        }
                    }
                    if (val.landing_pageios) {
                        if (!val.deep_linkios) {
                            this.$message({
                                message: "请输入IOS唤起地址",
                                type: "warning"
                            });
                            return;
                        }
                    }
                    if (!val.deep_link && !val.deep_linkios) {
                        this.$message({
                            message: "Android和IOS唤起地址不能都为空",
                            type: "warning"
                        });
                        return;
                    }

                    data = {
                        id: [val.id],
                        link_type: val.link_type,
                        landing_page: JSON.stringify({
                            landing_page: val.landing_page,
                            deep_link: val.deep_link
                        }),
                        deep_link: JSON.stringify({
                            landing_page: val.landing_pageios,
                            deep_link: val.deep_linkios
                        }),
                     }


              }





                creative.creativeeditTypeLink(data).then(res => {
                    if (res.data.code == 0) {
               
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        this.getList({
                            ad_id: this.$store.state.currentCheckedAd,
                            page: this.pageList.current_page,
                            pagesize: 10
                        });
                        this.clearform();
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            modifyStatus(val, flag) {
                if(flag == 2) {
                    this.showStatus='创意开启后，经设置可参与广告投放！确认开启？';
                    this.boxCustomClass = 'customOpenFontMore';
                    this.confirmBtnCustom = 'el-button--confirm';
                } else {
                    this.showStatus='创意关闭后，将不再参与广告投放！确认关闭？';
                    this.boxCustomClass = 'customCloseFontMore';
                    this.confirmBtnCustom = 'close-clicked1';
                }
                // console.log(flag);

                this.$confirm(this.showStatus, '', {
                    customClass: this.boxCustomClass,
                    confirmButtonText: '确定',
                    confirmButtonClass: this.confirmBtnCustom,
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
                    if (flag == "1") {//开启
                        creative.creativeflagCloseajax({
                            id: [val]
                        }).then(res => {
                            if (res.data.code == 0) {
                                //this.loading2 = false;
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getList({
                                    ad_id: this.$store.state.currentCheckedAd,
                                    page: this.currentPage,
                                    pagesize: 10,
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error"
                                });
                            }
                            if (res.data.code == -1) {
                                this.$router.push({
                                    path: "/login"
                                });
                            }
                        });
                    } else {
                        creative.creativeFlagOpenajax({
                            id: [val]
                        }).then(res => {
                            if (res.data.code == 0) {
                                //this.loading2 = false;
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getList({
                                    ad_id: this.$store.state.currentCheckedAd,
                                    page: this.currentPage,
                                    pagesize: 10,
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error"
                                });
                            }
                            if (res.data.code == -1) {
                                this.$router.push({
                                    path: "/login"
                                });
                            }
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });

            },
            modifType(val) {
                //this.form.link_type = val;
            },
            isActiveCurrent(val) {
                this.currentIsEdit = val;
                //console.log(this.currentIsEdit);
            },
            editItem(data) {
                creative.creativeEditname(data).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            //创意尺寸
            handleSizeChange(val) {
                this.pageSize = val;
                // creative.creativeListPage({
                //     page: 1,
                //     pagesize: this.pageSize,
                // });
                //创意列表
                this.getList({
                    page: 1,
                    pagesize: this.pageSize,
                    ad_id: this.$store.state.currentCheckedAd,
                    flag: [this.checkedState],
                    size: this.checkedSizes,
                    type: this.gitTypeIds(this.checkedType),
                    //  flag:this.flag,
                });
            },
            handleCurrentChange(val) {
                // creative.creativeListPage({
                //     page: val,
                //     pagesize: this.pageSize,
                // });
                //创意列表
                this.getList({
                    page: val,
                    pagesize: this.pageSize,
                    ad_id: this.$store.state.currentCheckedAd,
                    flag: [this.checkedState],
                    size: this.checkedSizes,
                    type: this.gitTypeIds(this.checkedType),
                    //  flag:this.flag,
                });
                this.currentPage = val;
            },
            //创意尺寸
            handleCheckAllChange(val) {
                this.checkedSizes = val ? this.sizeData : [];
                this.isIndeterminate = false;
                this.getList({
                    size: this.checkedSizes,
                    type: this.gitTypeIds(this.checkedType),
                    flag: [this.checkedState],
                    ad_id: this.$store.state.currentCheckedAd,
                    pagesize: this.pageSize,

                    //  flag:this.flag
                });
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.sizeData.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.sizeData.length;
                this.getList({
                    size: value,
                    type: this.gitTypeIds(this.checkedType),
                    flag: [this.checkedState],
                    ad_id: this.$store.state.currentCheckedAd,
                    pagesize: this.pageSize,
                    //  flag:this.flag,
                });
            },
            //创意类型
            handleCheckAllChangeType(val) {
                this.checkedType = val ? this.typeList : [];
                this.isIndeterminateType = false;
                this.getList({
                    type: this.gitTypeIds(this.checkedType),
                    size: this.checkedSizes,
                    flag: [this.checkedState],
                    ad_id: this.$store.state.currentCheckedAd,
                     pagesize: this.pageSize,
                    //  flag:this.flag
                });
            },
            handleCheckedTypeChange(value) {
                let checkedCount = value.length;
                this.checkAllType = checkedCount === this.typeList.length;
                this.isIndeterminateType =
                    checkedCount > 0 && checkedCount < this.typeList.length;
                console.log(this.isIndeterminateType)
                this.getList({
                    type: this.gitTypeIds(value),
                    size: this.checkedSizes,
                    flag: [this.checkedState],
                    ad_id: this.$store.state.currentCheckedAd,
                    //  flag:this.flag,
                });
            },
            //创意状态
            handleCheckAllChangeState(val) {
                this.checkedState = val ? this.stateList : [];
                this.isIndeterminateState = false;
                //console.log(this.getStateValue(this.checkedState));
                this.getList({
                    flag: [this.checkedState],
                    size: this.checkedSizes,
                    type: this.gitTypeIds(this.checkedType),
                    ad_id: this.$store.state.currentCheckedAd,
                    //  flag:this.flag,
                });
            },
            handleCheckedStateChange(value) {
                let checkedCount = value.length;
                // debugger
                this.checkAllState = checkedCount === this.stateList.length;
                this.isIndeterminateState =
                    checkedCount > 0 && checkedCount < this.stateList.length;
                this.getList({
                    flag: [value],
                    size: this.checkedSizes,
                    type: this.gitTypeIds(this.checkedType),
                    ad_id: this.$store.state.currentCheckedAd,
                    //  flag:this.flag,
                });
            },

            changefilterstate(value){
                 this.getList({
                    flag:[value],
                    size: this.checkedSizes,
                    type: this.gitTypeIds(this.checkedType),
                    ad_id: this.$store.state.currentCheckedAd,
                });

            },
            getList(data) {
             
                creative.creativeListPage(data).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data.data;
                       // console.log(data)
                        let result = [];
                        for (var j = 0; j < data.length; j++) {
                            // if (data[j].link_type == "0") {
                            //     data[j].link_type = "请选择"
                            // }
                            //根据请求的数据 进行赋值的操作 转化成页面中对应的值
                            if (data[j].link_type == 1) {//h5
                                data[j].h5address = data[j].landing_page ? data[j].landing_page : '';
                                data[j].hasH5address=data[j].h5address? true:false;
                            }
                            if (data[j].link_type == 2) {//andriod应用下载
                                data[j].androidaddress = data[j].landing_page ? JSON.parse(data[j].landing_page).landing_page : '';
                                data[j].h5address = data[j].landing_page ? JSON.parse(data[j].landing_page).clickurl : '';
                                data[j].appName = data[j].landing_page ? JSON.parse(data[j].landing_page).pkgname : '';
                                data[j].hasH5address=data[j].h5address? true:false;
                                data[j].hasAndroidaddress=data[j].androidaddress? true:false;
                                data[j].hasappName=data[j].appName? true:false;
                            }
                            if (data[j].link_type == 3) {//ios应用下载
                                data[j].iodaddress = data[j].deep_link ? JSON.parse(data[j].deep_link).landing_page : '';
                                data[j].h5address = data[j].deep_link ? JSON.parse(data[j].deep_link).clickurl : '';
                                data[j].appName = data[j].deep_link ? JSON.parse(data[j].deep_link).pkgname : '';
                                data[j].hasH5address=data[j].h5address? true:false;
                                data[j].hasiodaddress=data[j].iodaddress? true:false;
                                data[j].hasappName=data[j].appName? true:false;
                            }
                             if (data[j].link_type == 4) {//andriod 应用直达
                                data[j].androidaddress = data[j].landing_page ? JSON.parse(data[j].landing_page).deep_link : '';
                                data[j].h5address = data[j].landing_page ? JSON.parse(data[j].landing_page).landing_page : '';
                                data[j].appName = data[j].landing_page ? JSON.parse(data[j].landing_page).pkgname : '';
                                 
                                data[j].hasH5address=data[j].h5address? true:false;
                                data[j].hasandroidaddress=data[j].androidaddress? true:false;
                                data[j].hasappName=data[j].appName? true:false;
                             }
                                
                             if (data[j].link_type == 5) {//ios应用直达
                           
                                data[j].iodaddress = data[j].deep_link ? JSON.parse(data[j].deep_link).deep_link: '';
                                data[j].h5address = data[j].deep_link ? JSON.parse(data[j].deep_link).landing_page : '';
                                data[j].appName = data[j].deep_link ? JSON.parse(data[j].deep_link).pkgname : '';
                                data[j].hasH5address=data[j].h5address? true:false;
                                data[j].hasiodaddress=data[j].iodaddress? true:false;
                                data[j].hasappName=data[j].appName? true:false;

                             }



                            //data[j].jump = data[j].link_type;//deep_link ios
                            result.push(data[j]);
                        }
                        res.data.data.data = result;
                        // console.log(result);
                        this.pageList = res.data.data;
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            getStateValue(value) {
                let sourceData = [
                 {
                    key: "全部",
                    value: "0"
                 },
                {
                    key: "开启",
                    value: "1"
                }, {
                    key: "关闭",
                    value: "2"
                }
                ]; //状态集合 1开启 2 关闭
                let result = [];
                for (var j = 0; j < value.length; j++) {
                    for (var k = 0; j < sourceData.length; k++) {
                        if (!sourceData[k]) {
                            break;
                        }
                        if (value[j] == sourceData[k].key) {
                            result.push(sourceData[k].value);
                        }
                    }
                }
                return result;
            },
            gitTypeIds(value) {
                /**1图片、2图文、3组图、4视频信息流、5短视频*/
                let sourceData = [
                 {
                    key: "图片",
                    value: "1"
                 },
                 {
                    key: "图文",
                    value: "2"
                 }, 
                 {
                    key: "组图",
                    value: "3"
                 }, 
                 {
                    key: "视频信息流",
                    value: "4"
                 },
                  {
                    key: "短视频",
                    value: "5"
                 }];
                let result = [];
                // for (var j = 0; j < value.length; j++) {
                //     for (var k = 0; j < sourceData.length; k++) {
                //         if (!sourceData[k]) {
                //             break;
                //         }
                //         if (value[j] == sourceData[k].key) {
                //             result.push(sourceData[k].value);
                //         }
                //     }
                // }
                _.forEach(sourceData, p => {
                    _.forEach(value, s => {
                        if (p.key == s) {
                            result.push(p.value);
                        }
                    });
                });
                return result;
            },
            changUser() {
                if (!this.adUser) {
                    this.getList({
                        // ad_id: this.adUser,
                        page: 1,
                        pagesize: 10
                    });
                    return;
                }
                this.clearAll();
                if (!this.adUser) {
                    this.getList({
                        page: 1,
                        pagesize: 10
                    });
                    return;
                }
                this.getList({
                    ad_id: this.adUser,
                    page: 1,
                    pagesize: 10
                });
            },
            clearAll() {
                this.checkAll = false;
                this.checkedSizes = [];
                this.checkAllState = false;
                this.checkedState = [];
                this.checkAllType = false;
                this.checkedType = [];
            },
            getDataByName() {
                this.searchname ? this.clearIt = true : this.clearIt = false;
                this.getList({
                    page: 1,
                    pagesize: 10,
                    seachname: this.searchname,
                    ad_id: this.$store.state.currentCheckedAd,
                    flag: [this.checkedState],
                    size: this.checkedSizes,
                    type: this.gitTypeIds(this.checkedType),
                });
            },
            getIds(value) {
                let result = [];
                for (var j = 0; j < value.length; j++) {
                    result.push(value[j].id);
                }
                return result;
            },
            open() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: "请选择操作记录",
                        type: "warning"
                    });
                    return;
                }
                this.$confirm('创意开启后，经设置可参与广告投放！确认开启？', '', {
                    customClass: 'customOpenFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'el-button--confirm',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {

					creative.creativeFlagOpenajax({
                        id: this.getIds(this.multipleSelection)
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: this.pageList.current_page,
                                pagesize: 10,
                                ad_id: this.$store.state.currentCheckedAd,
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }
                        if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消开启'
                    });
                });
            },
            close() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: "请选择操作记录",
                        type: "warning"
                    });
                    return;
                }
                this.$confirm('创意关闭后，将不再参与广告投放！确认关闭？', '', {
                    customClass: 'customCloseFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'close-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					creative.creativeflagCloseajax({
                        id: this.getIds(this.multipleSelection)
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: this.pageList.current_page,
                                pagesize: 10,
                                ad_id: this.$store.state.currentCheckedAd,
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }
                        if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消关闭'
                    });
                });
                
            },
            del() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: "请选择操作记录",
                        type: "warning"
                    });
                    return;
                }
                this.$confirm('创意删除后，将不再参与广告投放！确认删除？', '', {
                    customClass: 'customDeleteFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'delete-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					creative.creativeDel({
						id: this.getIds(this.multipleSelection)
					}).then(res => {
						if (res.data.code == 0) {
							this.$message({
								// message: res.data.msg,
								message: "操作成功",
								type: "success"
							});
							this.getList({
								ad_id: this.$store.state.currentCheckedAd,
								page: this.pageList.current_page,
								pagesize: 10
							});
						} else {
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: "error"
							});
						}
						if (res.data.code == -1) {
							this.$router.push({
								path: "/login"
							});
						}
					});
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            copy() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: "请选择操作记录",
                        type: "warning"
                    });
                    return;
                }
                creative.creativeCooy({
                    id: this.getIds(this.multipleSelection)
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            // message: res.data.msg,
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList({
                            page: 1,
                            // page: this.pageList.current_page,
                            pagesize: 10,
                            ad_id: this.$store.state.currentCheckedAd,
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            openType() {
                let ids = this.getIds(this.multipleSelection);
                if (ids.length == 0) {
                    this.$message({
                        message: "请选择操作记录",
                        type: "warning"
                    });
                    return;
                }
                this.dialogFormVisible = true;
                this.form = {
                    type: "", //展现类型,
                    link_type: "",
                    h5address: "",
                    androidaddress: "",
                    iodaddress: "",
                    androidarouse: "",
                    iosarouse: "",
                    packageName: "",
                    appName: ""
                };
                this.iodaddress="";
            },
            closeDialog(val) {
                this.dialogFormVisible = false;
                this.clearform();
            },
            onSubmit() {
              
                let that = this;
                let data = "";
                if (this.form.link_type == 0) {
                    this.$message({
                        message: "请选择修改打开类型",
                        type: "warning"
                    });
                    return;
                }
                if (this.form.link_type == 1) {
                    data = {
                        id: this.getIds(this.multipleSelection),
                        link_type: this.form.link_type,
                        landing_page: this.form.h5address
                    }
                }
                if (this.form.link_type == 2) {
                    data = {
                        id: this.getIds(this.multipleSelection),
                        link_type: 2, 
                        landing_page: JSON.stringify({
                            landing_page: this.form.androidaddress,
                            pkgname: this.form.packageName,
                            clickurl:this.form.h5address
                        }),
                       
                    }
                }
                if (this.form.link_type == 3) {
                    data = {
                        id: this.getIds(this.multipleSelection),
                        link_type: 2,
                        deep_link: JSON.stringify({
                            landing_page:this.form.iodaddress,
                            pkgname: this.form.packageName,
                            clickurl:this.form.h5address
                        }),
                    }
                }
                 if (this.form.link_type == 4) {
                    data = {
                        id: this.getIds(this.multipleSelection),
                        link_type: 3,
                        landing_page: JSON.stringify({
                            deep_link: this.form.androidarouse,
                            pkgname: this.form.packageName,
                            landing_page:this.form.h5address
                        }),
                    }
                }
                  if (this.form.link_type == 5) {
                    data = {
                        id: this.getIds(this.multipleSelection),
                        link_type: 3,
                        deep_link: JSON.stringify({
                           deep_link:this.form.h5address,
                            pkgname: this.form.packageName,
                            landing_page:this.form.h5address,
                        }),
                       
                    }
                }
                creative.creativeeditTypeLink(data).then(res => {
                    if (res.data.code == 0) {
                    
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        this.getList({
                            page: this.pageList.current_page,
                            pagesize: 10,
                            ad_id: this.$store.state.currentCheckedAd,
                        });
                        this.clearform();
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            clearform() {
                this.form = {
                    type: "", //展现类型,
                    link_type: "",
                    h5address: "",
                    androidaddress: "",
                    iodaddress: "",
                    androidarouse: "",
                    iosarouse: "",
                    appName: ""
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // buttons light
                if (this.multipleSelection.length != 0) {
                    this.isLighten = true;
                } else {
                    this.isLighten = false;
                }
            },
            openBanner() {
                // if (!this.adUser) {
                //     this.$message({
                //         message: "请选择客户",
                //         type: "warning"
                //     });
                //     return;
                // }
                this.$router.push({
                    path: "/banner/" + this.$store.state.currentCheckedAd
                });
            },
            openVideo() {
                // if (!this.adUser) {
                //     this.$message({
                //         message: "请选择客户",
                //         type: "warning"
                //     });
                //     return;
                // }
                this.$router.push({
                    path: "/video/" + this.$store.state.currentCheckedAd
                });
            },
            openNative() {
                // console.log("openNative");
                // if (!this.adUser) {
                //     this.$message({
                //         message: "请选择客户",
                //         type: "warning"
                //     });
                //     return;
                // }
                this.$router.push({
                    path: "/native/" + this.$store.state.currentCheckedAd
                });
            }
        }
    }
</script>
<style lang="scss">
    @import '../../../style/mixin'; // 创意列表-共用样式
    @import '../../../style/common'; // 创意列表-共用样式
    @import '../../../style/custom-theme.css';
    .creative-list {
        .el-main {
            background-color: transparent;
        }
        .el-col-24 {
            background-color: #fff;
        }
        .choose-ad {
            @include sc(14px, #515974);
            font-weight: bold;
            margin-right: 5px;
        }
        .creative-nav-row {
            padding: 15px 0;
            position: relative;
            &:first-child {
                padding: 0;
            }
        }
        .fold-iron {
            background-color: #6cabff;
            position: absolute;
            top: 11px;
            right: 30px;
            height: 28px;
            width: 39px;
            @include borderRadius(5px);
        }
        .el-checkbox {
            float: left;
            margin-right: 21px;
        }
        .creative-btn-row {
            position: relative;
            padding: 10px 0;
            .single-link {
                width: 109px;
            }
            .add-iron {
                font-size: 22px;
                vertical-align: 1px;
            }
            .add-msg {
                vertical-align: 3px;
                margin-left: -8px;
                color: #6cabff;
            }
            .el-button+.el-button {
                margin-left: 6px;
            }
        }
        .search-input {
            position: absolute;
            width: 182px;
            right: 20px;
            top: 0px;
            border: 0 none;
            margin:0;
            text-indent: 0;
        }
        .theme-pic {
            width: 60px;
            height: 60px;
        }
        .template-hd {
            padding: 17px 0 18px 30px;
            border-bottom-width: 1px;
        } // el checkbox
        .el-checkbox__label {
            color: #7f8599;
        }
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #7f8599;
        } // 
        .address-row {
            margin-bottom: 5px;
            .add-hd {
                float: left;
                width: 59px;
                margin-top: 5px;
            }
        }
        .creative-param {
            padding: 9px 0 10px 30px;
            border-bottom: 2px solid #e1e7f0;
            span {
                font-size: 12px;
                line-height: 20px;
            }
            .hd {
                margin-right: 6px;
            }
            .align-right {
                margin-right: 30px;
            }
            .el-checkbox-group {
                //padding: 0 45px 0 78px;
            }
            .el-collapse-item__arrow {
                float: none;
                position: absolute;
                top: 1px;
                right: 35px;
                z-index: 20;
                color: #ffffff;
                transform: rotate(90deg);
            }
            .el-collapse-item__arrow.is-active {
                transform: rotate(-90deg);
            }
        }
        .el-collapse-item__header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            .hd {
                line-height: 50px;
            }
        }
        .el-collapse {
            border: 0 none;
        }
        .el-collapse-item__wrap {
            border-bottom: none;
        }
        .el-collapse-item__header.is-active {
            height: 100%;
            -webkit-transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out;
            transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out
        }
        .el-collapse-item__content {
            padding-bottom: 0;
        }
        .el-input__inner,
        .el-form-item__label {
            @include sc(12px, #515974);
        }
    } // 只创意列表
    .creative-list-content {
        .creative-param {
            .hd {
                margin-right: 19px;
                font-weight: bold;
            }
        }
        .template-hd {
            padding: 10px 0 10px 30px;
        }
        .creative-btn-control {
            padding: 20px 0 10px 30px;
        }
        .creative-btn-row {
            padding-top: 0;
        }
        .el-collapse-item__header {
            border-bottom: 0 none;
        } // creative theme name and eye style
        .theme-name {
            width: 60px;
            display: inline-block;
        }
        .see-iron {
            display: inline-block;
            @include svgbg("../../../style/image/creative/see-iron.svg");
            height: 19px;
            width: 25px;
            margin-left: 16px;
            vertical-align: 23px;
            cursor: pointer;
        } // checkbox adjust align
        .el-table {
            th:first-child,
            td:first-child {
                padding-left: 16px;
            }
            th:nth-child(3),
            td:nth-child(3),
            th:nth-child(2),
            td:nth-child(2),
            th:nth-child(4),
            td:nth-child(4) {
                text-align: center;
            }
            .el-form-item__content .el-input {
                // width: 220px;
            }
            .single-input {
                .el-textarea {
                    display: inline;
                }
                .el-textarea__inner {
                    height: 38px;
                    line-height: 26px;
                    resize: none;
                    width: 163px; // height: 26px!important;
                    overflow-y: hidden;
                }
                .auto-height {
                    height: auto;
                    .el-textarea__inner {
                        // height: auto!important;
                    }
                }
                .input-out {
                    display: none;
                }
            }
            .test_box {
                min-width: 163px; // min-height: 20px;
                height: 38px;
                max-height: 300px;
                _height: 120px;
                margin-left: auto;
                margin-right: auto;
                padding: 3px;
                outline: 0;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                font-size: 12px;
                line-height: 24px;
                padding: 6px 15px 4px;
                word-wrap: break-word;
                overflow-x: hidden;
                overflow-y: auto; // border-color: rgba(82, 168, 236, 0.8);
                // box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
            }
            .el-form-item {
                margin-bottom: 0;
            }
        } // 状态
        // pop layer
        .el-dialog__header {
            border-bottom: 1px solid #e1e7f0;
            padding: 15px 0 16px 30px;
            height: 56px;
        }
        .el-dialog__title {
            font-size: 16px;
            font-weight: bold;
            float: left;
        }
        .el-dialog__headerbtn {
            display: none;
        }
        .el-dialog__body {
            padding: 0;
        }
        .pop-reivse-type {
            .el-dialog {
                width: 506px;
            }
            .el-form-item__label {
                text-align: left;
                width: 161px;
                @include sc(12px, #515974);
                padding: 0 0 0 30px;
            }
            .short-form-item .el-form-item__label {
                width: auto;
                padding-right: 2px; // padding: 0 35px 0 30px;
            }
            .el-dialog__footer {
                padding: 0;
            }
            .is-confirm {
                padding: 15px 0 30px 30px; // padding: 15px 0 20px 30px;
                background-color: #fff;
                text-align: left;
            }
            .el-form-item {
                margin-bottom: 10px;
                &:first-child {
                    margin: 20px 0 10px;
                }
                &:last-child {
                    margin-bottom: 5px;
                }
            }
            .el-form-item__content {
                .enter-theme {
                    width: 31.5%;
                    margin: 0 10px 0 5px;
                }
            }
            .el-table-column--selection {
                padding-left: 18px;
            }
            .el-input {
                width: 240px;
            }
            .other-address {
                margin: 10px 0 0 128px;
            }
            .el-date-editor {
                width: 240px!important;
                vertical-align: 0px !important;
            }
            .creative-row-wrap .el-input__suffix {
                right: 35px;
            }
            .el-textarea {
                width: 240px;
                height: 83px;
            }
        }
    }
    .v-modal {
        z-index: 2000;
    }
    .el-dialog__wrapper {
        z-index: 2001;
        .el-preview_img {
            position: absolute;
            top: 50%;
            left: 50%;
            border: 1px solid #e1e7f0;
        }
        .el-close-pop {
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            @include svgbg("../../../style/image/creative/close-icon.svg");
            height: 36px;
            width: 36px;
            cursor: pointer;
        }
        .video-player {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 720px;
            height: 466px;
            margin-top: -233px;
            margin-left: -360px;
        }
    }
    .el-message-box__wrapper{
        .customOpenFontMore,
        .customCloseFontMore,
        .customDeleteFontMore{
            .el-icon-close{
                background: url("../../../style/image/common/close-icon.svg") 0 0 no-repeat;
            }
            .el-icon-warning{
                background: url("../../../style/image/common/question_blue.svg") 0 0 no-repeat;
            }
        }
        .customCloseFontMore{
            .el-icon-warning{
                background: url("../../../style/image/common/question_grey.svg") 0 0 no-repeat;
            }
        }
        .customDeleteFontMore{
            .el-icon-warning{
                background: url("../../../style/image/common/question_red.svg") 0 0 no-repeat;
            }
        }
    }
    
    @media screen and (max-width:1920px) {
        .creative-list-content .el-table .single-input .el-textarea__inner {
            width: 280px;
        }
    }
    @media screen and (max-width:1366px) {
        .creative-list-content .el-table .single-input .el-textarea__inner {
            width: 163px;
        }
    }
    .disabel-edit {
        font-size: 12px;
        color: #515974
    }
</style>