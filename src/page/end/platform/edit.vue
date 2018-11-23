<template>
    <div class="back-list">
        <el-main>
            <el-form ref="form" :model="form" label-width="">
                <!-- 基本设置 start -->
                <el-col :span="24" class="margin-bottom-20">
                    <h1 class="template-hd">基本设置</h1>
                    <div class="template-bd border-bottom-2">
                        <div class="basic-set-row">
                            <i class="neccessary left">*</i>
                            <label for="" class="data-item left">平台名称：</label>
                            <el-input v-model="form.name" placeholder="20字以内，汉字数字或英文字母"></el-input>
                        </div>
                        <div class="basic-set-row">
                            <i class="neccessary left">*</i>
                            <label for="" class="data-item left">LOGO：</label>
                            <el-input class="upload-control" :class="{'upload-input':isUpload}" placeholder="请上传企业LOGO" v-model="logofile" :readonly="true">
                                <i slot="suffix" class="el-icon-close" @click="clearUpload"></i>
                            </el-input>
                            <el-button type="upload" @click="selectLogo">上传</el-button>
                            <input type="file" name="pic" accept="image/gif, image/jpeg" id="fileLogo" @change="uploadLogo" v-if="iconLogoShow" style="display:none" />
                        </div>
                        <div class="basic-set-row">
                            <i class="neccessary left"> </i>
                            <label for="" class="data-item left">状态：</label>
                            <el-switch v-model="flag" active-text="关闭" inactive-text="开启">
                            </el-switch>
                        </div>
                    </div>
                </el-col>
                <!-- 规则配置 start -->
                <el-col :span="24" class="back-rule-config">
                    <h1 class="template-hd">规则配置</h1>
                    <div class="template-bd border-bottom-2">
                        <div class="basic-set-row clear">
                            <i class="config-neccessary left">*</i>
                            <label for="" class="config-title left">审核政策：</label>
                            <el-radio v-model="form.ad_auditing" label="1">先审后投</el-radio>
                            <el-radio v-model="form.ad_auditing" label="2">先投后审</el-radio>
                        </div>
                        <!-- <div class="basic-set-row clear">
                                                        <i class="config-neccessary left">*</i>
                                                        <label for="" class="config-title left">素材审核：</label>
                                                        <el-radio v-model="form.cre_auditing" label="1">先审后投</el-radio>
                                                        <el-radio v-model="form.cre_auditing" label="2">先投后审</el-radio>
                                                    </div> -->
                        <div class="basic-set-row clear">
                            <i class="config-neccessary left">*</i>
                            <label for="" class="config-title left">资源类型：</label>
                            <el-checkbox-group v-model="resCheckTypeList">
                                <el-checkbox v-for="item in resTypeList" :label="item.value" :key="item.key"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="basic-set-row clear">
                            <i class="config-neccessary left">*</i>
                            <label for="" class="data-item left">广告样式：</label>
                            <el-tabs type="card" v-model="activeNamebudget" @tab-click="handleClick">
                                <!-- 图片 start-->
                                <el-tab-pane name="1-1">
                                    <span slot="label">
                            													<span class="select-item ">图片</span>
                                    <i class="el-vertical-line">|</i>
                                    </span>
                                    <div class="image-wrapper" ref="imageWrapper">
                                        <div class="margin-bottom-10 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">图片尺寸：</label>
                                            <panel :childData="getSizeData" @pushItem="addImageItem" @setCheckedItem="getCheckedImage" :isShow="true" ref="panelsize"></panel>
                                        </div>
                                        <div class="basic-set-row special-select clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">文件格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formImage.type" multiple placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <!-- 原生图文 start-->
                                <el-tab-pane name="1-2">
                                    <span slot="label">
                            													<span class="select-item">原生图文</span>
                                    <i class="el-vertical-line">|</i>
                                    </span>
                                    <div class="img-txt-wrapper" ref="imgTxtWrapper" id="imgTxtWrapper">
                                        <div class="margin-bottom-10 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">图片尺寸：</label>
                                            <panel :childData="getSizeData" @pushItem="addNativeImage" @setCheckedItem="getCheckedNativeImage" :isShow="true" ref="panelnative"></panel>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">图片数：</label>
                                            <el-select v-model="formNative.quantity" placeholder="请选择...">
                                                <el-option v-for="item in imagequantity" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row special-select clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">图片格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formNative.type" multiple placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <el-checkbox class="checkbox-space-adjust left" label="标题" key="标题" v-model="isCheckedTile">标题字数：</el-checkbox>
                                            <el-input v-model="formNative.title" @blur="checkedTitle"></el-input>
                                        </div>
                                        <div class="margin-bottom-22 clear">
                                            <el-checkbox class="checkbox-space-adjust left" label="描述" key="描述" v-model="checkedDes">描述：</el-checkbox>
                                            <el-input v-model="formNative.des" @blur="setDesChecked(formNative.des)"></el-input>
                                        </div>
                                        <div class="basic-set-row">
                                            <el-checkbox label="是否需要LOGO" key="是否需要LOGO" v-model="formNative.isLogo">是否需要LOGO</el-checkbox>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <!-- 原生视频 start-->
                                <el-tab-pane name="1-3">
                                    <span slot="label">
                                                                                                <span class="select-item">原生视频</span>
                                    <i class="el-vertical-line">|</i>
                                    </span>
                                    <div class="origin-video-wrapper" ref="originVideowrapper" id="originVideowrapper">
                                        <div class="margin-bottom-10 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">视频尺寸：</label>
                                            <panel :childData="getSizeData" @pushItem="addVideoPatch" @setCheckedItem="getCheckedvideoPatch" :isShow="true" ref="panelvideo"></panel>
                                        </div>
                                            <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">时长：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formNativeVideo.duration" placeholder="请选择">
                                                <el-option v-for="item in timeoptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">视频格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formNativeVideo.videoType" multiple placeholder="请选择">
                                                <el-option v-for="item in videooptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <!-- 封面尺寸 -->
                                        <div class="basic-set-row clear">
                                            <i class="neccessary left" v-show="false">*</i>
                                            <label for="" class="data-item left">封面尺寸：</label>
                                            <panel :childData="getSizeData" @pushItem="addcoverData" @setCheckedItem="getcheckedCoverData" :isShow="false" ref="panelcover"></panel>
                                        </div>
                                        <div class="basic-set-row special-select clear">
                                            <!-- <i class="config-neccessary left">*</i> -->
                                            <label for="" class="data-item left">封面格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formNativeVideo.coverType" multiple placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <el-checkbox class="checkbox-space-adjust left" label="标题字数" key="标题" v-model="isCheckedVideoTile">标题字数：</el-checkbox>
                                            <el-input v-model="formNativeVideo.title" @blur="checkedVideoTitle"></el-input>
                                        </div>
                                        <div class="margin-bottom-22 clear">
                                            <el-checkbox class="checkbox-space-adjust left" label="描述" key="描述" v-model="checkedDesVideo">描述：</el-checkbox>
                                            <el-input v-model="formNativeVideo.des" @blur="setDesCheckedVideo(formNativeVideo.des)"></el-input>
                                        </div>
                                        <div class="basic-set-row">
                                            <el-checkbox label="是否需要LOGO" key="是否需要LOGO" v-model="formNativeVideo.isLogo">是否需要LOGO</el-checkbox>
                                        </div>
                                      
                                    </div>
                                </el-tab-pane>
                                <!-- 贴片视频 start-->
                                <el-tab-pane name="1-4">
                                    <span slot="label">
                                                                                                <span class="select-item">贴片视频</span>
                                    <i class="el-vertical-line"></i>
                                    </span>
                                    <div class="paster-fvideo-wrapper" ref="pasterVideoWrapper">
                                        <div class="margin-bottom-10 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">视频尺寸：</label>
                                            <panel :childData="getSizeData" @pushItem="addNativeVideoData" @setCheckedItem="getCheckednativeVideoData" :isShow="true" ref="panelpatch"></panel>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formPatchVideo.type" multiple placeholder="请选择">
                                                <el-option v-for="item in videooptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">时长：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formPatchVideo.duration" placeholder="请选择">
                                                <el-option v-for="item in timeoptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                            <!-- right column matter rule -->
                            <div class="el-material-rule" ref="materialRule">
                                <a href="javascript:void(0);" class="addItem" @click="adAdItem">+</a>
                                <div class="el-rules" :style="{'max-height': heightData+'px'}">
                                    <p class="matter-rule-label">素材规范</p>
                                    <div class="image-rules" v-show="imageItemData.length>0">
                                        <h2 class="img-rule-title">图片规则</h2>
                                        <ul class="rules-bd img-rule-bd area-item-row">
                                            <!-- <li class="search-item">image：300*250，jpg/jpeg；<i class="el-icon-close"></i></li>
                                                                                <li class="search-item">image：300*250，jpg/jpeg；</li> -->
                                            <li class="search-item" 
                                             @click="editImage(index)"
                                             v-for="(item, index) in imageItemData" 
                                             :key="index">
                                             image：{{item.imagewh.toString()}}，{{item.imagetype.toString()}} <i v-if="currentEditImage==index.toString()" class="el-icon-close" v-on:click.stop="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                    <!-- nativeItemData -->
                                    <div class="original-rules" v-show="nativeItemData.length>0">
                                        <h2 class="orig-rule-title">原生规则</h2>
                                        <ul class="rules-bd orig-rule-bd area-item-row">
                                            <li class="search-item" @click="editNative(index)" v-for="(item, index) in nativeItemData" :key="index">{{item.imagenum==1?"单图":"组图"}}：{{item.imagewh.toString()}}，{{item.imagetype.toString()}} <i v-if="currentEditNative==index.toString()" class="el-icon-close" @click="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                    <!-- nativevideoItemData -->
                                    <div class="original-rules" v-show="nativevideoItemData.length>0">
                                        <h2 class="orig-rule-title">原生视频</h2>
                                        <ul class="rules-bd orig-rule-bd area-item-row">
                                            <li class="search-item" @click="editVideo(index)" v-for="(item, index) in nativevideoItemData" :key="index">原生视频：{{item.videowh.toString()}}，{{item.videotype.toString()}} <i v-if="currentEditVideo==index.toString()" class="el-icon-close" @click="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                    <div class="original-rules" v-show="patchVideoItmeData.length>0">
                                        <h2 class="orig-rule-title">贴片视频</h2>
                                        <ul class="rules-bd orig-rule-bd area-item-row">
                                            <li class="search-item" @click="editPatch(index)" v-for="(item, index) in patchVideoItmeData" :key="index">贴片视频：{{item.videowh.toString()}}，{{item.videotype.toString()}} <i v-if="currentEditPatch==index.toString()" class="el-icon-close" @click="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="basic-set-row clear">
                                                        <i class="config-neccessary left">*</i>
                                                        <label for="" class="config-title left">物料类型：</label>
                                                        <el-checkbox-group v-model="materialTypelistCheck">
                                                            <el-checkbox  v-for="item in materialTypelist" :label="item.value" :key="item.key"></el-checkbox>
                                                        </el-checkbox-group>
                                                    </div> -->
                        <!-- <div class="basic-set-row clear">
                                                        <i class="config-neccessary left">*</i>
                                                        <label for="" class="config-title left">文件类型：</label>
                                                        <el-select v-model="filetags" multiple placeholder="请选择">
                                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </div> -->
                    </div>
                    <div class="is-confirm">
                        <el-button type="confirm" @click="onSubmit">确认</el-button>
                        <el-button type="cancel" @click="goBack">取消</el-button>
                    </div>
                </el-col>
            </el-form>
        </el-main>
    </div>
