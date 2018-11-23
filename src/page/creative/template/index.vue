<!-- 临时文件 -->
<template>
    <div class="creative-template" name="banner" style="background-color: #fff">
        <el-main style="padding-bottom: 0px">
            <!-- 上传Banner素材 start -->
            <el-col :span="24">
                <div class="mup-ingredient">
                    <el-form ref="form" :model="form" style="padding-left:30px">
                        <div class="update-item-row clear border-bottom-2 pb18" style="margin-left:-30px;padding-left:30px">
                            <el-radio-group v-model="form.selectStyle" border="false">
                                <el-radio :label="item.v" @change="changeselectStyle(index+1)" :disabled="index ==1" v-for="item,index in form.selectStyleOption">
                                    {{item.t}}
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div class="update-item-row clear">
                            <label class="data-item" style="float:left;margin-right:5px;margin-top:5px;margin-left:12px">
                                  <!--  <i class="item-needed">*</i> -->
                                   创意名称：</label>
                            <el-input v-model="form.creative_name" style="width:240px" placeholder="请填写创意主题"></el-input>
                        </div>
                        <div class="update-item-row tabSelectStyle">
                            <label for="" class="data-item"><i class="item-needed">*</i>选择样式：</label>
                            <template>
                                         <el-tabs 
                                          v-model="form.activeName" 
                                          @tab-click="handleClick"
                                          style="position: relative;margin-top:-50px;left: 76px;width: calc(100% - 100px);"
                                          >
                                            <el-tab-pane
                                                label="图文信息流" 
                                                name="first"
                                                >
                                               <div class="imgStyle2">
                                                      <div class="wrap">   
                                                        <div>
                                                           <span class="con1">LOGO</span>
                                                           <span class="con2">标题</span>
                                                        </div>
                                                        <div>
                                                            <img 
                                                            class="con3" 
                                                            src="../../../style/image/meadia/img2.jpg">
                                                            <span class="con4">描述</span>
                                                        </div>
                                                           <span class="tiptxt1">
                                                             图文
                                                           </span>
                                                       </div>
                                                       <div class="wrap2" >
                                                           <div class="item">
                                                               <span>尺寸：</span>
                                                               <!-- <el-input 
                                                               v-model="form.imgText.W"
                                                               style="width:91px"
                                                                 placeholder="宽"
                                                                 ></el-input>
                                                                 <span class="X-style">x</span>
                                                                  <el-input 
                                                                   v-model="form.imgText.H"
                                                                   style="width:92px"
                                                                  placeholder="高"></el-input> -->
                                                                 <el-select 
                                                                  filterable
                                                                  remote
                                                                  clearable
                                                                  @clear="clearSelect"
                                                                  @visible-change="isShowSelect"
                                                                  :remote-method="remoteMethod"
                                                                 width="198px"
                                                                 v-model="form.imgText.w_h" placeholder="请输入上传尺寸并选择">
                                                                    <el-option
                                                                      v-for="item in form.imgText.options"
                                                                      :key="item.value"
                                                                      :label="item.label"
                                                                      :value="item.value">
                                                                    </el-option>
                                                                  </el-select>
                                                           </div>
                                                            <div class="item">
                                                                <span>标题：</span>
                                                                <el-input v-model="form.imgText.title" placeholder="请输入..."></el-input>
                                                           </div>
                                                            <div class="item">
                                                                <span>描述：</span>
                                                                <el-input 
                                                                style="width: 200px;vertical-align: top;font-size: 12px"
                                                                resize="none"
                                                                type="textarea"
                                                                v-model="form.imgText.desc" placeholder="请输入..."></el-input>
                                                           </div>
                                                       </div>
                                                       <div class="wrap3">
                                                           <span style="color:#515974;margin-top:6px;display: inline-block">图片：</span>
                                                                 <el-input  
                                                                 placeholder="请上传图片" 
                                                                 v-model="imgfile" 
                                                                 :readonly="true">
                                                                 </el-input>
                                                              
                                                                  <el-button 
                                                                   size="small"
                                                                   @click="selectLogo('img')"
                                                                   style="margin-left:5px;
                                                                   color:#fff !important;"
                                                                   type="primary">上传
                                                                 </el-button>
                                                                  <i class="delUpload" @click="delUpload('img')" v-if="isshowdel">x</i>
                                                                  
                                                                  <input type="file" 
                                                                   name="pic"
                                                                   v-if="imgShow"
                                                                   accept="image/gif,image/jpeg,image/png,image/jpg" 
                                                                   id="imgLogo"
                                                                   @change="upload($event,'img')" 
                                                                   style="display:none" />
                                                          
                                                       </div>
                                                    </div>
                                           </el-tab-pane>
                                            <el-tab-pane label="组图信息流" name="second">
                                                  <div class="imgStyle2">
                                                      <div class="wrap">   
                                                       <div>
                                                          <span class="con1">
                                                              LOGO
                                                           </span>
                                                           <span class="con2">
                                                            标题
                                                           </span>
                                                        </div>
                                               <div style="position: absolute;top: 61px;">
                                                <img class="con9" style="margin-left:0px" 
                                                src="../../../style/image/meadia/img2.jpg"><img class="con9" 
                                              src="../../../style/image/meadia/img2.jpg"><img class="con9" 
                                              src="../../../style/image/meadia/img2.jpg">
                                               </div>
                                                <div class="con5">描述</div>
                                                    <span class="tiptxt1">组图</span>
                                                </div>
                                                <div class="wrap2" >
                                                           <div class="item">
                                                               <span>尺寸：</span>
                                                               <!-- <el-input 
                                                               v-model="form.imgText.W"
                                                               style="width:91px"
                                                                 placeholder="宽"
                                                                 ></el-input>
                                                                 <span class="X-style">x</span>
                                                                  <el-input 
                                                                   v-model="form.imgText.H"
                                                                   style="width:92px"
                                                                  placeholder="高"></el-input> -->
                                                                  
                                                                  <el-select 
                                                                  clearable
                                                                  @clear="clearSelect"
                                                                  filterable
                                                                  remote
                                                                   @visible-change="isShowSelect"
                                                                  :remote-method="remoteMethod"
                                                                 width="198px"
                                                                 v-model="form.imgText.w_h" placeholder="请输入上传尺寸并选择">
                                                                    <el-option
                                                                      v-for="item in form.imgText.options"
                                                                      :key="item.value"
                                                                      :label="item.label"
                                                                      :value="item.value">
                                                                    </el-option>
                                                                  </el-select>
                                                               
                                                           </div>
                                                            <div class="item">
                                                                <span>标题：</span>
                                                                <el-input v-model="form.imgText.title" placeholder="请输入..."></el-input>
                                                           </div>
                                                            <div class="item">
                                                                <span>描述：</span>
                                                                <el-input 
                                                                style="width: 200px;vertical-align: top;font-size: 12px"
                                                                resize="none"
                                                                type="textarea"
                                                                v-model="form.imgText.desc" placeholder="请输入..."></el-input>
                                                           </div>
                                                       </div>
                                                       <div class="wrap3">
                                                            <span style="color:#515974;margin-top:6px;display: inline-block;vertical-align:top">图片：</span>
                                                           <ul class="imglist">
                                                                 <li class="groupimg" v-for="item,index in form.grouppath">
                                                                    
                                                                    <img
                                                                    :src="item.url"
                                                                    @click="uploadsingle($event,index)"
                                                                    style="width:100%;
                                                                    cursor: pointer; 
                                                                    height:100%;border:none;vertical-align:top"/>
                                                                    <span 
                                                                    class="delIcon"
                                                                    @click="delUpload('imgGroup',item)" 
                                                                    v-if="item.url != defaultimg"
                                                                    >
                                                                    x</span>
                                                                   
                                                                 </li>
                                                           </ul> 
                                                           <div style="padding-left: 42px; margin-top: 6px;">
                                                              <el-button 
                                                               size="small"
                                                               @click="selectLogo('imgGroup')"
                                                               style="margin-left:5px;
                                                               color:#fff !important;"
                                                               type="primary">
                                                               <span style="display:inline-block;width:32px;margin-left:-2px">多图上传</span>
                                                             
                                                              </el-button>
                                                              <input type="file" 
                                                                       v-if="imgGroupShow"
                                                                       name="pic"
                                                                       :multiple="isSingle"
                                                                       accept="image/gif,image/jpeg,image/png,image/jpg" 
                                                                       id="imgGroupLogo"
                                                                       @change="upload($event,'imgGroup')" 
                                                                       style="display:none" />
                                                           </div>
                                                         
                                                       </div>
                                                    </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="视频信息流" name="third">
                                                   <div class="imgStyle2">
                                                      <div class="wrap">   
                                                       <div>
                                                          <span class="con1">
                                                              LOGO
                                                           </span>
                                                           <span class="con2">
                                                            标题
                                                           </span>
                                                        </div>
                                               <div style="position: absolute;top: 61px;width:205px;background-color: #fff;height:85px;line-height: 85px;text-align:center">
                                                  <img class="con7" src="../../../style/image/meadia/video.jpg">
                                               </div>
                                                <span class="tiptxt1">视频</span>
                                                </div>
                                                <div class="wrap2" >
                                                           <div class="item">
                                                               <span>尺寸：</span>
                                                              <!--  <el-input 
                                                               v-model="form.imgText.W"
                                                               style="width:91px"
                                                                 placeholder="宽"
                                                                 ></el-input>
                                                                 <span class="X-style">x</span>
                                                                  <el-input 
                                                                   v-model="form.imgText.H"
                                                                   style="width:92px"
                                                                  placeholder="高"></el-input> -->
                                                                
                                                                  <el-select 
                                                                  filterable
                                                                  remote
                                                                  clearable
                                                                   @visible-change="isShowSelect"
                                                                  @clear="clearSelect"
                                                                  :remote-method="remoteMethod"
                                                                 width="198px"
                                                                 v-model="form.imgText.w_h" placeholder="请输入上传尺寸并选择">
                                                                    <el-option
                                                                      v-for="item in form.imgText.options"
                                                                      :key="item.value"
                                                                      :label="item.label"
                                                                      :value="item.value">
                                                                    </el-option>
                                                                  </el-select>
                                                           </div>
                                                            <div class="item">
                                                                <span>标题：</span>
                                                                <el-input v-model="form.imgText.title" placeholder="请输入..."></el-input>
                                                           </div>
                                                           <div class="item">
                                                                <span>描述：</span>
                                                                <el-input 
                                                                style="width: 200px;vertical-align: top;font-size: 12px"
                                                                resize="none"
                                                                type="textarea"
                                                                v-model="form.imgText.desc" placeholder="请输入..."></el-input>
                                                           </div>
                                                       </div>
                                                      <div class="wrap3">
                                                         <div class="item">
                                                              <div style="margin-left:0px">
                                                                  <span style="color:#515974;margin-top:6px;display: inline-block">封面：</span>
                                                                 <el-input  
                                                                 placeholder="请上传封面" 
                                                                 v-model="coverfile" 
                                                                 :readonly="true">
                                                                 </el-input>
                                                              
                                                                  <el-button 
                                                                   size="small"
                                                                   @click="selectLogo('cover')"
                                                                   style="color:#fff !important;margin-left:5px"
                                                                   type="primary">上传
                                                                 </el-button>
                                                                  <i class="delUpload" @click="delUpload('cover')" v-if="isshowcoverdel">x</i>
                                                                  
                                                                  <input type="file" name="pic" 
                                                                   v-if="coverShow"
                                                                  accept="image/gif,image/jpeg,image/png,image/jpg"
                                                                  id="coverLogo" @change="upload($event,'cover')" style="display:none" />
                                                              </div>
                                                           </div>
                                                           <div class="item">
                                                                <span style="color:#515974;margin-top:6px;display: inline-block">视频：</span>
                                                                 <el-input  
                                                                 placeholder="请上传视频" 
                                                                 v-model="videofile" 
                                                                 :readonly="true">
                                                                 </el-input>
                                                              
                                                                  <el-button 
                                                                   size="small"
                                                                   @click="selectLogo('video')"
                                                                   style="color:#fff !important;margin-left:5px"
                                                                   type="primary">上传
                                                                 </el-button>
                                                                  <i class="delUpload" @click="delUpload('video')" v-if="isshowdel">x</i>
                                                                  <input type="file" 
                                                                  v-if="videoShow"
                                                                  name="pic" 
                                                                  accept="video/mp4,video/flv"
                                                                  id="videoLogo"
                                                                  @change="upload($event,'video')" 
                                                                  style="display:none" />
                                                           </div>
                                                           <div class="item">
                                                               <span style="color:#515974">时长：</span>
                                                                  <el-select
                                                           style="width:200px;"
                                                            v-model="form.imgText.videotime" placeholder="请选择时长">
                                                                <el-option
                                                                  v-for="item in form.imgText.timeoptions"
                                                                  :key="item.value"
                                                                  :label="item.label"
                                                                  :value="item.value">
                                                                </el-option>
                                                             </el-select>
                                                           </div>
                                                       </div>
                                                    </div>
                                            </el-tab-pane>
                                            <div class="styleLine">
                                               <ul style="overflow:hidden;margin-top:5px">
                                                   <li class="line1"></li>
                                                   <li class="line2"></li>
                                               </ul>
                                            </div>
                                           
                                          </el-tabs>
