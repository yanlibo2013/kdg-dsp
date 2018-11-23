<template>
    <!-- 计划列表 -->
    <div class="plan-list" name="list">
        <el-main>
            <el-col :span="24" class="margin-bottom-10 border-bottom-2">
                <div class="number-hd">
                    <span class="plan-balance">可用余额：</span>
                    <span class="balance-num hvr-bounce-in">
                                <span class="balance-unit">¥</span>{{homeBaseInfo.balance}}
                    </span>
                    <p class="data-source">来源：{{currentCheckedName}}</p>
                </div>
            </el-col>
            <el-col :span="6" class="margin-right-20 border-bottom-2">
                <h1 class="template-hd">曝光点击：</h1>
                <div class="expose-num-box">
                    <span class="expose-hd left">曝光数：</span>
                    <p class="expose-num">{{adview}}</p>
                </div>
                <div class="expose-num-box">
                    <span class="expose-hd left">点击数：</span>
                    <p class="expose-num">{{adclick}}</p>
                </div>
            </el-col>
            <el-col :span="6" class="margin-right-20 border-bottom-2">
                <h1 class="template-hd">投放终端：</h1>
                <div class="">
                    <!-- <iframe id="" width="100%" height="194" frameborder="no" src="http://140.143.210.73:8080/WebReport/ReportServer?formlet=terminal/put_terminal.frm&uid=15"></iframe> -->
                    <iframe id="frist" width="100%" height="194" frameborder="no" src=""></iframe>
                </div>
            </el-col>
            <el-col :span="6" class="margin-right-20 border-bottom-2">
                <h1 class="template-hd">展现类型：</h1>
                <div class="">
                    <iframe id="sec" width="100%" height="194" frameborder="no" src=""></iframe>
                </div>
            </el-col>
            <el-col :span="6" class="border-bottom-2">
                <h1 class="template-hd">CTR趋势：</h1>
                <iframe id="third" width="100%" height="194" frameborder="no" src=""></iframe>
            </el-col>
            <el-col :span="24">
                <div class="grid-content">
                    <div class="input-plan-box">
                        <a href="javascript:void(0)" 
                         v-show="setPermission(15)"
                        class="single-link el-link-add hvr-pulse" @click="go">
                            <i class="add-iron">+</i>
                            <span class="add-msg">创建投放计划</span>
                        </a>
                        <el-button type="click"  v-show="setPermission(17)" :class="{' open-clicked1':isLighten}" @click="open" class="hvr-buzz-out">开启</el-button>
                        <el-button type="click" v-show="setPermission(17)" :class="{'close-clicked1':isLighten}" @click="close" class="hvr-buzz-out">关闭</el-button>
                        <el-button type="click" v-show="setPermission(18)" :class="{'delete-clicked1':isLighten}" @click="del" class="hvr-buzz-out">删除</el-button>
                        <el-button type="click" v-show="setPermission(59)" :class="{'delete-clicked1':isLighten}" @click="copy" class="hvr-buzz-out">复制</el-button>
                    </div>
                    <div class="seek-box">
                        <el-select v-model="value" placeholder="请选择" @change="filterDataByStatus(value)">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="el-input el-input--prefix">
                            <input autocomplete="off" placeholder="请输入关键词" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="searchname" @keyup="filterData(searchname)" />
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
                <el-table :data="planlist.data" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading2" element-loading-text="拼命加载中" class="plan-list-table">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="计划名称" width="220">
                        <template slot-scope="scope">
                                                    <span><a class="link-jump" 
                                                    href="javascript:void(0);" @click="goRelation(scope.row.id)">{{ scope.row.name }}</a></span>
                                                    <a href="javascript:void(0);"  v-show="setPermission(15)" class="el-icon-revise" @click="edit(scope.row.id)"></a>
                                                        <!-- <a :href='"/editplan/" + customeid + "/" + scope.row.id' class="el-icon-revise" ></a> -->
</template>
                    </el-table-column>
                    <!-- <el-table-column prop="flag" label="状态">
<template slot-scope="scope">
    <el-switch v-model="scope.row.flag==1?true:false" @change="singleswitch(scope.row)" active-text="关闭" inactive-text="开启">
    </el-switch>
