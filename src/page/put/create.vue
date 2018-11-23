<template>
    <!-- 投放管理创建 -->
    <div class="input-create-set">
        <el-main>
            <el-form ref="creativeForm" :model="creativeForm" label-width="">
                <div id="upperPart" class="clear">
                    <!-- 基本设置 start -->
                    <el-col :span="24">
                        <h1 class="template-hd">基本设置</h1>
                        <div class="template-bd border-bottom-2">
                            <div class="basic-set-row plan-name">
                                <i class="neccessary left">*</i>
                                <label for="" class="data-item left">计划名称：</label>
                                <el-input placeholder="20字以内，汉字数字或英文字母" v-model="creativeForm.name"></el-input>
                            </div>
                            <div class="basic-set-row">
                                    <i class="neccessary left"></i>
                                    <label for="" class="data-item left">投放周期：</label>
                                    <el-tabs type="card" v-model="activeTabDate" @tab-click="tabChangeDate(activeTabDate)">
                                        <el-tab-pane name="5-1-1">
                                            <span slot="label">
                                                                    <span class="select-item ">持续投放</span>
                                            <i class="el-vertical-line">|</i>
                                            </span>
                                        </el-tab-pane>
                                        <el-tab-pane name="5-2-1" class="margin-bottom-15">
                                            <span slot="label">
                                                                    <span class="select-item">设置周期</span>
                                            <i class="el-vertical-line"></i>
                                            </span>
                                            <el-date-picker class="close-icon-adjust" v-model="timePeriod" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate" style="left:100px">
                                            </el-date-picker>
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                            <div class="basic-set-row">
                                    <i class="neccessary left"></i>
                                    <label for="" class="data-item left">投放时段：</label>
                                         <!-- 投放时段 -->
                                <div >
                                      <vTimeSlot ref="timeslot"></vTimeSlot>
                                </div>
                                </div>
                        </div>
                    </el-col>
                    <!-- 投放范围 start -->
                    <el-col :span="24" class="input-area">
                        <h1 class="template-hd">投放范围</h1>
                        <div class="template-bd border-bottom-2">
                            <el-checkbox-group v-model="checkedImages">
                                <el-checkbox v-for="img in putImages" :label="img.id" :key="img.id">
                                    <img :src="img.logo" alt="" class="put-img" width="88" height="58" />
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <!-- 投放范围 end -->
                    <!-- 控量与出价 start -->
                    <el-col :span="24" class="input-create-bd">
                        <h1 class="template-hd">控量与出价</h1>
                        <div class="template-bd control-price border-bottom-2">
                            <!-- 预算控制 -->
                            <div class="basic-set-row">
                                <label for="" class="data-item left">预算控制：</label>
                                <el-tabs type="card" v-model="activeNamebudget" @tab-click="handleClick">
                                    <el-tab-pane name="1-1">
                                        <span slot="label">
                                                    <span class="select-item ">无限制</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                    </el-tab-pane>
                                    <el-tab-pane name="1-2">
                                        <span slot="label">
                                                    <span class="select-item">周期内总预算</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                        <div class="per-unit" :class="{ 'error-border': isWeek == 'week'}">
                                            <div class="unit-setting i-yellow">
                                                <!-- <el-input type="number" v-model="week" @change="changeWeek"></el-input> -->
                                                <el-input placeholder="请填写大于零的数字，精确到0.01" v-model="week" @change="changeWeek" @blur="checkYuan(week,'week')"></el-input>
                                                <span class="unit meta">元</span>
                                            </div>
                                            <span class="error-tip">请填写大于零的数字，精确到0.01</span>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane name="1-3">
                                        <span slot="label">
                                                    <span class="select-item">每日预算上限</span>
                                        <i class="el-vertical-line"></i>
                                        </span>
                                        <div class="per-unit" :class="{ 'error-border': isDate == 'date'}">
                                            <div class="unit-setting i-yellow">
                                                <el-input placeholder="请填写大于零的数字，精确到0.01" v-model="date" @change="changeDate" @blur="checkYuan(date,'date')"></el-input>
                                                <span class="unit meta">元</span>
                                            </div>
                                            <span class="error-tip">请填写大于零的数字，精确到0.01</span>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                            <!-- 投放量级上限 -->
                            <div class="basic-set-row">
                                <label for="" class="data-item left">投放量级上限：</label>
                                <el-tabs type="card" v-model="activeNamelimit" @tab-click="handleClick">
                                    <el-tab-pane name="2-1">
                                        <span slot="label">
                                                    <span class="select-item">无限制</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                    </el-tab-pane>
                                    <el-tab-pane name="2-2">
                                        <span slot="label">
                                                    <span class="select-item">每日曝光上限</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                        <div class="per-unit" :class="{ 'error-border': isMrExpose == 'mrexpose'}">
                                            <div class="unit-setting i-blue">
                                                <el-input placeholder="请填写大于零的整数" v-model="creativeForm.imp_limit" @blur="checkNumber(creativeForm.imp_limit,'mrexpose')"></el-input>
                                                <span class="unit">次</span>
                                            </div>
                                            <span class="error-tip">请填写大于零的整数</span>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane name="2-3">
                                        <span slot="label">
                                                    <span class="select-item">每日点击上限</span>
                                        <i class="el-vertical-line"></i>
                                        </span>
                                        <div class="per-unit" :class="{ 'error-border': isMrClick == 'mrclick'}">
                                            <div class="unit-setting i-blue">
                                                <el-input placeholder="请填写大于零的整数" @blur="checkNumber(creativeForm.click_limit,'mrclick')" v-model="creativeForm.click_limit"></el-input>
                                                <span class="unit">次</span>
                                            </div>
                                            <span class="error-tip">请填写大于零的整数</span>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                            <!-- 品次控制 -->
                            <div class="basic-set-row">
                                <label for="" class="data-item left">频次控制：</label>
                                <el-tabs type="card" v-model="activeNamefrequency" @tab-click="handleClick">
                                    <el-tab-pane name="3-1">
                                        <span slot="label">
                                                    <span class="select-item">无限制</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                    </el-tab-pane>
                                    <el-tab-pane name="3-2">
                                        <span slot="label">
                                                    <span class="select-item">按曝光控制</span>
                                        <i class="el-vertical-line"></i>
                                        </span>
                                        <div class="set-time-item">
                                            <!-- <p class="el-inferior-title">单人频次不超过</p> -->
                                            <el-select v-model="frequency" placeholder="请选择" @change="frequencyHour">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <div class="per-unit" :class="{ 'error-border': isInputDh == 'inputDh'}">
                                                <div class="unit-setting i-blue">
                                                    <el-input placeholder="请填写大于零的整数" v-model="frequencyInputDh" @change="frInputDh" @blur="checkNumber(frequencyInputDh,'inputDh')"></el-input>
                                                    <span class="unit">次</span>
                                                </div>
                                                <span class="error-tip">请填写大于零的整数</span>
                                            </div>
                                        </div>
                                        <!-- <div class="set-second-row margin-bottom-10">
                
                                                                    <div class="per-unit" :class="{ 'error-border': isInputWeek == 'inputWeek'}">
                
                                                                        <div class="unit-setting i-blue">
                
                                                                            <el-input placeholder="请填写大于零的整数" v-model="frequencyInputWeek" @change="frInputWeek" @blur="checkNumber(frequencyInputWeek,'inputWeek')"></el-input>
                
                                                                            <span class="unit">次</span>
                
                                                                        </div>
                
                                                                        <span class="error-tip">请填写大于零的整数</span>
                
                                                                    </div>
                
                                                                </div> -->
                                    </el-tab-pane>
                                    <!-- <el-tab-pane name="3-3">
                
                                                                <span slot="label">
                
                                                                                    <span class="select-item">按点击控制</span>
                
                                                                <i class="el-vertical-line"></i>
                
                                                                </span>
                
                                                                <div class="set-time-item">
                
                                                                    <p class="el-inferior-title">单人频次不超过</p>
                
                                                                    <el-select v-model="frequency" placeholder="请选择" @change="frequencyHour">
                
                                                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                
                                                                        </el-option>
                
                                                                    </el-select>
                
                                                                    <div class="per-unit" :class="{ 'error-border': isInputDh == 'inputDh'}">
                
                                                                        <div class="unit-setting i-blue">
                
                                                                            <el-input placeholder="请填写大于零的整数" v-model="frequencyInputDh" @change="frInputDh" @blur="checkNumber(frequencyInputDh,'inputDh')"></el-input>
                
                                                                            <span class="unit">次</span>
                
                                                                        </div>
                
                                                                        <span class="error-tip">请填写大于零的整数</span>
                
                                                                    </div>
                
                                                                </div>
                
                                                            </el-tab-pane> -->
                                </el-tabs>
                            </div>

                            <!-- 投放速度 start-->
                             <div class="basic-set-row">
                                <label for="" class="data-item left">投放速度：</label>


                                <el-tabs type="card" v-model="activeSpeed" @tab-click="handleSpeedClick" class="speedStyle">
                                    <el-tab-pane name="77-77">
                                        <span slot="label">
                                                    <span class="select-item">尽快投放</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                        
                                    </el-tab-pane>
                                    <el-tab-pane name="77-78" :disabled="SpeedDisabled">
                                        <span slot="label">
                                                    <span class="select-item">均匀投放</span>
                                        <i class="el-vertical-line"></i>
                                        </span>
                                       
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                            <!-- 投放速度 end-->




                            <!-- 最高出价 -->
                            <div class="basic-set-row">
                                <label for="" class="data-item left">最高出价：</label>
                                <el-tabs type="card" v-model="activeNamemaxt" @tab-click="handleClick">
                                    <!-- <el-tab-pane name="4-1">
                
                                                                        <span slot="label">
                
                                                                                    <span class="select-item">无限制</span>
                
                                                                        <i class="el-vertical-line">|</i>
                
                                                                        </span>
                
                                                                    </el-tab-pane> -->
                                    <el-tab-pane name="4-2">
                                        <span slot="label">
                                                    <span class="select-item">按CPM出价</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                        <div class="per-unit" :class="{ 'error-border': isDate == 'date'}">
                                            <div class="unit-setting i-yellow">
                                                <el-input placeholder="请填写大于零的数字，精确到0.01" v-model="cpmPrice"></el-input>
                                                <span class="unit meta">元</span>
                                            </div>
                                            <span class="error-tip">请填写大于零的数字，精确到0.01</span>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane name="4-3">
                                        <span slot="label">
                                                    <span class="select-item">按CPC出价</span>
                                        <i class="el-vertical-line"></i>
                                        </span>
                                        <div class="per-unit" :class="{ 'error-border': isDate == 'date'}">
                                            <div class="unit-setting i-yellow">
                                                <el-input placeholder="请填写大于零的数字，精确到0.01" v-model="cpcPrice"></el-input>
                                                <span class="unit meta">元</span>
                                            </div>
                                            <span class="error-tip">请填写大于零的数字，精确到0.01</span>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>


                        </div>


                        <!-- old code start -->
                    </el-col>
                </div>
                <el-col :span="24" class="direct-requirement clear">
                    <!-- 定向条件 -->
                    <!-- <conditon ref="condition" :detailsItem="getDetailsItem"></conditon> -->
                    <conditon ref="condition"></conditon>
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
    import moment from "../../common/moment";
    import conditon from "./conditon/conditon.vue";
    import vTimeSlot from "./conditon/TimeSlot";
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        put,
        login
    } from "../../service/index";
    import store from "store";
    import _ from "lodash";
    import {
        RSAencrypt,
        encryptLong,
        RSAdecrypt //解密
    } from "../../common/utils"
    export default {
        data() {
            return {
                activeTabPeriod: "6-1-1",
                activeTabDate: "5-1-1",
                timePeriod: [],
                red: "is-red", //此处的red和blue指的是style中的red类和blue类
                yellow: "is-yellow",
                green: "is-green",
                meadiaCheck: false,
                typeCheck: false,
                deviceCheck: false,
                adCheck: false,
                week: "0",
                date: "0",
                frequency: "1",
                frequencyRadio: "1",
                frequencyInputWeek: "",
                frequencyInputDh: "",
                checkedImages: [],
                // putImages: [
                //     {id:1,logo:'http://fs.keda-digital.com/creative/4/17/AOufmZrwKOz1pRhbT9iyOULV4pZR35jkeY8cMK2B.jpeg'}, {id:2,logo:'http://fs.keda-digital.com/creative/4/17/AOufmZrwKOz1pRhbT9iyOULV4pZR35jkeY8cMK2B.jpeg'}
                // ],
                putImages: [],
                creativeForm: {
                    name: "",
                    start_date: "", //投放周期开始时间
                    end_date: "", //投放周期结束时间
                    budget_type: "1", //预算类型  0不限，1周预算，2日预算
                    budget_num: 0, //预算金额
                    frequency_type: 0, //频次控制：（0不限，1周期内单人曝光不超过，2每天单人曝光不超过 3每小时单人曝光不超过
                    frequency_num: 0, //频次
                    imp_limit: 0, //曝光上限0表示不限
                    click_limit: 0, //点击上限0表示不限
                    orient_aear: [], //地域定向
                    orient_time: "", //时段定向
                    orient_system: "", //设备定向 系统定向（android,ios,windows,mac OS,other）
                    orient_network: "", //网络定向（wifi，5G，4G，3G，2G，gprs）
                    orient_plat: "", //渠道定向,
                    orient_media: "", //媒体定向
                    orient_adslot: "", //广告位定向
                    period: [],
                    ad_id: "",
                    //定向条件
                    //地域
                    // orient_aear: {
                    //     pro_id: [],
                    //     city: []
                    // },
                    //网络
                    network: [],
                    system: [],
                    orient_mediaStr: [],
                    orient_adslotStr: [],
                    orient_time: {
                        Mon: [
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1"
                        ],
                        Tues: [
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1"
                        ],
                        Wed: [
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1"
                        ],
                        Thur: [
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1"
                        ],
                        Fri: [
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1"
                        ],
                        Sat: [
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1"
                        ],
                        Sun: [
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1",
                            "1"
                        ]
                    },
                    settlement_type: "1", //出价 方式
                    settlement_price: "" //出价 价格
                },
                options: [{
                        value: "1",
                        label: "按周期"
                    }, {
                        value: "2",
                        label: "单人每天"
                    },
                    {
                        value: "3",
                        label: "单人每小时"
                    }
                ],
                orient_media_crowd: [],
                isMrExpose: "",
                isMrClick: "",
                isInputWeek: "",
                isInputDh: "",
                isDate: "",
                isWeek: "",
                //tabs
                //预算控制
                activeNamebudget: "1-1",
                //投放量级上限
                activeNamelimit: "2-1",
                //品次控制
                activeNamefrequency: "3-1",
                //最高出价
                activeNamemaxt: "4-2",

                //投放速度
                activeSpeed:'77-77',
                launch_type:1,//传递的默认数据
                // detailsItem: "父组件"
                meadiaIds: [],
                adIdsList: [],
                cpmPrice: "",
                cpcPrice: ""
            };
        },
        beforeCreate() {},
        mounted() {
            this.getCurrentUser(store.get("user"));
            this.getCurrnetAd(store.get("currentAd"));
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.resetForm(); //定向条件 时段 置空

            //编辑操作
            if (this.$route.path.replace("/", "").indexOf("editplan") >= 0) {
                put
                    .campedit({
                        id: parseInt(this.$route.params.planid),
                        ad_id: parseInt(this.$route.params.id)
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            //console.log(res.data.data);
                            this.initForm(res.data.data);
                        }
                    });
            }
            this.$store.state.meadia = [];
            this.chekAllAdPosition([]);
            put.plantformGetrange().then(res => {
                if (res.data.code == 0) {
                    this.putImages = res.data.data;
                    if (this.$route.path.replace("/", "").indexOf("editplan") < 0) {
                        this.checkedImages.push(this.putImages[0].id);
                    }
                }
            });
            if (this.$route.path.replace("/", "").indexOf("createplan") >= 0) {
                this.$refs.condition.setAll();
            };
       

        },
        components: {
            conditon,
            vTimeSlot
        },
        computed: {
            SpeedDisabled(){
                //返回true是不可选，返回false是可以选择
                if(this.timePeriod.length == 0 && !this.week && !this.date && !this.creativeForm.imp_limit && !this.creativeForm.click_limit){//同时满足
                    this.launch_type = 1;
                    this.activeSpeed = "77-77";
                    return true;
                };
                if(this.timePeriod.length == 0 && (this.week != "" || this.date != '') && !this.creativeForm.imp_limit && !this.creativeForm.click_limit){//同时满足
                     this.launch_type = 1;
                     this.activeSpeed = "77-77";
                    return true;
                }

                if(this.activeNamebudget == "1-2"){
                      //两个同时存在 
                      if(this.timePeriod.length > 0 && this.week == 0){
                         return true;
                      }
                      if(this.timePeriod.length == 0 && this.week > 0){
                         return true;
                      }

                }else if( this.activeNamebudget == "1-3"){
                      if(this.timePeriod.length > 0 && this.date == 0){
                         return true;
                      }
                      if(this.timePeriod.length == 0 && this.date > 0){
                         return true;
                      }
                }else if( this.activeNamebudget == "1-1"){
                      if(this.timePeriod.length > 0){
                          if(this.creativeForm.imp_limit > 0 || this.creativeForm.click_limit > 0){
                             return false;
                          }
                          return true;
                      } 
                      
                }

               
                return false
            },
            ...mapState({
                result: "result",
                publickKey: "publickKey",
                currentCheckedAd: "currentCheckedAd"
            }),
            ...mapGetters({
                isallnetworktype: "isallnetworktype"
            }),
            isAlltypecheck() {},
            statecurrentCheckedAd() {
                return this.$store.state.currentCheckedAd;
            },

        },
        watch: {
            statecurrentCheckedAd() {//解决客户不变刷新的时候，页面的跳转
                //this.$router.go(-1);
            },

        },
        methods: {
            ...mapActions([
                 "checkedAllMonday",
                "checkedAllTuesdays",
                "checkedAllWendesday",
                "checkedAllthursday",
                "checkedAllFriday",
                "checkedAllSaturday",
                "checkedAllWeekdays",


                "camplistPage",
                "setBreadCrumb",
                "showConditon",
                "showNetwork",
                "showDevice",
                "chekAllType",
                "chekAllDevice",
                "showMeadia",
                "showAdposition",
                "chekAllMeadia",
                "chekAllAdPosition",
                "getMeadiaList",
                "getCurrentUser",
                "getCurrnetAd",
                "addCities",
                "getCheckedMeadia",
                "getCheckedAd"
            ]),
              tabChangePeriod(val) {
                if (val == "6-1-1") {
                    // this.setAll();
                    // this.checkAllDays = "1";
                }
                if (val == "6-2-1") {
                    // this.unSetAll();
                    // this.checkAllDays = "0";
                }
            },
            handleSpeedClick(obj){//投放速速点击
                if(obj.index == 0){
                      this.launch_type = 1;
                }else if(obj.index == 1){
                     this.launch_type = 2;
                }
            },
            tabChangeDate(val) {
                if (val == "5-1-1") {
                    this.timePeriod = [];
                }
            },
            isShowPicker() {
                //console.log(this);
            },
            handleClick(tab, event) {
                // 无限制 
                if (tab.name == "1-1") {
                    this.creativeForm.budget_type = "0";
                    this.week = "";
                    this.date = "";
                    this.creativeForm.budget_num = 0;
                }
                if (tab.name == "2-1") {
                    this.creativeForm.imp_limit = 0;
                    this.creativeForm.click_limit = 0;
                }
                if (tab.name == "3-1") {
                    this.frequencyInputWeek = "";
                    this.frequencyInputDh = "";
                    this.frequency = "1";
                    this.creativeForm.frequency_type = "0";
                    this.creativeForm.frequency_num = "0";
                }
                if (tab.name == "4-1") {
                    this.creativeForm.settlement_type = "0";
                    this.settlement_price = "";
                }
                //预算控制
                if (tab.name == "1-2" || tab.name == "1-3") {
                    if (tab.name == "1-2") {
                        //this.date = "";
                    }
                    if (tab.name == "1-3") {
                        //this.week = "";
                    }
                    this.creativeForm.budget_type = tab.name == "1-2" ? "1" : "2";
                    //console.log(this.creativeForm.budget_type);
                }
                //投放量级上限
                if (tab.name == "2-2" || tab.name == "2-3") {
                    if (tab.name == "2-2") {
                        this.creativeForm.click_limit = 0;
                    }
                    if (tab.name == "2-3") {
                        this.creativeForm.imp_limit = 0;
                    }
                }
                //频次控制
                if (tab.name == "3-2" || tab.name == "3-3") {
                    if (tab.name == "3-2") {
                        //this.frequencyInputWeek="";
                        this.frequencyInputDh = "";
                        this.frequency = "1";
                        this.creativeForm.frequency_type = this.frequency;
                    }
                    // if (tab.name == "3-3") {
                    //     this.frequencyInputWeek = "";
                    //     this.creativeForm.frequency_type = "2";
                    // }
                    // this.frequencyRadio = tab.name == "3-2" ? "1" : "2";
                }
                //出价
                if (tab.name == "4-2" || tab.name == "4-3") {
                    if (tab.name == "4-2") {
                        this.creativeForm.settlement_type = "1";
                    }
                    if (tab.name == "4-3") {
                        this.creativeForm.settlement_type = "2";
                    }
                }
            },
            getWeekDays(data) {
                let resutl = [];
                for (var j = 0; j < data.length; j++) {
                    resutl.push({
                        key: j.toString(),
                        value: data[j]
                    });
                }
                return resutl;
            },
            getMeadiaName(value, data) {
                let resutl = [];
                for (var j = 0; j < value && value.length; j++) {
                    for (var k = 0; k < data.length; k++) {
                        if (value[j] == data[k].plat_id) {
                            resutl.push(data[k].media_name);
                        }
                    }
                }
                return resutl;
            },
            getAdName(value, data) {
                let resutl = [];
                for (var j = 0; j < value && value.length; j++) {
                    for (var k = 0; k < data.length; k++) {
                        if (value[j] == data[k].ad_pid) {
                            resutl.push(data[k].ad_name);
                        }
                    }
                }
                return resutl;
            },
            getCitiesName(value, data) {
                let pro_id = value.pro_id;
                let city = value.city;
                let result = [];
                let provinceName = [];
                let cityName = [];
                for (var j = 0; j < pro_id.length; j++) {
                    for (var k = 0; k < data.length; k++) {
                        if (pro_id[j] == data[k].region_id) {
                            let cities = [];
                            for (var m = 0; m < data[k].chiled.length; m++) {
                                for (var n = 0; n < city.length; n++) {
                                    if (city[n] == data[k].chiled[m].region_id) {
                                        cities.push(data[k].chiled[m].name);
                                    }
                                }
                            }
                            result.push({
                                name: data[k].name,
                                cityies: cities
                            });
                            provinceName.push(data[k].name);
                            cityName = cities;
                        }
                    }
                }
                return {
                    result: result,
                    province: provinceName,
                    city: cityName
                };
            },
            initForm(data) {
                //console.log(data);
                this.creativeForm.name = data.name;
                // this.creativeForm.period.push(data.start_date);
                // this.creativeForm.period.push(data.end_date);
                if (data.start_date != "") {
                    // this.$refs.condition.activeTabDate = "5-2-1";
                    // this.$refs.condition.startDate = data.start_date;
                    // this.$refs.condition.endDate = data.end_date;
                    // //timePeriod
                    // this.$refs.condition.timePeriod = [data.start_date, data.end_date];
                    this.activeTabDate = "5-2-1";
                    //timePeriod
                    this.timePeriod = [data.start_date, data.end_date];
                }
                this.creativeForm.start_date = data.start_date;
                this.creativeForm.end_date = data.end_date;
                //预算控制 1 周期内总预算 2 每日预算上限
                this.creativeForm.budget_type = data.budget_type.toString();
                if (this.creativeForm.budget_type == "1") {
                    this.week = data.budget_num;
                    this.activeNamebudget = "1-2";
                }
                if (this.creativeForm.budget_type == "2") {
                    this.date = data.budget_num;
                    this.activeNamebudget = "1-3";
                }
                //this.week = data.budget_num;
                this.creativeForm.budget_num = data.budget_num;
                this.creativeForm.imp_limit = data.imp_limit;
                this.creativeForm.click_limit = data.click_limit;
                if (this.creativeForm.imp_limit && this.creativeForm.click_limit) {
                    this.activeNamelimit = "2-2";
                }
                if (this.creativeForm.imp_limit || this.creativeForm.click_limit) {
                    this.activeNamelimit = "2-2";
                }
                if (this.creativeForm.click_limit) {
                    this.activeNamelimit = "2-3";
                }
                //频次控制
                this.creativeForm.frequency_type = data.frequency_type;
                this.creativeForm.frequency_num = data.frequency_num;
                this.frequencyInputDh = data.frequency_num;
                this.frequency = this.creativeForm.frequency_type.toString();
                if (this.creativeForm.frequency_type == 0) {
                    this.activeNamefrequency = "3-1";
                }
                if (this.creativeForm.frequency_type == 1 || this.creativeForm.frequency_type == 2 || this.creativeForm.frequency_type == 3) {
                    this.activeNamefrequency = "3-2";
                }
                this.creativeForm.frequency_num = data.frequency_num;
                // this.frequencyInputWeek = data.frequency_num;
                //地域
                //console.log(JSON.parse(data.orient_aear).orient_aear);
                this.creativeForm.orient_aear = JSON.parse(data.orient_aear).orient_aear;
                //console.log("初始化表单");
                //console.log(this.creativeForm.orient_aear);
                this.getAllCityData(this.creativeForm.orient_aear);
                this.checkedImages = JSON.parse(data.orient_plat);
                // console.log(data.settlement_type)
                // console.log(data.settlement_price)
                if (data.settlement_type == 1) {
                    this.activeNamemaxt = "4-2"
                    this.cpmPrice = data.settlement_price;
                    this.creativeForm.settlement_type = "1";
                }
                if (data.settlement_type == 2) {
                    this.activeNamemaxt = "4-3"
                    this.cpcPrice = data.settlement_price;
                    this.creativeForm.settlement_type = "2";
                }
                this.creativeForm.settlement_price = data.settlement_price;
                //时段
                this.checkedAllMonday(
                    this.getWeekDays(JSON.parse(data.orient_time).Mon)
                );
                this.checkedAllTuesdays(
                    this.getWeekDays(JSON.parse(data.orient_time).Tues)
                );
                this.checkedAllWendesday(
                    this.getWeekDays(JSON.parse(data.orient_time).Wed)
                );
                this.checkedAllthursday(
                    this.getWeekDays(JSON.parse(data.orient_time).Thur)
                );
                this.checkedAllFriday(
                    this.getWeekDays(JSON.parse(data.orient_time).Fri)
                );
                this.checkedAllSaturday(
                    this.getWeekDays(JSON.parse(data.orient_time).Sat)
                );
                this.checkedAllWeekdays(
                    this.getWeekDays(JSON.parse(data.orient_time).Sun)
                );
                let periodTime = JSON.parse(data.orient_time);
                for (let key in periodTime) {
                    _.forEach(periodTime[key], val => {
                        if (val == "1") {
                            //isResultTimePeriod
                            //this.$refs.timeslot.isResultTimePeriod = true;
                            this.$refs.timeslot.activeTabPeriod = "6-2-1";
                        }
                    })
                }
                //媒体
                // this.$refs.condition.checkedMeadia = this.getMeadiaName(
                //     JSON.parse(data.orient_media).orient_media,
                //     this.$store.state.meadialist
                // );
                //console.log(JSON.parse(data.orient_media).orient_mediaid);
                this.getCheckedMeadia(data.orient_media != "" ? JSON.parse(data.orient_media).orient_mediaStr : []); //orient_mediaStr
                this.getCheckedAd(data.orient_adslot != "" ? JSON.parse(data.orient_adslot).orient_adslotStr : []);
                this.$refs.condition.MeadiaComponets();
                //this.$refs.condition.chekAllAdPosition(this.$refs.condition.checkedAd);
                //资源
                //设备定向
                let deviceArr = data.orient_system != "" ? JSON.parse(data.orient_system).system : [];
                this.$refs.condition.checkedDeviceType = deviceArr;
                if (deviceArr.length > 0) {
                    this.$refs.condition.unCheckNetDevice = false;
                }
                //console.log(data.orient_system);
                // if (data.orient_system) {
                //     let deviceArr = JSON.parse(
                //         data.orient_system
                //     ).system;
                //     this.$refs.condition.checkedDeviceType = deviceArr;
                //     this.$refs.condition.chekAllDevice(deviceArr);
                //     if (deviceArr.length > 0) {
                //         this.$refs.condition.checkAllDevice = true;
                //         this.$refs.condition.isIndeterminateDevice = true;
                //     }
                // }
                //网络类型
                let networkArr = data.orient_network != "" ? JSON.parse(data.orient_network).network : [];
                this.$refs.condition.checkedNetworkType = networkArr;
                if (networkArr.length > 0) {
                    this.$refs.condition.unCheckNetWork = false;
                }
                // if (data.orient_system) {
                //     let networkArr = JSON.parse(data.orient_network).network;
                //     this.$refs.condition.checkedNetworkType = networkArr;
                //     this.$refs.condition.chekAllType(networkArr);
                //     //checkAllNet  isIndeterminateNet
                //     if (networkArr.length > 0) {
                //         this.$refs.condition.checkAllNet = true;
                //         this.$refs.condition.isIndeterminateNet = true;
                //     }
                // }
                //导入人群包
                if (data.old_filename) {
                    let filelist = this.getFileBysourceData(JSON.parse(data.old_filename));
                    let fileright = filelist.slice(1, filelist.length);
                    let fileleft = _.difference(filelist, fileright);
                    this.$refs.condition.peoplepackageleft = fileleft;
                    this.$refs.condition.peoplepackage = fileright;
                }
                //  this.creativeForm.orient_media_crowd = {
                //         plat_ids: this.$refs.condition.checkedmeadiathird,
                //         age: this.$refs.condition.checkedage,
                //         sex: this.$refs.condition.checkedsex,
                //         industry: this.$refs.condition.checkedindustry,
                //         interest: this.$refs.condition.checkedinterest,
                //         education: this.$refs.condition.checkededuction,
                //         income: this.$refs.condition.checkedincome
                //     };
                //     fileData.append("orient_media_crowd", JSON.stringify(this.creativeForm.orient_media_crowd));
                //兴趣爱好
                this.creativeForm.orient_interest = {
                    "info": this.$refs.condition.checkedhobby,
                };
                //第三方媒体人群

                //投放速度赋值
                if(data.launch_type == 1){
                    this.activeSpeed = '77-77'
                }else if(data.launch_type == 2){
                     this.activeSpeed = '77-78'
                }

                if(data.launch_type){
                    this.launch_type = data.launch_type
                }

                //console.log(JSON.parse(data.orient_media_crowd));
                let datathird = JSON.parse(data.orient_media_crowd);
                // this.$refs.condition.checkedmeadiathird = datathird.plat_ids;
                if (datathird.age.length > 0) {
                    this.$refs.condition.unCheckAge = false;
                    this.$refs.condition.checkedage = datathird.age;
                }
                if (datathird.sex.length > 0) {
                    this.$refs.condition.unCheckSex = false;
                    this.$refs.condition.checkedsex = datathird.sex;
                }
                // this.$refs.condition.checkedindustry = datathird.industry;
                // this.$refs.condition.checkedinterest = datathird.interest;
                // this.$refs.condition.checkededuction = datathird.education;
                // this.$refs.condition.checkedincome = datathird.income;
                if (data.orient_interest) {
                    this.$refs.condition.activeTabinterest = "3-2";
                    //console.log( this.$refs.condition.resourceTypeData);
                    //this.$refs.condition.dataintrest = JSON.parse(data.orient_interest).info;
                    this.$refs.condition.getInterestAllData([], val => {
                        _.forEach(val, p => {
                            _.forEach(JSON.parse(data.orient_interest).info, s => {
                                if (p.categroy_id == s) {
                                    this.$refs.condition.checkedhobbySub.push(p.name);
                                    this.$refs.condition.secoptions.push({
                                        value: p.categroy_id,
                                        label: p.name
                                    });
                                    _.forEach(val, item => {
                                        if (item.categroy_id == p.pid) {
                                            this.$refs.condition.checkedhobby.push(item.name);
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
                //console.log(dataintrest);
            },
            getFileBysourceData(val) {
                let result = [];
                if (!val) {
                    return result;
                }
                for (var j = 0; j < val.length; j++) {
                    result.push({
                        id: j,
                        name: val[j]
                    });
                }
                return result;
            },
            handleSelect(key, keyPath) {
                this.showConditon(keyPath);
                this.showNetwork(keyPath[1]);
                this.showDevice(keyPath[1]);
                this.showAdposition(keyPath[1]);
                this.showMeadia(keyPath[1]);
            },
            handleOpen(key, keyPath) {},
            handleClose(key, keyPath) {},
            show() {
                this.showConditon("result");
            },
            //媒体 ID
            getMeadiaIds() {
                let list = this.$store.state.meadialist;
                let meadia = this.$store.state.meadia;
                let data = [];
                for (var j = 0; j < meadia.length; j++) {
                    //data.push(meadia[j].plat_id);
                    for (var k = 0; k < list.length; k++) {
                        if (meadia[j] == list[k].media_name) {
                            data.push(list[k].plat_id);
                        }
                    }
                }
                return data;
            },
            //广告位
            getAdIds() {
                let sourceData = this.$store.state.dpositionlist;
                let checked = this.$store.state.adposition;
                let data = [];
                for (var j = 0; j < checked.length; j++) {
                    for (var k = 0; k < sourceData.length; k++) {
                        if (checked[j] == sourceData[k].ad_name) {
                            data.push(sourceData[k].ad_pid);
                        }
                    }
                }
                return data;
            },
            getTime(data) {
                let result = [];
                for (var j = 0; j < data.length; j++) {
                    result.push(data[j].value);
                }
                return result;
            },
            getAllCitiesIds(data) {
                let parent = [];
                let sub = [];
                _.forEach(data, function(value) {
                    parent.push(value.region_id);
                    if (value.chiled) {
                        _.forEach(value.chiled, function(subValue) {
                            sub.push(subValue.region_id);
                        });
                    }
                });
                // let sourceData = this.$store.state.terrainSourceData;
                // for (var j = 0; j < data.length; j++) {
                //     for (var k = 0; k < sourceData.length; k++) {
                //         if (data[j].name == sourceData[k].name) {
                //             parent.push(sourceData[k].region_id);
                //         }
                //         if (data[j].cityies) {
                //             for (var m = 0; m < data[j].cityies.length; m++) {
                //                 for (var n = 0; n < sourceData[k].chiled.length; n++) {
                //                     if (data[j].cityies[m] == sourceData[k].chiled[n].name) {
                //                         sub.push(sourceData[k].chiled[n].region_id);
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
                return {
                    pro_id: parent,
                    city: sub
                };
            },
            getAllCityData(val) {
                put
                    .campRegion({
                        id: [-1]
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            let checkedCityList = [];
                            _.forEach(val.pro_id, function(checkedItem) {
                                _.forEach(res.data.data, function(resourDataItem) {
                                    if (checkedItem == resourDataItem.region_id) {
                                        let checkedSubCity = [];
                                        let checkedCity = _.cloneDeep(resourDataItem);
                                        _.forEach(val.city, function(checkedSub) {
                                            _.forEach(resourDataItem.chiled, function(resSub) {
                                                if (checkedSub == resSub.region_id) {
                                                    checkedSubCity.push(resSub);
                                                }
                                            });
                                            checkedCity.chiled = checkedSubCity;
                                        });
                                        checkedCityList.push(checkedCity);
                                    }
                                });
                            });
                            this.$store.state.terrainResult = checkedCityList;
                            this.$store.state.isEditcity = true;
                        }
                    });
            },
            onSubmit() {
                let fileData = new FormData();
                if (this.validateForm()) {
                    //         let testLong= encryptLong(store.get("publicKey"), JSON.stringify({
                    //     username: this.creativeForm.orient_aear,
                    //     // pasw: this.creativeForm.end_date
                    //   }), this);
                    //   console.log("长文本加密之前数据");
                    //   console.log(JSON.stringify({
                    //     username: this.creativeForm.orient_aear,
                    //     // pasw: this.creativeForm.end_date
                    //   }));
                    //                           login.getTest({
                    //             data: testLong
                    //         }).then(res => {
                    //             console.log("源数据");
                    //             console.log(res.data);
                    //         });
                    //         //console.log(this.creativeForm.orient_aear);
                    //         console.log("长文本加密之后数据");
                    //         console.log(testLong);
                    //console.log(fileData);
                    // if (!this.$refs.condition.timePeriod) {
                    //     this.$refs.condition.timePeriod = [];
                    // }
                    // if (this.$refs.condition.timePeriod.length > 0) {
                    //     this.creativeForm.start_date = moment(this.$refs.condition.timePeriod[0]).format(
                    //         "YYYY-MM-DD"
                    //     );
                    //     this.creativeForm.end_date = moment(this.$refs.condition.timePeriod[1]).format(
                    //         "YYYY-MM-DD"
                    //     );
                    // } else {
                    //     this.creativeForm.start_date = "";
                    //     this.creativeForm.end_date = "";
                    // }
                    if (!this.timePeriod) {
                        this.timePeriod = [];
                    }
                    if (this.timePeriod.length > 0) {
                        this.creativeForm.start_date = moment(this.timePeriod[0]).format(
                            "YYYY-MM-DD"
                        );
                        this.creativeForm.end_date = moment(this.timePeriod[1]).format(
                            "YYYY-MM-DD"
                        );
                    } else {
                        this.creativeForm.start_date = "";
                        this.creativeForm.end_date = "";
                    }
                    fileData.append("name", this.creativeForm.name);


                   
                    fileData.append("budget_type", this.creativeForm.budget_type);
                    
                    if((this.creativeForm.budget_num)<0){
                            this.$message({
                                message: "预算控制不能小于0",
                                type: "warning"
                            });
                        return;
                    }

                    if(this.creativeForm.budget_num > 0){
                        fileData.append("budget_num", this.creativeForm.budget_num);
                        fileData.append("start_date", this.creativeForm.start_date);
                        fileData.append("end_date", this.creativeForm.end_date);

                    }




                    fileData.append("frequency_type", this.creativeForm.frequency_type);
                    fileData.append("frequency_num", this.creativeForm.frequency_num);
                    fileData.append("imp_limit", this.creativeForm.imp_limit);
                    fileData.append("launch_type", this.launch_type);

                    // fileData.append("imp_limit", this.creativeForm.imp_limit ? this.creativeForm.imp_limit : 0);
                    fileData.append("click_limit", this.creativeForm.click_limit);
                    fileData.append("settlement_type", this.creativeForm.settlement_type);
                    fileData.append("settlement_price", this.creativeForm.settlement_type == "1" ? this.cpmPrice : this.cpcPrice);
                    fileData.append("orient_plat", JSON.stringify(_.uniq(this.checkedImages)));

                    //导入人群包
                    let filelist = _.concat(
                        this.$refs.condition.peoplepackageleft,
                        this.$refs.condition.peoplepackage
                    );
                    let file = [];
                    for (var j = 0; j < filelist.length; j++) {
                        if (filelist[j].file) {
                            fileData.append("file[]", filelist[j].file);
                        }
                    }
                    //第三方媒体人群 
                    this.creativeForm.orient_media_crowd = {
                        // plat_ids: this.$refs.condition.checkedmeadiathird,
                        age: this.$refs.condition.unCheckAge ? [] : this.$refs.condition.checkedage,
                        sex: this.$refs.condition.unCheckSex ? [] : this.$refs.condition.checkedsex
                        // industry: this.$refs.condition.checkedindustry,
                        // interest: this.$refs.condition.checkedinterest,
                        // education: this.$refs.condition.checkededuction,
                        // income: this.$refs.condition.checkedincome
                    };
                    fileData.append("orient_media_crowd", JSON.stringify(this.creativeForm.orient_media_crowd));
                    //兴趣爱好
                    this.creativeForm.orient_interest = {
                        "info": this.$refs.condition.activeTabinterest == "1-1" ? [] : this.$refs.condition.getHobbyIds()
                    };
                    fileData.append("orient_interest", JSON.stringify(this.creativeForm.orient_interest));
                    //广告主 ID
                    this.creativeForm.ad_id = this.$route.params.id;
                    fileData.append("ad_id", this.creativeForm.ad_id);
                    //定向条件
                    this.creativeForm.orient_system = JSON.stringify({
                        system: this.$refs.condition.unCheckNetDevice ? [] : this.$refs.condition.checkedDeviceType
                    });
                    fileData.append("orient_system", this.creativeForm.orient_system);
                    this.creativeForm.orient_network = JSON.stringify({
                        network: this.$refs.condition.unCheckNetWork ? [] : this.$refs.condition.checkedNetworkType
                    });
                    fileData.append("orient_network", this.creativeForm.orient_network);
                    // this.creativeForm.orient_media = JSON.stringify({
                    //     orient_media: this.getMeadiaIds()
                    // });
                    // fileData.append("orient_media", this.creativeForm.orient_media);
                    // this.creativeForm.orient_adslot = JSON.stringify({
                    //     orient_adslot: this.getAdIds()
                    // });
                    // fileData.append("orient_adslot", this.creativeForm.orient_adslot);
                    let meadia = this.$refs.condition.getMeadiaData();
                    this.creativeForm.orient_media = JSON.stringify({
                        orient_media: meadia.meadia
                    });
                    fileData.append("orient_media", this.creativeForm.orient_media);
                    this.creativeForm.orient_adslot = JSON.stringify({
                        orient_adslot: meadia.ad
                    });


                    fileData.append("orient_adslot", this.creativeForm.orient_adslot);
                    this.creativeForm.orient_time = JSON.stringify({
                        Mon: this.getTime(this.$store.state.monday),
                        Tues: this.getTime(this.$store.state.tuesday),
                        Wed: this.getTime(this.$store.state.wendesday),
                        Thur: this.getTime(this.$store.state.tursday),
                        Fri: this.getTime(this.$store.state.friday),
                        Sat: this.getTime(this.$store.state.saturday),
                        Sun: this.getTime(this.$store.state.weekday)
                    });
                    fileData.append("orient_time", this.creativeForm.orient_time);
                    //地域定向
                    this.creativeForm.orient_aear = JSON.stringify({
                        orient_aear: this.getAllCitiesIds(this.$store.state.terrainResult)
                    });
                    fileData.append("orient_aear", this.creativeForm.orient_aear);
                    if (this.$route.path.replace("/", "").indexOf("editplan") >= 0) {
                        this.creativeForm.id = this.$route.params.planid;
                        fileData.append("id", this.creativeForm.id);
                    }
                    put.campdoedit(fileData).then(res => {
                        //this.creativeForm
                        if (res.data.code == 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.resetForm();
                            this.$router.go(-1);
                            // if (this.$route.path.replace("/", "").indexOf("createplan") >= 0) {
                            //     this.$router.go(-1);
                            // }
                            // if (this.$route.path.replace("/", "").indexOf("editplan") >= 0) {
                            //     this.$router.go(-1);
                            // }
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
            },
            goBack() {
                this.$router.push({
                    path: "/plantable/" + this.$route.params.id
                });
            },
            // 定向条件 时段 置空
            resetForm() {
                //console.log("定向条件 清空");
                this.$store.state.isEditcity = "";
                let data = [{
                    key: "0",
                    value: "0"
                }, {
                    key: "1",
                    value: "0"
                }, {
                    key: "2",
                    value: "0"
                }, {
                    key: "3",
                    value: "0"
                }, {
                    key: "4",
                    value: "0"
                }, {
                    key: "5",
                    value: "0"
                }, {
                    key: "6",
                    value: "0"
                }, {
                    key: "7",
                    value: "0"
                }, {
                    key: "8",
                    value: "0"
                }, {
                    key: "9",
                    value: "0"
                }, {
                    key: "10",
                    value: "0"
                }, {
                    key: "11",
                    value: "0"
                }, {
                    key: "12",
                    value: "0"
                }, {
                    key: "13",
                    value: "0"
                }, {
                    key: "14",
                    value: "0"
                }, {
                    key: "15",
                    value: "0"
                }, {
                    key: "16",
                    value: "0"
                }, {
                    key: "17",
                    value: "0"
                }, {
                    key: "18",
                    value: "0"
                }, {
                    key: "19",
                    value: "0"
                }, {
                    key: "20",
                    value: "0"
                }, {
                    key: "21",
                    value: "0"
                }, {
                    key: "22",
                    value: "0"
                }, {
                    key: "23",
                    value: "0"
                }];
                // this.$store.state.terrainResult = [];
                this.$store.state.monday = _.cloneDeep(data);
                this.$store.state.tuesday = _.cloneDeep(data);
                this.$store.state.wendesday = _.cloneDeep(data);
                this.$store.state.tursday = _.cloneDeep(data);
                this.$store.state.friday = _.cloneDeep(data);
                this.$store.state.saturday = _.cloneDeep(data);
                this.$store.state.weekday = _.cloneDeep(data);
            },
            validateForm() {
                if (!this.creativeForm.name) {
                    this.$message({
                        message: "请输入计划名称",
                        type: "warning"
                    });
                    return;
                }
                if (this.checkedImages.length == 0) {
                    this.$message({
                        message: "请选择投放范围",
                        type: "warning"
                    });
                    return;
                }
                let price = this.creativeForm.settlement_type == "1" ? this.cpmPrice : this.cpcPrice;
                console.log(price > 0);
                if (!price) {
                    this.$message({
                        message: "请输入最高出价",
                        type: "warning"
                    });
                    return;
                }
                if (!price > 0) {
                    this.$message({
                        message: "最高出价必须大于0",
                        type: "warning"
                    });
                    return;
                }
                if (this.$refs.condition.activeTabDate == "5-2-1" && !this.$refs.condition.timePeriod) {
                    this.$message({
                        message: "请选择投放周期",
                        type: "warning"
                    });
                    //this.isShow
                    this.$refs.condition.isShow = "5-1";
                    return;
                }
                //creativeForm.settlement_price"
                //checkedImages
                //   if (this.checkedImages.length==0) {
                //     this.$message({
                //         message: "请选择投放范围",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!this.creativeForm.start_date) {
                //     this.$message({
                //         message: "请选择投放周期",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!this.creativeForm.week||!this.creativeForm.date) {
                //     this.$message({
                //         message: "请填写预算控制",
                //         type: "warning"
                //     });
                //     return;
                // }
                return true;
            },
            getPeriod() {
                this.creativeForm.start_date = moment(this.creativeForm.period[0]).format(
                    "YYYY-MM-DD"
                );
                this.creativeForm.end_date = moment(this.creativeForm.period[1]).format(
                    "YYYY-MM-DD"
                );
                //console.log(this.creativeForm);
            },
            changeWeek() {
                this.creativeForm.budget_num = this.week;
            },
            changeDate() {
                this.creativeForm.budget_num = this.date;
            },
            bugetTypeRadion() {
                console.log(this.creativeForm.budget_type);
                if (this.creativeForm.budget_type == "1") {
                    this.date = "";
                }
                if (this.creativeForm.budget_type == "2") {
                    this.week = "";
                }
            },
            frequencyWeek() {
                //this.creativeForm.frequency_type = this.frequencyRadio;
                this.frequency = "2";
                this.frequencyInputDh = "";
                this.creativeForm.frequency_num = "";
            },
            frequencyDate() {
                //this.frequencyRadio="2";
                this.creativeForm.frequency_type = this.frequencyRadio;
                this.frequencyInputWeek = "";
                this.creativeForm.frequency_num = "";
            },
            frequencyHour() {
                // if (this.frequency == "2") {
                //     this.frequencyRadio = this.frequency;
                //     this.creativeForm.frequency_type = "3";
                // }
                this.creativeForm.frequency_type = this.frequency;
            },
            frInputWeek() {
                this.creativeForm.frequency_num = this.frequencyInputWeek;
            },
            frInputDh() {
                this.creativeForm.frequency_num = this.frequencyInputDh;
            },
            ckeAllType() {
                //console.log(this.typeCheck);
                this.chekAllType(this.typeCheck); //['wifi', '5G', '4G', '3G', '2G', 'gprs']
            },
            ckeAllDivce() {
                this.chekAllDevice(this.meadiaCheck);
            },
            meadiaChange() {
                this.chekAllMeadia(this.meadiaCheck);
            },
            adchenage() {
                this.chekAllAdPosition(this.adCheck);
            },
            checkNumber(obj, key) {
                // 大于零的整数
                if (obj) {
                    let regex = /^[0-9]*[1-9][0-9]*$/;
                    if (regex.test(obj)) { //是，消除红框提示
                        if (key == "mrexpose") {
                            this.isMrExpose = "";
                        } else if (key == "mrclick") {
                            this.isMrClick = "";
                        } else if (key == "inputWeek") {
                            this.isInputWeek = "";
                        } else if (key == "inputDh") {
                            this.isInputDh = "";
                        }
                    } else { //不是，就提示
                        if (key == "mrexpose") {
                            this.isMrExpose = "mrexpose";
                        } else if (key == "mrclick") {
                            this.isMrClick = "mrclick";
                        } else if (key == "inputWeek") {
                            this.isInputWeek = "inputWeek";
                        } else if (key == "inputDh") {
                            this.isInputDh = "inputDh";
                        }
                    }
                } else { //为空时，消除提示
                    if (key == "mrexpose") {
                        this.isMrExpose = "";
                    } else if (key == "mrclick") {
                        this.isMrClick = "";
                    } else if (key == "inputWeek") {
                        this.isInputWeek = "";
                    } else if (key == "inputDh") {
                        this.isInputDh = "";
                    }
                }
            },
            checkYuan(obj, key) {
                // 只能是数字，和一个点，点后两位小数
                let yuanRegex = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                if (obj) {
                    if (yuanRegex.test(obj)) { //true
                        if (key == "week") {
                            this.isWeek = "";
                        } else if (key == "date") {
                            this.isDate = "";
                        }
                    } else { //false
                        if (key == "week") {
                            this.isWeek = "week";
                        } else if (key == "date") {
                            this.isDate = "date";
                        }
                    }
                } else {
                    if (key == "week") {
                        this.isWeek = "";
                    } else if (key == "date") {
                        this.isDate = "";
                    }
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "../../style/mixin";
    .input-create-set {
        // head style
        .template-hd {
            padding: 16px 0 18px 30px;
            border-bottom: 1px solid $bc;
            @include bg-white($fc);
        } // body style
        .template-bd {
            padding: 20px 0 8px 33px;
            margin-bottom: 20px;
            @include bg-white($fc);
            .select-info-tip {
                color: #ff7a81;
                padding: 10px 0 0 16px;
            }
        } // each row style, contain label and input
        .basic-set-row {
            margin-bottom: 10px;
            .el-radio__label {
                font-size: 12px;
            } // define label and input style
            .neccessary,
            .data-item {
                line-height: 38px;
                height: 38px;
            }
            .data-item {
                color: $firstc;
                padding-right: 14px;
            }
            .error-tip {
                padding-left: 23px;
                color: #ff6870;
            }
            .neccessary {
                color: #ff7a81;
                width: 16px;
                text-align: left;
            }
            .el-input {
                width: 240px;
            }
            &.plan-name .el-input {
                width: 255px;
            } // yuan unit adjust
            .per-unit {
                margin: 0 0 9px 213px;
            } // time unit choose select
            .el-input--suffix {
                width: 120px!important;
            }
            .close-icon-adjust .el-range__close-icon{
                position: absolute;
                right: 27px;
                top: 2px;
                float: none;
            }
        } //投放范围
        .input-area {
            .template-bd {
                padding: 20px 0 18px 31px;
            }
            .el-checkbox+.el-checkbox {
                margin-left: 20px;
            }
            .put-img {
                padding: 5px;
                vertical-align: -3px;
                border: 1px solid #e1e7f0;
                border-radius: 5px;
            }
            .is-checked .put-img {
                border: 1px solid #6cabff;
            }
        } // 控量与出价
        .control-price {
            padding: 20px 0 20px 30px;
            .basic-set-row {
                margin-bottom: 1px;
                .data-item {
                    color: $firstc;
                    width: 99px;
                }
            }
            .set-time-item {
                padding-left: 213px;
                .per-unit {
                    margin-left: 0;
                }
                .el-inferior-title {
                    margin: 0 0 8px 100px;
                    @include sc(12px, #515974);
                }
                .el-select {
                    margin-right: 6px;
                }
            }
        }
        .el-tabs__item {
            padding: 0;
            &:nth-child(2),
            &:last-child {
                padding-left: 9px!important;
            }
        }
        .el-tabs--card>.el-tabs__header {
            border: 0 none;
            margin-bottom: 8px;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__nav {
            border: 0 none;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item {
            border: 0 none;
        }
        .el-vertical-line {
            // margin: 0 9px;
            margin-left: 9px;
            color: #e1e7f0;
            height: 24px;
        }
        .select-item {
            @include sc(12px, #515974);
            display: inline-block;
            height: 38px;
            line-height: 38px;
            padding: 0 20px;
            border: 1px solid transparent;
            border-radius: 5px;
            float: left;
        }
        .is-active .select-item {
            background-color: #ecf3fb;
            border: 1px solid #6cabff;
            color: #6cabff;
        } // define special row style
        .set-second-row {
            // padding-left: 99px;
            .el-input {
                width: 240px;
            }
            .el-radio__label {
                padding-left: 49px;
            }
        } // frequent control
        .frequent-control {
            padding-left: 44px;
            .set-second-row {
                padding-left: 0;
                width: 90%;
                .el-radio__label,
                .el-radio__input.is-checked+.el-radio__label {
                    margin: 0 10px 0 50px;
                }
            }
            .el-input {
                width: 240px;
            }
            .data-item {
                padding-right: 10px;
            }
        } // set time
        .set-time-item {
            padding-left: 80px;
            width: 90%;
            .el-radio__label {
                margin: 0 1px 0 5px!important;
            }
            .el-radio .el-radio__label {
                visibility: hidden;
                margin: 0!important;
            }
            .data-item {
                margin: 0!important;
                padding: 0 10px 0 6px;
            }
            .el-input {
                width: 240px;
            }
        }
        .el-input__inner {
            padding-left: 20px!important;
        }
        .unit {
            @include topRightRadius(5px);
            @include bottomRightRadius(5px);
        }
        .el-radio__input+.el-radio__label,
        .el-radio__input.is-checked+.el-radio__label {
            color: #5d647d;
            font-size: 12px;
            margin: 0 11px 0 10px;
            padding: 0;
        } // date input color add
        .direct-requirement {
            position: relative;
        }
       .speedStyle .el-tabs__nav .is-disabled .select-item{
            display: inline-block;
            color: #c0c4cc;
            cursor: not-allowed;
            background-image: none;
            background-color: #fff;
            border-color: #ebeef5;
        }
    }
</style>