</template>
    </div>

    <!-- 上传icon -->
   <div class="update-item-row clear" >
        <div class="wrap3" style="padding-left:5px;position:relative">
               <span style="color:#515974;margin-left:5px;margin-top:6px;color:#333;display: inline-block"><i class="item-needed" style="color:transparent">*</i>LOGO：</span>
                     <el-input  
                     style="margin-left:8px"
                     placeholder="上传图片尺寸（100*100）" 
                     v-model="iconfile" 
                     :readonly="true">
                     </el-input>
                  
                      <el-button 
                       size="small"
                       @click="selectLogo('icon')"
                       style="margin-left:5px;
                       color:#fff !important;"
                       type="primary">
                       <span style="color:#fff">上传</span>
                     </el-button>
                      <i class="delUpload" 
                      style="position: absolute;
                              cursor:pointer;
                              top: 10px;
                              left: 270px;" 
                              @click="delUpload('icon')" v-if="isshowicon">x</i>
                      
                      <input type="file" 
                       name="pic"
                       v-if="iconShow"
                       accept="image/gif,image/jpeg,image/png,image/jpg" 
                       id="iconLogo"
                       @change="upload($event,'icon')" 
                       style="display:none" />

                       <!-- <span style="margin-left:20px">尺寸：</span>


                       <el-input 
                       v-model="form.imgText.w"
                       style="width:91px"
                         placeholder="宽"
                         ></el-input>
                         <span class="X-style">x</span>
                          <el-input 
                           v-model="form.imgText.h"
                           style="width:92px"
                          placeholder="高"></el-input> -->


                           <!-- <el-select 
                                filterable
                                remote
                                clearable
                                @clear="clearSelect2"
                                :remote-method="remoteMethod2"
                               width="198px"
                               v-model="form.imgText.iconsize" placeholder="请输入上传尺寸并选择">
                                  <el-option
                                    v-for="item in form.imgText.options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                             </el-select>  -->


                              
          </div>
  </div>



    <div class="update-item-row clear ">
        <label for="" class="data-item"><i class="item-needed">*</i>选择分类：</label>
        <el-select 
        style="margin-left:-4px;width:240px" 
        class="classify"
        @change="changeCreateCategory"
        v-model="form.firstClassify" placeholder="一级分类">
            <el-option v-for="item in form.firstClassifyOption"
              :key="item.id"
              :label="item.name" 
              :value="item.id">
            </el-option>
        </el-select>
         <el-select 
         v-model="form.secondClassify" 
         class="classify"
         placeholder="二级分类"
         style="margin-left:5px"
         >
            <el-option v-for="item in form.secondClassifyOption"
              :key="item.id"
              :label="item.name" 
              :value="item.id">
            </el-option>
        </el-select>
    </div>