</template>budget_num
                    </el-table-column> -->
                    <el-table-column prop="flag" label="状态" width="80">
<template slot-scope="scope">
    <el-switch v-model="scope.row.flag==1?true:false" @change="singleswitch(scope.row)" active-text="关闭" inactive-text="开启">
    </el-switch>
</template>
                    </el-table-column>
                    <el-table-column prop="num" label="创意" width="70">
<template slot-scope="scope">
     {{scope.row.cr_num}}
</template>
                    </el-table-column>
                    <el-table-column prop="authority" label="预算">
<template slot-scope="scope">
    <div v-if="scope.row.budget_type=='0'">
        无限制
    </div>
    <div v-else-if="scope.row.budget_type=='1'">
        周期预算：{{scope.row.budget_num}}
    </div>
    <div v-else-if="scope.row.budget_type=='2'">
        每日预算：{{scope.row.budget_num}}
    </div>
</template>
                    </el-table-column>
                    <!-- <el-table-column prop="" label="消耗进度">
<template slot-scope="scope">
    <div role="progressbar" :aria-valuenow="scope.row.precision" aria-valuemin="0" aria-valuemax="100" class="el-progress el-progress--line" :class="{'green':scope.row.precision<30,'yellow':30<scope.row.precision<70,'red': scope.row.precision>30}">
        <div class="el-progress-bar">
            <div class="el-progress-bar__outer">
                <div class="el-progress-bar__inner" :style="'width:'+ scope.row.precision +'%;'">
                </div>
            </div>
        </div>
        <div class="el-progress__text">{{scope.row.precision}}%</div>
    </div>
</template>
                    </el-table-column> -->
                    <el-table-column prop="" label="最高出价">
<template slot-scope="scope">
    <div v-if="scope.row.settlement_type=='1'">
        CPM：{{scope.row.settlement_price}}元
    </div>
    <div v-else-if="scope.row.settlement_type=='2'">
        CPC：{{scope.row.settlement_price}}元
    </div>
    <div v-else-if="scope.row.settlement_type=='0'">
        无限制
    </div>
</template>
                    </el-table-column>
                    <el-table-column prop="frequency_num" label="投放周期">
<template slot-scope="scope">
    <div v-if="scope.row.start_date&&scope.row.start_date !='' && scope.row.end_date&&scope.row.end_date !=''">
        {{scope.row.start_date}}~{{scope.row.end_date}}
    </div>
    <div v-else-if="scope.row.start_date =='' && scope.row.end_date ==''">
        无限制
    </div>
    <div v-else-if="scope.row.start_date =='' || scope.row.end_date ==''">
        {{scope.row.start_date}} {{scope.row.end_date}}
    </div>
</template>
                        
                    </el-table-column>
                    <el-table-column prop="num" label="每日上限">
<template slot-scope="scope">
    <div v-if="scope.row.imp_limit&&scope.row.imp_limit !=''">
        每日曝光上限：{{scope.row.imp_limit}}
    </div>
    <div v-else>
        每日曝光上限：无
    </div>
    <div v-if="scope.row.click_limit&&scope.row.click_limit !=''">
        每日点击上限：{{scope.row.click_limit}}
    </div>
    <div v-else>
        每日点击上限：无
    </div>
    <!-- <div v-if="scope.row.imp_limit =='' && scope.row.click_limit ==''">
                无限制
            </div> -->
</template>
                    </el-table-column>
                    <el-table-column prop="frequency_num" label="频次">
<template slot-scope="scope">
    <div v-if="scope.row.frequency_type=='0' || scope.row.frequency_num == '0'">
        不限制
    </div>
    <div v-else-if="scope.row.frequency_type=='1' && scope.row.frequency_num != '0'">
        按周期 {{scope.row.frequency_num}}次
    </div>
    <div v-else-if="scope.row.frequency_type=='2' && scope.row.frequency_num != '0'">
        单人每天 {{scope.row.frequency_num}}次
    </div>
    <div v-else-if="scope.row.frequency_type=='3' && scope.row.frequency_num != '0'">
        单人每小时 {{scope.row.frequency_num}}次
    </div>
