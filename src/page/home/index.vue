
<template>

    <el-main class="home-content">
        <el-row>
            <el-col :span="12">
                <div class="grid-content grid-content-first">
                    <div class="role-wrap">
                        <!-- ad role information -->
                        <div class="role-info">
                            <span class="role-gender"></span>
                            <span class="role-meeting">{{currentuser&&  currentuser.name}}，您好~</span>
                        </div>
                    </div>
                    <!-- ad role information link -->
                    <div class="info-box">
                        <a href="javascript:void(0)" class="single-link hvr-pulse" @click='skip("space?activeName=second")'>客户信息</a>
                        <a href="javascript:void(0)" class="single-link hvr-pulse">历史投放记录</a>
                        <a href="javascript:void(0)" class="single-link hvr-pulse" @click='skip("space")'>个人信息</a>
                        <a href="javascript:void(0)" class="single-link hvr-pulse">消息提醒 </a>
                    </div>
                    <!-- ad information number -->
                    <el-row>
                        <el-col :span="12" class="ad-sum-num border-bottom-2">
                            <p class="ad-expose-num">今日帐户消耗：</p>
                            <div class="expose-num">{{homeBaseInfo.consume}}</div>
                        </el-col>
                        <el-col :span="12" class="ad-sum-num border-bottom-2">
                            <p class="ad-click-num">帐户可用余额：</p>
                            <div class="click-num">{{homeBaseInfo.balance}}</div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content setting-box border-bottom-2">
                    <div class="setting">
                        <p class="setting-hd ">快速投放设置</p>
                        <a href="javascript:void(0)" class="single-link el-link-add hvr-pulse" @click="createplan">
                            <i class="add-iron">+</i>
                            <span class="add-msg ">配置投放计划</span>
                        </a>
                        <el-row>
                            <el-col :span="8" class="ad-sum-num">
                                <p class="ad-expose-num">已配置投放计划（组）：</p>
                                <div class="expose-num"><a href="javascript:void(0)" class="hvr-pulse" @click='skipOther("plantable/" +currentCheckedAd,14)'>{{homeBaseInfo?homeBaseInfo.fixed:"数据加载中..."}} </a></div> 
                            </el-col>
                            <el-col :span="8" class="ad-sum-num">
                                <p class="ad-click-num">在投创意数量（个）：</p>
                                <!-- <div class="expose-num">{{homeBaseInfo.camcount}}</div> -->
                                  <div class="expose-num"><a href="javascript:void(0)" class="hvr-pulse" @click='skipOther("list?flag",7)'>{{homeBaseInfo.camcount}} </a></div> 
                            </el-col>
                            <el-col :span="8" class="ad-sum-num">
                                <p class="ad-click-num">可覆盖媒体数量（家）：</p>
                                <!-- <div class="expose-num">{{homeBaseInfo.plant}}</div> -->
                                  <div class="expose-num"><a href="javascript:void(0)" class="hvr-pulse" @click='skipOther("resourse",8)'>{{homeBaseInfo.plant}} </a></div> 
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="second-row">
            <el-col :span="24">
                <div class="grid-content border-bottom-2">
                    <!-- <span class="label-title">客户:</span>
                        <el-select v-model="valueAdvertiser" placeholder="默认客户" @change="getAdvertiser" filterable>
                            <el-option v-for="item in advertiser" :key="item.id" :label="item.com_name" :value="item.id">
                            </el-option>
                        </el-select> -->
                    <!-- <span class="label-title">投放计划:</span>
                    <el-select v-model="valuePlan" placeholder="默认计划" @change="getPlanOptions">
                        <el-option v-for="item in planOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select> -->
                    <span class="label-title">时间周期：</span>
                    <el-date-picker v-model="timePeriod" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
                    </el-date-picker>
                    <el-button :type='setDateType=="今天"?"date default-date":"date"' @click='shortcuts("今天")' class="hvr-wobble-horizontal">今天</el-button>
                    <el-button :type='setDateType=="昨天"?"date default-date":"date"' @click='shortcuts("昨天")' class="hvr-wobble-horizontal">昨天</el-button>
                    <el-button :type='setDateType=="过去7天"?"date default-date":"date"' @click='shortcuts("过去7天")' class="hvr-wobble-horizontal">过去7天</el-button>
                    <!-- default-date -->
                    <el-button :type='setDateType=="过去30天"?" date default-date":"date"' @click='shortcuts("过去30天")' class="hvr-wobble-horizontal">过去30天</el-button>
                </div>
            </el-col>
        </el-row>
        <el-col :span="24" class="curve-chart-content border-bottom-2">
            <!-- 放曲线图 -->
            <!-- <iframe id="reportFrame" class="report-frame" width="95%" height="400" src="http://140.143.192.180:8075/WebReport/ReportServer?formlet=Form4.frm&uid=5"></iframe> -->
            <iframe id="reportFrame" class="report-frame" width="95%" height="400" src=""></iframe>
        </el-col>
    </el-main>