<!-- 选择标签 start -->
    <div class="create-row" style="overflow:hidden;">
        <label for="" class="data-item left mt5" style="margin-left:13px">选择标签：</label>
        <div class="tags-container">
            <el-tag :key="tag.value" v-for="tag in form.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag.value}}
            </el-tag>

        </div>
       
        <el-autocomplete  
              clearable
              popper-class="my-autocomplete"
              v-model="form.state3" 
              :fetch-suggestions="querySearch" 
              placeholder="请输入内容" 
              @select="handleSelect" 
              @blur="autoBlur"
              @focus="clearItem">
<template slot-scope="{ item }">
    <div class="name">
        {{ item.value }}</div>
</template>
        </el-autocomplete>
    </div>
    <!-- 选择标签 end -->
    <!-- <div class="update-item-row clear" style="margin-bottom:5px">
      <label class="data-item" 
      style="float:left;;margin-right:0px;margin-top:5px;margin-left:15px">曝光检测：</label>
        <div style="float:left;margin-left: 5px">
            <div class="mb10" v-for="item,index in form.configs1">
                <el-input 
                style="width:240px"
                v-model="item.name" 
                placeholder="请填写第三方曝光检测"></el-input>
                <span class="addItem" @click="addConfig(form.configs1,item.name)">+</span> 
                <span 
                v-if="index > 0"
                class="addItem delItem" 
                @click="delConfig(form.configs1,index)"
                >x</span> 
            </div> 
        </div>
    </div> -->
   <!--   <div class="update-item-row clear mb20 " >
      <label class="data-item" 
      style="float:left;margin-right:0px;margin-top:5px;margin-left:15px">点击检测：</label>
        <div style="float:left;margin-left: 5px">
            <div class="mb10" v-for="item,index in form.configs2">
                <el-input 
                style="width:240px"
                v-model="item.name" 
                placeholder="请填写第三方曝光检测"></el-input>
                <span class="addItem" @click="addConfig(form.configs2,item.name)">+</span> 
                <span 
                v-if="index > 0"
                class="addItem delItem" 
                @click="delConfig(form.configs2,index)"
                >x</span> 
            </div> 
        </div>
    </div> -->
         
        <!-- 确认，取消 -->
      <div class="is-confirm" style="border-top: 2px solid #e1e7f0;padding-bottom:30px;margin-left:-30px">
            <el-button type="confirm" @click="onSubmit">确认</el-button>
            <el-button type="cancel" @click="goBack">取消</el-button>
      </div> 
    </el-form>
  </div>  
     </el-col>
   </el-main>
  </div>