</template>
                        
                    </el-table-column>
                    
                    <el-table-column prop="update_time" label="更新时间" width="110">
<template slot-scope="scope">
    <span class="update-time">{{scope.row.update_time}}</span>
</template>
                    </el-table-column>
                </el-table>
                <!-- pagenation -->
                <div class="block border-bottom-2">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="planlist&&planlist.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="planlist&&planlist.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="planlist&&planlist.total">
                    </el-pagination>
                </div>
            </el-col>
        </el-main>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import store from 'store';
    import {
        home,
        put,
        end,
        creative
    } from "../../service/index";

       import {
        isPermission
    } from "../../common/utils";

    const sizeOptions = ["300x250", "320x250", "1000x90", "480x320", "1280x720"];
    const typeOptions = ["Banner", "Video", "Native"];
    const statusOptions = ["全部", "开启", "关闭"]; //状态集合 0全部 1开启 2 关闭
    export default {
        data() {
            return {
                currentPage: "",
                pageSize: 10,
                // adclick: "正在获取数据...", //点击率
                // adview: "正在获取数据...", //曝光率
                multipleSelection: [],
                loading2: false,
                searchname: "",
                value3: "",
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                checkAll: false, //创意列表全选
                checkedSizes: ["上海", "北京"],
                checkedTypes: ["上海", "北京"],
                checkedStatuss: ["上海", "北京"],
                sizes: sizeOptions,
                types: typeOptions,
                statuss: statusOptions,
                isIndeterminate: true,
                checkedType: ["aa", "bb"],
                types: typeOptions,
                input: "",
                textarea2: "",
                tableData: [{
                        name: "系统管理员",
                        status: "关",
                        num: "17",
                        authority: "10/35",
                        date: "2016-05-02 16:51:08"
                    },
                    {
                        name: "销售",
                        status: "开",
                        num: "17",
                        authority: "10/35",
                        date: "2016-05-02 16:51:08"
                    },
                    {
                        name: "产品",
                        status: "开",
                        num: "17",
                        authority: "10/35",
                        date: "2016-05-02 16:51:08"
                    },
                    {
                        name: "运营",
                        status: "开",
                        num: "17",
                        authority: "10/35",
                        date: "2016-05-02 16:51:08"
                    }
                ],
                options: [{
                        value: "",
                        label: "全部"
                    }, {
                        value: "1",
                        label: "开启"
                    },
                    {
                        value: "2",
                        label: "关闭"
                    }
                ],
                value: '',
                openClass: [],
                closeClass: [],
                deleteClass: [],
                customeid: "",
                isLighten: false,
                custom: "",
                clearIt: false, //关闭图标设置
                showStatus: "",
                confirmBtnCustom: "",
                boxCustomClass: "",
               
            };
        },
        mounted() {
            this.getCurrentUser(store.get("user"));
            this.getCurrnetAd(store.get("currentAd"));
            this.customeid = this.$route.params.id;
            home
                .publicAccountClickView({
                    uid: this.$route.params.id
                })
                .then(res => {
                    if (res.data.code == 0) {
                        // this.adclick = res.data.data.click;
                        // this.adview = res.data.data.view;
                        this.getAdClick(res.data.data.click);
                        this.getAdView(res.data.data.view);
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            this.getplanlist({
                page: 1,
                pagesize: 10,
                // flag: "1",
                ad_id: this.$route.params.id
            });
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.initReport();
            // 加载广告主
            end.customInfo({
                id: this.$route.params.id
            }).then(res => {
                this.custom = res.data.data;
            });
        },
        components: {
            // headTop
        },
        computed: {
            click() {
                return this.adclick;
            },
            view() {
                return this.adview;
            },
            ...mapState({
                planlist: "planlist",
                homeBaseInfo: "homeBaseInfo",
                currentCheckedAd: "currentCheckedAd",
                currentCheckedName: "currentCheckedName",
                adclick: "adclick",
                adview: "adview"
                //    customInfo:"customInfo",
            }),
            statecurrentCheckedAd() {
                return this.$store.state.currentCheckedAd;
            },
        },
        methods: {
            setPermission(val){
                return isPermission(val);
            },
            ...mapActions(["camplistPage", "setBreadCrumb", "getCurrnetAd", "getCurrentUser", "getAdClick", "getAdView"]),
            initReport() {
                document.getElementById("frist").src = "https://adodata.keda-digital.com:8443/WebReport/ReportServer?formlet=adx%2Fput_terminal.frm&uid=" + this.$store.state.currentCheckedAd;
                document.getElementById("sec").src = "https://adodata.keda-digital.com:8443/WebReport/ReportServer?formlet=adx%2Freveal.frm&uid=" + this.$store.state.currentCheckedAd
                document.getElementById("third").src = "https://adodata.keda-digital.com:8443/WebReport/ReportServer?formlet=adx%2Ftendency.frm&uid=" + this.$store.state.currentCheckedAd
            },
            clearInput() {
                this.clearIt = false;
                this.searchname = "";
                this.getplanlist({
                    seachname: '',
                    page: 1,
                    pagesize: 10,
                    flag: this.value,
                    ad_id: this.$route.params.id
                });
            },
            copy() {
                console.log( creative.creativeCooy1)
               // debugger
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: "请选择操作记录",
                        type: "warning"
                    });
                    return;
                }
                creative.creativeCooy1({
                    id: this.getids(),
                  ad_id: parseInt(this.$route.params.id)
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            // message: res.data.msg,
                            message: "操作成功",
                            type: "success"
                        });

                       this.getplanlist({
                            page: this.currentPage,
                            pagesize: 10,
                            ad_id: this.$route.params.id
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
            filterDataByStatus(val) {
                console.log(val);
                this.getplanlist({
                    seachname: this.searchname,
                    page: this.planlist.current_page,
                    pagesize: 10,
                    flag: val,
                    ad_id: this.$store.state.currentCheckedAd,
                    // ad_id: this.$route.params.id
                });
            },
            filterData(val) {
                // debugger;
                this.searchname ? this.clearIt = true : this.clearIt = false;
                this.getplanlist({
                    seachname: val,
                    page: this.planlist.current_page,
                    pagesize: 10,
                    flag: this.value,
                    ad_id: this.$store.state.currentCheckedAd,
                    // ad_id: this.$route.params.id
                });
            },
            go() {
                //console.log("创建投放计划");
                this.$router.push({
                    path: "/createplan/" + this.$store.state.currentCheckedAd
                });
            },
            goCreateList() {
                this.$router.push({
                    path: "/createlist/" + this.$route.params.id
                });
            },
            getplanlist(data) {
                put.camplistPage(data).then(res => {
                    if (res.data.code == 0) {
                        this.camplistPage(res.data.data);
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
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
            singleswitch(rows) {
                if(rows.flag == 2) {
                    this.showStatus='开启';
                    this.boxCustomClass = 'customOpenBox';
                    this.confirmBtnCustom = 'el-button--confirm';
                } else {
                    this.showStatus='关闭';
                    this.boxCustomClass = 'customCloseBox';
                    this.confirmBtnCustom = 'close-clicked1';
                }

                this.$confirm('确认'+ this.showStatus + '所选计划？', '', {
                    customClass: this.boxCustomClass,
                    confirmButtonText: '确定',
                    confirmButtonClass: this.confirmBtnCustom,
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
                    if (rows.flag == 2) { //开启
                        this.loading2 = true
                        put.campflagOpenajax({
                            ad_id: parseInt(this.$route.params.id),
                            id: [rows.id]
                        }).then(res => {
                            if (res.data.code == 0) {
                                this.loading2 = false;
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getplanlist({
                                    page: this.currentPage,
                                    pagesize: 10,
                                    // flag: "1",
                                    ad_id: this.$store.state.currentCheckedAd
                                });
                            } else {
                                this.loading2 = false;
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
                        put.campflagCloseajax({
                            ad_id: this.$store.state.currentCheckedAd,
                            id: [rows.id]
                        }).then(res => {
                            if (res.data.code == 0) {
                                this.loading2 = false;
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getplanlist({
                                    page: this.currentPage,
                                    pagesize: 10,
                                    // flag: "1",
                                    ad_id: this.$store.state.currentCheckedAd
                                });
                            } else {
                                this.loading2 = false;
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
                        console.log("else");
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
               
            },
            //点击图标刷新页面
            reload() {
                //window.location.reload();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                // this.actionReportList({ page: val, page_size: this.pageSize });   
                this.pageSize = val;
                this.getplanlist({
                    page: 1,
                    pagesize: this.pageSize,
                    // flag: "1",
                    ad_id: this.$store.state.currentCheckedAd
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.getplanlist({
                    page: val,
                    pagesize: this.pageSize,
                    ad_id: this.$store.state.currentCheckedAd
                });
                this.currentPage = val;
                console.log(this.currentPage);
            },
            //创意列表全选
            handleCheckAllChange(val) {
                this.checkedSizes = val ? sizeOptions : [];
                this.checkedTypes = val ? typeOptions : [];
                this.checkedStatuss = val ? statusOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedSizesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.sizes.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.sizes.length;
            },
            handleCheckedTypesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.types.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.types.length;
            },
            handleCheckedStatussChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.statuss.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.statuss.length;
            },
            //计划列表
            open() {
                console.log("开启操作");
                console.log(this.currentPage);
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('确认开启所选计划？', '', {
                    customClass: 'customOpenBox',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'el-button--confirm',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					this.loading2 = true;
					
					put.campflagOpenajax({
						ad_id: this.$store.state.currentCheckedAd,
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							this.getplanlist({
								page: this.currentPage,
								pagesize: 10,
								// flag: "1",
								ad_id: this.$route.params.id
							});
						} else {
							 this.loading2 = false;
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
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('确认关闭所选计划？', '', {
                    customClass: 'customCloseBox',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'close-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
                    this.loading2 = true;
                    
					put.campflagCloseajax({
						ad_id: parseInt(this.$route.params.id),
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							this.getplanlist({
								page: this.currentPage,
								pagesize: 10,
								// flag: "1",
								ad_id: this.$route.params.id
							});
						} else {
							 this.loading2 = false;
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: "info"
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
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('确认删除所选计划？', '', {
                    customClass: 'customDeleteBox',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'delete-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					this.loading2 = true;
					put.campcampDelect({
						ad_id:  parseInt(this.$route.params.id),
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							this.getplanlist({
								page: this.planlist.current_page,
								pagesize: 10,
								// flag: "1",
								ad_id: this.$route.params.id
							});
						} else {
							 this.loading2 = false;
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
            getids() {
                let ids = [];
                for (var j = 0; j < this.multipleSelection.length; j++) {
                    ids.push(this.multipleSelection[j].id);
                }
                // return ids.toString();
                return ids;
            },
            getad_id() {
                let ids = [];
                for (var j = 0; j < this.multipleSelection.length; j++) {
                    ids.push(this.multipleSelection[j].ad_id);
                }
                // return ids.toString();
                return ids;
            },
            edit(val) {
                console.log("edit");
                this.$router.push({
                    path: "/editplan/" + this.$route.params.id + "/" + val
                });
            },
            goRelation(val) {
                if(this.setPermission(19)){
                     this.$router.push({
                        path: "/relation/" + this.$route.params.id + "/" + val
                    });
                }else{
                    return
                }
               
            }
        },
        watch: {
            statecurrentCheckedAd() {
                this.getplanlist({
                    ad_id: this.$store.state.currentCheckedAd,
                    page: 1,
                    pagesize: 10
                });
                home
                    .publicAccountClickView({
                        uid: this.$route.params.id
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            // this.adclick = res.data.data.click;
                            // this.adview = res.data.data.view;
                            this.getAdClick(res.data.data.click);
                            this.getAdView(res.data.data.view);
                        }
                        if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });
                this.initReport();
            }
        },
    };
</script>

<style lang="scss">
    @import '../../style/mixin';
    .plan-list {
        .template-hd {
            padding: 17px 0 17px 30px;
            border-bottom: 1px solid #e1e7f0;
        }
        .number-hd {
            padding: 19px 0 20px 30px;
            position: relative;
            background-color: #fff;
            .plan-balance {
                @include sc(16px, #7f8599);
            }
            .balance-num {
                @include sc(24px, #ff6870);
                font-weight: bold;
                .balance-unit {
                    font-weight: bold;
                    @include sc(16px, #ff6870);
                }
            }
            .data-source {
                position: absolute;
                right: 20px;
                top: 25px;
                @include sc(16px, #515974);
            }
        }
        .el-col-6 {
            width: 23.5%;
        }
        .el-main {
            background-color: transparent;
        }
        .el-col-6,
        .block {
            background-color: #fff;
        }
        .expose-hd {
            @include sc(14px, #686f87);
            padding-left: 10px;
        }
        .expose-num {
            @include sc(24px, #6cabff);
            font-weight: bold;
            text-align: center;
        }
        .expose-num-box {
            height: 99px;
            line-height: 99px;
            margin: 0 20px;
            border-bottom: 1px solid #e1e7f0;
            &:last-child {
                border-bottom: 0 none;
                .expose-num {
                    color: #6cd76e;
                }
            }
        }
        .mutiple-figures {
            background-color: #ffffff;
        }
        .input-plan-box {
            margin-top: 20px;
            padding: 20px 0 20px 30px;
            background-color: #fff;
            border-bottom: 1px solid #e1e7f0;
            .single-link {
                width: 115px;
                margin-right: 9px;
            }
            .add-iron {
                font-size: 22px;
            }
            .add-msg {
                vertical-align: 3px;
                margin-left: -8px;
                @include sc(12px, #6cabff);
            }
        } // seek box style
        .grid-content {
            position: relative;
        }
        .seek-box {
            position: absolute;
            right: 30px;
            top: 20px;
            .el-input,
            .el-select {
                width: 180px;
            }
            .el-select {
                margin-right: 8px;
            }
        } //table style
        //table style
        .el-table {
            th {
                background-color: #fafbfe;
            }
            th>.cell {
                color: #7e8499;
            }
            td.cell {
                color: $firstc;
            }
            .cell {
                font-size: 12px;
            }
            th:nth-child(3),
            td:nth-child(3),
            th:nth-child(4),
            td:nth-child(4) {
                text-align: center;
            }
            th:last-child,
            td:last-child {
                text-align: left;
                padding-right: 20px;
                color: #6cabff;
            }
            .update-time {
                color: #6cabff;
            } //progress style
            .el-progress__text {
                font-size: 12px;
            }
            .el-progress {
                .el-progress-bar {
                    width: 99%;
                }
                &.is-green .el-progress-bar__inner {
                    background-color: #6cd76e;
                }
                &.is-green .el-progress__text {
                    color: #6cd76e;
                }
                &.is-red .el-progress-bar__inner {
                    background-color: #ff6870;
                }
                &.is-red .el-progress__text {
                    color: #ff6870;
                }
                &.is-yellow .el-progress-bar__inner {
                    background-color: #fea763;
                }
                &.is-yellow .el-progress__text {
                    color: #fea763;
                }
                .el-progress-bar__outer {
                    height: 10px!important;
                    background-color: #f2f4fa;
                }
            }
        }
        .el-table-column--selection,
        .el-table-column--selection .cell {
            padding: 0 0 0 15px;
        }
        .el-icon-revise {
            cursor: pointer;
            float: right;
            background: url("../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            vertical-align: -4px;
            &:hover {
                background: url("../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
        .link-jump {
            color: #6cabff;
            width: 166px;
            display: table-cell;
            word-wrap: break-word;
            &:hover {
                text-decoration: underline;
            }
        }
        .basic-img {
            .el-input {
                width: 45%;
            }
        }
        
    }
    .customOpenBox,
    .customCloseBox,
    .customDeleteBox{
        .el-icon-close{
            background: url("../../style/image/common/close-icon.svg") 0 0 no-repeat;
        }
        .el-icon-warning{
            background: url("../../style/image/common/question_blue.svg") 0 0 no-repeat;
        }
    }
    .customCloseBox{
		.el-icon-warning{
            background: url("../../style/image/common/question_grey.svg") 0 0 no-repeat;
        }
	}
    .customDeleteBox{
		.el-icon-warning{
            background: url("../../style/image/common/question_red.svg") 0 0 no-repeat;
        }
	}
    @media screen and (max-width:1366px) {
        .plan-list .expose-num {
            font-size: 20px;
        }
    }
</style>