</template>



<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        end
    } from "../../../service/index"
    import _ from "lodash";
    import panel from "./panel"
    import randomstring from "random-string";
    export default {
        computed: {
            getLeftList() {
                return this.leftSizeList;
            },
            getSizeData() {
                return this.imageData;
            },

            // isGroup(){

            //     console.log(this.formNative.quantity);

            //     return this.formNative.quantity;

            // }
            
            
        },
        data: function() {
            return {
                currentEditImage:"",// 当前编辑项
                currentEditNative:"",
                currentEditVideo:"",
                currentEditPatch:"",
                isCheckedVideoTile: false,
                checkedDes: false,
                  checkedDesVideo: false,
                flag: false,
                checked: true,
                isCheckedTile: false,
                form: {
                    name: "", //渠道名称
                    resource_type: "", //资源类型
                    creative_type: "", //素材类型
                    mimes: "", //
                    flag: "", //状态
                    id: "",
                    // logo: "",
                    ad_auditing: "1", //客户审核 1 先审后台 2 先投后审
                    cre_auditing: "1",
                    label: ""
                },
                //图片
                formImage: {
                    size: "", //图片尺寸
                    type: "" //文件格式
                },
                //原生图文
                formNative: {
                    size: "", //图片尺寸
                    quantity: "", //数量
                    type: [], //图片格式
                    title: "", //标题
                    des: "", //描述
                    isLogo: false //是否需要logo
                },
                //原生视频
                formNativeVideo: {
                    size: "", //视频尺寸
                    imageType: "", //图片格式
                    coverSdize: "", //封面尺寸
                    videoType: [], //视频格式
                    title: "", //标题
                    des: "", //描述
                    isLogo: false, //是否需要logo,
                    coverType: [],
                    duration:""
                },
                //贴片视频
                formPatchVideo: {
                    size: "", //视频尺寸
                    type: [], //视频格式
                    duration: "" //时长
                },
                //资源类型
                // resTypeList: [], // ["mobile app", "mobile web"]
                resTypeList: [{
                    key: "mobile app",
                    value: "移动APP"
                }, {
                    key: "mobile web",
                    value: "移动网页"
                }, {
                    key: "pc web",
                    value: "PC网页"
                }], // ["mobile app", "mobile web"]
                resCheckTypeList: [],
                materialTypelist: [{
                    key: "banner",
                    value: "图片"
                }, {
                    key: "video",
                    value: "贴片视频"
                }, {
                    key: "native",
                    value: "原生图文"
                }, {
                    key: "native_video",
                    value: "原生视频"
                }], //"banner", "video", "native", "native_video"
                materialTypelistCheck: [],
                keyword: "",
                dynamicTags: [],
                state3: "",
                leftSizeList: [],
                rightSizeList: [],
                checkList: [],
                sourceLeftSizeList: [],
                restaurants: [],
                options: [{
                    value: 'jpeg',
                    label: 'jpeg'
                }, {
                    value: 'jpg',
                    label: 'jpg'
                }, {
                    value: 'png',
                    label: 'png'
                }, {
                    value: 'gif',
                    label: 'gif'
                }],
                videooptions: [{
                    value: 'mp4',
                    label: 'mp4'
                }, {
                    value: 'flv',
                    label: 'flv'
                }, {
                    value: 'swf',
                    label: 'swf'
                }],
                imagequantity: [{
                    value: 1,
                    label: "1"
                }, {
                    value: 3,
                    label: "3"
                }],
                // timeoptions: [{
                //     value: '15s',
                //     label: '15s'
                // }, {
                //     value: '30s',
                //     label: '30s'
                // }, {
                //     value: '60s',
                //     label: '60s'
                // }],
                 timeoptions: [{
                    value: 15,
                    label: '15s'
                }, {
                    value: 30,
                    label: '30s'
                }, {
                    value: 60,
                    label: '60s'
                }],
                filtertime: "",
                filetags: [],
                isUpload: "",
                logofile: "",
                addTop: false,
                activeNamebudget: '1-1',
                checkAll: false,
                isIndeterminate: true,
                imagenum: '',
                filterVideo: '',
                imageData: [], //图片
                nativeimageData: [], //原生图文
                videoPatch: [], //贴片视频
                nativeVideoData: [], //原生视频
                coverData: [], //
                checkedImageItem: [],
                checkedNativeItem: [],
                checkedVideoItem: [],
                checkedNativeVideoItem: [],
                checkedCoverData: [],
                imageItemData: [],
                nativeItemData: [],
                nativevideoItemData: [],
                patchVideoItmeData: [],
                isGroup:"",
                heightData: 57,
                iconLogoShow: true,
                //   //广告样式
                // banner: [], //{imagewh:[],imagetype:[]}
                // native: [], //{imagewh:[],imagetype:[],imagenum:"",title:"",desc:"",logo:""}
                // videonative: [], //{videowh:[],videotype:[],imagewh:[],imagetype:[],duration:[],title:[],desc:[],logo:[]}
                // video: [], //{videowh:[],videotype:[],duration:[]}
            }
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            editPatch(val) {
                //激活 tab
                this.activeNamebudget = "1-4";

                //show del btn
                this.currentEditImage="";
                this.currentEditNative="";
                this.currentEditVideo="";
                this.currentEditPatch=val.toString();

                //初始化
                let currentItme=this.patchVideoItmeData[val];
                this.formPatchVideo= {
                    size: "", //视频尺寸
                    type: currentItme.videotype, //视频格式
                    duration: currentItme.duration //时长
                };
                this.checkedNativeVideoItem=currentItme.videowh;
                this.$refs.panelpatch.checkList=  this.checkedNativeVideoItem;


            },
            editVideo(val) {
                this.activeNamebudget = "1-3";
                this.currentEditImage="";
                this.currentEditNative="";
                this.currentEditPatch="";

                this.currentEditVideo=val.toString();


                //初始化
                let currentItme=this.nativevideoItemData[val];
                this.formNativeVideo= {
                            //size: "", //视频尺寸
                            //imageType: "", //图片格式
                            //coverSdize: currentItme.imagewh, //封面尺寸
                            videoType: currentItme.videotype, //视频格式
                            title: currentItme.title, //标题
                            des: currentItme.desc, //描述
                            isLogo: currentItme.logo, //是否需要logo,
                            coverType: currentItme.imagetype,
                            duration:currentItme.duration
                        };
                this.checkedVideoItem=currentItme.videowh;
                this.checkedCoverData=currentItme.imagewh;
                this.$refs.panelvideo.checkList=  this.checkedVideoItem;
                this.$refs.panelcover.checkList=  this.checkedCoverData;

                if(currentItme.title!=""){
                    this.isCheckedVideoTile=true;
                }

                if(currentItme.desc!=""){
                    this.checkedDesVideo=true;
                }else{
                     this.checkedDesVideo=false;
                }

            },
            editNative(val) {
                this.activeNamebudget = "1-2";
                this.currentEditNative=val.toString();

                this.currentEditImage="";
                this.currentEditVideo="";
                this.currentEditPatch="";

                this.isGroup=val;
                //初始化
                let currentItme=this.nativeItemData[val];
                this.formNative={
                            //imagewh: currentItme.imagewh,
                            type:currentItme.imagetype,
                            title: currentItme.title,
                            desc:currentItme.desc,
                            logo:currentItme.logo,
                            quantity:currentItme.imagenum
                        };

                        // this.isGroup=this.formNative.quantity;
                this.checkedNativeItem=currentItme.imagewh;
                this.$refs.panelnative.checkList=  this.checkedNativeItem;



                if(this.formNative.title!=""){
                    this.isCheckedTile=true;

                }

                 if(this.formNative.des!=""){

                     this.checkedDes=true;
                    
                }           

            },
            editImage(val) {
                this.activeNamebudget = "1-1";
                this.currentEditImage=val.toString();

                this.currentEditNative="";
                this.currentEditVideo="";
                this.currentEditPatch="";

                 //初始化
                let currentItme=this.imageItemData[val];
                this.formImage= {
                    // size: "", //视频尺寸
                    type: currentItme.imagetype, //视频格式
                };
                this.checkedImageItem=currentItme.imagewh;
                this.$refs.panelsize.checkList=  this.checkedImageItem;

            },
            delItem(val){

                if(this.activeNamebudget == "1-1"){

                  this.imageItemData.splice(val,1);

                   this.clearFormImage();

                }

                if(this.activeNamebudget == "1-2"){
                     this.nativeItemData.splice(val,1);
                     this.clearFormNative();
                    
                }

                if(this.activeNamebudget == "1-3"){
                     this.nativevideoItemData.splice(val,1);
                     this.clearFormVideo();
                    
                }

                if(this.activeNamebudget == "1-4"){
                     this.patchVideoItmeData.splice(val,1);
                     this.clearFormPatch();
                    
                }

            },
            clearFormImage(){

                this.formImage = {
                        size: "",
                        type: []
                    };
                    this.$refs.panelsize.clearAll();
                
            },
            clearFormNative(){
                this.formNative = {
                            //size: "", //图片尺寸
                            quantity: "", //数量
                            type: [], //图片格式
                            title: "", //标题
                            des: "", //描述
                            isLogo: false //是否需要logo
                        };

                        this.isCheckedTile = false;
                        this.checkedDes=false;
                        this.currentEditNative="";
                        this.$refs.panelnative.clearAll();

            },
            clearFormVideo(){

                  this.isCheckedVideoTile = false;
                        this.formNativeVideo = {
                            size: "", //视频尺寸
                            imageType: "", //图片格式
                            coverSdize: "", //封面尺寸
                            videoType: [], //视频格式
                            title: "", //标题
                            des: "", //描述
                            isLogo: false, //是否需要logo,
                            coverType: []
                        };
                        this.$refs.panelvideo.clearAll();
                        //panelcover
                        this.$refs.panelcover.clearAll();
                        this.currentEditVideo="";

            },
            clearFormPatch(){

                this.formPatchVideo = {
                            size: "", //视频尺寸
                            type: [], //视频格式
                            duration: "" //时长
                        };
                        this.$refs.panelpatch.clearAll();
                        this.currentEditPatch="";

            },
            setDesChecked(val) {
                if (val) {
                    this.checkedDes = true;
                } else {
                    this.checkedDes = false;
                }
            },
             setDesCheckedVideo(val) {
                if (val) {
                    this.checkedDesVideo = true;
                } else {
                    this.checkedDesVideo = false;
                }
            },
            checkedTitle() {
                if (_.isInteger(parseFloat(this.formNative.title)) && parseFloat(this.formNative.title) > 0) {
                    this.isCheckedTile = true;
                } else {
                    this.isCheckedTile = false;
                }
            },
            checkedVideoTitle() {
                if (_.isInteger(parseFloat(this.formNativeVideo.title)) && parseFloat(this.formNativeVideo.title) > 0) {
                    this.isCheckedVideoTile = true;
                } else {
                    this.isCheckedVideoTile = false;
                }
            },
            validateformNative() {
                if (this.checkedNativeItem.length == 0) {
                    this.$message({
                        message: '请选择图片尺寸',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.formNative.quantity) {
                    this.$message({
                        message: '请选择图片数',
                        type: 'warning'
                    });
                    return;
                }
                if (this.formNative.type.length == 0) {
                    this.$message({
                        message: '请选择图片格式',
                        type: 'warning'
                    });
                    return;
                }
                if (!_.isInteger(parseFloat(this.formNative.title))) {
                    this.$message({
                        message: '标题字数必须是整数',
                        type: 'warning'
                    });
                    this.formNative.title = "";
                    return;
                } else {
                    if (_.isInteger(parseFloat(this.formNative.title)) && parseFloat(this.formNative.title) < 0) {
                        this.$message({
                            message: '标题字数必须大于0',
                            type: 'warning'
                        });
                        this.formNative.title = "";
                        return;
                    } else {
                        //this.isCheckedTile = true;
                    }
                }
                return true;
            },
            validateformVideo() {
                if (this.checkedVideoItem.length == 0) {
                    this.$message({
                        message: '请选择视频尺寸',
                        type: 'warning'
                    });
                    return;
                }
                if (this.formNativeVideo.videoType.length == 0) {
                    this.$message({
                        message: '请选择视频格式',
                        type: 'warning'
                    });
                    return;
                }
                if (!_.isInteger(parseFloat(this.formNativeVideo.title))) {
                    this.$message({
                        message: '标题字数必须是整数',
                        type: 'warning'
                    });
                    this.formNativeVideo.title = "";
                    return;
                } else {
                    if (_.isInteger(parseFloat(this.formNativeVideo.title)) && parseFloat(this.formNativeVideo.title) < 0) {
                        this.$message({
                            message: '标题字数必须大于0',
                            type: 'warning'
                        });
                        this.formNativeVideo.title = "";
                        return;
                    } else {
                        //this.isCheckedTile = true;
                    }
                }
                return true;
            },
            validateformPatch() {
                if (this.checkedNativeVideoItem.length == 0) {
                    this.$message({
                        message: '请选择视频尺寸',
                        type: 'warning'
                    });
                    return;
                }
                if (this.formPatchVideo.type.length == 0) {
                    this.$message({
                        message: '请选择视频格式',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.formPatchVideo.duration) {
                    this.$message({
                        message: '请选择时长',
                        type: 'warning'
                    });
                    return;
                }
                return true;
            },
            adAdItem() {
                if (this.activeNamebudget == "1-1") {
                    if (this.checkedImageItem.length == 0) {
                        this.$message({
                            message: '请选择图片尺寸',
                            type: 'warning'
                        });
                        return;
                    }
                    if (this.formImage.type.length == 0) {
                        this.$message({
                            message: '请选择图片文件格式',
                            type: 'warning'
                        });
                        return;
                    }

                    let item={
                        imagewh: this.checkedImageItem,
                        imagetype: this.formImage.type
                    };

                     if(!this.currentEditImage){
                             this.imageItemData.push(item);
                             this.$message({
                                message: '添加成功',
                                type: 'success'
                                });

                        }else{
                            //编辑操作
                            this.imageItemData.splice(parseInt(this.currentEditImage),1,item);
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                                });
                        }
                    // {imagewh:[],imagetype:[]}
                    this.formImage = {
                        size: "",
                        type: []
                    };
                    this.$refs.panelsize.clearAll();
                }
                if (this.activeNamebudget == "1-2") {
                    if (this.validateformNative()) {

                        let item={
                            imagewh: this.checkedNativeItem,
                            imagetype: this.formNative.type,
                            title:parseInt(this.formNative.title),
                            desc: this.formNative.des!=""?this.formNative.des:undefined,
                            logo: this.formNative.isLogo,
                            imagenum:this.formNative.quantity
                        }
                        

                          if(!this.currentEditNative){
                             this.nativeItemData.push(item);
                             this.$message({
                                message: '添加成功',
                                type: 'success'
                                });

                        }else{
                            //编辑操作
                            this.nativeItemData.splice(parseInt(this.currentEditNative),1,item);
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                                });
                        }

                        
                        this.isGroup=this.formNative.quantity;

                        //{imagewh:[],imagetype:[],imagenum:"",title:"",desc:"",logo:""}
                        this.clearFormNative();
                    }
                }
                if (this.activeNamebudget == "1-3") {
                    if (this.validateformVideo()) {
                        let item={
                            videowh: _.cloneDeep(this.checkedVideoItem),
                            videotype: this.formNativeVideo.videoType,
                            imagewh: this.checkedCoverData,
                            imagetype: this.formNativeVideo.coverType,
                            // duration: [],
                            title: parseInt(this.formNativeVideo.title),
                            desc: this.formNativeVideo.des?this.formNativeVideo.des:undefined,
                            logo: this.formNativeVideo.isLogo,
                            duration:this.formNativeVideo.duration
                        };

                         if(!this.currentEditVideo){
                             this.nativevideoItemData.push(item);
                             this.$message({
                                message: '添加成功',
                                type: 'success'
                                });

                        }else{
                            //编辑操作
                            this.nativevideoItemData.splice(parseInt(this.currentEditVideo),1,item);
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                                });
                        }
                      
                      this.clearFormVideo();
                    }
                }
                if (this.activeNamebudget == "1-4") {
                    if (this.validateformPatch()) {
                        let item={
                            videowh: this.checkedNativeVideoItem,//checkedNativeVideoItem
                            videotype: this.formPatchVideo.type,
                            duration: this.formPatchVideo.duration
                        };
                        if(!this.currentEditPatch){
                             this.patchVideoItmeData.push(item);

                              this.$message({
                                message: '添加成功',
                                type: 'success'
                                });

                        }else{
                            //编辑操作
                            this.patchVideoItmeData.splice(parseInt(this.currentEditPatch),1,item);

                             this.$message({
                                message: '编辑成功',
                                type: 'success'
                                });
                        }
                        this.clearFormPatch();
                    }
                }
            },
            addchange(val) {
                this.filetags.length < 1 ? this.addTop = false : this.addTop = true;
            },
            showinfo() {
                this.filetags.length < 1 ? this.addTop = false : this.addTop = true;
            },
            getKeyByValue(resource, checkItem) {
                let result = [];
                _.forEach(resource, (res) => {
                    _.forEach(checkItem, (check) => {
                        if (res.value == check) {
                            result.push(res.key);
                        }
                    })
                });
                return result;
            },
            getValueByKey(resource, checkItem) {
                let result = [];
                _.forEach(resource, (res) => {
                    _.forEach(checkItem, (check) => {
                        if (res.key == check) {
                            result.push(res.value);
                        }
                    })
                });
                return result;
            },
            goBack() {
                this.$router.go(-1);
            },
            selectLogo() {
                this.$el.querySelector("#fileLogo").click();
            },
            handleClick(tab, event) {
                // console.log(tab, event);
                // console.log(event.target.getAttribute('id'));
                if(this.activeNamebudget == "1-1") {
                    this.heightData = '379'
				}
				if (this.activeNamebudget == "1-2") {
                    this.heightData = '565'
				}
				if (this.activeNamebudget == "1-3") {
                    this.heightData = '663'
				}
				if (this.activeNamebudget == "1-4") {
                    this.heightData = '427'
				}
            },
            verfiy() {},
            handleCheckAllChange() {},
            // coverSelect(val) {
            //     if(val == 'cover') {
            //         this.isShowCoverSize = true;
            //         this.isShowVideoSize = false;
            //     } else {// video
            //         this.isShowVideoSize = true;
            //         this.isShowCoverSize = false;
            //     }
            // },
            onSubmit() {

                if (this.validateForm()) {
                    // debugger
                    let fileData = new FormData();
                    this.form.creative_type = JSON.stringify(this.getKeyByValue(this.materialTypelist, this.materialTypelistCheck)); //素材类型
                    this.form.size = JSON.stringify(this.checkList);
                    this.form.flag = this.flag ? 1 : 2;
                    this.form.resource_type = JSON.stringify(this.getKeyByValue(this.resTypeList, this.resCheckTypeList)); //资源类型
                    this.form.label = this.dynamicTags.join(",");
                    this.form.ad_auditing = parseInt(this.form.ad_auditing);
                    this.form.cre_auditing = parseInt(this.form.ad_auditing);
                    this.form.mimes = this.filetags.join(",");
                    fileData.append("name", this.form.name);
                    if (this.form.logo) {
                        fileData.append("logo", this.form.logo);
                    }
                    fileData.append("creative_type", this.form.creative_type);
                    fileData.append("size", this.form.size);
                    fileData.append("flag", this.form.flag);
                    // fileData.append("label", this.form.label);
                    fileData.append("ad_auditing", this.form.ad_auditing);
                    fileData.append("cre_auditing", this.form.ad_auditing);
                    fileData.append("mimes", this.form.mimes);
                    fileData.append("resource_type", this.form.resource_type);
                    if (this.$route.params.id) {
                        fileData.append("id", this.$route.params.id);
                    }

                     fileData.append("creative_type_content", JSON.stringify({
                    "banner":this.imageItemData.length>0?this.imageItemData:undefined,
                    "native":this.nativeItemData.length>0?this.nativeItemData:undefined,
                    "video-native":this.nativevideoItemData.length>0?this.nativevideoItemData:undefined,
                    "video":this.patchVideoItmeData.length>0?this.patchVideoItmeData:undefined
                }));
                    //console.log(this.form);
                    end.addPlatform(fileData).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.goBack();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                        if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });
                }
            },
            searchDataBykeyword(val) {
                let data = _.filter(this.sourceLeftSizeList, function(item) {
                    return item.indexOf(val) > -1;
                });
                this.leftSizeList = data;
            },
            selectLogo() {
                this.iconLogoShow=true;
                setTimeout(()=>this.$el.querySelector("#fileLogo").click(),300);
            },
            uploadLogo(event) {
                this.iconLogoShow = false;
                // console.log(this.$el.querySelector("#fileLogo").files[0]);
                this.form.logo = this.$el.querySelector("#fileLogo").files[0];
                this.logofile = this.form.logo.name;
                this.isUpload = true;
            },
            clearUpload() {
                this.isUpload = false;
                this.logofile = "";
                this.form.logo = "";
                this.iconLogoShow = true;
            },
            validateForm() {
                if (!this.form.name) {
                    this.$message({
                        message: "请输入计划名称",
                        type: "warning"
                    });
                    return;
                }
                if (!this.logofile) {
                    this.$message({
                        message: "请上传企业logo",
                        type: "warning"
                    });
                    return;
                }
                // if (this.filetags.length == 0) {
                //     this.$message({
                //         message: "请选择文件格式",
                //         type: "warning"
                //     });
                //     return;
                // }
                if (this.resTypeList.length == 0) {
                    this.$message({
                        message: "请选择资源类型",
                        type: "warning"
                    });
                    return;
                }

                              // imageItemData: [],
                // nativeItemData: [],
                // nativevideoItemData: [],
                // patchVideoItmeData: [],


                if(this.imageItemData.length==0&&this.nativeItemData.length==0&&this.nativevideoItemData.length==0&&this.patchVideoItmeData.length==0){

                     this.$message({
                        message: "请添加广告样式",
                        type: "warning"
                    });
                    return;

                }
                // if (this.materialTypelist.length == 0) {
                //     this.$message({
                //         message: "请选择素材类型",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (this.checkList.length == 0) {
                //     this.$message({
                //         message: "请选择尺寸",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (this.filetags.length == 0) {
                //     this.$message({
                //         message: "请选择文件格式",
                //         type: "warning"
                //     });
                //     return;
                // }
                return true;
            },
            clearAll() {
                this.checkList = [];
            },
            querySearch(queryString, cb) {
                // debugger
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.dynamicTags.push(item)
            },
            clearItem() {},
            removeItem(val) {
                this.checkList = _.pull(_.cloneDeep(this.checkList), val);
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            handleCheckedCitiesChange(val) {
                // let removeEelment = _.last(this.checkList);
                // console.log(removeEelment);
                // console.log(this.leftSizeList.length);
                // this.leftSizeList=_.pull(this.leftSizeList,removeEelment);
                // this.checkList=this.leftSizeList;
                // console.log(this.leftSizeList.length);
            },
            loadAll(val) {
                return val;
            },
            addImageItem(val) {
                this.imageData.push(val);
            },
            addNativeImage(val) {
                this.nativeimageData.push(val);
            },
            addVideoPatch(val) {
                this.videoPatch.push(val);
            },
            addNativeVideoData(val) {
                this.nativeVideoData.push(val);
            },
            addcoverData(val) {
                this.coverData.push(val);
            },
            getCheckedImage(val) {
                this.checkedImageItem = val;
            },
            getCheckedNativeImage(val) {
                this.checkedNativeItem = val;
            },
            getCheckedvideoPatch(val) {
                this.checkedVideoItem=val;
            },
            getCheckednativeVideoData(val) {
                this.checkedNativeVideoItem=val;
            },
            getcheckedCoverData(val) {
                this.checkedCoverData=val;
            }
        },
        mounted() {
            this.heightData = this.$refs.imageWrapper.offsetHeight;

            this.setBreadCrumb(this.$route.path.replace("/", ""));
            end.getSizeList().then(res => {
                if (res.data.code == 0) {
                    this.leftSizeList = res.data.data;
                    this.sourceLeftSizeList = res.data.data;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            end.getTagList().then(res => {
                if (res.data.code == 0) {
                    if (res.data.code == 0) {
                        let result = [];
                        _.forEach(res.data.data, function(value, key) {
                            result.push(value.lable);
                        });
                        this.restaurants = this.loadAll(result);
                    }
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            end.getPlatformSize().then(res => {
                if (res.data.code == 0) {
                    let data = res.data.data;
                    _.forEach(data, val => {
                        this.imageData.push(val.width + "*" + val.height);
                    });
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            if (this.$route.params.id) {
                end.getPlatformItem({
                    id: this.$route.params.id
                }).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        this.form.name = data.name;
                        if (data.logo_file_name) {
                            this.logofile = data.logo_file_name;
                            this.isUpload = true;
                        }
                        this.flag = data.flag == 1 ? true : false;
                        this.form.ad_auditing = data.ad_auditing.toString();
                        this.form.cre_auditing = data.cre_auditing.toString();
                        //split
                        this.filetags = data.mimes?data.mimes.split(","):[];
                        this.filetags.length < 1 ? this.addTop = false : this.addTop = true;
                        //this.resTypeList=JSON.parse(data.resource_type);
                        this.resCheckTypeList = this.getValueByKey(this.resTypeList, JSON.parse(data.resource_type));
                        //this.materialTypelist=JSON.parse(data.creative_type);
                        this.materialTypelistCheck = this.getValueByKey(this.materialTypelist, JSON.parse(data.creative_type));
                        this.checkList = JSON.parse(data.size);
                        if (data.label) {
                            this.dynamicTags = data.label.split(",");
                        }

                let adStyleData=JSON.parse(data.creative_type_content);

                this.imageItemData=adStyleData.banner?adStyleData.banner:[];
                this.nativeItemData=adStyleData.native?adStyleData.native:[];
                this.nativevideoItemData=adStyleData["video-native"]?adStyleData["video-native"]:[];
                this.patchVideoItmeData=adStyleData.video?adStyleData.video:[];
                    }

                    console.log( this.nativevideoItemData);
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            }
        },
        components: {
            panel
        },
    }
</script>

<style lang="scss">
    @import "../../../style/mixin";
    .back-list {
        // head style
        .template-hd {
            padding: 16px 0 18px 30px;
            border-bottom: 1px solid $bc;
            @include bg-white($fc);
        } // body style
        .template-bd {
            padding: 20px 0 18px 33px;
            @include bg-white($fc);
            .select-info-tip {
                color: #ff7a81;
                padding: 10px 0 0 16px;
            }
        } // each row style, contain label and input
        .basic-set-row {
            margin-bottom: 10px;
            &:last-child {
                .config-neccessary {
                    margin-top: 12px;
                }
            } // define label and input style
            .neccessary,
            .data-item {
                line-height: 38px;
                height: 38px;
            }
            .data-item,
            .config-title {
                color: $firstc; // padding-right: 4px;
                width: 74px;
            }
            .error-tip {
                padding-left: 23px;
                color: #ff6870;
            }
            .neccessary,
            .config-neccessary {
                color: #ff7a81;
                width: 16px;
                margin-top: 3px;
                text-align: left;
            }
            .el-input {
                width: 240px;
            }
            .el-switch {
                margin: 7px 0 0;
            }
            .upload-control {
                margin-right: 6px;
            } // tabs
            .el-tabs--card>.el-tabs__header {
                border: 0 none;
                margin-bottom: 11px;
            }
            .el-tabs--card>.el-tabs__header .el-tabs__nav,
            .el-tabs--card>.el-tabs__header .el-tabs__item {
                border: 0 none;
            }
            .el-tabs__header .el-tabs__item {
                padding: 0 0 0 9px;
                &:first-child {
                    padding: 0;
                }
            }
            .el-vertical-line {
                margin-left: 9px;
                color: #e1e7f0;
                height: 24px;
            }
            .select-item {
                @include sc(12px, #515974);
                display: inline-block;
                height: 38px;
                line-height: 38px;
                padding: 0 19px;
                border: 1px solid transparent;
                border-radius: 5px;
                float: left;
            }
            .is-active .select-item {
                background-color: #ecf3fb;
                border: 1px solid #6cabff;
                color: #6cabff;
            } //tabs end
            // image wrapper
            .image-wrapper,
            .img-txt-wrapper,
            .origin-video-wrapper,
            .paster-fvideo-wrapper {
                padding-left: 90px;
            } // checkbox basic set row style
            .checkbox-space-adjust {
                font-size: 14px;
                height: 38px;
                line-height: 38px;
                width: 90px;
                .el-checkbox__label{
                    font-size: 14px;
                }
            }
            .margin-bottom-22 {
                margin-bottom: 22px;
            } // material rules
            .el-material-rule {
                float: left;
                position: relative;
                .addItem {
                    display: inline-block;
                    width: 38px;
                    height: 38px;
                    border: 1px solid #6cabff;
                    text-align: center;
                    line-height: 33px;
                    border-radius: 4px;
                    color: #6cabff;
                    font-size: 30px;
                    margin: 0 20px;
                    position: absolute;
                    top: 122px;
                    &:hover {
                        background-color: #f0f6ff;
                    }
                }
                .el-rules {
                    overflow-x: scroll;
                    width: auto;
                    max-height: 379px;
                    margin-left: 78px;
                    border: 1px solid #e1e7f0;
                    border-radius: 5px;
                    .matter-rule-label {
                        height: 38px;
                        line-height: 38px;
                        padding-left: 20px;
                        border-bottom: 1px solid #e1e7f0;
                        @include sc(12px, #515974);
                    }
                    .search-item{
                        height: auto;
                    }
                    h2 {
                        @include sc(12px, #91c0fe);
                        background-color: #f6f8fa;
                        padding: 9px 20px 13px;
                    }
                    li {
                        @include sc(12px, #7f8599);
                        line-height: 28px;
                        position: relative;
                    }
                    .el-icon-close {
                        color: #515974;
                        position: absolute;
                        top: 12px;
                        right: 13px;
                        cursor: pointer;
                    }
                    .orig-rule-bd {
                        // padding-bottom: 43px;
                    }
                }
            }
        }
        .special-select {
            .el-input__suffix {
                display: none;
            }
        } // special tags
        .tags-container {
            .el-select__tags {
                left: 10px;
            }
            .el-tag {
                background-color: rgba(243, 245, 249, 1);
                padding: 0 10px;
                height: 28px;
                line-height: 28px;
                margin: 2px 6px 2px 0;
            }
            .el-select__tags-text {
                color: #6cabff;
            }
            .el-icon-close {
                top: -1px;
                right: -5px;
                color: #6cabff;
                &::before {
                    display: block;
                }
                &:before {
                    content: "\E60F";
                }
            }
            .el-tag__close.el-icon-close {
                background-color: transparent;
            }
        } // back-rule-config style
        .back-rule-config {
            .basic-set-row:first-child {
                margin-bottom: 22px;
            }
            .el-radio__label,
            .el-checkbox__label {
                @include sc(12px, #515974);
            }
            .el-radio+.el-radio {
                margin-left: 15px;
            }
            .el-checkbox+.el-checkbox {
                margin-left: 20px;
            }
            .template-bd {
                padding-bottom: 6px;
            }
            .el-tabs__content {
                float: left;
            }
        } // left image size
        .account-search-wrap {
            width: 240px;
            .el-input {
                width: 100%;
            }
            .account-search-bd {
                height: 290px;
                border: 1px solid #e1e7f0;
                @include bottomLeftRadius(5px);
                @include bottomRightRadius(5px);
                border-top: 0 none;
            } // input search remove bottom radius
            .el-input__inner {
                padding-left: 20px;
                @include bottomLeftRadius(0);
                @include bottomRightRadius(0);
            }
            .adjust-border-radius {
                border-radius: 5px;
            }
            .el-checkbox__label {
                @include sc(12px, #bdbecd);
            }
            .is-checked+.el-checkbox__label {
                @include sc(12px, #515974);
            } // add size
            .add-size {
                @include sc(12px, #6cabff);
                cursor: pointer;
                padding: 13px 0 10px 20px;
            } // check all item
            .check-all-style {
                display: block;
                padding: 1px 0 11px 20px;
            } // ajust button height to 28px
            .special-btn-height {
                height: 28px!important;
                line-height: 28px!important;
            } // set button background color none
            .bg-color-transparent {
                background-color: transparent;
            } // add checkbox style
            .add-checkbox {
                margin-left: 20px!important;
                .el-input,
                .el-input__inner {
                    width: 60px;
                    @extend .special-btn-height;
                }
                .el-input__inner {
                    border-radius: 5px;
                    padding: 0 10px;
                }
                .el-button {
                    width: 18px;
                    padding: 0!important;
                    margin-left: 2px;
                    @extend .special-btn-height;
                }
                .create-new-size,
                .el-icon-check:before {
                    border-color: #6cabff;
                    color: #6cabff;
                    &:hover {
                        @extend .bg-color-transparent;
                    }
                }
                .cancel-new-size,
                .el-icon-close:before {
                    border-color: #ff6870;
                    color: #ff6870;
                    &:hover {
                        @extend .bg-color-transparent;
                    }
                }
            }
        } // search each item
        .search-item {
            height: 36px;
            line-height: 36px;
            padding: 0 20px;
            &:hover,
            &.active {
                background-color: #f6f8fa;
                .el-checkbox__label {
                    color: #515974;
                }
            }
            .el-checkbox {
                margin: 0;
            }
        } // all remove
        .account-list {
            margin-left: 370px;
            position: relative;
            border: 1px solid #e1e7f0;
            width: 240px;
            @include borderRadius(5px);
            .turn-iron {
                @include svgbg("../../../style/image/put/turn.svg");
                width: 20px;
                height: 17px;
                position: absolute;
                top: 50%;
                margin-top: -8px;
                left: -30px;
            }
            .inferior-hd {
                padding: 11px 0 9px 18px;
                font-size: 12px;
                color: #e95058;
                border-bottom: 1px solid #e1e7f0;
                cursor: pointer;
            }
            .account-clear-bd {
                height: 290px;
            }
            .search-item {
                padding: 0 15px 0 19px;
            }
            .account-name {
                @include sc(12px, #515974);
            }
            .account-delete {
                color: #515974;
                float: right;
                cursor: pointer;
            }
        } // account dispatch module end
        .is-confirm {
            padding-left: 30px;
        }
    }
    
   @media screen and (min-width:1920px){
        .back-list .basic-set-row .el-material-rule .el-rules{
            width: 550px;
        }
    }

    @media screen and (min-width:1681px) and (max-width:1920px){
        .back-list .basic-set-row .el-material-rule .el-rules{
            width: 550px;
        }
    }
    @media screen and (min-width:1441px) and (max-width:1680px){
        .back-list .basic-set-row .el-material-rule .el-rules{
            width: 350px;
        }
    }
    @media screen and (min-width:1366px) and (max-width:1440px){
        .back-list .basic-set-row .image-wrapper,
        .back-list .basic-set-row .img-txt-wrapper,
        .back-list .basic-set-row .origin-video-wrapper,
        .back-list .basic-set-row .paster-fvideo-wrapper {
            padding-left: 0;
        }
        .back-list .basic-set-row .el-material-rule .el-rules{
            width: 350px;
        }
    }
    @media screen and (min-width:1200px) and (max-width:1365px){
        .back-list .basic-set-row .image-wrapper,
        .back-list .basic-set-row .img-txt-wrapper,
        .back-list .basic-set-row .origin-video-wrapper,
        .back-list .basic-set-row .paster-fvideo-wrapper {
            padding-left: 0;
        }
        .back-list .basic-set-row .el-material-rule .el-rules{
            width: 280px;
        }
    }
    @media screen and (min-width:1200px) and (max-width:1279px){
        .back-list .basic-set-row .image-wrapper,
        .back-list .basic-set-row .img-txt-wrapper,
        .back-list .basic-set-row .origin-video-wrapper,
        .back-list .basic-set-row .paster-fvideo-wrapper {
            padding-left: 0;
        }
        .back-list .basic-set-row .el-material-rule .el-rules{
            width: 190px;
        }
    }
    @media screen and (min-width:900px) and (max-width:1199px){
        .back-list .basic-set-row .image-wrapper,
        .back-list .basic-set-row .img-txt-wrapper,
        .back-list .basic-set-row .origin-video-wrapper,
        .back-list .basic-set-row .paster-fvideo-wrapper {
            padding-left: 0;
        }
        .back-list .basic-set-row .el-material-rule .addItem{
            display: none;
            margin: 0;
        }
        .back-list .basic-set-row .el-material-rule .el-rules{
            margin-left: 10px;
            width: 150px;
        }
    }
</style>