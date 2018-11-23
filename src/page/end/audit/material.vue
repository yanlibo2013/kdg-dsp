<template>
    <div class="advertise-list">
        <el-main>
            <!-- 审核筛选 start -->
            <el-col :span="24" class="margin-bottom-20">
                <h1 class="template-hd">审核筛选</h1>
                <div class="template-bd border-bottom-2">
                    <el-form :model="form">
                        <el-form-item>
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
                            <label for="" class="data-item">样式：</label>
                            <el-select class="filter-input" v-model="form.type" placeholder="请选择" @change="filterData('passpage1')">
                                <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <div class="last-item">
                                <label for="" class="data-item">素材ID：</label>
                                <input autocomplete="off" placeholder="请输入素材ID" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner filter-input" v-model="form.companyId" @keyup="filterData('passpage1')" style="width:250px" />
                            </div>
                            <div class="last-item">
                                <label for="" class="data-item">尺寸：</label>
                                <input autocomplete="off" placeholder="请输入尺寸大小" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner filter-input" v-model="form.size" @keyup="filterData('passpage1')" style="width:250px" />
                            </div>
                            <div class="last-item">
                                <label for="" class="data-item">外审ID：</label>
                                <input autocomplete="off" placeholder="请输入外审ID" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner filter-input" v-model="form.outerId" @keyup="filterData('passpage1')" style="width:250px" />
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 批量审核 start -->
            <el-col :span="24" class="advertise-list-content border-bottom-2">
                <div class="creative-btn-control">
                    <div class="creative-btn-row">
                        <el-button type="click" :class="{'open-clicked1':isLighten}" @click='batchSwithResource'>批量审核</el-button>
                        <!-- 弹层start -->
                        <el-dialog class="batch-audit-pop" title="批量审核" :visible.sync="batchAuditVisible" width="427px" :modal-append-to-body="false">
                            <el-form>
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
                                            <span class="select-item">审核拒绝</span>
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
                    <!-- <el-button type="cancel" @click="batchAuditVisible=false">取消</el-button> -->
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
                <div>
                    
                    </div>
            <div class="table-wrapper" :class="{'set-border':isPoping == 'poping'}">
                
                <el-table :data="listData.data" @selection-change="handleSelectionChange" max-height="550" class="table-fixed">
                            <el-table-column type="selection">
                            </el-table-column>
                            <el-table-column prop="name" label="素材ID">
                                    <template slot-scope="scope">
                                        <div class="firm-name-adjust">
                                            <span class="space-adjust">{{scope.row.id}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                            <el-table-column prop="status" label="创意预览">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.file_type == 'mp4' || scope.row.file_type == 'flv'|| scope.row.file_type == 'swf'">
                                            <img class="theme-pic" src="../../../style/image/creative/video-img.png" alt="" style="width: 60px;height: 60px" />
                                        </div>
                                        <div v-else>
                                            <img class="theme-pic" :src="scope.row.file_path" alt="" style="width: 60px;height: 60px" />
                                        </div>
                                    </template>
                            </el-table-column>
                            <el-table-column prop="num" label="创意名称" width="140">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.name}}</span>
                                        <!-- <span>创意主题创意主题主题创意主题创意主题主题123</span> -->
                                    </template>
                            </el-table-column>
                            <el-table-column prop="num" label="所属客户" width="140">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.advertiser_id}}</span>
                                        <!-- <span>创意主题创意主题主题创意主题创意主题主题123</span> -->
                                    </template>
                            </el-table-column>
                            <el-table-column prop="num" label="尺寸">
                                <template slot-scope="scope">
                                    <span>{{scope.row.width}}x{{scope.row.height}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="num" label="样式" width="65">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type==1">图片</span>
                                    <span v-if="scope.row.type==2">图文</span>
                                    <span v-if="scope.row.type==3">组图</span>
                                    <span v-if="scope.row.type==4">视频信息流</span>
                                    <span v-if="scope.row.type==5">短视频</span>


                                </template>
                            </el-table-column>
                            <el-table-column prop="num" label="打开类型">
                                <template slot-scope="scope">
                                    <span>{{scope.row.link_type_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="num" label="点击跳转地址" width="140">
                                <template slot-scope="scope">
                                    <p v-if="scope.row.link_type==1 && scope.row.landing_page">
                                        H5地址：
                                         <a class="link-jump" target="_blank" :href="scope.row.landing_page"> 
                                             {{scope.row.landing_page}}</a>
                                       <!-- {{scope.row.landing_page}} -->
                                      </p>
                                     <p v-if="scope.row.link_type==2 && scope.row.androidaddress">
                                        Android跳转地址：
                                         <a class="link-jump" target="_blank" :href="scope.row.androidaddress"> 
                                             {{scope.row.androidaddress}}</a>

                                        <!-- {{scope.row.androidaddress}} -->
                                     </p>

                                    <p v-if="scope.row.link_type==2 && scope.row.iodaddress">IOS跳转地址：
                                        <a class="link-jump" target="_blank" :href="scope.row.iodaddress"> 
                                             {{scope.row.iodaddress}}</a>

                                    <!-- {{scope.row.iodaddress}} -->
                                   </p>

                                    <p v-if="scope.row.link_type==2 ">Android下载地址：

                                       <a class="link-jump" target="_blank" :href="(scope.row.landing_page).pkgname"> 
                                             {{(scope.row.landing_page).pkgname}}</a>
                                    <!-- {{(scope.row.landing_page).pkgname}} -->
                                   </p>

                                    <p v-if="scope.row.link_type==2 ">IOS下载地址：
                                    

                                      <a class="link-jump" target="_blank" :href="(scope.row.deep_link).pkgname">  {{(scope.row.deep_link).pkgname}}</a>

                                   <!--    {{(scope.row.deep_link).pkgname}} -->


                                   </p>

                                    <p v-if="scope.row.link_type==3 && scope.row.androidaddress">Android跳转地址：

                                    <a class="link-jump" target="_blank" :href="scope.row.androidaddress">{{scope.row.androidaddress}}</a>

                                <!--     {{scope.row.androidaddress}} -->
                                   </p>

                                    <p v-if="scope.row.link_type==3 && scope.row.androidarouse">

                                    Android唤起地址：
                                      <a class="link-jump" target="_blank" :href="scope.row.androidarouse">{{scope.row.androidarouse}}</a>

                                    <!-- {{scope.row.androidarouse}} -->

                                     </p>


                                    <p v-if="scope.row.link_type==3 && scope.row.iodaddress">
                                    IOS跳转地址：
                                    <a class="link-jump" target="_blank" :href="scope.row.iodaddress">{{scope.row.iodaddress}}</a>
                                  <!--   {{scope.row.iodaddress}} -->
                                    </p>

                                    <p v-if="scope.row.link_type==3 && scope.row.iosarouse">
                                    IOS唤起地址：
                                    <a class="link-jump" target="_blank" :href="scope.row.iosarouse">{{scope.row.iosarouse}}</a>
                                    </p>

                                </template>
                            </el-table-column>
                            <el-table-column prop="num" label="曝光检测URL" width="140">
                                <template slot-scope="scope">
                                    <span>{{scope.row.imp_monitor}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="num" label="点击检测URL" width="140">
                                <template slot-scope="scope">
                                    <span>{{scope.row.click_monitor}}</span>
                                </template>
                            </el-table-column>
                            
                            <!-- <el-table-column prop="num" label="内审状态">
                                <template slot-scope="scope">
                                     <span class>{{scope.row.curStatus}}</span>        
                                </template> -->
                            <el-table-column prop="num" label="内审状态" > 
                                    <template slot-scope="scope">
                                           <el-popover
                                            v-if="scope.row.auth_status == 2 " 
                                            placement="top-start"
                                            title="原因"
                                            width="300"
                                            trigger="hover">
                                            <p style="width:280px;margin:0 auto;word-wrap:break-word;padding:10px;text-align:left">
                                                 {{scope.row.auth_remark || '请联系管理员'}}
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




                            </el-table-column>
                            <el-table-column fixed="right" prop="num" label="外审状态">
                                <template slot-scope="scope">
                                    <a :class="{'col-red':scope.row.color == 1 && scope.row.auth_status==1 }" href="javascript:void(0);" class="link-jump" @click="outAuditCheck(scope.row.id)">{{scope.row.curSta}}</a>
                                    <el-dialog class="auditStatus" title="外审信息" width="952" :show-close="true" :visible.sync="outAuditVisible" :modal-append-to-body="false">
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
                <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                :current-page.sync="currentPage2"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="1000">
                </el-pagination> -->
            </div>
        </el-dialog>
</template>
                            </el-table-column>

                            <!-- <el-table-column fixed="right" prop="num" label="提交平台审核" width="100">
<template slot-scope="scope">
    <a href="javascript:void(0);" class="link-jump" @click="customeInfo(scope.row.id)">选择平台</a>
    <el-dialog class="advertiseList" title="提交平台审核" width="952px" :show-close="true" :visible.sync="advertiseVisible" :modal-append-to-body="false">
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


                            <el-table-column fixed="right" prop="num" label="最后更新时间" width="97">
<template slot-scope="scope">
    <span class="link-jump">
         {{scope.row.update_time}}</span>
</template>
                            </el-table-column>
                        </el-table>
                        
                    </div>
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
                    label: "审核拒绝",
                    value: 2
                }],
                outerAudit: [{ //0待推送，1推送失败，2待审核（先审后投），3待审核（先投后审），4审核通过，5审核拒绝
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
                }, {
                    label: "含审核拒绝",
                    value: 4
                }, {
                    label: "含审核通过",
                    value: 5
                }],
                //'图片','图文','组图','视频信息流','短视频'
                type: [{
                    label: "请选择",
                    value: -1,
                }, {
                    label: "图片",
                    value: 1
                }, {
                    label: "图文",
                    value: 2
                }, {
                    label: "组图",
                    value: 3
                }, {
                    label: "视频信息流",
                    value: 4
                }, {
                    label: "短视频",
                    value: 5
                }],
                searchkey: "",
                checked: true,
                form: {
                    innerStatus: "",
                    outerStatus: "",
                    companyId: "",
                    outerId: "",
                    keyWords: "",
                    size: ""
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
                causeOptions: ['资质', '信息', '客保'],
                checkedcause: [],
                batchAuditVisible: false, //批量审核是否可见
                passed: "",
                failed: "",
                activeTabAudit: "1",
                multipleSelection: [],
                failedRemark: "",
                checkAllDisabled: false,
                isPoping: "",
            }
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
           
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                // this.actionReportList({ page: val, page_size: this.pageSize });   
                this.pageSize = val;
                this.getList({
                    page: 1,
                    pagesize: this.pageSize,
                    // flag: "1",
                    //ad_id: this.$store.state.currentCheckedAd
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                // this.getList({
                //     page: val,
                //     pagesize: this.pageSize,
                //     type: this.form.type,
                //     //ad_id: this.$store.state.currentCheckedAd
                // });
                // this.currentPage = val;
                this.currentPage = val;
                this.filterData();
            },
            tabChange(val) {
                //console.log(val);
            },
            
            getList(data) {
                end.materialList(data).then(res => {
                    if (res.data.code == 0) {
                        // this.listData = res.data.data;
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
                                }else {
                                   item.curStatus="内审通过"
                                     item.curSta=item.count+'/'+item.countall
                                }
                            }
                        });
                       
                        this.listData = res.data.data;
                    
                        let data = res.data.data.data;

                        console.log(data)
                        let result = [];
                        for (var j = 0; j < data.length; j++) {
                            // if (data[j].link_type == "0") {
                            //     data[j].link_type = "请选择"
                            // }
                            if (data[j].link_type == 1 || data[j].link_type == 0) {
                                data[j].h5address = data[j].landing_page ? data[j].landing_page : '';
                            }
                            if (data[j].link_type == 2) {
                                data[j].androidaddress = data[j].landing_page ? JSON.parse(data[j].landing_page).url : '';
                                data[j].iodaddress = data[j].deep_link ? JSON.parse(data[j].deep_link).url : '';
                                data[j].appName = data[j].deep_link ? JSON.parse(data[j].deep_link).package : '';
                                // data[j].androidaddress = data[j].landing_page;
                                // data[j].iodaddress = data[j].deep_link;
                            }
                            if (data[j].link_type == 3) {
                                let ios = data[j].deep_link ? JSON.parse(data[j].deep_link) : '';
                                let android = data[j].landing_page ? JSON.parse(data[j].landing_page) : '';
                                data[j].androidaddress = android.landing_page;
                                data[j].iodaddress = ios.landing_page;
                                data[j].androidarouse = android.deep_link;
                                data[j].iosarouse = ios.deep_link;
                            }
                            //data[j].jump = data[j].link_type;//deep_link ios
                            result.push(data[j]);
                        }
                        res.data.data.data = result;
                        this.listData = res.data.data;
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            handleCheckedChangeCause() {
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
                end.materialBatch({
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
            onSubmit(val) {
                end.materialAddReview({
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
                        // this.getList({
                        //     page: 1,
                        //     pagesize: 10,
                        // });
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
            close(key) {},
            handleCheckAllChange(val) {
                this.checkedPlatforms = val ? this.getPlatformName() : this.getPlatformName('examineHasChecked');
                let checkedCount = this.checkedPlatforms.length;
                // 当checkedplatforms的长度大于0，且
                if (checkedCount > 0 && checkedCount < this.platforms.length) {
                    this.isIndeterminate = true;
                }
                if (checkedCount == this.platforms.length) {
                    this.isIndeterminate = false;
                }
                this.checkAllDisabled = false;
            },
            getPlatformName(flag) {
                let results = [];
                let checkedResults = [];
                _.forEach(this.platforms, val => {
                    results.push(val.name);
                    if (val.isChecked == true) {
                        //当有选项为disabled=true时，就让它一直都勾上
                        checkedResults.push(val.name);
                    }
                });
                if (flag == "examineHasChecked") {
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
                if (flag) {
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
                //this.advertiseVisible = true
                end.materialGetPlatformInfo({
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
                        this.platforms = this.getPlantformNameById(res.data.data.audi, 'setChecked');
                        // when checkAll，set operation disabled
                        let platformsLen = this.platforms.length;
                        let checkedPlatformsLen = this.checkedPlatforms.length;
                        if (platformsLen == checkedPlatformsLen) {
                            this.checkAll = true;
                            this.checkAllDisabled = true;
                            this.isIndeterminate = false;
                        }
                        //set checkall status - or √
                        if (platformsLen > checkedPlatformsLen) {
                            this.isIndeterminate = true;
                        }
                        if (checkedPlatformsLen != 0 && platformsLen != checkedPlatformsLen) {
                            this.isIndeterminate = true;
                        } else {
                            this.isIndeterminate = false;
                        }
                        // set border style
                        this.isPoping = 'poping';
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
            outAuditCheck(val) {
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
                    page: isSearch == 'passpage1' ? 1 : this.currentPage,
                    pagesize: this.pageSize,
                    auth_status: parseInt(this.form.innerStatus) > -1 ? this.form.innerStatus : -1, //内审
                    search: this.form.keyWords != "" ? this.form.keyWords : undefined,
                    auth_srauts: parseInt(this.form.outerStatus) > -1 ? this.form.outerStatus : -1, //外审
                    id: this.form.companyId != "" ? this.form.companyId : undefined,
                    return_id: this.form.outerId != "" ? this.form.outerId : undefined,
                    type: this.form.type != "" ? this.form.type : undefined,
                    size: this.form.size != "" ? this.form.size : undefined,
                });
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
            .el-table--scrollable-x .el-table__body-wrapper {
                // overflow-x: scroll;
                // overflow-y: scroll;
                // height: 500px;
                &::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width: 16px;
                    /*高宽分别对应横竖滚动条的尺寸*/
                    height: 16px;
                }
                &::-webkit-scrollbar-thumb {
                    /*滚动条里面小方块*/
                    border-radius: 6px;
                    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
                    background: rgba(0, 0, 0, 0.05);
                }
                &::-webkit-scrollbar-track {
                    /*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
                    border-radius: 0;
                    background: rgba(0, 0, 0, 0.05);
                }
            } // remove white line when pop layer show
            .table-fixed {
                /deep/ .el-table__fixed-right::before,
                .el-table__fixed::before {
                    // height: 0;
                    //   height: 100% !important; //设置高优先，以覆盖内联样式
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
                td:nth-child(6) {
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
    @media screen and (max-width:1920px) {
        .advertise-list .advertise-list-content .set-border .table-fixed {
            /deep/ .el-table__fixed-right::before,
            .el-table__fixed::before {
                height: 0; // background-color: #808080;
                // position: relative;
                // background-color: #e1e7f0;
                //   height: 100% !important; //设置高优先，以覆盖内联样式
            }
        }
    }
    .neishen{
            margin-left: -32px ;
        }
    .col-red{
                color: #ff6870!important;
            }
</style>