<template>
    <div class="advertise-list">
        <el-main>
            <!-- 审核筛选 start -->
            <el-col :span="24" class="margin-bottom-20">
                <h1 class="template-hd">审核筛选</h1>
                <div class="template-bd border-bottom-2">
                    <label for="" class="data-item">内审状态：</label>
                    <el-select class="filter-input" v-model="form.innerStatus" placeholder="请选择" @change="filterData('passpage1')">
                        <el-option v-for="item in innerAudit" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <label for="" class="data-item">外审状态：</label>
                    <el-select class="filter-input" v-model="form.outerStatus" placeholder="请选择" @change="filterData('passpage1')">
                        <el-option v-for="item in outerAudit" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                    <div class="last-item">
                        <label for="" class="data-item">公司ID：</label>
                        <input autocomplete="off" placeholder="请输入公司ID" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner filter-input" v-model="form.companyId" @keyup="filterData('passpage1')" style="width:250px" />
                    </div>
                    
                    <div class="last-item">
                        <label for="" class="data-item">外审ID：</label>
                        <input autocomplete="off" placeholder="请输入外审ID" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner filter-input" v-model="form.outerId" @keyup="filterData('passpage1')" style="width:250px" />
                    </div>
                    
                </div>
            </el-col>
            <!-- 批量审核 start -->
            <el-col :span="24" class="advertise-list-content border-bottom-2">
                <div class="creative-btn-control">
                    <div class="creative-btn-row">
                        <el-button type="click" :class="{'open-clicked1':isLighten}" @click='batchSwithResource'>批量审核</el-button>
                        <!-- 弹层start -->
                        <el-dialog class="batch-audit-pop" title="批量审核" :visible.sync="batchAuditVisible" width="427px">
                            <el-form :model="form">
                                <el-form-item>
                                    <template slot-scope="scope">
    						<div class="select-bd t">
    							<el-tabs type="card" v-model="activeTabAudit" @tab-click="tabChange(activeTabAudit)">
    								<el-tab-pane name="1">
    									<span slot="label">
    										<span class="select-item ">审核通过</span>
    									</span>
    									<div class="note-msg">
    										<label for="" class="data-item left">备注信息：</label>
    										
    										<el-input type="textarea" resize="none" placeholder="请填写备注" v-model="passed">
    										</el-input>
    									</div>
    								</el-tab-pane>
    								<el-tab-pane name="2">
    									<span slot="label">
                                            <span class="select-item">审核不通过</span>
    									</span>
    									<div class="">
    										<label for="" class="data-item left">拒绝原因：</label>
    											<el-checkbox-group v-model="checkedcause" @change="handleCheckedChangeCause">
    												<el-checkbox v-for="item in causeOptions" :label="item" :key="item">{{item}}
    												</el-checkbox>
    											</el-checkbox-group>
    									
                                            <div class="note-msg">
                                                <label for="" class="data-item left">备注信息：</label>
                                                
                                                <el-input type="textarea" :rows="2" resize="none" placeholder="请填写备注" v-model="failed">
                                                </el-input>
                                            </div>
    									</div>
    								</el-tab-pane>
    							</el-tabs>
    						</div>
</template>
                </el-form-item>
            </el-form>
			
			
            <div slot="footer" class="dialog-footer">
                
                <div class="is-confirm">
                    <el-button type="confirm" @click="onSubmitBatch" >确定</el-button>
                    <el-button type="cancel" @click="closeDialog(false)">取消</el-button>
                </div>
            </div>
        </el-dialog>
			<!-- 弹层end -->


                        <div class="search-input">
                            <div class="el-input el-input--prefix">
                                <input autocomplete="off" placeholder="请输入关键词" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="form.keyWords" @keyup="keySearchData('passpage1')" />
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
                <el-table :data="listData.data" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="公司名称">
<template slot-scope="scope">
    <div class="firm-name-adjust">
        {{scope.row.com_name}}
        <a href="javascript:void(0);" class="el-icon-revise" @click="modify()"></a>
    </div>