</template>

<script>
    import {
        creative,
        meadia,
    } from "../../../service/index";
    import axios from "../../../common/axios";
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import store from 'store';
    import defaultImg from "../../../style/image/creative/addIcon1.png";
    export default {
        computed: {},
        data: function() {
            return {
                flag: false, //标签切换按钮
                imgShow: true, //解决同名上传不会触发onchange事件
                videoShow: true,
                coverShow: true,
                imgGroupShow: true,
                iconShow: true,
                imgfile: '', //上传的图片形式
                videofile: '', //上传的视频
                coverfile: '', //视频封面的
                isshowdel: false, //是否显示删除按钮
                isshowicon: false,
                isshowcoverdel: false, //是否是显示封面的删除按钮
                isSingle: true, //是否是单个上传，默认支持多个
                iNow: 0, //组图多选临时的索引
                defaultimg: require("../../../style/image/creative/addIcon1.png"),
                loading: null, //上传视频的加载动画
                iconfile: '',
                iconpath: '',
                form: {
                    creative_name: '', //创意主题
                    path: '', //上传的图片地址
                    video: '', //上传的视频文件
                    grouppath: [ //上传的组图  统一数据形式
                        {
                            url: defaultImg,
                            path: null
                        },
                        {
                            url: defaultImg,
                            path: null
                        },
                        {
                            url: defaultImg,
                            path: null
                        },
                    ],
                    imgGroup: [{
                            name: "100001",
                            url: defaultImg
                        },
                        {
                            name: '100002',
                            url: defaultImg
                        },
                        {
                            name: '100003',
                            url: defaultImg
                        }
                    ], //组图上传地址
                    'style_id': 1, //1 图文 6 组图 9 视屏
                    activeName: 'first', //页签切换
                    imgText: { //图文
                        'w': null, //icon的宽高
                        'h': null,
                        'W': null, //尺寸的宽高
                        'H': null,
                        'iconsize': '', //logo尺寸的宽高
                        'w_h': '', //图片宽高
                        'videotime': null,
                        "timeoptions": [{ //视频时长
                                value: '5',
                                label: '5s'
                            }, {
                                value: '10',
                                label: '10s'
                            },
                            {
                                value: '15',
                                label: '15s'
                            },
                            {
                                value: '20',
                                label: '20s'
                            }, {
                                value: '25',
                                label: '25s'
                            }, {
                                value: '30',
                                label: '30s'
                            }
                        ],
                        options: [],
                        options2: [],
                        sizeList: [],
                        title: '',
                        desc: '',
                        fileList: [], //图片文件
                        videoList: [], //视频文件
                    },
                    firstClassify: '', //一级分类
                    secondClassify: '', //二级分类
                    firstClassifyOption: [],
                    secondClassifyOption: [],
                    //选择标签的数据 
                    state3: '',
                    restaurants: [],
                    dynamicTags: [],
                    configs1: [{
                        name: ""
                    }], //曝光检测
                    configs2: [{
                        name: ""
                    }], //点击检测
                    selectStyle: 1, //1自定义组合 2 程序化创意
                    selectStyleOption: [{
                        v: 1,
                        t: "自定义组合"
                    }, 
                    // {
                    //     v: 2,
                    //     t: "程序化创意"
                    // }
                    ],
                    ad_id: "", //客户id
                    type: "", //1本地上传，2远程素材
                    tempSize:null,
                },
            };
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            //尺寸下拉
            isShowSelect(val){
                if(this.form.imgText.options.length<1){
                   this.form.imgText.options = this.tempSize    
                }
            },
            //进行方法的重写
            clearSelect() {
                this.form.imgText.options = this.form.imgText.optionss;
            },
            clearSelect2() {
                this.form.imgText.options2 = this.form.imgText.optionss;
            },
            remoteMethod(query) {
                //this.form.imgText.options=[];
                if (query !== '') {
                    setTimeout(() => {
                        this.form.imgText.options = this.form.imgText.sizeList.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 100);
                } else {
                    this.form.imgText.options = [];
                }
            },
            remoteMethod2(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.form.imgText.options2 = this.form.imgText.sizeList.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 100);
                } else {
                    this.form.imgText.options2 = [];
                }
            },
            selectLogo(str) {
                this.imgShow = true; //解决同名上传不会触发onchange事件
                this.videoShow = true;
                this.coverShow = true;
                this.imgGroupShow = true;
                this.iconShow = true;

                let selectdom = `#${str}Logo`;
                setTimeout(() => this.$el.querySelector(selectdom).click(), 300)
                //获取根组件的dom元素。this.$el.querySelector(selectdom).click 
              
                
            },
            uploadsingle(e, index) {
                let that = this;
                let timer = null;
                that.iNow = index;
                this.isSingle = false;
                clearTimeout(timer);
                that.imgGroupShow = true;
                timer = setTimeout(function() {
                    that.$el.querySelector("#imgGroupLogo").click()
                }, 300)
            },
            upload(e, str) {
                let that = this;
                if (str == 'img') {
                    this.imgShow = false;
                    this.form.path = this.$el.querySelector("#imgLogo").files[0];
                    this.imgfile = this.form.path.name;
                } else if (str == 'icon') {
                    this.iconShow = false; //icon
                    this.iconpath = this.$el.querySelector("#iconLogo").files[0];
                    this.iconfile = this.iconpath.name;
                } else if (str == 'video') {
                    this.videoShow = false;
                    this.form.video = this.$el.querySelector("#videoLogo").files[0];
                    this.videofile = this.form.video.name;
                } else if (str == 'cover') {
                    this.coverShow = false;
                    this.form.path = this.$el.querySelector("#coverLogo").files[0];
                    this.coverfile = this.form.path.name;
                } else if (str == 'imgGroup') { //上传组图
                    this.imgGroupShow = false;
                    let filesList = this.$el.querySelector("#imgGroupLogo").files;
                    let num = filesList.length;
                    if (that.isSingle) { //可以是多选
                        if (num > 3) {
                            num = 3
                        }
                        let grouppath = this.form.grouppath.filter(function(item, index) {
                            return item.path
                        })
                        if (grouppath.length == 0 || grouppath.length == 3) {
                            for (let i = 0; i < num; i++) {
                                (function(n) {
                                    let reader = new FileReader();
                                    reader.readAsDataURL(filesList[n]);
                                    reader.onload = function() {
                                        that.form.grouppath[n].url = reader.result;
                                        that.form.grouppath[n].path = filesList[n];
                                        //that.form.grouppath.push((filesList[n]))
                                    }
                                })(i);
                            }
                        } else {
                            for (let k = 0; k < this.form.grouppath.length; k++) {
                                let item5 = this.form.grouppath[k];
                                if (!item5.path) {
                                    let reader = new FileReader();
                                    reader.readAsDataURL(filesList[0]);
                                    reader.onload = function() {
                                        that.form.grouppath[k].url = reader.result;
                                        that.form.grouppath[k].path = filesList[0];
                                    }
                                    break;
                                }
                            }
                        }
                    } else { //单选的时候
                        let reader = new FileReader();
                        reader.readAsDataURL(filesList[0]);
                        reader.onload = function() {
                            that.form.grouppath[that.iNow].url = reader.result;
                            that.form.grouppath[that.iNow].path = filesList[0];
                        }
                    }
                    that.isSingle = true;
                }
               
                if (str == 'cover') {
                    this.isshowcoverdel = true;
                } 
                if (str == 'imgGroup') {
                    this.isSingle = true;
                }
                if (str == 'icon') {
                    this.isshowicon = true;
                }
                if(str == 'img'){
                    this.isshowdel = true;
                }
                 if(str == 'video'){
                    this.isshowdel = true;
                }
            },
            delUpload(str, item) {
                if (str == 'img') {
                    this.imgfile = "";
                    this.form.path = "";
                    this.imgShow = true;
                } else if (str == "icon") {
                    this.iconfile = "";
                    this.iconpath = "";
                    this.iconShow = true;
                } else if (str == 'video') {
                    this.videofile = "";
                    this.form.video = "";
                    this.videoShow = true;
                } else if (str == 'cover') {
                    this.coverfile = "";
                    this.form.path = ""
                    this.coverShow = true;
                }
                if (str == "imgGroup") {
                    let index = this.form.grouppath.indexOf(item);
                    if (this.form.grouppath[index].path) {
                        this.form.grouppath[index].url = defaultImg;
                        this.form.grouppath[index].path = "";
                    }
                    this.imgGroupShow = true;
                }
                if (str == 'cover') {
                    this.isshowcoverdel = false;
                } else {
                    this.isshowdel = false;
                }
                if (str == 'icon') {
                    this.isshowicon = false;
                }
            },
            changeselectStyle(val) { //表单模版的切换形式
                this.selectStyle = val;
            },
            changeCreateCategory(val) { //以及分类切换
                this.form.secondClassify = "";
                this.getMediaList(val);
            },
            getMediaList(id) {
                let that = this;
                meadia.platGetMediaList({
                    mediaId: id
                }).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        if (id == 0) {
                            that.form.firstClassifyOption = data || [];
                        } else {
                            that.form.secondClassifyOption = data || [];
                        }
                    }
                });
            },
            //实现页签的切换
            handleClick(tab, event) {
                //将数据清空。保证数据的唯一性
                this.form.imgText.w_h = "";
                this.form.imgText.W = "";
                this.form.imgText.H = "";
                this.form.imgText.title = "";
                this.form.imgText.desc = "";
                this.form.imgText.fileList = [];
                this.form.imgText.videoList = [];
                this.form.imgText.videotime = '';
                this.form.path = ""; //上传的图片
                this.form.video = ""; //上传的视频文件
                this.isshowdel = false;
                this.isshowicon = false;
                this.isshowcoverdel = false;
                this.videofile = "";
                this.coverfile = "";
                this.imgfile = "";
                //this.form.imgText.options=[];
                // this.form.imgText.iconsize=[];
                this.form.imgGroup.forEach((item, index) => {
                    item.url = defaultImg
                });
                this.form.grouppath.map((item, index) => {
                    item.url = defaultImg;
                    item.path = null;
                });
                let index = tab.index;
                if (index == 0) {
                    this.form['style_id'] = 1;
                } else if (index == 1) {
                    this.form['style_id'] = 6;
                } else if (index == 2) {
                    this.form['style_id'] = 9;
                }
            },
            autoBlur(e) {
                //console.log(e)
            },
            querySearch(queryString, cb) {
                var restaurants = this.form.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                if (this.form.state3) {
                    cb(results);
                } else {
                    cb(restaurants);
                }
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) { //下拉选择的时候，将选择的值，放置到标签中
                let that = this;
                that.form.dynamicTags.push(item);
                let result = [];
                let obj = {};
                for (let i = 0; i < that.form.dynamicTags.length; i++) {
                    if (!obj[that.form.dynamicTags[i].value]) {
                        obj[that.form.dynamicTags[i].value] = 1;
                        result.push(that.form.dynamicTags[i]);
                    }
                }
                that.form.dynamicTags = result;
            },
            clearItem() { //点击的时候，清空选项
                this.form.state3 = "";
            },
            handleClose(tag) {
                this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
            },
            addConfig(obj, item) { //添加配置检测 find  every 数组的some的方法 
                let regUrl = /^(http|ftp|https):\/\/.+$/g;
                let isEmpty = obj.every((item, index) => {
                    return item.name
                })
                if (!isEmpty) {
                    this.$message({
                        type: "warning",
                        message: "请先填写配置检测信息"
                    })
                    return;
                } else if (!regUrl.test(item)) {
                    this.$message({
                        type: "warning",
                        message: "请先填写正确的url地址"
                    })
                    return;
                } else {
                    obj.push({
                        "name": ""
                    })
                }
            },
            delConfig(obj, index) { //删除配置检测 根据元素的索引进行删除元素 
                obj.splice(index, 1)
            },
            //提交的时候 用formData 进行模拟表单的提交 
            goBack() {
                //页面返回的时候  使用路由的返回机制。
                this.$router.go(-1);
            },
            validateForm() {
                let that = this;
                var regUrl = /^(http|ftp|https):\/\/.+$/g;
                // if(!this.form.creative_name){
                //   this.$message({
                //     message:'创意主题不为空',
                //     type:'warning'
                //   })
                //   return false;
                // }
                // if(!this.form.imgText.W){
                //   this.$message({
                //     message:'尺寸宽度不为空',
                //     type:'warning'
                //   })
                //   return false;
                // }
                // if(!(/^\d+$/g).test(this.form.imgText.W)){
                //   this.$message({
                //     message:'尺寸宽度只能是正整数',
                //     type:'warning'
                //   })
                //   return false;
                // }
                // if(!this.form.imgText.H){
                //   this.$message({
                //     message:'尺寸高度不为空',
                //     type:'warning'
                //   })
                //   return false;
                // }
                // if(!(/^\d+$/g).test(this.form.imgText.H)){
                //   this.$message({
                //     message:'尺寸高度只能是正整数',
                //     type:'warning'
                //   })
                //   return false;
                // }
                if (!this.form.imgText.w_h) {
                    this.$message({
                        message: '尺寸不为空',
                        type: 'warning'
                    })
                    return false;
                }
                if (!this.form.imgText.title) {
                    this.$message({
                        message: '标题不能为空',
                        type: 'warning'
                    })
                    return false;
                }
                if (!this.form.imgText.desc) {
                    this.$message({
                        message: '描述不能为空',
                        type: 'warning'
                    })
                    return false;
                }
                if (this.form.style_id == 9) { //上传视频信息
                    //封面 视频 时长
                    if (!this.form.path) {
                        this.$message({
                            message: '封面不为空',
                            type: 'warning'
                        })
                        return false;
                    }
                    if (!this.form.video) {
                        this.$message({
                            message: '视频文件不为空',
                            type: 'warning'
                        })
                        return false;
                    }
                    if (!this.form.imgText.videotime) {
                        this.$message({
                            message: '视频时长不为空',
                            type: 'warning'
                        })
                        return false;
                    }
                }
                //   if(!this.iconpath){
                //        this.$message({
                //       message:'上传logo图片',
                //       type:'warning'
                //     })
                //     return false;
                //   }
                // if(!this.form.imgText.w){
                //     this.$message({
                //       message:'logo尺寸宽度不为空',
                //       type:'warning'
                //     })
                //     return false;
                //   }
                // if (this.form.imgText.w) {
                //     if (!(/^\d+$/g).test(this.form.imgText.w)) {
                //         this.$message({
                //             message: 'logo尺寸宽度只能是正整数',
                //             type: 'warning'
                //         })
                //         return false;
                //     }
                // }
                // if(!this.form.imgText.h){
                //   this.$message({
                //     message:'logo尺寸高度不为空',
                //     type:'warning'
                //   })
                //   return false;
                // }
                // if (this.form.imgText.h) {
                //     if (!(/^\d+$/g).test(this.form.imgText.h)) {
                //         this.$message({
                //             message: 'logo尺寸高度只能是正整数',
                //             type: 'warning'
                //         })
                //         return false;
                //     }
                // }

                if (!this.form.firstClassify) {
                    this.$message({
                        message: '一级分类不能为空',
                        type: 'warning'
                    })
                    return false;
                }
                if (!this.form.secondClassify) {
                    this.$message({
                        message: '二级分类不能为空',
                        type: 'warning'
                    })
                    return false;
                }
                // if (this.form.dynamicTags == 0) {
                //     this.$message({
                //         message: '标签不为空',
                //         type: 'warning'
                //     })
                //     return false;
                // }
                if (this.form.configs1[this.form.configs1.length - 1].name == "") {
                    // this.$message({
                    //   message:'曝光检测不为空',
                    //   type:'warning'
                    // })
                    // return false; 
                } else if (!regUrl.test(this.form.configs1[this.form.configs1.length - 1].name)) {
                    that.$message({
                        message: '曝光检测url输入不正确',
                        type: 'warning'
                    })
                    return false;
                }
                if (this.form.configs2[this.form.configs2.length - 1].name == "") {
                    // this.$message({
                    //   message:'点击检测不为空',
                    //   type:'warning'
                    // })
                    // return false; 
                } else if (!(/^(http|ftp|https):\/\/.+$/g).test(this.form.configs2[this.form.configs2.length - 1].name)) {
                    that.$message({
                        message: '点击检测url输入不正确',
                        type: 'warning'
                    })
                    return false;
                }
                return true;
            },
            distinct(arr) {
                let result = [];
                let obj = {};
                for (let i = 0; i < arr.length; i++) {
                    if (!obj[arr[i].name]) { //如果能查找到，证明数组元素重复了
                        obj[arr[i].name] = 1;
                        result.push(arr[i]);
                    }
                }
                return result;
            },
            onSubmit() {
                
                    console.log(this.form.imgText.options);
                let that = this;
                let fileData = new FormData();
                fileData.append("ad_id", this.form.ad_id);
                if (this.form.creative_name) {
                    fileData.append("creative_name", this.form.creative_name); //新增创意主题
                }
                fileData.append("style_id", this.form.style_id);
                if (this.form.imgText.w_h != "") {
                    fileData.append("w_h", this.form.imgText.w_h);
                }
                if (this.form.path != "") {
                    fileData.append("img[]", this.form.path);
                }
                if (this.form.grouppath.length > 0) {
                    for (var i = 0; i < this.form.grouppath.length; i++) {
                        if (this.form.grouppath[i].path) {
                            fileData.append("img[]", this.form.grouppath[i].path);
                        }
                    }
                }
                fileData.append("title", this.form.imgText.title);
                if (this.form.imgText.desc) {
                    fileData.append("remark", this.form.imgText.desc);
                    //fileData["desc"] = this.form.imgText.desc;
                }
                if (this.form.video != "") {
                    fileData.append("video", this.form.video);
                }
                if (this.form.imgText.videotime) {
                    fileData.append("duration", this.form.imgText.videotime);
                }
                if (this.iconpath) {
                    fileData.append("icon", this.iconpath);
                    fileData.append('iconsize','100*100');
                 }

                // let wh = this.form.imgText.w + '*' + this.form.imgText.h;


                // if(this.iconpath && this.form.imgText.w && this.form.imgText.h){
                //      fileData.append("iconsize", wh);
                // }

                 //曝光检测
                 let imp_monitor1=[];

                 this.form.configs1.forEach((item,index)=>{
                      if(item.name){
                         fileData.append("imp_monitor[]", item.name);
                      }
                 });
                 //点击检测
                 let click_monitor2=[];
                 this.form.configs2.forEach((item,index)=>{
                    if(item.name){
                        fileData.append("click_monitor[]", item.name);
                    }
                });
                //label 使用逗号进行分割的字符串的形似

                if(this.form.dynamicTags.length > 0){
                    let labelAry = [];
                    this.form.dynamicTags.forEach((item, index) => {
                        labelAry.push(item.id)
                    });
                    fileData.append("label", labelAry.join(","));
                }

                fileData.append("first_category", this.form.firstClassify);
                fileData.append("second_category", this.form.secondClassify);
                
                //fileData.append("size", '1024');
                if (this.validateForm()) {
                    if (that.form.style_id == 9) {
                        that.loading = that.$loading({
                            lock: true,
                            text: '视频信息上传中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                    }
                    creative.creativeNative(fileData).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            if (that.form.style_id == 9) {
                                that.loading.close();
                            }
                            this.$router.go(-1);
                        } else {
                            this.$message.warning(res.data.msg);
                            if (that.form.style_id == 9) {
                                that.loading.close();
                            }
                        }
                    });
                }
            },
            clearUpload() {
                this.imgfile = "";
                this.form.creative_file = "";
            },
            selectfile() {
                this.$el.querySelector("#file").click();
            }
        },
        mounted() {
            let that = this;
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.form.ad_id = this.$route.params.id; //获得广告位id 
            this.getMediaList(0); //默认加载一级分类的数据
            //获得下拉标签  
            creative.creativeEditLabel().then(res => {
                if (res.data.code == 0) {
                    let temp = res.data.data;
                    let resultAry = [];
                    for (let attr in temp) {
                        resultAry.push({
                            "value": temp[attr],
                            "id": attr
                        })
                    }
                    // this.form.restaurants = this.loadAll();
                    this.form.restaurants = resultAry;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
            //获取广告位尺寸信息  {{host}}/mediaAdlistNew-getadSize
            creative.mediaAdlistNewgetadSize().then(res => {
                if (res.data.code == 0) {
                    let temp = res.data.data;
                    let result = [];
                    temp.forEach((item, index) => {
                        result.push({
                            label: item,
                            value: item
                        })
                    })
                    that.form.imgText.optionss = result;
                    that.form.imgText.options = result;
                    that.form.imgText.options2 = result;
                    that.form.imgText.sizeList = result;
                    that.tempSize = result;

                    
                } else {
                    this.$message.error(res.data.msg);
                }
            });
            //console.log(that.$refs.selectDom)
        },
        watch: {
            // '$route' (to, from) {
            //     alert(3)
            //     let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //     let containerHeight = this.$refs['container-wrap'].offsetHeight;
            //     // alert(3)
            //     console.log(windowHeight, containerHeight);
            //     setWinHeight();
            // }
        }
    };
</script>

<style lang="scss">
    @import "../../../style/mixin";
    @import "../../../style/common";
    .pb18 {
        padding-bottom: 18px !important;
    }
    .mb10 {
        margin-bottom: 10px !important;
    }
    .mt5 {
        margin-top: 5px;
    }
    .mb20 {
        margin-bottom: 20px !important;
    }
    .mup-ingredient {
        .create-row {
            margin-bottom: 13px;
            .el-input {
                width: 240px;
            }
            .el-checkbox__label {
                @include sc(12px, $firstc);
            }
            .sibling-elem {
                margin: 10px 0 0 92px;
            }
            .el-checkbox {
                width: 105px;
            }
            .el-tag {
                background-color: #f3f5f9;
                color: #6cabff;
                border: 0 none;
                padding: 8px 12px 5px 11px;
                margin-bottom: 10px;
                height: auto;
                line-height: 0;
                .el-icon-close {
                    right: -3px;
                }
                &+.el-tag {
                    margin-left: 10px;
                }
            }
            .el-autocomplete {
                padding-left: 91px;
                display: block;
            }
            .tags-container {
                padding-left: 91px;
            }
        }
        .el-tabs__nav-wrap::after {
            background-color: #fff;
        }
        .styleLine {
            position: absolute;
            top: -46px;
            left: 10px;
            .line1 {
                float: left;
                border-right: 1px solid #e1e7f0;
                width: 140px;
                height: 24px;
                position: absolute;
                left: 85px
            }
            .line2 {
                float: left;
                border-right: 1px solid #e1e7f0;
                width: 140px;
                height: 24px;
                position: absolute;
                left: -36px
            }
        }
        .data-item {
            color: $firstc;
            margin-right: 6px;
        }
        .item-needed {
            color: $redc;
            width: 7px;
            margin-right: 7px;
            vertical-align: -2px;
        }
        .tags-container {
            //padding-left: 94px;
        }
        .imgStyle2 {
            min-height: 157px;
            min-width: 920px;
            .tiptxt1 {
                color: #fff;
                font-size: 12px;
                background-color: #6cabff;
                padding: 1px 5px;
                border-radius: 3px;
                position: absolute;
                bottom: 10px;
                left: 10px
            }
            .wrap {
                float: left;
                width: 225px;
                height: 155px;
                background: #e6ebf3;
                padding: 10px;
                position: relative;
            }
            .wrap2 {
                float: left;
                margin-left: 20px;
                .item {
                    margin-bottom: 10px
                }
                span {
                    color: #515974;
                }
                .imglist2 {
                    margin-top: -17px;
                    margin-left: 48px;
                    width: 200px;
                    height: 53px;
                    border: 1px solid #dcdfe6;
                    border-radius: 4px;
                    position: relative;
                    .el-upload-list {
                        margin-top: -30px;
                    }
                }
            }
            .wrap3 {
                .item {
                    margin-bottom: 10px;
                    position: relative;
                }
                .groupimg {
                    float: left;
                    height: 98px;
                    line-height: 98px;
                    width: 98px;
                    position: relative;
                    border: 1px solid #e3e8f1;
                    margin-right: 20px;
                    text-align: center;
                    .delIcon {
                        position: absolute;
                        top: -9px;
                        right: -9px;
                        font-size: 15px;
                        width: 18px;
                        height: 18px;
                        line-height: 17px;
                        text-align: center;
                        cursor: pointer;
                        border-radius: 50%;
                        color: rgb(153, 153, 153);
                        background-color: #fff;
                        border: 1px solid #ddd;
                        z-index: 6;
                    }
                }
                float:left;
                margin-left:22px;
                position:relative;
                span {
                    color: #fff;
                }
                .delUpload {
                    position: absolute;
                    left: 207px;
                    top: 10px;
                    cursor: pointer;
                    font-size: 17px;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    color: #999;
                }
                .firimglist {
                    position: relative;
                    width: 198px;
                    vertical-align: top;
                    height: 38px;
                    border: 1px solid #e3e8f1;
                    display: inline-block;
                    border-radius: 2px;
                    .el-upload-list {
                        padding-right: 10px;
                        margin-top: -23px;
                        height: 38px;
                        overflow: auto
                    }
                }
                .imglist {
                    position: relative;
                    display: inline-block;
                    border-radius: 2px;
                    .el-upload-list {
                        padding-right: 10px;
                        margin-top: -23px;
                        height: 155px;
                        overflow: auto
                    }
                }
            }
            .con1 {
                background: #fff;
                color: #515974;
                width: 45px;
                height: 42px;
                text-align: center;
                line-height: 42px;
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 12px;
            }
            .con2 {
                background: #fff;
                color: #515974;
                width: 149px;
                height: 42px;
                line-height: 42px;
                text-align: center;
                position: absolute;
                top: 10px;
                right: 10px;
            }
            .con3 {
                width: 116px;
                height: 83px;
                position: absolute;
                left: 10px;
                bottom: 10px;
            }
            .con4 {
                background: #fff;
                color: #515974;
                width: 78px;
                height: 83px;
                line-height: 85px;
                text-align: center;
                position: absolute;
                right: 10px;
                bottom: 10px;
            }
            .con5 {
                height: 36px;
                line-height: 36px;
                background-color: #fff;
                text-align: center;
                margin-top: 3px;
                position: absolute;
                bottom: 10px;
                margin-right: 10px;
                width: 204px;
            }
            .con6 {
                width: 65px;
                height: 41px;
                position: absolute;
                top: 60px;
                left: 10px;
            }
            .con7 {
                vertical-align: middle;
            }
            .con9 {
                position: relative;
                width: 65px;
                height: 41px;
                margin-left: 5px
            }
            .con8 {
                display: inline-block;
                background-color: #fff;
                width: 135px;
                height: 40px;
                overflow: hidden;
                line-height: 40px;
                text-align: center;
                vertical-align: 1px;
                position: absolute;
                top: 60px;
                right: 10px;
                img {
                    width: 20px;
                    vertical-align: middle;
                }
            }
        }
        background-color: #fff;
        .tabSelectStyle {
            margin-top: 30px;
            .el-tabs__item {
                font-size: 12px;
                color: #515974;
                padding: 0 20px;
                ;
                margin-right: 10px;
                margin-left: 12px;
            }
            .el-tabs__active-bar {
                background-color: transparent;
            }
            .el-tabs__item.is-active {
                border: 1px solid #6cabff;
                border-radius: 2px;
                color: #6cabff;
                background-color: #f0f6ff;
                padding-top: 10px;
                padding-bottom: 10px;
                height: 40px !important;
            }
            .el-tabs__content {
                margin-top: 2px;
                overflow: unset;
                margin-left: 11px; //max-width: 960px
            }
            .el-tabs--top {
                //max-width: 960px
            }
            .el-tabs__item.is-top:last-child {
                padding-right: 20px
            }
            .el-tabs__item.is-top:nth-child(2) {
                padding-left: 20px!important;
            }
        }
        .el-tab-pane,
        .el-tabs__header {
            background-color: #ffffff;
        }
        .el-tab-pane:last-child {
            .imgStyle2 {
                min-height: 210px;
            }
        }
        .el-tabs__header {
            margin: 0;
        }
        .update-hd {
            line-height: 38px;
            color: #515974;
            font-weight: bold;
            width: 80px;
            display: inline-block;
        }
        .update-local-file {
            margin-bottom: 15px;
        }
        .update-item-row {
            margin-bottom: 14px;
            .addItem {
                display: inline-block;
                width: 36px;
                height: 36px;
                border: 1px solid #6cabff;
                text-align: center;
                line-height: 28px;
                border-radius: 2px;
                color: #6cabff;
                font-size: 30px;
                margin-left: 10px;
                cursor: pointer;
                vertical-align: -4px;
            }
            .delItem {
                color: #ff6870;
                border: 1px solid #ff6870;
                font-size: 25px;
                line-height: 32px;
            }
            .el-input {
                width: 200px;
            }
            .align-right.el-select,
            .align-right.el-input {
                margin: 0 10px 0 32px;
            }
            .el-select .el-input {
                width: 200px;
            }
            .sel .el-select .el-input {
                width: 200px;
            }
            .classify.el-select .el-input {
                width: 240px;
            }
            .el-button--upload {
                margin-left: 6px;
            }
        } //revised?
        .el-tab-pane {
            //padding: 0px 0 16px 0px;
        }
        .el-tabs__nav-wrap:after {
            height: 1px !important;
        }
        .is-confirm {
            background-color: #fff;
            padding-left: 30px;
        }
        .el-tabs__nav-scroll {
            //padding-left: 30px;
        }
        .el-tabs__item {
            padding: 0 15px;
            height: 20px;
            line-height: 20px;
            margin: 10px auto 8px auto;
        }
        .is-active {
            color: #6cabff;
        }
        .el-radio {
            // padding: 7px 0 8px;
        }
        .el-radio__input+.el-radio__label {
            color: #7f8599;
            font-weight: normal;
        }
        .el-radio__input.is-checked+.el-radio__label {
            color: #515974;
            font-weight: bold;
        }
        .el-tabs__active-bar {
            // background-color: transparent;
        }
    }
</style>