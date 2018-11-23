<template>
    <div class="custome-create">
        <el-main>
            <el-form ref="form" :model="form" label-width="">
                <el-col :span="24" class="margin-bottom-20 border-bottom-2">
                    <h1 class="template-hd">基本资料</h1>
                    <div class="base-bd">
                        <!-- 企业简称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>企业简称：</label>
                            <el-input placeholder="6字以内，允许汉字或英文;必填" v-model="form.brand"></el-input>
                        </div>
                        <!-- 企业简称： end -->
                        <!-- 公司注册名称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>公司注册名称：</label>
                            <el-input placeholder="20字以内，允许汉字或英文;必填" v-model="form.com_name"></el-input>
                        </div>
                        <!-- 公司注册名称： end -->
                        <!-- 企业注册地址： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>企业注册地址：</label>
                            <el-input placeholder="40字以内，允许汉字或英文;必填" v-model="form.com_addr"></el-input>
                        </div>
                        <!-- 企业注册地址： end -->
                        <!-- 企业LOGO： start -->
                        <div class="create-row special-logo">
                            <label for="" class="data-item"><i class="item-needed"></i>企业LOGO：</label>
                            <el-input class="upload-control" :class="{'upload-input':isUpload}" placeholder="格式:JPG/PNG,不超过500KB。" v-model="logofile" :readonly="true">
                                <i slot="suffix" class="el-icon-close" @click="clearUpload('uploadedlogo')"></i>
                            </el-input>
                            <el-button type="upload" @click="selectLogo">上传</el-button>
                            <input type="file" name="pic" accept="image/gif, image/jpeg" id="fileLogo" v-if="iconShow" @change="uploadLogo" style="display:none" />
                            <span class="tips-important"></span>
                        </div>
                        <!-- 企业LOGO： end -->
                        <!-- 网址： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed"></i>网址：</label>
                            <el-input class="" placeholder="全域名。http/https;非必填、加验证" clearable v-model="form.web_site">
                            </el-input>
                        </div>
                        <!-- 网址： end -->
                        <!-- 联系人： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>联系人：</label>
                            <el-input class="" placeholder="汉字或英文;必填" v-model="form.contacts">
                            </el-input>
                        </div>
                        <!-- 联系人： end -->
                        <!-- 电话： start -->
                        <div class="create-row">
                            <label for="" class="data-item "><i class="item-needed">*</i>电话：</label>
                            <el-input class="" placeholder="固话或移动电话;必填" v-model="form.tel">
                            </el-input>
                        </div>
                        <!-- 电话： end -->

                         <!-- 结算方式： start -->
                        <!-- <div class="create-row">
                            <label for="" class="data-item "><i class="item-needed">*</i>结算方式：</label>
                             <template>
                              <el-radio v-model="form.settlement_type" label="1">cpm</el-radio>
                              <el-radio v-model="form.settlement_type" label="2">cpc</el-radio>
                            </template>
                        </div> -->
                        <!-- 结算方式  end -->
                    </div>
                </el-col>
                <!-- 资质文件 -->
                <el-col :span="24" class="qualify-file margin-bottom-20 border-bottom-2">
                    <h1 class="template-hd">资质文件</h1>
                    <div class="base-bd">
                        <!-- 企业资质 -->
                        <div class="create-row rule-set">
                            <label for="" class="data-item left"><i class="item-needed">*</i>企业资质：</label>
                            <table width="60%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr v-for="item in companydata" :key="item.id">
                                        <!-- <tr>companytemp -->
                                        <td>
                                            <el-select class="ajust-full-width" 
                                            filterable placeholder="请选择" 
                                            v-model="item.model"
                                             @change="setCompanyType(item.id)">
                                                <!-- <el-option label="营业执照" value=1></el-option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <el-option label="商务登记证" value=2></el-option> -->
                                                <el-option 
                                                v-for="item in companyoptions" 
                                                :key="item.value" 
                                                :label="item.label" 
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </td>
                <td>
                    <el-input class="upload-control" :class="{'upload-input':isCompanyUpload}" placeholder="请上传企业资质文件" v-model="companyFile" :readonly="true">
                        <i slot="suffix" class="el-icon-close" @click="clearUpload('uploaedCompany',item.id)"></i>
                    </el-input>
                    <el-button type="upload" @click="selectCompany(item.id)">上传</el-button>
                    <input type="file" name="pic" accept="image/gif, image/jpeg" :id='"file"+item.id' v-if="companyShow" @change="uploadCompany(item.id, item.model)" style="display:none" />
                </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="create-row rule-set clear">
                            <label for="" class="data-item left"><i class="item-needed"></i>资质编号：</label>
                            <el-input class="left" placeholder="对应文件资质编号(不做限制)非必填" v-model="form.content">
                            </el-input>
                        </div>
                        <!-- 其他资质 -->
                        <div class="create-row rule-set clear">
                            <label for="" class="data-item left"><i class="item-needed">*</i>其他资质：</label>
                            <table width="70%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under" v-for="item in otherdata" :key="item.id">
                                        <td>
                                            <!-- <el-select class="ajust-full-width" placeholder="请选择" v-model="item.model" @change="setOtherType(item.id)">
                                                <el-option label="法人身份证" value=1></el-option>
                                                <el-option label="组织机构代码" value=2></el-option>
                                                <el-option label="ICP备案证明 " value=3></el-option>
                                                <el-option label="税务登记证" value=4></el-option>
                                             </el-select>  -->

                                            <el-select 
                                                class="ajust-full-width" 
                                                placeholder="请选择" 
                                                v-model="item.model" 
                                                filterable
                                                @change="setOtherType(item.id)"
                                            >
                                                     <el-option 
                                                        v-for="item in otheroptions" 
                                                        :key="item.value" 
                                                        :label="item.label" 
                                                        :value="item.value">
                                                     </el-option>
                                            </el-select> 
                                        </td>
                                        <td>
                                            <el-input class="upload-control" :class="{'upload-input':isOtherUpload}" placeholder="请上传其他资质文件" v-model="item.name" :readonly="true">
                                                <i slot="suffix" class="el-icon-close" @click="clearUpload('uploadedOther', item.id)"></i>
                                            </el-input>
                                            <el-button type="upload" @click="selectOther(item.id)">上传</el-button>
                                            <input type="file" name="pic" accept="image/gif, image/jpeg" :id='"file"+item.id' @change='uploadOther(item.id)' style="display:none" />
                                            <el-button v-if="item.key!=1" size="small" type="danger" @click="delType(item.id)">删除</el-button>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td colspan="2">
                                            <el-button @click="addOterTemp">
                                                <span class="el-icon-plus"></span>
                                            </el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 所属行业 -->
                        <div class="create-row rule-set clear">
                            <label for="" class="data-item left"><i class="item-needed">*</i>所属行业：</label>
                            <table width="70%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <!-- <tr class="" v-for="item in otherdata" :key="item.id"> -->
                                    <tr>
                                        <td>
                                            
                            <el-select v-model="form.firstindustry" placeholder="一级分类" @change="getSubData(form.firstindustry)">
                                <el-option v-for="item in firoptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                                        </td>
                                        <td>
                                            
                            <el-select v-model="form.secondindustry" placeholder="二级分类">
                                <el-option v-for="item in secoptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 行业资质 -->
                        <div class="create-row rule-set clear">
                            <label for="" class="data-item left"><i class="item-needed">*</i>行业资质：</label>
                            <table width="70%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under" v-for="item in businessdata" :key="item.id">
                                        <td>
                                            <el-select 
                                             class="ajust-full-width"
                                             placeholder="请选择" 
                                             v-model="item.model" 
                                             filterable
                                             @change="setBuisnessType(item.id)">
                                                <el-option 
                                                  v-for="item in businessoptions"
                                                 :key="item.value" 
                                                 :label="item.label" 
                                                 :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td>
                                            <el-input class="upload-control" :class="{'upload-input':isBusinessUpload}" placeholder="请上传其他资质文件" v-model="item.name" :readonly="true">
                                                <i slot="suffix" class="el-icon-close" @click="clearUpload('uploadedBusiness', item.id)"></i>
                                            </el-input>
                                            <el-button type="upload" @click="selectBusiness(item.id)">上传</el-button>
                                            <input type="file" name="pic" accept="image/gif, image/jpeg" :id='"file"+item.id' @change='uploadBusiness(item.id)' style="display:none" />
                                            <el-button v-if="item.key!=1" size="small" type="danger" @click="delBusiness(item.id)">删除</el-button>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td colspan="2">
                                            <el-button @click="addBusinessTemp">
                                                <span class="el-icon-plus"></span>
                                            </el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </el-col>
                <!-- 客户权限 -->
                <el-col :span="24" class="margin-bottom-20 border-bottom-2 customer-authority-wrap">
                    <h1 class="template-hd">客户权限</h1>
                    <div class="base-bd">
                        <!-- 服务费率： start -->
                        <div class="create-row" v-show='setPermission(52)'>
                            <label for="" class="data-item"><i class="item-needed">*</i>服务费率：</label>
                            <div class="per-unit" :class="{ 'error-border': isService == 'service' }">
                                <div class="unit-setting i-blue">
                                    <el-input placeholder="请输入服务费率" v-model="form.servicerate" @blur="setService(form.servicerate)"></el-input>
                                    <span class="unit">%</span>
                                </div>
                                <span class="error-tip">请填写小于一百的数字，精确到0.01</span>
                            </div>
                        </div>
                        <!-- 服务费率： end -->
                        <!-- 信用金： start -->
                        <div class="create-row" v-show='setPermission(54)'>
                            <label for="" class="data-item"><i class="item-needed">*</i>信用金：</label>
                            <div class="per-unit" :class="{ 'error-border': isCredit == 'credit' }">
                                <div class="unit-setting i-yellow">
                                    <el-input placeholder="请输入信用金" v-model="form.credit" @blur="checkYuan(form.credit)"></el-input>
                                    <span class="unit meta">元</span>
                                </div>
                                <span class="error-tip">请填写数字，精确到0.01</span>
                            </div>
                        </div>
                        <!-- 信用金： end -->
                        <!-- 结算类型： start -->
                        <!-- <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>结算类型：</label>
                            
                            <el-select class="ajust-full-width" placeholder="请选择" v-model="form.balance" @change="setBalanceType(form.value)">
                                <el-option v-for="item in balanceoptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div> -->
                        <!-- 结算类型： end -->

                         <!-- 结算方式： start -->
                        <div class="create-row settlement_type_css">
                            <label for="" class="data-item "><i class="item-needed">*</i>结算方式：</label>
                             <template>
                              <el-radio  :disabled="settlement_type_disable" v-model="form.settlement_type" label="1">cpm</el-radio>
                              <el-radio  :disabled="settlement_type_disable" v-model="form.settlement_type" label="2">cpc</el-radio>
                              <!-- <el-radio v-model="form.settlement_type" label="3">cpa</el-radio> -->
                            </template>
                        </div>
                        <!-- 结算方式  end -->

                    


                    </div>
                </el-col>

                   <!-- 投放平台 start -->
                    <el-col :span="24" class="input-area">
                        <h1 class="template-hd">选择媒体平台</h1>
                        <div class="template-bd border-bottom-2">
                            <el-checkbox-group v-model="checkedImages">
                                <el-checkbox v-for="img in putImages" :label="img.id" :key="img.id" :disabled="img.isChecked">
                                    <img :src="img.logo" alt="" class="put-img" width="88" height="58" />
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <!-- 投放平台 end -->


                <!-- 帐户分配 -->
                <!-- <el-col :span="24" class="margin-bottom-20 border-bottom-2">
                                                    <h1 class="template-hd">帐户分配</h1>
                                                    <div class="base-bd">
                                                        <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市拼音" v-model="checkedAccount" :data="getAccount">
                                                        </el-transfer>
                                                    </div>
                                                </el-col> -->
                <!-- 帐户分配 -->
                <el-col :span="24" class="margin-bottom-20 border-bottom-2" v-show="setPermission(55)">
                    <h1 class="template-hd">帐户分配</h1>
                    <div class="base-bd">
                        <div class="account-search-wrap left" style="width:480px;">

                            <div class="el-input el-input--prefix">
                                <input autocomplete="off" placeholder="搜索内容..." type="text" prefixicon="el-icon-search" clearable="true" class="el-input__inner" @keyup="searchDataBykeyword(keyword)" v-model="keyword"  />
                                <span class="el-input__prefix">
                                    <i class="el-input__icon el-icon-search"></i>
                                </span>
                            </div>

                            <!-- <input placeholder="搜索内容..." prefix-icon="el-icon-search" @keyup="searchDataBykeyword(keyword)" v-model="keyword" /> -->
                            
                            <el-scrollbar class="account-search-bd" style="width:202px;display:inline-block" >
                                <ul>
                                    <li  v-for="item in letfData" :key="item.id" class="search-item">
                                        <el-checkbox  v-model="item.checked" @change="selectRole(item.id,item.checked,letfData)">{{item.name}}</el-checkbox>
                                    </li>
                                </ul>
                            </el-scrollbar>
                            <el-scrollbar class="account-search-bd" style="width:278px;display:inline-block;border-left:none;margin-left:-5px" >
                                <ul>
                                    <li v-for="item in powerData" :key="item.id" class="search-item">
                                        <el-checkbox v-model="item.checked"  @change="selectAccount(item.name,item.checked,powerData)">{{item.name}}</el-checkbox>
                                    </li>
                                </ul>
                            </el-scrollbar>

                        </div>
                        <div class="account-list" style="margin-left:521px">
                            <span class="turn-iron"></span>
                            <div class="inferior-hd" @click="clearAll">全部清除</div>
                            <el-scrollbar class="account-clear-bd clear">
                                <ul class="account-items-row" v-for="item in rightData" :key="item.id">
                                    <li class="search-item" @click="selectDelITem(item.id)">
                                        <span class="account-name">{{item.name}}</span>
                                        <span class="account-delete" v-if="item.id==currentItemId" @click="delItem(item.id,item)">x</span>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                    </div>
                </el-col>
                <!-- 备注 -->
                <el-col :span="24" class="remarks border-bottom-2">
                    <h1 class="template-hd">备注</h1>
                    <el-input type="textarea" :rows="2" resize="none" placeholder="请填写备注" v-model="form.ad_remark">
                    </el-input>
                </el-col>
                <el-col :span="24" class="margin-bottom-20">
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
        mapActions
    } from "vuex";
    import {
        end,
        home,
        put
    } from "../../../service/index";
    import _ from "lodash";
    import uuid from "uuid";
    import randomstring from "random-string";

     import {
        isPermission
    } from "../../../common/utils";

    export default {
        data: function() {
            return {
                iconShow:true,//企业LOGO
                companyShow:true,//企业资质上传按钮
                companyFile: '',//企业资质上传文件名

                currentAccount: "",
                checkedAccount: [],
                letfData: [],
                rightData: [],
                accountTransfer: [],
                currentItemId: "",
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                //
                firoptions: [],
                secoptions: [],
                companyoptions: [],
                otheroptions: [],
                businessoptions: [],
                // companyoptions: [{
                //     value: 1,
                //     label: '营业执照'
                // }, {
                //     value: 2,
                //     label: '商务登记证'
                // }],
                // otheroptions: [{
                //         value: 1,
                //         label: "法人身份证"
                //     },
                //     {
                //         value: 2,
                //         label: "组织机构代码"
                //     },
                //     {
                //         value: 3,
                //         label: "ICP备案证明"
                //     },
                //     {
                //         value: 4,
                //         label: "税务登记证"
                //     }
                // ],
                // businessoptions: [{
                //         value: 1,
                //         label: "增值电信业务营业许可证"
                //     },
                //     {
                //         value: 2,
                //         label: "金融保险"
                //     }
                // ],


                balanceoptions: [{
                        value: 1,
                        label: "CPM结算"
                    },
                    {
                        value: 2,
                        label: "CPC结算"
                    },
                     {
                        value: 3,
                        label: "CPA结算"
                    }
                ],

                origin_brand:'',//原始的值- 企业简称
                origin_com_name:'',
                origin_com_addr:'',
                origin_content:'',
                form: {
                    brand: "", //企业简称
                    com_name: "", //公司名称
                    com_addr: "", //公司注册
                    contacts: "", //联系人
                    tel: "", //手机号
                    logo: "", //logo文件
                    web_site: "", //网址
                    content: "", //资质简介/编号 //只有企业资质有的
                    aptitude_type: [], //'资质类型（类似：1企业资质，2其他资质，3行业资质等）',
                    aptitude_id: [], //	'资质编号（类似：1营业执照，2法人身份证等）',
                    file: [], //图片
                    credit: "", //信用金
                    priority: "", //优先级
                    servicerate: "", //服务费率
                    ad_remark: "", //备注
                    id: "",
                    firstindustry: "", //一级分类
                    secondindustry: "", //二级分类
                    advlist: "", //账户
                    companyfile: "",
                    otherfile: "",
                    businessfile: "",
                    balance: "",
                    settlement_type:"1",//结算方式

                },
                company: "",
                other: "",
                business: "",
                account: [],
                accountSourceData: [],
                companytemp: [],
                othertemp: [], //
                businesstemp: [],
                otherid: 0,
                companyid: 0,
                businessid: 0,
                logofile: "",
                businessfilename: "",
                otherfilename: "",
                companyfilename: "",
                keyword: "",
                isUpload: "",
                isCompanyUpload: "",
                isOtherUpload: "",
                isBusinessUpload: "",
                isService: "",
                isCredit: "",

                //角色权限数据
                powerData:[],//权限
                roleArr:[],//账户分配-选中角色
                powerArr:[],//账户分配-选中账户
                originalRoleData:[],//初始的角色数据
                settlement_type_disable:false,//结算方式

                editRole:null,//编辑的时候默认的角色

                checkedImages:[],//投放平台
                putImages: [],//投放图片
            };
        },
        computed: {
            setCurrentItemId() {
                return this.currentItemId;
            },
            dynamicCompanyTemp() {

                return this.companydata;
            },
            getAccount() {
                let data = [];
                this.account.forEach((city, index) => {
                    data.push({
                        label: city,
                        key: index,
                        pinyin: this.account[index]
                    });
                });
                this.accountTransfer = data;
                return data;
            },
            ...mapState({
                secIndustry: "secIndustry",
                companydata: "companydata", //企业
                otherdata: "otherdata", //其他行业资源
                businessdata: "businessdata", //行业资源
            }),
        },
        methods: {
            getPlatInfo(obj){//获得可用平台数据
             put.plantformGetrange().then(res => {
                if (res.data.code == 0) {
                    let result = res.data.data.map((item)=>{
                        item.isChecked = false;
                        return item
                    });
                    if(obj && obj.no && obj.no.length > 0){
                         let no = obj.no;
                         no.forEach((o,i)=>{//1,6,7
                            result.forEach((oo,ii)=>{
                                if(o == oo.id){
                                    oo.isChecked = true
                                }
                            })
                        })
                        if(obj.yes){
                            this.checkedImages = [...obj.no.concat(obj.yes)];
                        }else{
                            this.checkedImages = [...obj.no];
                        }
                        
                    }
                     this.putImages = result;
                   
                }
             })
            },
            ...mapActions(["setBreadCrumb", "setSecIndustry", "getOtherData", "getCompanyData", "getBusinessData","publicAdvertiserInfo"]),
            searchDataBykeyword(val) {
                if(val){
                     let data = _.filter(this.letfData, function(item) {
                       return item.name.indexOf(val) > -1;
                   });
                   this.letfData = data;
                }else{
                    this.letfData = this.originalRoleData.slice(0)
                }
               
            },

            selectRole(val,flag,letfData) {//通过角色获得账户数据
                let tempRoleArr = [];
                letfData.forEach((item)=>{
                    if(item.checked){
                        tempRoleArr.push(item.id);
                    }
                });
                let postRole = {
                      id:tempRoleArr
                };
                if(tempRoleArr.length > 0){
                    end.roleAccountNum(postRole).then(res => {
                        if (res.data.code == 0) {
                            this.accountSourceData = res.data.data;
                            let tempData = null;
                            if(!Array.isArray(res.data.data)){
                                 tempData = Array.from(res.data.data).slice(0);
                            }else{
                                tempData =  res.data.data.slice(0);
                            }
                            res.data.data.forEach((item)=>{
                                item.checked = false;
                             })

                            let originData = this.powerData.filter((item)=>{
                                return item.checked
                            })
                            if(originData.length > 0){
                                    originData.forEach((item,index)=>{
                                        tempData.forEach((iitem,iindex)=>{
                                            if(item.name == iitem.name){
                                                iitem.checked = true;
                                            }
                                        })
                                    })
                            }
                            this.powerData = tempData.slice(0);
                            let tempRight =  [];
                            this.rightData.forEach((item,index)=>{
                                   this.powerData.forEach((_item,_index)=>{
                                      if(item.name == _item.name){
                                          tempRight.push(item)
                                      }
                                   })
                             })
                            
                            this.letfData = letfData.slice(0);
                            this.rightData = tempRight;
                           
                        }
                        if (res.data.code == -1) {
                                this.$router.push({
                                    path: "/login"
                                });
                            }
                    });
                }else{
                     this.powerData=[];
                     this.rightData =[];
                }

            },
            selectAccount(name,flag,powerData){//根据权限获得账户信息  将左侧信息放置到右侧
                    if(flag){//点中的时候添加  查看是否有值的时候
                         let filterData =  this.powerData.filter((item)=>{
                             return item.checked
                         })
                         this.rightData = filterData.slice(0);
                    }else{//取消的时候，尽心清除
                         this.rightData.forEach((item,index)=>{
                             if(name == item.name){
                                  this.rightData.splice(index,1)
                             }
                         })
                    }
                    this.powerData = powerData.slice(0);
                   
            },
            selectDelITem(val) {
                this.currentItemId = val;
            },
            setService(obj) {
                // 设定服务费率: 百分号，小于一百的数字，精确到小数点后两位
                let perRegex = /(?!^0\.0?0$)^[0-9][0-9]?(\.[0-9]{1,2})?$/;
                if (obj) {
                    if (perRegex.test(obj)) { //true
                        this.isService = "";
                    } else { //false
                        this.isService = "service";
                    }
                } else {
                    this.isService = "";
                }
            },
            checkYuan(obj) {
                // 设定信用金（额度）数字和小数点后两位
                // 只能是数字，和一个点，点后两位小数
                let yuanRegex = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                if (obj) {
                    if (yuanRegex.test(obj)) { //true
                        this.isCredit = "";
                    } else { //false
                        this.isCredit = "credit";
                    }
                } else {
                    this.isCredit = "";
                }
            },
            setPermission(val){
                return isPermission(val);
            },
            clearAll() {
                // for (var j = 0; j < this.rightData.length; j++) {
                //     this.letfData.push(this.rightData[j]);
                // }
                this.rightData = [];
            },
            delItem(val,item) {
                this.currentItemId = val;
                let data = _.filter(this.rightData, function(item) {
                    return item.id != val;
                });
                let currentItem = _.find(this.rightData, function(item) {
                    return item.id == val;
                });
                this.rightData = data;

                //右侧删除之后，将左侧的复选框清空
                let _index = this.powerData.indexOf(item);
                this.powerData[_index].checked = false;
            },
            goBack() {
                this.$router.go(-1);
            },
            getSubData(val) {
                this.secoptions = [];
                end
                    .industryType({
                        id: val
                    })
                    .then(res => {
                        let data = res.data.data;
                        this.form.secondindustry = "";
                        for (var key in data) {
                            this.secoptions.push({
                                value: parseInt(key),
                                label: data[key]
                            });
                        }

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                        //this.setSecIndustry(parseInt(key));
                    });
            },
            validationform() {
                if (!this.form.brand) {
                    this.$message({
                        message: "请输入企业简称",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.com_name) {
                    this.$message({
                        message: "请输入公司名称",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.com_addr) {
                    this.$message({
                        message: "请输入注册地址",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.contacts) {
                    this.$message({
                        message: "请输入联系人",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.tel) {
                    this.$message({
                        message: "请输入联系电话",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.firstindustry) {
                    this.$message({
                        message: "请选择一级分类",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.secondindustry) {
                    this.$message({
                        message: "请选择二级分类",
                        type: "warning"
                    });
                    return;
                }
                //资质文件
                //资质文件
                if (!this.companytemp[0].model && this.$route.params.id) {
                    this.$message({
                        message: "请选择企业资质类型",
                        type: "warning"
                    });
                    return;
                }
                if (!this.companytemp[0].file && !this.$route.params.id) {
                    this.$message({
                        message: "请上传企业资质文件",
                        type: "warning"
                    });
                    return;
                }
                //客户权限
                if (this.setPermission(52) &&!this.form.servicerate) {
                    this.$message({
                        message: "请输入服务费率",
                        type: "warning"
                    });
                    return;
                }
                if (this.setPermission(54) && !this.form.credit) {
                    this.$message({
                        message: "请输入信用金",
                        type: "warning"
                    });
                    return;
                }
                if (this.checkedImages.length == 0) {
                    this.$message({
                        message: "请选择投放平台",
                        type: "warning"
                    });
                    return;
                }

                return true;
            },
            onSubmit() {
                // console.log(this.$route.params.id);
                // if (this.$route.params.id) {
                //     fileData.append("id", this.$route.params.id);
                // }
                // return;
                this.form.aptitude_type = [];
                this.form.aptitude_type = [];
                this.form.file = [];
                let self = this;


                if (this.validationform()) {
                    let fileData = new FormData();
                    fileData.append("brand", this.form.brand); //企业简称
                    fileData.append("com_name", this.form.com_name); //公司名称
                    fileData.append("logo", this.form.logo); //公司logo
                    fileData.append("web_site", this.form.web_site); //网址
                    fileData.append("com_addr", this.form.com_addr); //注册地址
                    fileData.append("contacts", this.form.contacts); //联系人
                    fileData.append("tel", this.form.tel); //电话

                    fileData.append("settlement_type", this.form.settlement_type); //结算方式


                    fileData.append("firstindustry", this.form.firstindustry); //一级分类
                    fileData.append("secondindustry", this.form.secondindustry); //二级分类
                    //企业资质

                    //投放平台
                    _.uniq(this.checkedImages).forEach((item)=>{
                          fileData.append("plat_id[]",item)
                    });
                 
                    self.form.aptitude_id.length = 0;
                    self.form.aptitude_type.length =0;
                    this.companytemp.forEach(function(value, index, array) {
                        if (value.model != "" && value.file) {
                            self.form.aptitude_type.push(1);
                            self.form.aptitude_id.push(value.model);
                            self.form.file.push(value.file);
                        }
                    });
                    //其他资质
                    let other = _.cloneDeep(this.$store.state.otherdata);
                    
                    this.othertemp.forEach(function(value, index, array) {
                        if (value.model != "" && value.file) {
                            self.form.aptitude_type.push(2);
                            self.form.aptitude_id.push(value.model);
                            self.form.file.push(value.file);
                        }
                    });
                    //行业资质
                    this.businesstemp.forEach(function(value, index, array) {
                        if (value.model != "" && value.file) {
                            self.form.aptitude_type.push(3);
                            self.form.aptitude_id.push(value.model);
                            self.form.file.push(value.file);
                        }
                    });
                    for (let j = 0; j < this.form.aptitude_type.length; j++) {
                        fileData.append("aptitude_type[]", this.form.aptitude_type[j])
                    }
                    for (let k = 0; k < this.form.aptitude_id.length; k++) {
                        fileData.append("aptitude_id[]", this.form.aptitude_id[k]);
                    }
                    for (let l = 0; l < this.form.file.length; l++) {
                        fileData.append("file[]", this.form.file[l])
                    }

                    fileData.append("content", this.form.content);

                    if(this.form.servicerate){
                        fileData.append("servicerate", this.form.servicerate); //服务费率
                    }

                    if(this.form.credit){
                        fileData.append("credit", this.form.credit); //信用金
                    }
                    
                    //fileData.append("advlist", this.form.advlist); //账户
                    //let adList = this.getIdsByName(this.getNameBykey(this.checkedAccount));
                    if (this.rightData.length != 0) {
                        let adList = this.getAccoutIds(this.rightData);
                        for (let l = 0; l < adList.length; l++) {
                            fileData.append("advlist[]", adList[l]);
                        }
                    }
                    fileData.append("ad_remark", this.form.ad_remark); //备注
                    if (this.$route.params.id) {
                        fileData.append("id", this.$route.params.id);
                    }

                    if(!this.$route.params.id){
                        end.DoEditAd(fileData).then(res => {
                               if (res.data.code == 0) {
                                    home.publicAdvertiserInfo().then(resSub => {
                                         if (res.data.code == 0) {
                                           this.publicAdvertiserInfo(resSub.data.data);
                                         }
                                     })
                                      this.goBack();
                                }else{
                                     this.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: "error"
                                      });
                                }

                            })
                    }
                    


                    if(this.$route.params.id){

                        if(this.form.brand != this.origin_brand || this.form.com_name != this.origin_com_name || this.form.com_addr != this.origin_com_addr || this.form.content !=this.origin_content){
                                const h = this.$createElement;
                                this.$msgbox({
                                    confirmButtonText: '确定',
                                     title: '修改以下信息会触发账户的重新审核:',
                                    confirmButtonClass:'btn-fff',
                                    dangerouslyUseHTMLString: true,
                                       message: h('p', null, [
                                        h('div', null, '1.企业简称 2.公司注册名称 3.公司注册地址 4.企业资质 '),
                                        h('div', { style: 'color: #e95058' }, '审核通过前，您账户中的所有广告将会暂停;审核通过后，账户中的广告将自动恢复推广。')
                                      ]),
                                    callback: action => {
                                         end.DoEditAd(fileData).then(res => {
                                           if (res.data.code == 0) {
                                                home.publicAdvertiserInfo().then(resSub => {
                                                 if (res.data.code == 0) {
                                                   this.publicAdvertiserInfo(resSub.data.data);
                                                 }

                                            });
                                        this.goBack();
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
                                    });
                 }else{
                      end.DoEditAd(fileData).then(res => {
                                   if (res.data.code == 0) {
                                       home.publicAdvertiserInfo().then(resSub => {
                                  if (res.data.code == 0) {
                                        this.publicAdvertiserInfo(resSub.data.data);
                                     }

                                        });
                                        this.$message({
                                            // message: res.data.msg,
                                            message: "操作成功",
                                            type: "success"
                                        });
                                        this.goBack();
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
                  
                }
            },
            selectLogo() {
                this.iconShow=true;
                setTimeout(()=>this.$el.querySelector("#fileLogo").click(),300)
            },
            selectCompany(val) {
                this.companyShow=true;
                // console.log(val);
                setTimeout(()=>this.$el.querySelector("#file" + val).click(),300)
            },
            selectOther(val) {
                this.$el.querySelector("#file" + val).click();
            },
            selectBusiness(val) {
                this.$el.querySelector("#file" + val).click();
            },
            setBalanceType() {


            },
            clearUpload(key,val) {
                if (key == 'uploadedlogo') {
                    this.isUpload = false;
                    this.logofile = "";
                    this.iconShow = true;
                } else if (key == 'uploaedCompany') {
                    this.isCompanyUpload = false;
                    this.companyFile = "";
                    this.companyShow = true;

                } else if (key == 'uploadedOther') {
                    this.isOtherUpload = false;
                } else if (key == 'uploadedBusiness') {
                    this.isBusinessUpload = false;
                }
            },
            uploadLogo(event) {
                this.iconShow = false;
                this.form.logo = this.$el.querySelector("#fileLogo").files[0];
                this.logofile = this.form.logo.name;
                this.isUpload = true;
            },
            uploadCompany(val) {
                this.companyShow = false;
                let self = this;
                let file = this.$el.querySelector("#file" + val).files[0];
                let data = _.forEach(this.companytemp, function(item) {
                    if (item.id == val) {
                        item.name = file.name;
                        item.file = file;
                        self.companyFile = file.name;
                    }
                });
                this.companytemp = data;
                this.isCompanyUpload = true;
                this.getCompanyData(this.companytemp);
            },
            uploadOther(val) {
                let file = this.$el.querySelector("#file" + val).files[0];
                let data = _.forEach(_.cloneDeep(this.$store.state.otherdata), function(item) {
                    if (item.id == val) {
                        item.name = file.name;
                        item.file = file;
                    }
                });
                this.othertemp = data;
                this.isOtherUpload = true;
                this.getOtherData(this.othertemp);
            },
            uploadBusiness(val) {
                let file = this.$el.querySelector("#file" + val).files[0];
                let data = _.forEach(_.cloneDeep(this.$store.state.businessdata), function(item) {
                 
                    if (item.id == val) {
                        item.name = file.name;
                        item.file = file;
                    }
                });
                this.businesstemp = data;
                this.isBusinessUpload = true;
                this.getBusinessData(this.businesstemp);
            },
            setCompany() {},
            setOther() {
                this.form.otherfile = "";
                this.otherfilename = "";
            },
            setBusiness() {
                this.form.businessfile = "";
                this.businessfilename = "";
            },
            appendtoform(form, key, val) {
                if (val.length == 0) {
                    return;
                }
                for (var j = 0; val.length; j++) {
                    form.append(key, val[j]);
                }
            },
            addOterTemp() {
                this.otherid += 1;
                this.othertemp.push({
                    id: this.otherid,
                    uuid: randomstring(),
                    model: "",
                    name: "",
                    file: "",
                    key: this.otherid == 1 ? 1 : ""
                });
                this.getOtherData(this.othertemp);
            },
            addCompnayTemp() {
                // this.companyid += 1;
                this.companytemp.push({
                    id: randomstring(),
                    // id: this.companyid,
                    uuid: randomstring(),
                    model: "",
                    name: "",
                    file: ""
                });
                this.getCompanyData(this.companytemp);
            },
            addBusinessTemp() {
                this.businessid += 1;
                this.businesstemp.push({
                    id: randomstring(),
                    // id: this.businessid,
                    uuid: randomstring(),
                    model: "",
                    name: "",
                    file: "",
                    key: this.businessid == 1 ? 1 : ""
                });
                this.getBusinessData(this.businesstemp);
            },
            setOtherType(val) {
                let data = _.forEach(_.cloneDeep(this.$store.state.otherdata), function(item) {
                    if (item.id == val) {
                        item.name = "";
                        item.file = "";
                    }
                });
                this.getOtherData(data);
            },
            setCompanyType(val) {
                let data = _.forEach(this.companytemp, function(item) {
                    if (item.id == val) {
                        item.name = "";
                        item.file = "";
                    }
                });
            
                this.getCompanyData(data);
            },
            setBuisnessType(val) {
                let data = _.forEach(_.cloneDeep(this.$store.state.businessdata), function(item) {
                    if (item.id == val) {
                        item.name = "";
                        item.file = "";
                    }
                });
                this.getBusinessData(data);
            },
            delType(item) {
                let data = _.reject(this.othertemp, {
                    id: item
                });
                this.othertemp = data;
                this.getOtherData(this.othertemp);
                this.removeFile(item);
               
            },
            removeFile(val){
                 end.delFile({
                    id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }


                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });

            },
            delBusiness(item) {
                let data = _.reject(this.businesstemp, {
                    id: item
                });
                this.businesstemp = data;
                this.getBusinessData(this.businesstemp);
                 this.removeFile(item);
            },
            
            changeOtherType(val) {
                //     console.log(this.othertemp);
                //   this.getOtherData(this.othertemp);
            },
            getNameBykey(val) {
                let result = [];
                for (var j = 0; j < val.length; j++) {
                    for (var k = 0; k < this.accountTransfer.length; k++) {
                        if (val[j] == this.accountTransfer[k].key) {
                            result.push(this.accountTransfer[k].label);
                        }
                    }
                }
                return result;
            },
            getAccoutIds() {
                console.log(this.rightData);
                if (this.rightData.length == 0) {
                    return;
                }
                let result = [];
                for (var j = 0; j < this.rightData.length; j++) {
                    if (this.rightData[j]) {
                        result.push(this.rightData[j].id);
                    }
                }
                return result;
            },
            getIdsByName(val) {
                let result = [];
                for (var j = 0; j < val.length; j++) {
                    for (var k = 0; k < this.accountSourceData.length; k++) {
                        if (val[j] == this.accountSourceData[k].name) {
                            result.push(this.accountSourceData[k].id);
                        }
                    }
                }
                return result;
            },
            //初始化
            getNameByIds(val) {
                let result = [];
                for (var j = 0; j < val.length; j++) {
                    for (var k = 0; k < this.accountSourceData.length; k++) {
                        if (val[j] == this.accountSourceData[k].id) {
                            result.push(this.accountSourceData[k]);
                        }
                    }
                }
                console.log(result);
                return result;
            },
            getKeyByName(val) {
                let result = [];
                for (var j = 0; j < val.length; j++) {
                    for (var k = 0; k < this.accountTransfer.length; k++) {
                        if (val[j] == this.accountTransfer[k].label) {
                            result.push(this.accountTransfer[k].key);
                        }
                    }
                }
                return result;
            },
            setSecValue(parent, sub) {
                end
                    .industryType({
                        id: parent
                    })
                    .then(res => {
                        let data = res.data.data;
                        this.form.secondindustry = "";
                        for (var key in data) {
                            this.secoptions.push({
                                value: parseInt(key),
                                label: data[key]
                            });
                        }
                        this.setSecIndustry(sub);
                        this.form.secondindustry = parseInt(this.secIndustry);

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                        // console.log(this.otherdata);
                        // this.otherdata = [];
                        // console.log(this.otherdata);
                        
                    });
            },
            verificationOtherItem() {
                console.log(this.otherdata);
                let self = this;
                _.forEach(this.othertemp, function(item) {
                    // if (item.model == "请选择" && item.file == "") {
                    //     return true;
                    // } else {
                    //     if (item.model == "请选择" || item.file == "") {
                    //         // self.$message({
                    //         //     message: "类型文件必须同时选择",
                    //         //     type: "warning"
                    //         // });
                    //         return false;
                    //     }
                    // }
                    if ((item.model != "请选择" && item.file == "") || (item.model == "请选择" && item.file != "")) {
                        console.log("if");
                        return true;
                    }
                });
                // return true;
            },
            verificationItem() {}
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            // this.getOtherData(this.othertemp);
            this.addCompnayTemp();
            this.addOterTemp();
            this.addBusinessTemp();

            //获得所有的角色:letfData  右侧的数据:rightData
            end.roleAll().then(res=>{
                if(res.data.code == 0){
                     res.data.data.forEach((item)=>{
                                item.checked = false;
                     })
                     let data = res.data.data;
                      //将数据进行存储
                      this.originalRoleData=data;
                      this.letfData =  data;
                }   
               
            });
            //根据某一个角色获得账户:powerData

            //一级分类
            end.industryType().then(res => {
                let data = res.data.data;
                for (var key in data) {
                    this.firoptions.push({
                        value: key,
                        label: data[key]
                    });
                }
            });

            //获得企业，其他，行业资质
             end.getAllAptitude({type:1}).then(res => {
                let data = res.data.data;
                let tempArr=[]; 
                data.forEach((item)=>{
                    let obj={};
                    obj.value=item.aptitude_id;
                    obj.label = item.name;
                    tempArr.push(obj);
                })
                this.companyoptions = [...tempArr];
            });



             end.getAllAptitude({type:2}).then(res => {
                 let data = res.data.data;
                 let tempArr=[]; 
                 data.forEach((item)=>{
                    let obj={};
                    obj.value=item.aptitude_id;
                    obj.label = item.name;
                    tempArr.push(obj);
                 })
                this.otheroptions = [...tempArr];
               
            });

             end.getAllAptitude({type:3}).then(res => {
                 let data = res.data.data;
                 let tempArr=[]; 
                 data.forEach((item)=>{
                    let obj={};
                    obj.value=item.aptitude_id;
                    obj.label = item.name;
                    tempArr.push(obj);
                 })
                this.businessoptions = [...tempArr];
            });

            if(!this.$route.params.id){
                this.getPlatInfo()
            }

            if (this.$route.params.id) {
                this.settlement_type_disable = true;
                this.businesstemp = [];
                this.companytemp = [];
                this.othertemp = [];
                this.businesstemp = [];
                end.customInfo({
                    id: this.$route.params.id //this.$route.params.id,
                }).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;

                        this.form.brand = data.brand;
                        this.origin_brand = data.brand;
this.origin_com_name=data.com_name;
this.origin_com_addr=data.com_addr;
this.origin_content=data.content;
                        this.form.com_name = data.com_name;
                        this.form.com_addr = data.com_addr;
                        this.logofile = data.old_logofilename;

                        this.getPlatInfo(data.auth);
                        this.form.web_site = data.web_site;
                        this.form.contacts = data.contacts;
                        this.form.tel = data.tel;
                        this.form.settlement_type = data.settlement_type.toString();
                        this.form.firstindustry = data.firstindustry;
                        this.setSecValue(this.form.firstindustry, data.secondindustry);
                        let otherkey = 0;
                        let filelistother = [];
                        let buisnesskey = 0;
                        let filelistbusiness = [];

                        //账户和角色的赋值操作
                        let role =data.role;//[2,16]
                        this.editRole = role;
                        role.forEach((item,index)=>{
                            this.letfData.forEach((iitem,iindex)=>{
                                if(iitem.id == item){
                                    iitem.checked =true; 
                                }
                           })
                        })


                        //通过角色然后，将账户进行赋值
                        let advlistTemp = data.advlist;//[]//账户信息 [5,9]
                        if(this.setPermission(55)){//根据权限控制，是否是请求账户信息
                             end.roleAccountNum({
                                id:role
                             }).then(res => {
                                if (res.data.code == 0) {
                                let tempData = null;
                                if(!Array.isArray(res.data.data)){
                                    tempData = Array.from(res.data.data).slice(0);
                                }else{
                                    tempData =  res.data.data.slice(0);
                                }
                                tempData.forEach((item,index)=>{
                                        item.checked = false;
                                })
                                advlistTemp.forEach((item,index)=>{
                                        tempData.forEach((iitem,iidex)=>{
                                            if(iitem.id == item){
                                                    iitem.checked = true;
                                                    this.rightData.push(iitem)
                                            }
                                        })
                                })
                                this.powerData = tempData.slice(0);
                            }
                            if (res.data.code == -1) {
                                    this.$router.push({
                                        path: "/login"
                                    });
                            }
                         });
                       }
                       
                           


                        for (var j = 0; j < data.aptitude.length; j++) {
                            if (data.aptitude[j].aptitude_type == 1) {
                                
                                this.companytemp.push({
                                    id: data.aptitude[j].id,
                                    uuid: data.aptitude[j].id,
                                    model: data.aptitude[j].aptitude_id,
                                    // file: data.aptitude[j].file_path,
                                    name: data.aptitude[j].old_filename
                                });
                                this.form.content = data.aptitude[j].content;
                                this.getCompanyData(this.companytemp);
                                for(var g = 0; g < this.companytemp.length; g++) {
                                    this.companyFile = this.companytemp[g].name;
                                }
                            }
                            if (data.aptitude[j].aptitude_type == 2) {
                                filelistother.push(data.aptitude[j]);
                            }
                            if (data.aptitude[j].aptitude_type == 3) {
                                filelistbusiness.push(data.aptitude[j]);
                            }
                        };
                        //其他资源
                        for (var k = 0; k < filelistother.length; k++) {
                            otherkey += 1;
                            this.othertemp.push({
                                id: filelistother[k].id,
                                uuid: filelistother[k].id,
                                model: filelistother[k].aptitude_id,
                                // file: data.aptitude[j].file_path,
                                name: filelistother[k].old_filename,
                                key: otherkey == 1 ? 1 : ""
                            });
                            this.getOtherData(this.othertemp);
                        }
                        //行业资质
                        for (var j = 0; j < filelistbusiness.length; j++) {
                            buisnesskey += 1;
                            this.businesstemp.push({
                                id: filelistbusiness[j].id,
                                uuid: filelistbusiness[j].id,
                                model: parseInt(filelistbusiness[j].aptitude_id),
                                // file: data.aptitude[j].file_path,
                                name: filelistbusiness[j].old_filename,
                                key: buisnesskey == 1 ? 1 : ""
                            });
                            this.getBusinessData(this.businesstemp);
                        }
                        this.form.servicerate = data.servicerate;
                        this.form.credit = data.credit;
                        //this.checkedAccount = data.advlist;
                        this.form.ad_remark = data.ad_remark != "null" ? data.ad_remark : "";
                        //z账户
                        this.form.advlist = data.advlist;
                        this.rightData = this.getNameByIds(this.form.advlist);
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
    @import "../../../style/mixin";
    @import "../../../style/common";
    .btn-fff{
        span{
            color: #fff !important;
        }
    }
    .custome-create {
        // background color set
        .settlement_type_css{
            .el-radio__input.is-checked .el-radio__inner {
                    border-color: #409EFF;
                    background: #409EFF;
                }
        }
        .el-main {
            background: transparent;
        }
        .el-col-24 {
            background-color: #ffffff;
        } // 用于继承字号12
        .font12 {
            font-size: 12px;
        }
        .template-hd {
            padding: 20px 0 20px 30px;
            border-bottom-width: 1px;
        }
        .base-bd {
            padding: 20px 0 30px 30px;
        } // upload button common margin left
        // single row
        .create-row {
            margin-bottom: 13px;
            .el-input {
                width: 240px;
            }
            .el-checkbox__label {
                @include sc(12px, $firstc);
            }
            .upload-wrap {
                display: inline-block;
            }
            .el-button--upload {
                margin-left: 4px;
            }
            &:last-child {
                margin-bottom: 0;
            }
            td:first-child {
                width: 250px;
            }
            td:last-child {
                .el-input {
                    vertical-align: 1px;
                }
            }
        } // customer authority different data-item
        .customer-authority-wrap {
            .data-item {
                width: 86px;
                margin: 0;
            }
            .unit {
                @include bottomRightRadius(5px);
                @include topRightRadius(5px);
            }
        }
        .special-logo {
            .el-input {
                width: 205px;
            }
        } // single row title
        .data-item {
            color: $firstc;
            margin-right: 6px;
            width: 114px;
            display: inline-block;
        } // need user to fill tip
        .item-needed {
            color: $redc;
            display: inline-block;
            width: 7px;
            margin-right: 7px;
            vertical-align: -2px;
        } // important tip
        .tips-important {
            display: inline-block;
            @include svgbg("../../../style/image/creative/tips-important.svg");
            height: 24px;
            width: 24px;
            vertical-align: -7px;
            margin-left: 11px;
            @include transX(180deg);
        } // 资质文件
        // remove button
        .el-button--danger {
            margin-left: 6px;
        } // qulify file row
        .rule-set {
            .data-item {
                margin: 9px 3px 0 0;
                width: 98px;
            }
            .inferior-title {
                color: $secondc;
                margin: 9px 6px 0 0;
            }
            .space-under>td {
                padding-bottom: 15px;
            }
            .el-button--default {
                border-style: dashed;
                width: 593px;
            }
        } // adjust border with 0
        .border-none {
            border-bottom: 0 none;
            padding-bottom: 15px;
        }
        .el-input--suffix {
            margin-right: 5px;
        } // confirm and cancel
        .is-confirm {
            padding-left: 30px;
        } // remarks module
        .remarks {
            .el-textarea {
                margin: 20px 0 30px 30px;
            }
            .el-textarea__inner {
                width: 600px;
                height: 120px;
            }
        } // account dispatch module start
        .account-search-wrap {
            width: 300px;
            .el-input {
                width: 100%;
            }
            .account-search-bd {
                height: 360px;
                border: 1px solid #e1e7f0;
                @include bottomLeftRadius(5px);
                @include bottomRightRadius(5px);
                border-top: 0 none;
            } // input search remove bottom radius
            .el-input__inner {
                @include bottomLeftRadius(0);
                @include bottomRightRadius(0);
            }
            .el-checkbox__label {
                @include sc(12px, #bdbecd);
            }
            .is-checked+.el-checkbox__label {
                @include sc(12px, #515974);
            }
        } // search each item
        .search-item {
            height: 36px;
            line-height: 36px;
            padding: 0 20px;
            &:hover,
            &.active {
                background-color: #f6f8fa;
            }
        } // all remove
        .account-list {
            margin-left: 338px;
            position: relative;
            border: 1px solid #e1e7f0;
            width: 300px;
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
                height: 360px;
            }
            .search-item {
                padding: 0 15px 0 19px;
            }
            .account-name {
                @include sc(12px, #7f8599);
            }
            .account-delete {
                color: #515974;
                float: right;
                cursor: pointer;
            }
        } // account dispatch module end
        //投放平台
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
    }
</style>