</template>
                            </el-table-column>
                            <el-table-column prop="status" label="公司简称">
<template slot-scope="scope">
     {{scope.row.brand}}
</template>
                            </el-table-column>
                            <el-table-column prop="num" label="公司ID">
<template slot-scope="scope">
     {{scope.row.id}}
</template>
                            </el-table-column>
                            <el-table-column prop="num" label="创建时间" width="95">
<template slot-scope="scope">
     {{scope.row.create_time}}
</template>
                            </el-table-column>
                            <!-- <el-table-column prop="authority" label="创建人">
<template slot-scope="scope">
    <span>速度厅</span>
</template>
                            </el-table-column> -->
                            <el-table-column prop="authority" label="资质文件">
<template slot-scope="scope">
    <a href="javascript:void(0);" class="link-jump" @click="findDetail(scope.row.id)">查看详情</a>
    <!-- 弹层start -->
    <el-dialog class="batch-audit-pop audit-file" title="资质文件" :visible.sync="findDetailVisibleImage" width="680px">
        <template slot-scope="scope">

                <div class="find-detail-bd t">
                    
                    <p class="no-data">{{imageList.length>0?"证件名称":"暂无数据"}}</p>
    <template>
        <el-carousel trigger="click" height="360px" width="460px"  v-show="imageList.length>0">
            <el-carousel-item v-for="item in imageList" :key="item">
                <!-- <h3>{{ item }}</h3> -->
                <img class="el-carousel-img" :src="item" width="250px" />
            </el-carousel-item>

           
        </el-carousel>
</template>

            </div>
        </template>
    </el-dialog>
    <!-- 弹层end -->
</template>
                            </el-table-column>
                                <el-table-column prop="authority" label="内审状态"> 
                                    <template slot-scope="scope">
                                           <el-popover
                                            v-if="scope.row.auth_status == 2 " 
                                            placement="top-start"
                                            title="原因:"
                                            width="300"
                                            trigger="hover"
                                           >
                                             <p style="width:280px;margin:0 auto;word-wrap:break-word;padding:10px;text-align:left">
                                                 {{scope.row.remark || '请联系管理员'}}
                                            </p>   
                                            <span slot="reference"  
                                              style="color:#ff6870!important">
                                              {{scope.row.curStatus}}
                                              <img src="../../../style/image/put/examNo.png"/>
                                            </span>
                                        </el-popover>

                                        <span v-else style="color: #6cabff;">
                                            {{scope.row.curStatus}}
                                        </span>
                                        
                                    </template>
                                </el-table-column>


                            <el-table-column prop="authority" label="外审状态">
<template slot-scope="scope">

  
   <a   :class="{'col-red':scope.row.color == 1 && scope.row.auth_status==1 }"  href="javascript:void(0);" class="link-jump" @click="outAuditCheck(scope.row.id,scope.row.curStatus)">{{scope.row.curSta}}</a>
  
    <el-dialog class="auditStatus" title="外审信息" width="952" :show-close="true" :visible.sync="outAuditVisible">
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
            <!-- pagenation -->
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

                            
                            <!-- <el-table-column prop="authority" label="提交平台审核">
