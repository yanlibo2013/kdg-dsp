<template>
    <div class="">
        <el-main>
            <el-row class="client-list-content border-bottom-2">
                <el-col :span="24">
                    <div class="grid-content ">
                        <div class="function-list">
                            <a href="javascript:void(0);"  v-show="setPermission(38)" class="single-link el-link-add" @click="create">
                                <i class="add-iron">+</i>
                                <span class="add-msg">创建客户</span>
                            </a>
                            <el-button type="click" v-show="setPermission(40)" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
                            <el-button type="click" v-show="setPermission(40)" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button>
                            <el-button type="click" v-show="setPermission(41)" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>

                           
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

                            <div class="el-input el-input--prefix">
                                <input autocomplete="off" placeholder="请输入关键词" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="keyWords" @keyup="searchDataByName" />
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
                    <el-table :data="list.data" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>

                        <el-table-column prop="name" label="客户名称">
                            <template slot-scope="scope">
                                    <div class="firm-name-adjust">
                                        <span class="space-adjust">{{ scope.row.com_name }}<a href="javascript:void(0);"  v-show="setPermission(38)" class="el-icon-revise" 
                                        @click="modify(scope.row.id)"> </a></span>
                                        </div>
</template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="num" label="姓名">
                            <template slot-scope="scope">
                                <span>{{ scope.row.contacts }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="num" label="联系电话">
                            <template slot-scope="scope">
                                <span>{{ scope.row.tel }}</span>
                            </template>
                        </el-table-column>

                            </el-table-column>
                        <el-table-column prop="authority" label="信用金额">
                            <template slot-scope="scope">
                                <span>{{ scope.row.credit }}</span>
                            </template>
                        </el-table-column>

                          <el-table-column prop="curStatus" label="提交审核">
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" 
                                 class="link-jump" 
                                 @click="customeInfo(scope.row.id,scope.row.plat)">选择媒体平台</a>

                                    <el-dialog 
                                     class="advertiseList" 
                                     title="选择媒体平台" width="539px" 
                                     :show-close="true"
                                     :visible.sync="advertiseVisible"
                                     >
                                          <!-- 投放范围 start -->
                                            <el-col :span="24" class="input-area">
                                                <div class="template-bd">
                                                    <el-checkbox-group v-model="checkedImages">
                                                        <el-checkbox 
                                                         v-for="img in putImages" 
                                                        :label="img.id" 
                                                        :key="img.id" 
                                                        :disabled="img.isChecked"
                                                        >
                                                       <el-popover
                                                            v-if="img.isChecked" 
                                                            placement="bottom-start"
                                                            width="200"
                                                            trigger="hover"
                                                            :content="img.tip">
                                                            <span slot="reference">
                                                             {{img.name}}
                                                            <img style="vertical-align: -3px" src="../../../style/image/put/examNo1.png"/>
                                                            </span>
                                                        </el-popover>
                                                        <span  v-else style="font-size:12px;color:#515974">
                                                            {{img.name}}
                                                        </span>

                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </div>
                                            </el-col>
                                            <!-- 投放范围 end -->

                                        
                                          <span slot="footer" class="dialog-footer">
                                            <div class="is-confirm">
                                                <!-- {{platformInfo&&platformInfo.data.brand}} -->
                                                <el-button type="confirm" 
                                                @click="onSubmit" >保存</el-button>
                                                <el-button type="cancel" @click="cancel">取消</el-button>
                                            </div>
                                         </span>
                                    </el-dialog>

                            </template>
                        </el-table-column>

                        <el-table-column prop="curStatus" label="审核状态">
                            <template slot-scope="scope">
                                        <el-popover
                                            v-if="scope.row.auth_status == 2" 
                                            placement="top-start"
                                            title="原因"
                                            width="200"
                                            trigger="hover"
                                            :content="scope.row.remark || '请联系管理员'">
                                            <span slot="reference"  
                                              style="color:#6cabff"
                                              :class="{'col-red':scope.row.color == 1 && scope.row.auth_status==1}"
                                              >
                                              {{scope.row.curStatus}}
                                              <img style="cursor: pointer" src="../../../style/image/put/examNo.png"/>
                                            </span>
                                        </el-popover>

                                      <span
                                        v-else
                                        style="color:#6cabff"
                                        :class="{'col-red':scope.row.color == 1 && scope.row.auth_status==1}"
                                        
                                        @click="outAuditCheck(scope.row.id,scope.row.auth_status,scope.row.countAll)">
                                        {{scope.row.curStatus}}
                                      </span>   

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

                       

                        <el-table-column prop="date" label="最后更新时间" width="95">
<template slot-scope="scope">
    <span>{{ scope.row.update_time }}</span>
</template>
                        </el-table-column>
                    </el-table>
                    <!-- pagenation -->
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list&&list.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="list&&list.per_page" layout="total, sizes, prev, pager, next, jumper" :total="list&&list.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>

</template>

<script>
    import _ from "lodash";
    import {
        end,
        put
    } from "../../../service/index"
    import {
        mapState,
        mapActions
    } from "vuex";
     import {isPermission } from "../../../common/utils";
    // import headTop from '../../components/header/head'
    // import {cityGuess, hotcity, groupcity} from '../../service/getData'
    const sizeOptions = ['300x250', '320x250', '1000x90', '480x320', '1280x720'];
    const typeOptions = ['Banner', 'Video', 'Native'];
    const statusOptions = ['开启', '关闭'];
    export default {
        data() {
            return {
                multipleSelection: [],
                keyWords: "",
                options: [{ //请选择客户
                    value: '选项1',
                    label: '客户1'
                }, {
                    value: '选项2',
                    label: '客户2'
                }, {
                    value: '选项3',
                    label: '客户3'
                }],
                //列表
                list: [],
                isLighten: false,
                clearIt: false, //清空图标是否显示
                currentpage: "",
                searchkey: '', //表格的搜索关键词
                showStatus: "",
                confirmBtnCustom: "",
                boxCustomClass: "",


                //列表弹框
                advertiseVisible: false,
                platformInfo:null,

                //审核状态弹框
                outAuditVisible:false,
                subData: [],
                batchAuditVisible: false, //批量审核是否可见
                // checkedPlatforms:[],//选择媒体平台‘
                // platforms:[],//媒体平台所有数据

                //媒体平台弹窗
                 checkedImages: [],//选中的数组
                 putImages:[],//默认所有的数组
                 tempUserId:null,//客户列表临时id
                 tempCheckedPlat:null,//客户列表的临时选中平台


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





            }
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.getList({
                page: 1,
                pagesize: 10,
               // auth:this.AuditSelect
            });
        },
        components: {
            // headTop
        },
        computed: {},
        methods: {
            //审核状态选中下拉切换 默认的时候传递状态为0 表示全选的状态
            changeAuditSelect(val){
                console.log(val)
                this.AuditSelect = val;//审核状态
                //出发重新进行渲染列表
                this.getList({
                    page: 1,
                    pagesize: 10,
                    com_name: this.keyWords,
                    auth:this.AuditSelect,
                   
                });

            },

            ...mapActions(["setBreadCrumb"]),
            setPermission(val){
                return isPermission(val);
            },
             //审核弹框方法开始
              outAuditCheck(val,curStatus,countAll) {
                if(curStatus == 1 && countAll!= 0){
                    this.outAuditVisible = true;
                    end.adverExternalAudit({
                        advartiser_id: val
                    }).then(res => {
                    if (res.data.code == 0) {
                            this.isLighten = false;
                            this.batchAuditVisible = false;
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
                }else{
                    return
                }
            },

             cancel() {
                this.advertiseVisible = false;
            },

            handleSizeChangeSub(val) {
                this.pageSizeSub = val;
                this.getList({
                    page: 1,
                    pagesize: this.pageSizeSub,
                    auth:this.AuditSelect
                });
            },
             handleCurrentChangeSub(val) {
                this.getList({
                    page: val,
                    pagesize: this.pageSizeSub,
                    auth:this.AuditSelect
                });
                this.currentPageSub = val;
            },


            //审核弹框方法开始





            //通过name获得id的值
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
            //平台的弹框提交
             onSubmit() {
                end.addReview({
                    id: this.tempUserId,
                    plat_id:_.uniq(this.checkedImages),
                    //数组形式的id值
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.advertiseVisible = false;
                        this.getList({//操作成功之后，从新刷新列表
                            page: this.currentpage,
                            pagesize:this.pageSize,
                            auth:this.AuditSelect
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
           
            //选择媒体平台的弹窗 ,有值的时候，将值设置为false
            customeInfo(id,obj) {//obj是：媒体平台显示的内容
               this.tempUserId = id;
               this.tempCheckedPlat =obj;
               this.checkedImages=[];
               put.plantformGetrange().then(res => {
                if (res.data.code == 0) {
                    let result = res.data.data.map((item)=>{
                        item.isChecked = false;
                        return item
                    });
                    this.advertiseVisible = true;
                    console.log(obj.no)
                    console.log(result)
                    if(obj && obj.no && obj.no.length > 0){
                         let arr = obj.no;
                         arr.forEach((o,i)=>{
                            result.forEach((oo,ii)=>{
                                if(o == oo.id){
                                     this.checkedImages.push(o)
                                    oo.isChecked = true;
                                }else{
                                   // delete oo.isChecked
                                }
                            })
                        })
                     //  this.checkedImages = [...arr];

                         if(obj.yes && obj.yes.length>0){
                            let arr8= obj.yes;//1 ,6
                            arr8.forEach((o,i)=>{
                               result.forEach((oo,ii)=>{
                                    if(o == oo.id){
                                        this.checkedImages.push(o)
                                    }
                               })
                            })
                        }


                        if(obj.end && obj.end.length>0){
                            let arr2= obj.end;//1 ,6
                            arr2.forEach((o,i)=>{
                               result.forEach((oo,ii)=>{
                                    if(o == oo.id){
                                        oo.tip = "审核通过的平台，不能取消。"
                                    }
                               })
                            })
                        }
                        
                        if(obj.start && obj.start.length>0){
                            let arr4= obj.start;//1 ,6
                            arr4.forEach((o,i)=>{
                               result.forEach((oo,ii)=>{
                                    if(o == oo.id){
                                        oo.tip = "正在审核中，不能取消。"
                                    }
                               })
                            })
                        }
                       
                        if(obj.get && obj.get.length>0){
                               let arr3= obj.get;
                                arr3.forEach((o,i)=>{
                                result.forEach((oo,ii)=>{
                                        if(o == oo.id){
                                            oo.tip = "推送成功的平台，不能取消。"
                                         }
                                 })
                                })
                        }

                         

                            // this.checkedImages = [...arr];
                    }






                    this.putImages = [...result];
                }
              });
               
            },



            clearInput() {
                this.clearIt = false;
                this.keyWords = "";
                this.getList({
                    page: 1,
                    pagesize: 10,
                    com_name: this.keyWords,
                    auth:this.AuditSelect
                });
            },
            modifyStatus(val, flag) {
                if(flag == 2) {
                    this.showStatus='开启客户后，若想投放广告，还需开启相关广告计划！是否开启？';
                    this.boxCustomClass = 'customOpenFontMore';
                    this.confirmBtnCustom = 'el-button--confirm';
                } else {
                    this.showStatus='关闭客户后，该客户下所有的广告计划将暂停投放！确认关闭？';
                    this.boxCustomClass = 'customCloseFontMore';
                    this.confirmBtnCustom = 'close-clicked1';
                }
				
                this.$confirm(this.showStatus, '', {
                    customClass: this.boxCustomClass,
                    confirmButtonText: '确定',
                    confirmButtonClass: this.confirmBtnCustom,
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
				    if (flag == "1") {
                        end.customeClose({
                            id: [val]
                        }).then(res => {
                            if (res.data.code == 0) {
                                //this.loading2 = false;
                                this.$message({
                                    // message: res.data.msg,
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getList({
                                    page: this.currentpage,
                                    pagesize: 10,
                                    auth:this.AuditSelect
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
                        end.customeOpen({
                            id: [val]
                        }).then(res => {
                            if (res.data.code == 0) {
                                //this.loading2 = false;
                                this.$message({
                                    // message: res.data.msg,
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getList({
                                    page: this.currentpage,
                                    pagesize: 10,
                                    auth:this.AuditSelect
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
				
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
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
            getids() {
                let ids = [];
                for (var j = 0; j < this.multipleSelection.length; j++) {
                    ids.push(this.multipleSelection[j].id);
                }
                return ids;
            },
            open() {
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('开启客户后，若想投放广告，还需开启相关广告计划！是否开启？', '', {
                    customClass: 'customOpenFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'el-button--confirm',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {

					end.customeOpen({
                        id: this.getids()
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: this.list.current_page,
                                pagesize: 10,
                                auth:this.AuditSelect
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
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('关闭客户后，该客户下所有的广告计划将暂停投放！确认关闭？', '', {
                    customClass: 'customCloseFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'close-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
                    end.customeClose({
                        id: this.getids()
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: this.list.current_page,
                                pagesize: 10,
                                auth:this.AuditSelect
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
                this.$confirm('删除客户后，将一同删除客户资料，其下所有广告计划将暂停投放！确认删除？', '', {
                    customClass: 'customDeleteFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'delete-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {	
					end.customeDel({
                        id: this.getids()
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: this.list.current_page,
                                pagesize: 10,
                                auth:this.AuditSelect
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
            searchDataByName() {
                this.keyWords ? this.clearIt = true : this.clearIt = false;
                this.getList({
                    page: 1,
                    pagesize: 10,
                    com_name: this.keyWords,
                    auth:this.AuditSelect
                });
            },
            getList(data) {
                end.customeList(data).then(res => {
                    if (res.data.code == 0) {
                        //显示审核状态
                        res.data.data.data.forEach(ele => {
                            if(ele.auth_status == 0){
                                ele.curStatus="待内审"
                            }
                            if(ele.auth_status == 2){
                                ele.curStatus="内审不通过"
                            }
                            if(ele.auth_status == 1){
                                if(ele.countAll == 0){
                                    ele.curStatus="内审通过"
                                }else{
                                    ele.curStatus=ele.count+'/'+ele.countAll
                                }
                            }
                        });
                        

                        this.list = res.data.data;
                    }
                });
            },
            //创意尺寸
            handleSizeChange(val) {
                this.pageSize = val;
                //创意列表
                this.getList({
                    page: 1,
                    pagesize: this.pageSize,
                    auth:this.AuditSelect
                });
            },
            handleCurrentChange(val) {
                //创意列表
                this.getList({
                    page: val,
                    pagesize: this.pageSize,
                    auth:this.AuditSelect
                });
                this.currentpage = val;
            },
           
            handleCheckedSizesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.sizes.length;
                
            },
            handleCheckedTypesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.types.length;
              
            },
            handleCheckedStatussChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.statuss.length;
               
            },
            create() {
                this.$router.push({
                    path: "/customecreate"
                });
            },
            modify(val) {
                this.$router.push({
                    path: "/customeedit/" + val
                });
            }
        }
    }
</script>

        
<style lang="scss">
    @import '../../../style/mixin';
    //投放范围 弹框
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
    } 

    .client-list-content{
        background-color: #fff;
        .single-link {
            display: inline-block;
            color: #7f8599;
            background-color: #fff;
            width: 165px;
            height: 38px;
            line-height: 38px;
            transition: .1s;
            border-radius: 4px;
            text-align: center;
        } //rolelist
        .path {
            height: 72px;
            line-height: 72px;
            a,
            i {
                @include sc(18px, #a5a6bb);
                float: left;
            }
            i {
                margin: 0 10px;
            }
            span {
                vertical-align: top;
            }
        }
        .grid-content {
            position: relative;
        }
        .seek-box {
            position: absolute;
            right: 30px;
            top: 0px;
            .el-input {
                width: auto;
            }
        }
        .el-icon-revise {
          //  position: absolute;
          //  top: 50%;
         //   margin-top: -10px;
            vertical-align: middle;
            cursor: pointer;
            margin-left: 8px;
            background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px; // vertical-align: middle;
            &:hover {
                background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
        .function-list {
            margin: 20px 0 20px 30px;
            .single-link {
                width: 115px;
                vertical-align: -3px;
                margin-right: 16px;
            }
            .add-iron {
                font-size: 22px;
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
        .el-table {
            // span {
            //     color: #515974;
            // }
            th:first-child,
            td:first-child {
                padding-left: 16px;
                .cell {
                    padding-right: 0;
                }
            }
            th:nth-child(2),
            td:nth-child(2),
            th:nth-child(3),
            td:nth-child(3) {
                text-align: center;
            }
            th:nth-child(4),
            td:nth-child(4) {
                padding-left: 30px;
            }
            th:last-child,
            td:last-child {
                text-align: left;
            }
            .firm-name-adjust {
                display: table;
                margin: 0 auto;
                text-align: center;
                position: relative;
                display: flex;
                align-items: center;
                .space-adjust {
                    width: 130px;
                    display: table-cell;
                    word-wrap: break-word;
                    vertical-align: middle;
                }
            }
        }
        .block .el-pagination {
            padding: 30px;
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
    // @media screen and (max-width:1920px) {
    //     .client-list-content .el-table .firm-name-adjust{
    //         margin: 0 auto;
    //     }
    // }
    // @media screen and (max-width:1680px) {
    //     .client-list-content .el-table .firm-name-adjust{
    //         margin: 0 auto;
    //     }
    // }
    @media screen and (max-width:1366px) {
        .client-list-content .el-table .firm-name-adjust{
            margin: 0;
        }
    }


    //选择媒体平台弹框样式
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
           .col-red{
                color: #ff6870!important;
                cursor: pointer!important;
            }

</style>