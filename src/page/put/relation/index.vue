<template>
    <div class="relate-creative-list">
        <el-main>
            <el-row class="relate-creative-content">
                <el-col :span="24" class="margin-bottom-20">
                    <div class="template-hd">筛选项</div>
                    <div class="creative-param">
                        <div class="creative-nav-row c-size clear">
                            <!-- 如果有数据且大于10个，则有可点击显示 -->
                            <template v-if="checkedCities.length&&checkedCities.length>10">
                                <el-collapse v-model="activeNames" @change="handleChange">
                                    <el-collapse-item name="1">
                                        <template slot="title" style="">
                                            <span class="hd left">创意尺寸：</span>
                                            <span class="fold-iron" v-if="checkedCities.length"></span>
                                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="padding-left: 0px;">
                                                <el-checkbox v-for="size in sizeList" :label="size" :key="size">{{size}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </el-collapse-item>
                                </el-collapse>

                            </template>
                            <!-- 如果无数据或小于10个，则没有可点击显示 -->
<template v-else>
    <span class="hd left">创意尺寸：</span>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="padding-left:0px">
        <el-checkbox v-for="size in sizeList" :label="size" :key="size">{{size}}</el-checkbox>
    </el-checkbox-group>
</template>

                        </div>

                        <div class="creative-nav-row c-type clear">
                            <span class="hd left">创意样式：</span>
                            <div class="bd">
                                <el-checkbox :indeterminate="isIndeterminateType" v-model="checkAllType" @change="handleCheckAllChangeType">全选</el-checkbox>
                                <el-checkbox-group v-model="checkedType" @change="handleCheckedTypeChange">
                                    <el-checkbox v-for="style in typeList" :label="style" :key="style">{{style}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <!-- <div class="creative-nav-row c-status clear">
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
                    <div class="creative-btn-control">
                        <div class="input-plan-box">
                            <a href="javascript:void(0)" class="single-link el-link-add" @click="addCreative">
                                <i class="add-iron">+</i>
                                <span class="add-msg">添加创意</span>
                            </a>
                            <!-- <el-button class="mould-name" type="new" @click="addCreative">
    <i class="add-iron">+</i>
    <span class="add-msg">添加创意</span>
</el-button> -->

                            <el-dialog title="添加创意" :visible.sync="dialogTableVisible">
                                <vDialog ref="addCreativePop" @hideDialog="hideDialog" @getList="getList"></vDialog>
                                <!-- <vDialog ref="popDialog" @showbox="toshow" :msg="msg" @hideDialog="hideDialog" @getList="getList"></vDialog> -->
                            </el-dialog>

                            <!-- <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
<el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button> -->
                            <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>

                            <el-button type="click" :class="{'expose-clicked1':isLighten}" @click="thirdPart">修改监测URL</el-button>

                            <!-- <el-button type="click" :class="{'expose-clicked1':isLighten}" @click="dialogFormVisible = true">修改第三方监测</el-button> -->
                            <el-dialog class="revise-monitor" title="修改点击曝光监测" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="修改点击监测：">
<template slot-scope="scope">
    <el-input placeholder="点击监测URL" v-model="form.click_monitor">
    </el-input>
</template>
                                    </el-form-item>
                                    <el-form-item label="修改曝光监测：">
<template slot-scope="scope">
    <el-input placeholder="曝光监测URL" v-model="form.imp_monitor">
    </el-input>
</template>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">

                                    <div class="is-confirm">
                                        <el-button type="confirm" @click="onSubmit">确认</el-button>
                                        <el-button type="cancel" @click="close('dialog')">取消</el-button>
                                    </div>

                                </div>

                            </el-dialog>
                            <el-dialog class="revise-monitor" title="新增点击曝光监测" :visible.sync="dialogFormVisible1">
                                <el-form :model="form">
                                    <el-form-item label="新增点击监测：">
                                            <template slot-scope="scope">
                                                <el-input placeholder="点击监测URL" v-model="form.click_monitor">
                                                </el-input>
                                            </template>
                                     </el-form-item>
                                    <el-form-item label="新增曝光监测：">
                                        <template slot-scope="scope">
                                            <el-input placeholder="曝光监测URL" v-model="form.imp_monitor">
                                            </el-input>
                                        </template>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <div class="is-confirm">
                                        <el-button type="confirm" @click="sumit()">确认</el-button>
                                        <el-button type="cancel" @click="close1()">取消</el-button>
                                    </div>
                                </div>
                            </el-dialog>


                            <el-dialog class="revise-monitor" title="修改点击曝光监测2" :visible.sync="dialogFormVisible2">
                                <el-form :model="form">
                                    <el-form-item label="修改点击监测：">
                                        <template slot-scope="scope">
                                            <el-input placeholder="点击监测URL" v-model="form.click_monitor2">
                                            </el-input>
                                        </template>
                                    </el-form-item>
                                    <el-form-item label="修改曝光监测：">
                                        <template slot-scope="scope">
                                            <el-input placeholder="曝光监测URL" v-model="form.imp_monitor2">
                                            </el-input>
                                        </template>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <div class="is-confirm">
                                        <el-button type="confirm" @click="sumit1()">确认</el-button>
                                        <el-button type="cancel" @click="close2()">取消</el-button>
                                    </div>
                                </div>
                            </el-dialog>
                            <!-- <el-button type="click" class="expose-clicked" @click="modifyClick">修改点击监测</el-button> -->
                        </div>

                          <div class="seek-box">

                            <el-select v-model="AuditSelect" 
                             @change="changeAuditSelect(AuditSelect)"
                             placeholder="审核状态">
                                <el-option
                                v-for="item in AuditSelectOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>


                        </div>
                    </div>
                    <el-table :data="creativeList.data" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column prop="file_path" label="创意预览">
<template slot-scope="scope">
    <div v-if="scope.row.file_type_o == 'mp4' || scope.row.file_type_o == 'flv'|| scope.row.file_type_o == 'swf'">
        <img class="theme-pic" src="../../../style/image/creative/video-img.png" alt="" />
    </div>
    <div v-else>
        <img class="theme-pic" :src="scope.row.file_path" alt="" />
    </div>
    <!-- <img class="theme-pic" :src='scope.row.file_path' alt="" /> -->
</template>
                        </el-table-column>
                        <el-table-column prop="name" label="创意名称">
<template slot-scope="scope">
    {{ scope.row.name }}
    <!-- <el-input v-model="input" placeholder="请输入内容">
                                                                                                                                                                                                    </el-input> -->
</template>
                        </el-table-column>
                        <!-- <el-table-column prop="flag" label="状态">
<template slot-scope="scope">
    <el-switch v-model="scope.row.flag==1?true:false" active-text='关闭' inactive-text='开启' @change="modifyStatus(scope.row.id,scope.row.flag)">
    </el-switch>
</template>
                        </el-table-column> -->
                        </el-table-column>
                        <el-table-column prop="size" label="尺寸">
<template slot-scope="scope">
    {{ scope.row.width }}x{{ scope.row.height }}
</template>
                        </el-table-column>
                        <!-- <el-table-column prop="size" label="类目">
<template slot-scope="scope">
     3333
</template>
                        </el-table-column> -->

 <!-- 审核状态start      -->

 <!-- <el-table-column prop="authority" label="审核状态" >
        <template slot-scope="scope">
            
               <a href="javascript:void(0);" 
                class="link-jump" 
                style="display:inline-block;"
                @click="outAuditCheck(scope.row.id)">
                    {{ scope.row.count || 0 }}/{{ scope.row.countall ||0}}
               </a>
               <el-dialog class="auditStatus auditStatus2" title="审核信息" width="952"  :visible.sync="outAuditVisible">
                <el-table :data="subData.data" style="width: 100%;">
                    <el-table-column label="媒体">
                        <template prop="name" slot-scope="scope">
                                            {{scope.row.plat_id}}
                        </template>
                     </el-table-column>
                     <el-table-column label="审核ID">
                        <template prop="name" slot-scope="scope">
                             {{scope.row.return_id}}
                        </template>
                     </el-table-column>
                     <el-table-column label="状态">
                        <template prop="name" slot-scope="scope">
                             {{scope.row.auth_srauts}}
                        </template>
                        </el-table-column>
                     <el-table-column label="原因">
                        <template prop="name" slot-scope="scope">
                             {{scope.row.remark}}
                        </template>
                        </el-table-column>
                    <el-table-column label="最后更新时间" width="95">
                        <template prop="name" slot-scope="scope">
                             {{scope.row.update_time}}
                        </template>
                    </el-table-column>
                        
                  </el-table>
                 
                  <div class="block">
                    <el-pagination @size-change="handleSizeChangeSub" @current-change="handleCurrentChangeSub" 
                            :current-page="subData&&subData.current_page" :page-sizes="[10, 20, 30, 40]" 
                            :page-size="subData&&subData.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                            :total="subData&&subData.total">
                      </el-pagination>
                </div>
                </el-dialog>
        </template>
 </el-table-column>
  -->
 <!-- 审核状态end      -->




                        </el-table-column>
                        <el-table-column prop="type" label="类型">
<template slot-scope="scope">
    {{ scope.row.style_id }}
</template>
                        </el-table-column>
                        <el-table-column prop="link_type" label="打开类型">
<template slot-scope="scope">
    {{ scope.row.link_type }}
</template>
                        </el-table-column>
                        <el-table-column prop="address" label="点击跳转地址" width="180">
<template slot-scope="scope">
    <!-- link_type为1 -->
    <div class="address-row" v-if="scope.row.link_type=='H5'">
         <span class="add-hd">H5地址：{{scope.row.landing_page}}</span>
        <!-- <span class="add-hd">H5地址：
                 <span v-if="limitChart(scope.row.landing_page).len > 20"> {{limitChart(scope.row.landing_page).str}}</span>
                 <span v-if="limitChart(scope.row.landing_page).len <= 20"> {{scope.row.landing_page}}</span>

                <a  href='javascript:;' 
                 @click="openTxt(scope.row.landing_page)"
                 v-if="limitChart(scope.row.landing_page).len > 20 && limitChart(scope.row.landing_page).isFull">
                 展开1</a>
                <a  href='javascript:;' 
                @click="closeTxt(scope.row.landing_page)" 
                v-if="limitChart(scope.row.landing_page).len > 20 && !limitChart(scope.row.landing_page).isFull">
                收缩2</a>

        </span> -->
    </div>
    <!-- link_type为2 -->
    <div class="address-row" v-if="scope.row.link_type=='APP下载' && scope.row.landing_page">
        <span class="add-hd">Android下载地址：{{ JSON.parse(scope.row.landing_page).landing_page }}</span>
    </div>
    <div class="address-row" v-if="scope.row.link_type=='APP下载' && scope.row.deep_link">
        <span class="add-hd">IOS下载地址：{{ JSON.parse(scope.row.deep_link).landing_page }}</span>
    </div>
    <!-- link_type为3 -->
    <div class="address-row" v-if="scope.row.link_type=='应用直达' && scope.row.androidaddress">
        <span class="add-hd">Android跳转地址：{{ scope.row.androidaddress }}</span>
    </div>
    <div class="address-row" v-if="scope.row.link_type=='应用直达' && scope.row.androidarouse">
        <span class="add-hd">Android应用唤起：{{ scope.row.androidarouse }}</span>
    </div>
    <div class="address-row" v-if="scope.row.link_type=='应用直达' && scope.row.iodaddress">
        <span class="add-hd">iOS跳转地址：{{ scope.row.iodaddress }}</span>
    </div>
    <div class="address-row" v-if="scope.row.link_type=='应用直达' && scope.row.iosarouse">
        <span class="add-hd">iOS应用唤起：{{ scope.row.iosarouse }}</span>
    </div>
</template>
                        </el-table-column>
                        <el-table-column prop="address" label="第三方监测地址" width="270">
<template slot-scope="scope">
    <!-- <a href="javascript:void(0)" class="single-link el-link-add">
            <i class="add-iron">+</i>
            <span class="add-msg">曝光监测</span>
        </a>
        <a href="javascript:void(0)" class="single-link el-link-add">
            <i class="add-iron">+</i>
            <span class="add-msg">点击监测</span>
            
        </a> -->

        <div class="addressBorder" style="border:1px dashed #dcdfe6;height:32px;line-height:28px;text-align:center;width:90%;cursor: pointer!important" 
        @click="xinzeng(scope.row.crc_id,scope.row.advertiser_id)"
        v-if="!scope.row.status">
            <p ><span style="font-size:16px;margin-right:5px;color:#515974">+</span>添加监测URL</p>
        </div>



        <!-- <i style="font-size: 20px;cursor: pointer; position:absolute;top:80%;margin-top:-10px;right:168px "
         class="el-icon-circle-plus-outline"
          v-if="!scope.row.status" 
        ></i> -->




<div  v-if="scope.row.status">

    <div class="address-row clear"  style="width:calc(100% - 20px)">
        <span class="add-hd left">点击监测</span>
        <el-input  type="textarea" 
           v-model="scope.row.click_monitor" 
           style="width:153px"
           autosize placeholder="请输入点击监测地址" 
           resize="none"
           :readonly='currentIsEdit== scope.row.id?false:true'
            >
            {{ scope.row.click_monitor || '' }}
        </el-input>
    </div>
    <div class="address-row clear"  style="width:calc(100% - 20px)">
        <span class="add-hd left">曝光监测</span>
        <el-input type="textarea" 
        style="width:153px"
        v-model="scope.row.imp_monitor" autosize 
         placeholder="请输入曝光监测地址" resize="none" 
         :readonly='currentIsEdit== scope.row.id?false:true'
         >
            {{ scope.row.imp_monitor  || '' }}
        </el-input>
    </div>
    <div style="font-size: 20px;cursor: pointer; position:absolute;top:50%;margin-top: -15px;right:26px ">
        <a href="javascript:void(0);"  
        v-if="scope.row.status"  class="el-icon-revise1" 
        @click="xiugai(scope.row.crc_id,scope.row.advertiser_id, scope.row.click_monitor,scope.row.imp_monitor )"
        ></a>
    </div>
</div>
        
</template>
                        
                    </el-table-column>
                       <el-table-column prop="curStatus" label="审核状态">
                            <template slot-scope="scope">
                                <el-popover 
                                         v-if="scope.row.auth_status == 2" 
                                         placement="top-start"
                                         title="拒绝原因:"
                                         width="300"
                                         trigger="hover"
                                        >
                                        <p style="width:280px;margin:0 auto;word-wrap:break-word;padding:10px;text-align:left">
                                             {{scope.row.auth_remark || '请联系管理员'}}
                                        </p>
                                        <span slot="reference" :class="{active: scope.row.color == 1 && scope.row.countall !=0}"
                                         style="color: #6cabff" >
                                        {{ scope.row.curStatus }} <img src="../../../style/image/put/examNo.png"/>
                                         </span> 
                                         
                            </el-popover>

                             <span v-else-if="scope.row.auth_status == 1 "  :class="{active: scope.row.color == 1 && scope.row.countall !=0}">
                                <a style="color:#6cabff"  href="javascript:void(0);" class="link-jump"
                                    @click="outCheck(scope.row.id,scope.row.auth_status)">{{ scope.row.curStatus }} </a>
                            </span>    
                             <span  
                                    v-else
                                    class="link-jump"
                                    @click="outCheck(scope.row.id,scope.row.auth_status)">
                                    {{scope.row.curStatus}}
                             </span>

                                <el-dialog class="auditStatus reDialog"
                                  title="审核信息" width="952" 
                                  :show-close=true
                                 :visible="outAuditVisible" 
                                 :modal-append-to-body="false"
                                 @close="close3"
                                 >
                                        <el-table :data="subData.data" style="width: 100%;">
                                            <el-table-column label="媒体">
                                                <template prop="name" slot-scope="scope">
                                                                    {{scope.row.plat_id}}
                                </template>
                             </el-table-column>
                             <el-table-column label="审核ID">
                                <template prop="name" slot-scope="scope">
                                    {{scope.row.return_id}}
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template prop="name" slot-scope="scope">
                                    {{scope.row.auth_srauts}}
                                </template>
                             </el-table-column>
                            <el-table-column label="原因">
                                <template prop="name" slot-scope="scope">
                                    {{scope.row.remark}}
                                </template>
                            </el-table-column>
                            <el-table-column label="最后更新时间" width="95">
                                <template prop="name" slot-scope="scope">
                                    {{scope.row.update_time}}
                                </template>
                            </el-table-column>
             
            </el-table>
    
        </el-dialog>

                                        
                                </template>

                        </el-table-column>
                      
                        <el-table-column prop="date" label="上传日期" width="90">
<template slot-scope="scope">
    {{ scope.row.create_time }}
</template>
                    </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="creativeList.current_page" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="creativeList.total">
                            </el-pagination>
                        </div>
                </el-col>
            </el-row>
        </el-main>
    </div>

</template>

<script>
import {
    put,end
} from "../../../service/index";
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import vDialog from "./dialog";
export default {
    data: function () {
        return {
             //审核状态下拉框
                AuditSelect:'0',
                 AuditSelectOptions: [{
                        value: '0',
                        label: '请选择'
                        }, {
                        value: '1',
                        label: '待内审'
                        }, {
                        value: '2',
                        label: '内审通过'
                        }, {
                        value: '3',
                        label: '内审不通过'
                        }, {
                        value: '4',
                        label: '外审通过'
                        }, {
                        value: '5',
                        label: '外审拒绝'
                        }
               ],
            activeNames: "",
            // 审核状态
            auditTableVisible: false,
            auditList: [{
                name: '',
                simplename: '',
                remark: ''
            }],
            // 修改曝光监测
            dialogFormVisible: false,
            // 新增曝光监测
            dialogFormVisible1: false,
             // 单一曝光监测
            dialogFormVisible2: false,
            //创意尺寸
            checkAll: false,
            checkedCities: [],
            sizeList: [],
            isIndeterminate: false,
            //创意类型
            checkAllType: false,
            checkedType: [],
            //typeList: ["Banner", "Video", "Native"], //类型集合 1banner 2video 3native
             typeList: ['图片','图文','组图','视频信息流','短视频'], 
            isIndeterminateType: false,
            //创意状态
            checkAllState: false,
            checkedState: [],
            stateList: ["开启", "关闭"], //状态集合 1开启 2 关闭
            isIndeterminateState: false,
            options: [{
                value: "1",
                label: "开启"
            },
            {
                value: "2",
                label: "关闭"
            }
            ],
            value: "1",
            creativeList: [],
            tableData: [{
                name: "系统管理员",
                status: "关",
                num: "17",
                authority: "10/35",
                date: "2016-05-02 16:51:08"
            }],
            currentPage4: "4",
            dialogTableVisible: false,
            multipleSelection: [],
            pageSize: 10,
            isLighten: false,
            form: {
                //多值修改监测URL
                imp_monitor: "",
                click_monitor: "",

                //单个修改监测URL
                imp_monitor2: "",
                click_monitor2: "",


            },
            currentIsEdit: "",
            msg: "",
            tempID:null,
            tempad_id:null,

            //审核状态的弹框
             outAuditVisible: false,
             subData:[],//审核状态数据
            pageSizeSub: 10,
            currentPageSub: 1,
            findDetailVisible: false,

            
        };
    },
    components: {
        vDialog
    },
    mounted () {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        
        //已选择创意尺寸列表
        put
            .creatsizelist({
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                // ad_id: 26,
                // ca_id: 29
            })
            .then(res => {
                if (res.data.code == 0) {
                    this.sizeList = res.data.data;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
        this.getList({
            ad_id: this.$route.params.adId,
            ca_id: this.$route.params.planId,
            auth:this.AuditSelect,
            // ad_id: 26,
            // ca_id: 29
        });
    },
   
    updated () {
        // console.log(this.$refs.addCreativePop);
    },
    computed: {
        ...mapState({
            currentCheckedAd: "currentCheckedAd",
        }),
        statecurrentCheckedAd () {
            return this.$store.state.currentCheckedAd;
        },
    },
    watch: {
        // statecurrentCheckedAd () {
        //     this.$router.go(-1);
        // }
    },
    methods: {
        //点击跳转地址的字符限制
        openTxt(str){

        },
        closeTxt(str){

        },
        changeAuditSelect(val){
                console.log(val)
                this.AuditSelect = val;//审核状态
                //出发重新进行渲染列表
        
                 this.getList({
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                    auth:this.AuditSelect,
                   });

        },
        limitChart(str){
              var realLength = 0, len = str.length, charCode = -1,isFull=false;
              for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) 
                   realLength += 1;
                else
                   realLength += 2;
              }           
              if(realLength > 20){
                  str = str.substring(0,20)+'...';
                  isFull = true;
              }
              return {
                  str:str,
                  len:realLength,
                  isFull:isFull
                }
              ;
        },
        
        outCheck(val,curStatus) {
           //debugger;
           if(curStatus==1){
                this.outAuditVisible = true;
              
                end.materialInfo({
                    creative_id: val
                }).then(res => {
                    
                    if (res.data.code == 0) {
                        console.log(res.data.data);
                        this.subData = res.data.data;
                        console.log(this.subData)
                    } else {
                        this.$message.error(res.data.msg);
                        this.outAuditVisible = false;
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
        }
            },

        //  outAuditCheck(val) {
             
        //         this.outAuditVisible = true;
        //         end.materialInfo({
        //             creative_id: val,
        //         }).then(res => {
        //            if (res.data.code == 0) {
        //                 this.isLighten = false;
        //                 this.batchAuditVisible = false;
        //                 this.subData=res.data.data;
        //             } else {
        //                 this.$message.error(res.data.msg);
        //                 this.outAuditVisible = false;
        //             }
        //             if (res.data.code == -1) {
        //                 this.$router.push({
        //                     path: "/login"
        //                 });
        //             }
        //         });
        //     },

    //审核状态弹窗start
         handleSizeChangeSub(val) {
                this.pageSizeSub = val;
                this.getList({
                    page: 1,
                    pagesize: this.pageSizeSub,
                     auth:this.AuditSelect,
                });
         },
          getList(data) {


                end.getCustomeList(data).then(res => {
                    if (res.data.code == 0) {
                        
                        this.listData = res.data.data;
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
          handleCurrentChangeSub(val) {
                this.getList({
                    page: val,
                    pagesize: this.pageSizeSub,
                     auth:this.AuditSelect,
                });
                this.currentPageSub = val;
            },
           //审核状态弹窗end


        ...mapActions(["setBreadCrumb"]),
        //创意尺寸
        handleCheckAllChange (val) {
            this.checkedCities = val ? this.sizeList : [];
            this.isIndeterminate = false;
            this.getList({
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                // ad_id: 26,
                // ca_id: 29,
                size: this.checkedCities,
                type: this.gitTypeIds(this.checkedType),
                flag: this.getStateValue(this.checkedState),
                 auth:this.AuditSelect,
            });
        },
        handleCheckedCitiesChange (value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.sizeList.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.sizeList.length;
            this.getList({
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                // ad_id: 26,
                // ca_id: 29,
                 auth:this.AuditSelect,
                size: value,
                type: this.gitTypeIds(this.checkedType),
                flag: this.getStateValue(this.checkedState)
            });
        }, //创意类型
        handleCheckAllChangeType (val) {
            // debugger
            this.checkedType = val ? this.typeList : [];
            this.isIndeterminateType = false;
            this.getList({
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                 auth:this.AuditSelect,
                // ad_id: 26,
                // ca_id: 29,
                type: this.gitTypeIds(this.checkedType),
                size: this.checkedCities,
                flag: this.getStateValue(this.checkedState)
            });
        },
        handleCheckedTypeChange (value) {
            let checkedCount = value.length;
            this.checkAllType = checkedCount === this.typeList.length;
            this.isIndeterminateType =
                checkedCount > 0 && checkedCount < this.typeList.length;
            this.getList({
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                 auth:this.AuditSelect,
                type: this.gitTypeIds(value),
                size: this.checkedCities,
                flag: this.getStateValue(this.checkedState)
            });
        },
        modifyStatus (val, flag) {
            // debugger
            if (flag == "1") {
                put
                    .flagCloseajax({
                        id: [val],
                        ad_id: this.$route.params.adId,
                        ca_id: this.$route.params.planId,
                    }).then(res => {
                        if (res.data.code == 0) {
                            //this.loading2 = false;
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                            this.getList({
                                page: 1,
                                pagesize: 10,
                                 auth:this.AuditSelect,
                                ad_id: this.$route.params.adId,
                                ca_id: this.$route.params.planId,
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }
                    });
            } else {
                // debugger
                put
                    .flagOpenajax({
                        id: [val],
                        ad_id: this.$route.params.adId,
                        ca_id: this.$route.params.planId,
                    }).then(res => {
                        if (res.data.code == 0) {
                            //this.loading2 = false;
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                            this.getList({
                                page: 1,
                                pagesize: 10,
                                 auth:this.AuditSelect,
                                ad_id: this.$route.params.adId,
                                ca_id: this.$route.params.planId,
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }
                    });
            }
        },
        isActiveCurrent (val) {
            this.currentIsEdit = val;
            // console.log(this.currentIsEdit);
        },
        editItem (data) {
            put.campeditImpCl(data).then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    });
                    this.getList({
                         auth:this.AuditSelect,
                        ad_id: this.$route.params.adId,
                        ca_id: this.$route.params.planId,
                        flag: this.getStateValue(this.checkedState)
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: "error"
                    });
                }
            });
        },
        gitTypeIds (value) {
            if (value.length == 0) {
                return;
            }
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
            //类型集合 1banner 2video 3native
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
        //创意状态
        handleCheckAllChangeState (val) {
            this.checkedState = val ? this.stateList : [];
            this.isIndeterminateState = false;
            this.getList({
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                 auth:this.AuditSelect,
                // ad_id: 26,
                // ca_id: 29,
                flag: this.getStateValue(this.checkedState),
                size: this.checkedCities,
                type: this.gitTypeIds(this.checkedType),
            });
        },
        handleCheckedStateChange (value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.stateList.length;
            this.isIndeterminateState =
                checkedCount > 0 && checkedCount < this.sizeList.length;
            this.getList({
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                 auth:this.AuditSelect,
                // ad_id: 26,
                // ca_id: 29,
                flag: this.getStateValue(value),
                size: this.checkedCities,
                type: this.gitTypeIds(this.checkedType),
            });
        },
        getStateValue (value) {
            if (value.length == 0) {
                return;
            }
            let sourceData = [{
                key: "开启",
                value: "1"
            }, {
                key: "关闭",
                value: "2"
            }]; //状态集合 1开启 2 关闭
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
        handleSizeChange (val) {
            this.pageSize = val;
            this.getList({
                page: 1,
                pagesize: this.pageSize,
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                 auth:this.AuditSelect,
                 
                size: value,
                type: this.gitTypeIds(this.checkedType),
            });
        },
        handleCurrentChange (val) {
            this.getList({
                page: val,
                pagesize: this.pageSize,
                ad_id: this.$route.params.adId,
                ca_id: this.$route.params.planId,
                type: this.gitTypeIds(this.checkedType),
            });
        },
        handleChange (val) { },
        modifyView () {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请选择操作记录",
                    type: "warning"
                });
                return;
            }
        },
        modifyClick () {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请选择操作记录",
                    type: "warning"
                });
                return;
            }
        },
        open () {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请选择操作记录",
                    type: "warning"
                });
                return;
            }
            put
                .flagOpenajax({
                    id: this.getIds(this.multipleSelection),
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList({
                            ad_id: this.$route.params.adId,
                            ca_id: this.$route.params.planId,
                            // ad_id: 26,
                            // ca_id: 29
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
        close (key) {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请选择操作记录",
                    type: "warning"
                });
                return;
            }
            if (key == 'dialog') {
                this.dialogFormVisible = false;
                // debugger
                this.form.click_monitor = "";
                this.form.imp_monitor = "";
                return;
            }
            put
                .flagCloseajax({
                    id: this.getIds(this.multipleSelection),
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId
                    // ad_id: 26,
                    // ca_id: 29
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList({
                            ad_id: this.$route.params.adId,
                            ca_id: this.$route.params.planId,
                            // ad_id: 26,
                            // ca_id: 29,
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
        close1(){
            this.dialogFormVisible1 = false;
            return;
        },
        close2(){
            this.dialogFormVisible2= false;
             return;
        },
        close3(){
            this.outAuditVisible=false;
            return;
        },
        del () {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请选择操作记录",
                    type: "warning"
                });
                return;
            }
             this.$confirm('是否删除本条创意！确认删除？', '', {
                    customClass: 'customDeleteFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'delete-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {	
            put
                .campDelect({
                    id: this.getIds(this.multipleSelection),
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList({
                            ad_id: this.$route.params.adId,
                            ca_id: this.$route.params.planId,
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
        
        
        
                })
        
        
        },
        thirdPart () {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请选择操作记录",
                    type: "warning"
                });
                return;
            } else {
               
                this.dialogFormVisible = true
            }
        },
        xinzeng (id,ad_id) { 
            this.dialogFormVisible1 = true;
            this.tempID=id;
            this.tempad_id=ad_id;
        },
        xiugai (id,ad_id,click,imp) { 
            this.dialogFormVisible2= true;
            this.tempID=id;
            this.tempad_id=ad_id;
            if(click){
                this.form.click_monitor2 = click
            }
            if(imp){
                this.form.imp_monitor2 = imp
            }

        },
        sumit(){
             if (!this.form.click_monitor && !this.form.imp_monitor) {
                this.$message({
                    message: "不能两者都为空",
                    type: "error"
                });
                return;
            }

            let id = [];
            id.push(this.tempID);

            let ad_id = [];
            ad_id.push(this.tempad_id);

            let click = [];
            click.push(this.form.click_monitor);
            let imp = [];
            imp.push(this.form.imp_monitor);


            let postData = {
                'click_monitor': click,
                'imp_monitor':imp,
                'id':id,
                'ad_id':this.tempad_id
            }

            for(var attr in postData){
                if(attr == 'click_monitor'  &&  postData[attr][0] == ''){
                    delete postData['click_monitor']
                }
                 if(attr == 'imp_monitor'  &&  postData[attr][0] == ''){
                    delete postData['imp_monitor']
                }
            }

              put.campeditImpCl(postData).then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.dialogFormVisible1 = false;
                    this.form.click_monitor = "";
                    this.form.imp_monitor = "";
                    // debugger;
                    this.getList({
                        ad_id: this.$route.params.adId,
                        ca_id: this.$route.params.planId,
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
        sumit1(){
             if (!this.form.click_monitor2 && !this.form.imp_monitor2) {
              
                this.$message({
                    message: "不能两者都为空",
                    type: "error"
                });
                return;
            }
            let id = [];
            id.push(this.tempID);
            let ad_id = [];
            ad_id.push(this.tempad_id);
          
            let click = [];
            click.push(this.form.click_monitor2);
            let imp = [];
            imp.push(this.form.imp_monitor2);
           let postData = {
                'click_monitor': click,
                'imp_monitor':imp,
                'id':id,
                'ad_id':this.tempad_id
            }
            for(var attr in postData){
                if(attr == 'click_monitor'  &&  postData[attr][0] == ''){
                    delete postData['click_monitor']
                }
                 if(attr == 'imp_monitor'  &&  postData[attr][0] == ''){
                    delete postData['imp_monitor']
                }
            }
              put.campeditImpCl(postData).then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.dialogFormVisible2 = false;
                    this.form.click_monitor2 = "";
                    this.form.imp_monitor2 = "";
                    // debugger;
                    this.getList({
                        ad_id: this.$route.params.adId,
                        ca_id: this.$route.params.planId,
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
        auditState () {
            this.auditTableVisible = true
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
            // buttons light
            if (this.multipleSelection.length != 0) {
                this.isLighten = true;
            } else {
                this.isLighten = false;
            }
        },
        getIds (value) {
            let result = [];
            for (var j = 0; j < value.length; j++) {
                result.push(value[j].id);
            }
            return result;
        },
        getCrcId(value){
           let result = [];
            for (var j = 0; j < value.length; j++) {
                result.push(value[j].crc_id);
            }
            return result;
        },
        getList (data) {
         // debugger;
            put.campcreatlist(data).then(res => {
                if (res.data.code == 0) {
                    
                    let data = res.data.data.data;
                    let result = [];
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].link_type == "1") {
                            data[j].link_type = "H5"
                        }
                        if (data[j].link_type == "2") {
                            data[j].link_type = "APP下载"
                        }
                        if (data[j].link_type == "3") {
                            data[j].link_type = "应用直达";
                            if(data[j].deep_link){
                                let ios = JSON.parse(data[j].deep_link);
                                data[j].iodaddress = ios.landing_page;
                                data[j].iosarouse = ios.deep_link;
                            }
                            if(data[j].landing_page){
                                 let android = JSON.parse(data[j].landing_page);
                                 data[j].androidaddress = android.landing_page;
                                 data[j].androidarouse = android.deep_link;
                            }     
                        }

                        //参数用例
                       // data[j].landing_page =   data[j].landing_page.substring(0,16)+'...';



                        result.push(data[j]);
                    }
                    res.data.data.data.forEach(ele => {
                            if(ele.auth_status == 0){
                                ele.curStatus="待内审"
                            }
                            if(ele.auth_status == 2){
                                ele.curStatus="内审未通过"
                            }
                            if(ele.auth_status == 1){
                                if(ele.countAll == 0){
                                    ele.curStatus="内审通过"
                                }else{
                                    ele.curStatus=ele.count+'/'+ele.countAll
                                }
                            }
                        });
                    res.data.data.data = result;
                    this.creativeList = res.data.data;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
        },
        addCreative () {
            this.dialogTableVisible = true;
            setTimeout(() => {
                this.$refs.addCreativePop.getDialogList({
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                })
            }, 10)
        },
        hideDialog (val) {
            this.dialogTableVisible = val;
        },
        onSubmit () {
            if (!this.form.click_monitor && !this.form.imp_monitor) {
                this.$message({
                    message: "不能两者都为空",
                    type: "error"
                });
                return;
            }

            let click = [];
            click.push(this.form.click_monitor);
            let imp = [];
            imp.push(this.form.imp_monitor);


            put.campeditImpCl({
                click_monitor: click,
                imp_monitor: imp,
                id: this.getCrcId(this.multipleSelection),
                'ad_id':parseInt(this.$route.params.adId)
            }).then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.dialogFormVisible = false;
                    this.form.click_monitor = "";
                    this.form.imp_monitor = "";
                    // debugger;
                    this.getList({
                        ad_id: this.$route.params.adId,
                        ca_id: this.$route.params.planId,
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
    }
};
</script>

<style lang="scss">
    @import "../../../style/mixin"; // 创意列表-共用样式
    @import "../../../style/common"; // 创意列表-共用样式
    .relate-creative-list {
        .el-main {
            background-color: transparent;
        }
        .el-col-24 {
            background-color: #fff;
        }
        .choose-ad {
            font-size: 14px;
            color: #515974;
            margin-right: 5px;
        }
        .creative-nav-row {
            padding: 14px 0;
            position: relative;
        }
        .el-checkbox {
            float: left;
            margin-right: 21px;
        }
        .creative-btn-row {
            position: relative;
            padding: 10px 0;
        }
        .search-input {
            position: absolute;
            width: 182px;
            right: 0px;
            top: 0px;
        }
        .theme-pic {
            width: 60px;
            height: 60px;
        }
        .template-hd {
            padding: 17px 0 18px 30px;
            border-bottom-width: 1px;
        }
        .el-checkbox__label {
            color: #515974;
        }
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #7f8599;
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
            } //修改箭头样式
            .fold-iron {
                background-color: #6cabff;
                position: absolute;
                top: 25px;
                right: 30px;
                height: 28px;
                width: 39px;
                padding-left: 4px;
                @include borderRadius(5px);
            }
            .el-checkbox-group {
                //padding: 0 70px 0 78px;
            }
            .el-collapse-item__arrow {
                float: none;
                position: absolute;
                top: 16px;
                right: 35px;
                z-index: 20;
                color: #ffffff;
            }
        }
        .el-table {
            th:first-child,
            td:first-child {
                padding-left: 16px;
            }
            th:nth-child(4),
            td:nth-child(4) {
                text-align: center;
            }
            .single-link {
                border: 2px dashed #eff0f1;
                .add-iron {
                    @include sc(18px, #e5e6e7);
                    font-weight: bold;
                }
                .add-msg {
                    @include sc(12px, #515974);
                }
            }
            .address-row {
                .el-textarea {
                    width: 186px;
                    margin-bottom: 5px;
                }
                .add-hd {
                    color: #515974;
                    margin: 4px 10px 0 0;
                }
            }
            .link-jump {
                color: #6cabff;
                &:hover {
                    text-decoration: underline;
                }
            }
            .auditList {
                .el-dialog {
                    // box-shadow: 
                }
                .el-dialog__headerbtn {
                    display: inline;
                }
                .el-dialog__footer {
                    padding: 0;
                }
                .el-pagination {
                    text-align: left;
                }
            }
        }
        .el-collapse-item__header {
            height: 32px;
            line-height: 32px;
            overflow: hidden;
            border-bottom: 0 none; //去除底部线条
            .hd {
                line-height: 32px;
            }
        }
        .el-collapse {
            border: 0 none;
        }
        .el-collapse-item__wrap {
            border-bottom: none;
        }
        .el-collapse-item__header.is-active {
            height: 64px;
            -webkit-transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
            transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
        }
        .el-collapse-item__content {
            padding-bottom: 0;
        }
    } // 创意关联列表弹窗
    .relate-creative-list {
        .revise-monitor {
            .el-dialog {
                width: 420px;
            }
            .el-dialog__body {
                padding: 20px 30px 0 30px;
            }
            .el-input {
                width: 240px;
                display: inline-block;
            }
            .el-form-item {
                margin-bottom: 12px;
            }
            .is-confirm {
                text-align: left;
                background-color: #ffffff;
                padding-top: 7px;
            }
        }
    } // 只创意列表
    .relate-creative-content {
        .creative-param {
            .hd {
                margin-right: 19px;
            }
        }
        .template-hd {
            padding: 10px 0 10px 30px;
        }
        .creative-btn-control {
            padding: 20px 0 20px 30px;
            position: relative;
        }
        .single-link {
            width: 108px;
            padding: 0 10px 0 8px;
            vertical-align: -3px;
            margin-right: 9px;
        }
        .el-button+.el-button {
            margin-left: 6px;
        }
        .seek-box {
            position: absolute;
            right: 30px;
            top: 21px;
            .el-input {
                width: auto;
            }
            .el-input--suffix {
                margin-right: 8px;
            }
        }
        .creative-btn-row {
            padding-top: 0;
        }
    }
    @media screen and (max-width:1680px) {}
    @media screen and (max-width:1366px) {
        .relate-creative-content .creative-btn-control .add-iron {
            float: left;
            margin: -2px 6px 0 4px;
        }
    }
     .reDialog{
        .el-dialog__headerbtn{
            display: block !important;
        }
    }
      .el-icon-revise1 {
            cursor: pointer;
            float: right;
            background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            vertical-align: -4px;
        }
        .el-icon-revise1:hover{
            background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
         }
         .addressBorder:hover{
             border-color: #6cabff
         }
         .neishen{
            margin-left: -32px ;
        }

      .reDialog .el-icon-close:before {
             content: "\E60F" !important;
}
.active{
    a{
            color:#e95058 !important;
    }
            
            }
</style>