<template slot-scope="scope">
    <a href="javascript:void(0);" class="link-jump" @click="customeInfo(scope.row.id)">选择平台</a>
    <el-dialog class="advertiseList" title="提交平台审核" width="952px" :show-close="true" :visible.sync="advertiseVisible">
        <el-col :span="24" class="">
            <el-col :span="11" class="advertiser-info">
                <h2>广告主信息</h2>
                <div class="update-item-row">
                    <label class="update-hd">公司注册名称：</label>
                    <span class="personal-detail">{{platformInfo&&platformInfo.data.com_name}}</span>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">公司简称：</label>
                    <span class="personal-detail">{{platformInfo&&platformInfo.data.brand}}</span>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">公司网址：</label>
                    <span class="personal-detail">{{platformInfo&&platformInfo.data.web_site}}</span>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">联系人：</label>
                    <span class="personal-detail">{{platformInfo&&platformInfo.data.contacts}}</span>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">联系电话：</label>
                    <span class="personal-detail">{{platformInfo&&platformInfo.data.tel}}</span>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">创建时间：</label>
                    <span class="personal-detail">{{platformInfo&&platformInfo.data.create_time}}</span>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">企业资质：</label>
                    <p v-for="item in  enterprise">
                        <br>
                        <span class="certificate-detail">{{item}}</span>
                    </p>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">行业资质：</label>
                    <p v-for="item in industry">
                        <br>
                        <span class="certificate-detail">{{item}}</span>
                    </p>
                </div>
                <div class="update-item-row">
                    <label class="update-hd">其他资质：</label>
                    <p v-for="item in other">
                        <br>
                        <span class="certificate-detail">{{item}}</span>
                    </p>
                </div>
            </el-col>
            <el-col :span="11" class="choose-platform">
                <h2>选择平台</h2>
                <div class="platform-list">
                    <el-checkbox class="el-total" :indeterminate="isIndeterminate" v-model="checkAll" :disabled="checkAllDisabled" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedPlatforms" @change="handleCheckedPlatformsChange">
                        <el-checkbox v-for="platform in platforms" :label="platform.name" :key="platform.id" :disabled="platform.isChecked">{{platform.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
        </el-col>
        <span slot="footer" class="dialog-footer">
                        <div class="is-confirm">
                            <el-button type="confirm" 
                            @click="onSubmit(platformInfo.data.id)" >提交</el-button>
                            <el-button type="cancel" @click="cancel">取消</el-button>
                        </div>
                    </span>
    </el-dialog>
</template>
                            </el-table-column> -->




                            <el-table-column prop="date" label="最后更新时间" width="97">
<template slot-scope="scope">
     {{scope.row.update_time}}
</template>
                            </el-table-column>
                        </el-table>
                        <!-- pagenation -->
                        <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="listData&&listData.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="listData&&listData.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="listData&&listData.total">
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
    import {
        end
    } from "../../../service/index"
    import _ from "lodash";
    export default {
        computed: {
            getLeftList() {
                return this.leftSizeList;
            },
        },
        data: function() {
            return {
                innerAudit: [{
                    label: "请选择",
                    value: -1,
                }, {
                    label: "待审核",
                    value: 0,
                }, {
                    label: "审核通过",
                    value: 1
                }, {
                    label: "审核不通过",
                    value: 2
                }],
                outerAudit: [{//0待推送，1推送失败，2待审核（先审后投），3待审核（先投后审），4审核通过，5审核不通过
                    label: "请选择",
                    value: -1,
                }, {
                    label: "未提交",
                    value: 0,
                }, {
                    label: "审核未完成",
                    value: 1
                }, {
                    label: "审核完成",
                    value: 2
                },
                 {
                    label: "含审核拒绝",
                    value: 4
                }, {
                    label: "含审核通过",
                    value: 5
                }],
                searchkey: "",
                checked: true,
                form: {
                    innerStatus: "",
                    outerStatus: "",
                    companyId: "",
                    outerId: "",
                    keyWords: ""
                    // name: "", //渠道名称
                    // resource_type: "", //资源类型
                    // creative_type: "", //素材类型
                    // mimes: "", //
                    // flag: "", //状态
                    // id: "",
                    // // logo: "",
                    // ad_auditing: "1", //客户审核 1 先审后台 2 先投后审
                    // cre_auditing: "1",
                    // label:""
                },
                isLighten: false,
                clearIt: false, //关闭图标设置
                list: "",
                currentPage2: 2,
                // currentPage: 1,
                advertiseList: [{
                    status: '',
                    num: '',
                    authority: ''
                }],
                advertiseVisible: false,
                outAuditVisible: false,
                auditList: [{ //请选择客户
                    name: '',
                    simplename: ''
                }],
                platforms: [],
                checkedPlatforms: [],
                isIndeterminate: false,
                checkAll: false,
                pageSize: 10,
                currentPage: 1,
                listData: [],
                platformInfo: null,
                enterprise: [],
                industry: [],
                other: [],
                subData: [],
                pageSizeSub: 10,
                currentPageSub: 1,
                findDetailVisible: false,
                causeOptions: ['资质', '信息', '客保'],
                checkedcause: [],
                batchAuditVisible: false, //批量审核是否可见
                multipleSelection: [],
                activeTabAudit: "1",
                passed: "",
                failed: "",
                findDetailVisibleImage:false,
                imageList:[],
                failedRemark: "",
                checkAllDisabled: false,
            }
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            handleSizeChange(val) {
                this.pageSize = val;
                // this.getList({
                //     page: 1,
                //     pagesize: this.pageSize,
                // });
                
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                
                this.currentPage = val;
                this.filterData();

                // this.currentPage = val;
            },
            handleSizeChangeSub(val) {
                this.pageSizeSub = val;
                this.getList({
                    page: 1,
                    pagesize: this.pageSizeSub,
                });
            },
            handleCurrentChangeSub(val) {
                this.getList({
                    page: val,
                    pagesize: this.pageSizeSub,
                });
                this.currentPageSub = val;
            },
            tabChange(val) {
                //console.log(val);
            },
            getList(data) {
                end.getCustomeList(data).then(res => {
                    if (res.data.code == 0) {
                        res.data.data.data.forEach(item => {
                            if(item.auth_status == 0){
                                item.curStatus="待审核"
                                item.curSta="未提交"
                            }
                            if(item.auth_status == 2){
                                item.curStatus="内审未通过"
                                item.curSta="未提交"
                            }
                            if(item.auth_status == 1){
                                 if(item.countall == 0){
                                     item.curSta="未提交"
                                      item.curStatus="内审通过"
                                }else{
                                   item.curStatus="内审通过"
                                     item.curSta=item.count+'/'+item.countall
                                }
                            }
                        });
                       
                        this.listData = res.data.data;
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
            },
            clearForm() {
                this.failed = "";
                this.passed = "";
                this.remark = "";
                this.checkedcause = [];
                this.activeTabAudit = "1";
            },
            clearInput() {},
            onSubmit(val) {
                console.log(val);
                end.addReview({
                    id: val,
                    plat_id: this.getIdsByName(this.checkedPlatforms)
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.advertiseVisible = false;
                        this.filterData('passpage1');
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
            getIdsByItems() {
                let result = [];
                _.forEach(this.multipleSelection, val => {
                    result.push(val.id);
                });
                return result;
            },
            closeDialog(val) {
                this.batchAuditVisible = val;
                this.clearForm();
            },
            onSubmitBatch() {
                this.isLighten = true;
                this.batchAuditVisible = true;
                this.failedRemark = this.failed ? this.checkedcause.toString() + '-' + this.failed : this.checkedcause;
                end.adBatch({
                    id: this.getIdsByItems(),
                    auth_status: this.activeTabAudit,
                    remark: this.activeTabAudit == "1" ? this.passed : this.failedRemark.toString()
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isLighten = false;
                        this.batchAuditVisible = false;
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.filterData();
                        this.clearForm();
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
            },
            handleCheckAllChange(val) {
                this.checkedPlatforms = val ? this.getPlatformName() : this.getPlatformName('examineHasChecked');
                let checkedCount = this.checkedPlatforms.length;
                // 当checkedplatforms的长度大于0，且
                if(checkedCount > 0 && checkedCount < this.platforms.length) {
                    this.isIndeterminate = true;
                }
                if(checkedCount == this.platforms.length) {
                    this.isIndeterminate = false;
                }
                this.checkAllDisabled = false;
            },
            getPlatformName(flag) {
                let results = [];
                let checkedResults = [];
                _.forEach(this.platforms, val => {
                    results.push(val.name);
                    if(val.isChecked == true) {
                        //当有选项为disabled=true时，就让它一直都勾上
                        checkedResults.push(val.name);
                    }
                });
                if(flag == "examineHasChecked") {
                    return checkedResults;
                } else {
                    return results;
                }
            },
            getPlantformNameById(val, flag) {
                let result = [];
                _.forEach(this.platforms, p => {
                    _.forEach(val, s => {
                        if (p.id == s) {
                            result.push(p.name);
                            p.isChecked = true;
                        }
                    });
                });
                if(flag) {
                    return this.platforms;
                } else {
                    return result;
                }
            },
            getIdsByName(val) {
                let result = [];
                _.forEach(this.platforms, p => {
                    _.forEach(val, s => {
                        if (p.name == s) {
                            result.push(p.id);
                        }
                    });
                });
                return result;
            },
            handleCheckedPlatformsChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.platforms.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.platforms.length;
                this.checkAllDisabled = false;
            },
            customeInfo(val) {
                end.getPlatformInfo({
                    id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        // this.$message({
                        //     message: '操作成功',
                        //     type: 'success'
                        // });
                        this.platformInfo = res.data.data;
                        this.platforms = res.data.data.plat_info;
                        this.advertiseVisible = true;
                        this.checkedPlatforms = this.getPlantformNameById(res.data.data.audi);
                        
                        //set checkall to origin
                        this.checkAll = false;
                        this.checkAllDisabled = false;
                        // add isChecked flag
                        this.platforms = this.getPlantformNameById(res.data.data.audi,'setChecked');
                        // when checkAll，set operation disabled
                        let platformsLen = this.platforms.length;
                        let checkedPlatformsLen = this.checkedPlatforms.length;

                        if(platformsLen == checkedPlatformsLen) {
                            this.checkAll = true;
                            this.checkAllDisabled = true;
                            this.isIndeterminate = false;
                        }
                        //set checkall status - or √
                        if(platformsLen > checkedPlatformsLen) {
                            this.isIndeterminate = true;
                        }
                        if(checkedPlatformsLen != 0 && platformsLen != checkedPlatformsLen) {
                            this.isIndeterminate = true;
                        } else {
                            this.isIndeterminate = false;
                        }
                        
                        this.enterprise = [];
                        this.industry = [];
                        this.other = [];
                        _.forEach(res.data.data.img, val => {
                            if (val.aptitude_type == 1) {
                                this.enterprise.push(val.old_filename);
                            }
                            if (val.aptitude_type == 2) {
                                this.industry.push(val.old_filename);
                            }
                            if (val.aptitude_type == 3) {
                                this.other.push(val.old_filename);
                            }
                        });
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
            cancel() {
                this.advertiseVisible = false;
            },
            outAuditCheck(val,curStatus) {
                if(curStatus == "未提交"){
                    return;
                }
                this.outAuditVisible = true;
                end.adverExternalAudit({
                    advartiser_id: val
                }).then(res => {
                   if (res.data.code == 0) {
                        this.isLighten = false;
                        this.batchAuditVisible = false;
                        // this.$message({
                        //     message: '操作成功',
                        //     type: 'success'
                        // });
                        //this.filterData();
                        this.subData=res.data.data;
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
            },
            handleCheckedChangeCause(val) {//拒绝原因的改变
                this.checkedcause = val ? val : [];
                
            },
            goBack() {
                this.$router.go(-1);
            },
            searchDataBykeyword(val) {
                let data = _.filter(this.sourceLeftSizeList, function(item) {
                    return item.indexOf(val) > -1;
                });
                this.leftSizeList = data;
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
            loadAll(val) {
                return val;
            },
            findDetail(val) {
                this.findDetailVisibleImage = true;

                end.adFileImage({id:val}).then(res=>{

                     if (res.data.code == 0) {
                       
                        // this.$message({
                        //     message: '操作成功',
                        //     type: 'success'
                        // });
                        // this.filterData();
                        this.imageList=res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                        this.findDetailVisibleImage = false;
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }

                });
            },
            batchSwithResource() {

                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请至少选择一条记录!',
                        type: 'warning'
                    });
                    return;
                }
                this.isLighten = true;
                this.batchAuditVisible = true;
            },
            keySearchData(val) { //关键词搜索
                this.filterData(val);
            },
            filterData(isSearch) {
                //  innerStatus: "",
                //     outerStatus: "",
                //     companyId: "",
                //     outerId: ""


                this.getList({
                    // page: this.currentPage,
                    page: isSearch =='passpage1' ? 1 : this.currentPage,
                    pagesize: this.pageSize,
                    auth_status: parseInt(this.form.innerStatus) > -1 ? this.form.innerStatus : -1,//内审
                    search: this.form.keyWords != "" ? this.form.keyWords : undefined,
                    auth_srauts: parseInt(this.form.outerStatus) > -1 ? this.form.outerStatus : -1,//外审
                    id: this.form.companyId != "" ? this.form.companyId : undefined,
                    return_id: this.form.outerId != "" ? this.form.outerId : undefined
                });

                // this.getList({
                //     page: this.currentPage,
                //     pagesize: this.pageSize,
                //     auth_status: this.form.innerStatus != "" ? this.form.innerStatus : undefined,
                //     search: this.form.keyWords != "" ? this.form.keyWords : undefined,
                //     auth_srauts: this.form.outerStatus != "" ? this.form.outerStatus : undefined,
                //     id: this.form.companyId != "" ? this.form.companyId : undefined,
                //     return_id: this.form.outerId != "" ? this.form.outerId : undefined
                // });
            }
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.getList({
                page: 1,
                pagesize: 10,
            });
        },
    }
</script>

<style lang="scss">
    @import "../../../style/mixin";
    .advertise-list {
        // head style
        .bg-white {
            background-color: #fff;
        }
        .template-hd {
            padding: 20px 0 20px 30px;
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
        }
        .filter-input {
            width: 240px;
            margin: 0 15px 0 5px;
        }
        .last-item {
            display: inline-block;
            margin-top: 20px;
        }
        .advertise-list-content {
            // button and search
            .creative-btn-control {
                @include bg-white($fc);
                margin-top: 20px;
                .creative-btn-row {
                    padding: 20px 30px;
                    position: relative;
                }
                .search-input {
                    position: absolute;
                    width: 180px;
                    right: 30px;
                    top: 20px;
                    border: 0 none;
                    margin:0;
                    text-indent: 0;
                    .el-input-group__append,
                    .el-input-group__prepend {
                        padding: 0 !important;
                        @include bg-white($fc);
                    }
                    .el-input-group__append {
                        border-color: #e1e7f0;
                        .el-button {
                            padding: 3px 27px 21px!important;
                        }
                    }
                    .el-icon-search {
                        color: #a5a6bb !important;
                        &:before {
                            font-size: 18px!important;
                        }
                    }
                    .el-input__suffix {
                        right: 25px;
                    }
                    .el-input--prefix .el-input__inner {
                        padding-left: 20px;
                    }
                }
            }
            .el-table {
                th:first-child,
                td:first-child {
                    padding-left: 16px;
                }
                th:nth-child(2),
                td:nth-child(2) {
                    padding-left: 20px;
                }
                th:nth-child(6),
                td:nth-child(6),
                th:nth-child(7),
                td:nth-child(7),
                th:nth-child(8),
                td:nth-child(8),
                th:nth-child(9),
                td:nth-child(9),
                th:nth-child(10),
                td:nth-child(10) {
                    text-align: center;
                }
                .update-time {
                    color: #6cabff;
                }
            } // batch audit pop layer
            .batch-audit-pop {
                .el-dialog__title {
                    font-size: 16px;
                    font-weight: bold;
                }
                .el-dialog__header {
                    padding: 25px 30px 15px 30px;
                    border-bottom: 2px solid #e1e7f0;
                }
                .el-dialog__body {
                    padding: 30px 30px 0 30px;
                }
                .el-tabs__item {
                    padding: 0;
                    &:nth-child(2),
                    &:last-child {
                        padding-left: 19px!important;
                    }
                }
                .el-tabs--card>.el-tabs__header {
                    border: 0 none;
                    margin-bottom: 14px;
                }
                .el-tabs--card>.el-tabs__header .el-tabs__nav {
                    border: 0 none;
                }
                .el-tabs--card>.el-tabs__header .el-tabs__item {
                    border: 0 none;
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
                    padding: 0 18px;
                    border: 1px solid #e1e7f0;
                    border-radius: 5px;
                    float: left;
                }
                .is-active .select-item {
                    background-color: #ecf3fb;
                    border: 1px solid #6cabff;
                    color: #6cabff;
                } // label style
                .data-item {
                    @include sc(12px, #686f87);
                    width: 71px;
                }
                .note-msg .data-item {
                    margin-top: -13px;
                }
                .el-checkbox__label {
                    @include sc(12px, #515974);
                }
                .el-checkbox-group {
                    margin-bottom: 3px;
                }
                .el-checkbox:first-child {
                    margin-right: 20px;
                }
                .el-checkbox+.el-checkbox {
                    margin: 0 20px 0 0;
                }
                .el-textarea {
                    width: 296px;
                }
                .el-textarea__inner {
                    height: 123px;
                }
                .is-confirm {
                    padding: 0 0 10px 10px;
                    text-align: left;
                    background-color: transparent;
                }
            }
        }
        .audit-file {
            .el-dialog__header {
                text-align: left;
            }

            p {
                @include sc(16px, #515974);
                text-align: center;
                padding-bottom: 27px;
            }
            .el-carousel__item {
                background-color: #ffe5f5;
                text-align: center;
                width: 460px;
                height: 360px;
                line-height: 360px;
            }
            .el-carousel-img{
                vertical-align: middle;
                display: inline-block;
            }
            .el-carousel{
                width: 460px;
                margin: 0 auto;
                padding-bottom: 50px;
            }
            // bottom indicators
            .el-carousel__indicators{
                display:none;
            }
            .el-carousel__arrow{
                width: 50px;
                height: 50px;
                i{
                    @include sc(23px, #fff);
                }
            }
        } // outer audit status
        .auditStatus,
        .advertiseList {
            .el-dialog__header,
            .el-table .cell {
                text-align: left;
            }
            .el-dialog__header {
                border-bottom: 1px solid #e1e7f0;
                padding: 15px 0 16px 30px;
            }
            .el-dialog__title {
                font-size: 16px;
                font-weight: bold;
            }
            .el-dialog__body {
                padding: 0;
            }
            .block .el-pagination {
                text-align: left;
            }
        } // advertise list pop layer
        .advertiseList {
            h2 {
                @include sc(16px, #515974);
                font-weight: bold;
                height: 56px;
                line-height: 56px;
                padding-left: 10px;
                border-bottom: 1px solid #e1e7f0;
            }
            .update-item-row {
                padding-left: 10px;
                .update-hd,
                .certificate-name {
                    width: 105px;
                    line-height: 49px;
                    display: inline-block;
                    font-weight: bold;
                    @include sc(14px, #515974);
                }
                .personal-detail {
                    @include sc(14px, #515974);
                }
                .certificate-name {
                    width: 90px;
                    font-weight: normal;
                }
                .certificate-detail {
                    color: #6cabff;
                }
            }
            .el-col-24,
            .is-confirm {
                text-align: left;
                background-color: #fff;
            }
            .advertiser-info {
                margin: 0 30px 0 20px;
            }
            .choose-platform {
                .platform-list {
                    padding: 30px 25px 0 10px;
                }
                .el-checkbox__label {
                    @include sc(12px, #7f8599);
                }
                .el-checkbox-group .el-checkbox:first-child {
                    margin-right: 30px;
                }
                .el-total,
                .el-checkbox+.el-checkbox {
                    margin: 0 30px 7px 0;
                }
            }
            .el-col-24 {
                margin-bottom: 22px;
            }
            .is-confirm {
                padding: 0 0 24px 11px;
            }
        }
        .block .el-pagination {
            padding: 34px 30px 25px 30px;
            @include bg-white($fc);
        }
    }
     .col-red{
                color: #ff6870!important;
            }
</style>