</template>


<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        home
    } from "../../service/index";
    import store from 'store';
    import moment from "../../common/moment";
    import {isPermission} from "../../common/utils";
   
    export default {
        mounted() {
            let self = this;
            this.setDefaultDate(); //初始化 时间周期

                    this.getHomeBase(this.$store.state.currentCheckedAd);

            
            if (store.get("user")) {
               
                this.getCurrentUser(store.get("user"));
                
            }
            this.setBreadCrumb(this.$route.path.replace("/", ""));

            this.filterData();
        },
        data: function() {
            return {
                advertiser: [], //默认客户列表
                admodel: "", //已选择客户
                adclick: "正在获取数据...", //点击率
                adview: "正在获取数据...", //曝光率
                value: "", //客户
                valuePlan: '', //投放计划
                timePeriod: "", //时间周期
                //planOptions: [], //投放计划列表
                valueAdvertiser: "", //图表客户
                currentAd: {},
                defaultDate: "今天",
               

            };
        },
        methods: {
            ...mapActions([
                "getCurrentUser", 
                "getSideBar", 
                "setBreadCrumb", 
                "getCurrnetAd",
                "getHomeBaseInfo",
                "getCurrnetCheckedAd",
            ]),
            setPermission(val){
                return isPermission(val);
            },
            getHomeBase(val){
                home.getindexinfo({
                    id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        this.getHomeBaseInfo(res.data.data);
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });

            },
            setDefaultDate() {
                // const end = new Date();
                    // const start = new Date();
                    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    // this.timePeriod = [start, end]
                    this.timePeriod = [new Date(), new Date()]
            },
            getCurrentAd(val) {
                //console.log(this.getAdItem(val));
                this.currentAd = this.getAdItem(val);
                //this.getCurrnetAd(this.currentAd);
                store.set("currentAd", this.currentAd);
            },
            getAdItem(val) {
                let result = {};
                for (var j = 0; this.advertiser.length; j++) {
                    if (!this.advertiser[j]) {
                        break;
                    }
                    if (this.advertiser[j].id == val) {
                        result = {
                            id: val,
                            name: this.advertiser[j].com_name
                        }
                    }
                }
                return result;
            },
            skipOther(val,num) {
                if(this.setPermission(num)){
                     this.$router.push({
                         path: "/" + val
                     });
                }else{
                      this.$message({
                        message: '无权限访问!',
                        type: 'warning'
                    });
                    return;
                }
            },


            skip(val) {
                this.$router.push({
                    path: "/" + val
                });
            },
            adchange() {
                this.getClickView(this.admodel);
                this.getCurrnetAd(this.admodel);
            },
            getClickView(data) {
                home.publicAccountClickView({
                        uid: data
                    })
                    .then(res => {
                        this.adclick = res.data.data.click;
                        this.adview = res.data.data.view;

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    });
            },
            go() {
                if (!this.value) {
                    this.$message({
                        message: '请选择客户!',
                        type: 'warning'
                    });
                    return;
                }
                this.$router.push({
                    path: "/plantable/" + this.value
                });
            },
            createplan() {
                if (!this.$store.state.currentCheckedAd) {
                    this.$message({
                        message: '请选择客户!',
                        type: 'warning'
                    });
                    return;
                }

                if(this.setPermission(14)){
                    this.$router.push({
                          path: "/plantable/" + this.$store.state.currentCheckedAd//投放计划列表页面
                    });
                }else{
                     this.$message({
                        message: '无权限访问!',
                        type: 'warning'
                    });
                    return;
                }


            },
            getAdvertiser() { //客户下拉显示图表
                this.valuePlan = '';
                this.getPlanByAdvertiser(this.valueAdvertiser);
                //document.getElementById("reportFrame").src = "http://140.143.192.180:8075/WebReport/ReportServer?formlet=Form4.frm&uid=" + this.value;
                this.filterData();
            },
            //获得投放计划
            getPlanByAdvertiser(id) {
                let that = this;
                home.publicCampaignAll({
                    id: id
                }).then(res => {
                    if (res.data.code == 0) {
                        that.planOptions = res.data.data;
                        let Data = res.data.data;
                        let result = [];
                        Data.forEach(function(item, index) {
                            result.push({
                                value: item.id,
                                label: item.name
                            })
                        })
                        that.planOptions = result;
                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            getPlanOptions() { //获得投放计划
                //document.getElementById("reportFrame").src = "http://140.143.192.180:8075/WebReport/ReportServer?formlet=Form4.frm&uid=" + this.value;
                this.filterData();
                this.$store.state.planid=false;
            },
            shortcuts(val) {
                this.defaultDate = val;
                if (val == "今天") {
                    this.timePeriod = [new Date(), new Date()]
                }
                if (val == "昨天") {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    this.timePeriod = [date, date]
                }
                if (val == "过去7天") {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    this.timePeriod = [start, end]
                }
                if (val == "过去30天") {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    this.timePeriod = [start, end]
                }
                this.filterData();
            },
            changeDate() {
                this.defaultDate = "";
                this.filterData();
            },
            filterData() {

                let start = moment(this.timePeriod[0]).format("YYYY-MM-DD");
                let end = moment(this.timePeriod[1]).format("YYYY-MM-DD");

                if (this.$store.state.currentCheckedAd  && this.valuePlan && start != end) {
                    document.getElementById("reportFrame").src = "https://adodata.keda-digital.com:8443/WebReport/ReportServer?reportlet=adx%2Findex_cam_date.cpt&uid=" + this.$store.state.currentCheckedAd + "&campaign_id=" + this.valuePlan + "&start_date=" + start + "&end_date=" + end;
                    return;
                }
                //已选择条件  客户 投放计划 投放周期且投放周期开始时间与结束时间相等
                if (this.$store.state.currentCheckedAd  && this.valuePlan && start == end) {
                document.getElementById("reportFrame").src = "https://adodata.keda-digital.com:8443/WebReport/ReportServer?reportlet=adx%2Findex_cam_hour.cpt&uid=" + this.$store.state.currentCheckedAd + "&campaign_id=" + this.valuePlan + "&start_date=" + start;
                    return;
                }
                //已选择条件  客户  投放周期且投放周期开始时间与结束时间不相等相等  默认条件
                if (this.$store.state.currentCheckedAd && start != end) {
                    document.getElementById("reportFrame").src = "https://adodata.keda-digital.com:8443/WebReport/ReportServer?reportlet=adx%2Findex_adv_date.cpt&uid=" + this.$store.state.currentCheckedAd + "&start_date=" + start + "&end_date=" + end;
                    //
                    return;
                }
                //已选择条件  客户  投放周期且投放周期开始时间与结束时间相等  
                if (this.$store.state.currentCheckedAd  && start == end) {
                    
                    document.getElementById("reportFrame").src = "https://adodata.keda-digital.com:8443/WebReport/ReportServer?reportlet=adx%2Findex_adv_hour.cpt&uid=" + this.$store.state.currentCheckedAd + "&start_date=" + start;
                    return;
                }
            },
            clearAll(){
                this.valuePlan="";
            }
        },
        computed: {
            ...mapState({
                currentuser: "currentuser",
                planOptions:"planOptions",
                planid:"planid",
                homeBaseInfo:"homeBaseInfo",
                currentCheckedAd:"currentCheckedAd"
            }),
            stateplanid() {
                return this.$store.state.planid;
            },
             statecurrentCheckedAd() {
                return this.$store.state.currentCheckedAd;
            },
            setDateType() {
                return this.defaultDate;
            },
            click() {
                return this.adclick;
            },
            view() {
                return this.adview;
            },
        },
        watch: {
            stateplanid() {
                if(this.$store.state.planid){
                    this.valuePlan='';
                    
                }
            },
            statecurrentCheckedAd() {
                this.filterData();
            }
        }
    };
</script>

        
<style lang="scss">
    @import "../../style/mixin";
    @import "../../style/common";
    // @import url("../../style//hover/hover-min");
    .home-content {
        // wrap content
        .grid-content {
            background-color: $fc;
        }
        .grid-content-first {
            margin-right: 20px;
            padding-top: 35px;
        } // ad role information
        .role-wrap {
            text-align: center;
        }
        .role-info {
            .role-gender {
                background: url("../../style/image/role/role_men.svg") 0 0 no-repeat;
                width: 46px;
                height: 46px;
                margin: 0;
                display: inline-block;
            }
            .role-meeting {
                font-size: 20px;
                line-height: 46px;
                margin: 0 25px 0 15px;
                vertical-align: top;
            }
            .el-select {
                vertical-align: 17px;
            }
        } // user information... buttons
        .info-box {
            margin: 10px 0 0; // margin: 27px 0 0;
            text-align: center;
            .single-link {
                margin: 0 10px 10px 0;
                &:hover {
                    border-color: #6cabff;
                    color: #6cabff;
                }
            }
            .num {
                position: absolute;
                top: 7px;
                right: 10px;
                @include xx(22px,
                22px,
                10px);
            }
        } // show expose click num
        .ad-sum-num {
            border-top: 1px solid $bc;
            padding: 13px 0;
            p {
                margin: 0 0 13px 20px;
                color: #686f87;
            }
            .expose-num,
            .click-num {
                text-align: center;
                font-size: 24px;
            }
            .expose-num {
                color: #515974;
            }
            .click-num {
                color: #ff6870;
            }
            &:first-child {
                border-right: 1px solid $bc;
            }
        } // right col setting box
        .setting-box {
            padding-top: 35px;
            .setting-hd {
                font-size: 20px;
                color: #333333;
                margin-bottom: 21px;
                padding-left: 30px;
            }
            .single-link {
                font-size: 12px;
                color: #6cabff;
                width: 130px;
                border: 1px solid #6cabff;
                margin: 0 0 23px 30px;
            }
            .create-plan {
                .single-link {
                    width: 115px;
                }
            }
            .ad-sum-num{
                @include sc(14px, #7f8599);
                font-weight: bold;
                padding-bottom: 10px;
                &:nth-child(2){

                    border-right: 1px solid #e1e7f0;
                }
                .ad-expose-num{
                    margin-bottom: 11px;
                }
            }
            .expose-num a{
                color: #6cabff;
            }
            .el-select {
                margin-right: 6px;
            }
            .fast-create {
                color: #02c27c;
                margin-left: 5px;
            }
        } // put requirement and curve chart
        .second-row {
            margin: 20px 0 10px;
            .grid-content {
                padding: 20px 0 20px 20px;
            }
            .label-title {
                margin: 0 6px 0 16px;
                color: $firstc;
                &:first-child {
                    margin: 0 6px 0 0;
                }
            }
            .el-button {
                // margin-bottom: 10px;
            }
            .el-button+.el-button {
                margin-left: 5px;
            }
            .el-select {
                width: 180px;
            }
        }
        .curve-chart-content {
            padding: 30px;
            background-color: #ffffff;
            .report-frame {
                width: 100%;
                border: 0 none;
            }
        }
    }
    @media screen and (max-width:1680px) {
        .home-content .info-box .single-link {
            width: 140px;
        }
    }
    @media screen and (max-width:1366px) {
        .home-content .info-box .single-link {
            width: 100px;
        }
        
        
    }
</style>