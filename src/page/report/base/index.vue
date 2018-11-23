<template>
    <!-- 基础数据报表 -->
    <div class="base-data-report">
        <el-main>
            <el-col :span="24">
                <el-form ref="form" :model="form">
                    <h1 class="template-hd">查询维度</h1>
                    <div class="base-bd">
                        <!-- 日期 start -->
                        <div class="base-row">
                            <label for="" class="data-item">日期：</label>
                            <el-date-picker v-model="timePeriod" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
                            </el-date-picker>
                            <el-button :type='defaultDate=="今天"?"date default-date":"date"' @click='shortcuts("今天")'>今天</el-button>
                            <el-button :type='defaultDate=="昨天"?"date default-date":"date"' @click='shortcuts("昨天")'>昨天</el-button>
                            <el-button :type='defaultDate=="过去7天"?"date default-date":"date"' @click='shortcuts("过去7天")'>过去7天</el-button>
                            <!-- default-date -->
                            <el-button :type='defaultDate=="过去30天"?" date default-date":"date"' @click='shortcuts("过去30天")'>过去30天</el-button>
                        </div>
                        <!-- 日期 end -->
                        <!-- 报表间隔 start -->
                        <div class="base-row">
                            <label for="" class="data-item">报表间隔：</label>
                            <!-- <el-radio label="0">无</el-radio> -->
                            <el-radio v-model="form.interval" label="1">天</el-radio>
                            <el-radio v-model="form.interval" label="2">小时</el-radio>
                            <!-- <template>
                                                                                                                                                                                                                                                                                            <el-checkbox v-model="checked">
                                                                                                                                                                                                                                                                                                天</el-checkbox>
</template>
<template>
    <el-checkbox v-model="checked">
        小时</el-checkbox>
</template>-->
                    </div>
                    <!-- 报表间隔 end -->
                    <!-- 资源维度 start -->
                    <div class="base-row">
                        <label for="" class="data-item resource-data-item left">资源维度：</label>
                        <!-- <el-checkbox-group v-model="chekcboxResource" @change="handleCheckedResourceChange"> -->
   <!-- checkedSize:false,
                checkedViewType:false,
                checkedMeadia:false,
                checkedSpace:false,
                checkedmeadiaType:false -->
                            
                        <table min-width="500px" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr class="space-under">
                                    <td style="width:70px">
<template>
    <el-checkbox label="尺寸" key="尺寸" v-model="checkedSize" @change="setCheckedSize(checkedSize)">
        尺寸：</el-checkbox>
</template>
                                    </td>
                                    <td>
                                        <!-- <el-input v-model="form.width" @blur='verfiy("width")'></el-input>
                                        <i class="multiply">x</i>
                                        <el-input v-model="form.height" @blur='verfiy("height")'></el-input> -->
                                                                                 <el-select v-model="form.size" placeholder="请选择" filterable class="ajust-full-width" @change="verfiy(form.size)">
    <el-option
      v-for="item in sizeData" 
      :key="item"
      :label="item"
      :value="item">
    </el-option>
      </el-select>
                                    </td>
                                </tr>
                                <tr class="space-under">
                                    <td>
<template>
    <el-checkbox label="展现类型" key="展现类型" v-model="checkedViewType" @change="setCheckedViewType(checkedViewType)">
        展现类型：</el-checkbox>
</template>
                                    </td>
                                    <td>
                                        
                                        <el-select class="ajust-full-width" v-model="form.type" placeholder="请选择" @change="showType">
                                            <el-option v-for="item in typeList" :key="item.value" :label="item.value" :value="item.key">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr class="space-under">
                                    <td>
<template>
    <el-checkbox label="类型" key="类型" v-model="checkedmeadiaType" @change="setCheckedmeadiaType(checkedmeadiaType)">
        媒体类型：</el-checkbox>
</template>
                                    </td>
                                    <td>
                                        <template>
                                        <div style="min-width:300px">
                                        <el-select class="classify classify7" v-model="form.firstindustry"   style="margin-left:-1px"  placeholder="一级分类" @change="getSubData">
                                            <el-option v-for="item in firoptions" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>

                                        <el-select class="classify classify7" 
                                        v-model="form.secondindustry"   
                                        placeholder="二级分类" 
                                        @change="getSubValue"
                                        >

                                           <el-option v-for="item in secoptions"
                                            :key="item.value" 
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        
                                         </div>
                                           
                                        </template>

                                    </td>
                                </tr>
                                <tr class="space-under">


                           <tr class="space-under">
                                    <td>
<template>
    <el-checkbox label="媒体" key="媒体" v-model="checkedMeadia" @change="setCheckedMeadia(checkedMeadia)">
        媒体：</el-checkbox>
</template>
                                    </td>
                                    <td>
                                        
                                        <el-select class="ajust-full-width" v-model="form.media" placeholder="请选择" @change='getAdList(form.media)'>
                                            <el-option v-for="item in meadiaList" :key="item.key" :label="item.value" :value="item.key">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>


                                <tr class="space-under">
                                    <td>
<template>
    <el-checkbox label="广告位" key="广告位" v-model="checkedSpace" @change="setCheckedSpace">
        广告位</el-checkbox>
</template>
                                    </td> 
                                    <td>
                                        <el-select class="ajust-full-width" v-model="form.ad" placeholder="请选择" @change="ad(form.ad)">
                                         <el-option v-for="item in adList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- </el-checkbox-group> -->
                    </div>
                    <!-- 资源维度 end -->
                </div>
                <!-- 呈现维度 start -->
                <div class="display-dimension border-bottom-2">
                    <h2 class="template-hd">呈现维度</h2>
                    
                    <el-checkbox-group v-model="checkboxView" @change="handleCheckedViewChange">
                          
                    <div class="show-bd">
                        <div class="checkbox-group-item">
                            <label for="" class="show-title"  v-show="setPermission(73) || setPermission(74)">金额：</label>
                            
                             <el-checkbox label="消耗" key="消耗" v-show="setPermission(73)">消耗</el-checkbox>
                             <el-checkbox label="成本" key="成本" v-show="setPermission(74)">成本</el-checkbox>
                        </div>
                        <div class="checkbox-group-item">
                            <label for="" class="show-title">数据：</label>
                            <el-checkbox label="请求数" key="请求数">请求数</el-checkbox>
                            <el-checkbox label="返回数" key="返回数">返回数</el-checkbox>
                            <el-checkbox label="返回率" key="返回率">返回率</el-checkbox>
                            <!-- <el-checkbox label="千次曝光成本" key="千次曝光成本">千次曝光成本</el-checkbox> -->
                        </div>

                        <div class="checkbox-group-item">
                            <label for="" class="show-title">展示：</label>
                           <el-checkbox label="曝光数" key="曝光">曝光数</el-checkbox>
                           <el-checkbox label="曝光率" key="曝光率">曝光率</el-checkbox>
                           <!-- <el-checkbox label="千次曝光成本" key="千次曝光成本">千次曝光成本</el-checkbox> -->
                        </div>
                        <div class="checkbox-group-item">
                            <label for="" class="show-title">效果：</label>
                            <el-checkbox label="点击数" key="点击数">点击数</el-checkbox>
                            <el-checkbox label="点击率" key="点击率">点击率</el-checkbox>
                            <!-- <el-checkbox label="点击单价" key="点击单价">点击单价</el-checkbox> -->
                        </div>
                        <div class="is-confirm">
                            <el-button type="confirm" @click="onSubmit">查询</el-button>
                            <el-button type="cancel" @click="clearForm">重置</el-button>
                        </div>
                    </div>
                    </el-checkbox-group>
                </div>

                </el-form>
                    
                <!-- 呈现维度 end -->
                <!-- 导出报表 start -->
                <div class="export-report border-bottom-2">
                    <div class="export-hd">
                        <label for="" class="export-title">导出报表：</label>
                        <el-select class="ajust-full-width" v-model="paramsObj.ext" placeholder="请选择">
                            <el-option v-for="item in reporttypeList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                        
                        <label for="" class="export-title">文件名称：</label>
                        <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="paramsObj.filename">
                        </el-input>
                        <el-button type="confirm" @click="download">导出</el-button>

                    </div>
                    <div class="export-bd">
                            <el-table stripe style="width: 100%" :data="reportList.data" element-loading-text="拼命加载中">
                            <!-- <el-table-column v-if="isShowColumn.date" prop="date" label="日期"> -->
                            <el-table-column prop="date" label="日期" v-if="currentItem.date">
                                <template slot-scope="scope">
                                    {{ scope.row.date }}
                                </template>
                            </el-table-column> 

                            <el-table-column prop="view" label="尺寸" v-if="JSON.stringify(currentItem.adSize)">
                                    <template slot-scope="scope">
                                        {{ scope.row.adSize || '-' }}
                                    </template>
                            </el-table-column> 
                        
                            <el-table-column prop="name" label="客户" v-if="currentItem.uid">
                                                                <template slot-scope="scope">
                                    {{ scope.row.uid }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="plan" label="计划" v-if="currentItem.campaign_id">
                                  <template slot-scope="scope">
                                    {{ scope.row.campaign_id }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="creative_id" label="创意" v-if="currentItem.creative_id">

                                <template slot-scope="scope">
                                    {{ scope.row.creative_id }}
                                </template>
                            </el-table-column>

                        </el-table-column>
                        <el-table-column prop="media_id" label="媒体" v-if="JSON.stringify(currentItem.media_id)">
                           <template slot-scope="scope">
                                {{ scope.row.media_id || '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="type_id" label="展现类型" v-if="JSON.stringify(currentItem.adType)">
                            <template slot-scope="scope">
                                {{ getadType(scope.row.adType) || '-' }}
                            </template>
                        </el-table-column>
                         <el-table-column prop="view" label="媒体类型" v-if="JSON.stringify(currentItem.mcf) || JSON.stringify(currentItem.mcs)">
                            <template slot-scope="scope">
                                {{ scope.row.mcf }}-{{ scope.row.mcs }}
                            </template>
                        </el-table-column> 

                         <el-table-column prop="view" label="媒体" v-if="JSON.stringify(currentItem.media)">
                            <template slot-scope="scope">
                                {{ scope.row.media }}
                            </template>
                        </el-table-column> 

                         <el-table-column prop="view" label="广告位" v-if="JSON.stringify(currentItem.adSpace)">
                            <template slot-scope="scope">
                                {{ scope.row.adSpace }}
                            </template>
                        </el-table-column> 

                        <el-table-column prop="view" label="消耗" v-if="JSON.stringify(currentItem.consume)">
                                <template slot-scope="scope">
                                    {{ scope.row.consume }}
                                </template>
                        </el-table-column> 

                        <el-table-column prop="view" label="成本" v-if="JSON.stringify(currentItem.cost)">
                            <template slot-scope="scope">
                                {{ scope.row.cost }}
                            </template>
                        </el-table-column> 


                        <el-table-column prop="view" label="请求数" v-if="JSON.stringify(currentItem.request)">
                            <template slot-scope="scope">
                                {{ scope.row.request || 0}}
                            </template>
                        </el-table-column> 


                        <el-table-column prop="view" label="返回数" v-if="JSON.stringify(currentItem.answer)">
                            <template slot-scope="scope">
                                {{ scope.row.answer || 0}}
                            </template>
                        </el-table-column> 


                        <el-table-column prop="view" label="返回率" v-if="JSON.stringify(currentItem.answerrate)">
                            <template slot-scope="scope">
                                {{ scope.row.answerrate || 0 }}
                            </template>
                        </el-table-column> 

                         <el-table-column prop="view" label="曝光数" v-if="JSON.stringify(currentItem.view)">
                            <template slot-scope="scope">
                                {{ scope.row.view  || 0}}
                            </template>
                        </el-table-column> 
                         <el-table-column prop="viewrate" label="曝光率" v-if="JSON.stringify(currentItem.viewrate)">
                            <template slot-scope="scope">
                                {{ scope.row.viewrate  || 0}}
                            </template>
                        </el-table-column> 
                        
                         <el-table-column prop="click" label="点击数" v-if="JSON.stringify(currentItem.click)">
                            <template slot-scope="scope">
                                {{ scope.row.click || 0 }}
                            </template>
                        </el-table-column> 

                        <el-table-column prop="clickrate" label="点击率" v-if="JSON.stringify(currentItem.clickrate)">
                            <template slot-scope="scope">
                                {{ scope.row.clickrate ||0 }}
                            </template>
                        </el-table-column> 
                        <!-- <el-table-column prop="cpm" label="平均CPM">
                                                                                                                        <template slot-scope="scope">
     {{ scope.row.cpm }}
</template>
                        </el-table-column>
                        <el-table-column prop="cpc" label="平均CPC">
                                                                                                                                                    <template slot-scope="scope">
     {{ scope.row.cpc }}
</template>
                        </el-table-column> -->
                        </el-table>
                    </div>

                    <!-- pagenation -->
                    <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="reportList&&reportList.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="reportList&&reportList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="reportList&&reportList.total">
                    </el-pagination>
                    </div>
                </div>
                <!-- 导出报表 end -->
                
            </el-col>
        </el-main>
    </div>
</template>

<script>
  import {
        isPermission
    } from "../../../common/utils";
    import moment from "../../../common/moment";
    import {
        report
    } from "../../../service/index";
    import {
        put
    } from "../../../service/index";
    import {
        end,
        creative
    } from "../../../service/index";
    import _ from "lodash";
    import dwonloadfile from "js-file-download"
    import {
        isPositiveInteger
    } from "../../../common/utils"
    // import {
    //     extend
    // } from "../../../common/utils"
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import fileServer from 'file-saver';
    import XLSX from 'xlsx';
    // import vDialog from "./dialog";
    export default {
        computed: {
            ...mapState({
                reportList: "reportList"
            }),
            ...mapGetters({
                isShowColumn: "isShowColumn"
            }),

        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            //列表
            // this.getData({
            //     page: 1,
            //     pagesize: 10,
            //     start_date: "2018-01-01",
            //     end_date: "2018-03-30",
            //     interval: "1"
            // });
            //媒体
            put.mediaMediaName().then(res => {
                let meadia = [];
                for (var j = 0; j < res.data.data.length; j++) {
                    meadia.push({
                        key: res.data.data[j].plat_id,
                        value: res.data.data[j].media_name
                    });
                }
                this.meadiaList = _.uniq(meadia);
            });
            //广告位
            // put.mediaadName({
            //     plat_id: [5]
            // }).then(res => {
            //     let ad = [];
            //     for (var j = 0; j < res.data.data.length; j++) {
            //         ad.push({
            //             key: res.data.data[j].ad_pid,
            //             value: res.data.data[j].ad_name
            //         });
            //     }
            //     this.adList = ad;
            // });
            //this.setDefaultTime();
            this.clearForm();
            end
                .platgetMediaList()
                .then(res => {
                    let data = res.data.data;
                    this.form.firstindustry = "";
                    //this.form.secondindustry = "";
                    data.forEach((item,index)=>{
                        this.firoptions.push({
                            value: item.id,
                            label: item.name
                        });
                    })
                });

                  //创意尺寸
            creative.creativeSizeList().then(res => {
                if (res.data.code == 0) {
                    this.sizeData = res.data.data;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
        },
        data: function() {
            return {
                sizeData:[],
                  currentPage:1,
                pageSize: 10,
                checked: false,
                // value:'',
                dialogTableVisible: false,
                isIndeterminate: false,
                list: "",
                //时间间隔 时间间隔（1天，2小时）默认为：1
                customer_val: [],
                customer: [], //	维度（1客户，2计划，3创意，5类型，6媒体，7广告位）
                present: [], //	呈现维度（1消耗，2成本，3曝光，4曝光率，5曝光价格，6点击，7点击率，8点击价格，9返回数）
                form: {
                    range: "", //日期
                    interval: "1", //报表间隔
                    size: "", //尺寸
                    type: "", //展现类型
                    media: "", //媒体
                    ad: "", //广告位
                    width: "",
                    height: "",
                    firstindustry: "",
                    secondindustry: "",
                    size:""
                },
                // 资源维度（1客户，2计划，3创意，4 渠道,5类型，6媒体，7广告位，8尺寸）
                sourceData: [
                    {
                        key: "尺寸",
                        value: "8"
                    },
                    {
                        key: "展现类型",
                        value: "2"
                    },
                    {
                        key: "媒体类型",
                        value: "3"
                    },
                    {
                        key: "地域",
                        value: "4"
                    },
                    {
                        key: "媒体",
                        value: "6"
                    },
                    {
                        key: "广告位",
                        value: "7"
                    }
                ],
                //chekcboxResource: ["尺寸", "展现类型", "媒体类型", "广告位"],
                chekcboxResource: [],
                //呈现维度（1消耗，2成本，3曝光，4曝光率，5曝光价格，6点击，7点击率，8点击价格，9返回数）
                viewData: [{
                        key: "消耗",
                        value: "1"
                    },
                    {
                        key: "成本",
                        value: "2"
                    },
                    {
                        key: "曝光",
                        value: "3"
                    },
                    {
                        key: "曝光率",
                        value: "4"
                    },
                    {
                        key: "曝光价格",
                        value: "5"
                    },
                    {
                        key: "点击",
                        value: "6"
                    }, {
                        key: "点击率",
                        value: "7"
                    },
                    {
                        key: "点击价格",
                        value: "8"
                    },
                    {
                        key: "返回数",
                        value: "9"
                    }
                ],
                typeList: [{
                    key: "1",
                    value: "Banner"
                }, {
                    key: "2",
                    value: "Video"
                }, {
                    key: "3",
                    value: "Native"
                },{
                    key: "4",
                    value: "Video-Native"
                }],
                checkboxView: [],
                meadiaList: [],
                adList: [],
                reporType: "1", //报表类型
                reporttypeList: [{
                    key: "1",
                    value: "Excel"
                }, {
                    key: "2",
                    value: "Txt"
                }],
                checkedResource: [],
                paramsObj: {
                    ext: "1",
                    filename: ""
                },
                defaultDate: "昨天",
                timePeriod: [],
                firoptions: [],
                secoptions: [],
                parameter: {},
                currentAdId:"",
                 checkedSize:false,
                checkedViewType:false,
                checkedMeadia:false,
                checkedSpace:false,
                checkedmeadiaType:false,
                //报表下载 参数key值  类型 ext  文件名称 filename

                currentItem:{}
            };
        },
        components: {
            // vDialog
        },
        methods: {
           setPermission(val){
                return isPermission(val);
            },
            ...mapActions(["setBreadCrumb", "getReportList"]),
            getSubValue(val){
                if(val){
                    this.checkedmeadiaType=true;
                }

            },

            getadType(keys){
                let temp = this.typeList.filter((item)=>{
                    return item.key == keys
                })

                if(temp.length>0){
                    return temp[0].value
                }
                
            },
            getSubData(val) {
                let that =this;
                this.secoptions = [];
                end
                    .platgetMediaList({
                        mediaId: val
                    })
                    .then(res => {
                         let data = res.data.data;
                         data.forEach((item,index)=>{
                               that.secoptions.push({
                                value: item.id,
                                label: item.name
                              });
                         })

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                        //this.setSecIndustry(parseInt(key));
                    });

                    console.log( that.secoptions)
                // if (this.form.firstindustry) {
                //     this.chekcboxResource.push("媒体类型");
                // }
            },
            getSecondIndustry(val) {
                if (val) {
                    this.chekcboxResource.push("媒体类型");
                }
            },
            getData(data) {
                console.log(data);
               
                report.centerbaselist(data).then(res => {
                    if (res.data.code == 0) {  
                        if(res.data.data.data[0]){
                            this.currentItem=res.data.data.data[0];
                        }else{
                            //显示查询的数据数据表头信息
                             if(data.end_date){
                                this.currentItem.date = true;
                             }  
                             if(JSON.parse(data.customer).adSize && JSON.parse(data.customer).adSize.ch){
                                   this.currentItem.adSize = true;
                             }
                              if(JSON.parse(data.customer).adType && JSON.parse(data.customer).adType.ch){
                                this.currentItem.adType = true;
                              }

                             if(JSON.parse(data.customer).mcf && JSON.parse(data.customer).mcf.ch){
                                this.currentItem.mcf = true;
                              }

                            if(JSON.parse(data.customer).media && JSON.parse(data.customer).media.ch){
                                this.currentItem.media = true;
                              }

                            if(JSON.parse(data.customer).adSpace && JSON.parse(data.customer).adSpace.ch){
                                this.currentItem.adSpace = true;
                            }

                            data.present.forEach((item,index)=>{
                                if(item == "消耗"){
                                    this.currentItem.consume = true;
                                }
                                if(item == "成本"){
                                    this.currentItem.cost = true;
                                }
                                 if(item == "请求数"){
                                    this.currentItem.request = true;
                                }
                                  if(item == "返回数"){
                                    this.currentItem.answer = true;
                                }
                                  if(item == "返回率"){
                                    this.currentItem.answerrate = true;
                                }
                                  if(item == "曝光数"){
                                    this.currentItem.view = true;
                                }
                                  if(item == "点击数"){
                                    this.currentItem.click = true;
                                }
                                  if(item == "点击率"){
                                    this.currentItem.clickrate = true;
                                }
                                
                            })

                        }
                        this.getReportList(res.data.data);
                    } else {

                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            handleCheckedResourceChange(value) {
                if (this.checkedResource.length >= value.length) { //取消选中
                    let difference = _.difference(this.checkedResource, this.chekcboxResource);
                    if (difference[0] == "媒体") {
                        this.form.media = "";
                    }
                    if (difference[0] == "尺寸") {
                        this.form.width = "";
                        this.form.height = "";
                    }
                    if (difference[0] == "展现类型") {
                        this.form.type = "";
                    }
                    if (difference[0] == "广告位") {
                        this.form.ad = "";
                    }
                } else {
                    let difference = _.difference(value, this.checkedResource);
                    // console.log("选中");
                    // console.log(difference);
                }
                this.checkedResource = value;
            },
            handleCheckedViewChange(value) {},
            handleSizeChange(val) {
                this.pageSize = val;

                  this.getData(this.params(),{page:this.currentPage,pageSize:val});
            },
            handleCurrentChange(val) {
                  this.getData(_.assign(this.params(),{page:val,pagesize:this.pageSize}));
                this.currentPage=val;
            },
            getIdsByName(source, data) {
                let result = [];
                for (var j = 0; j < data.length; j++) {
                    for (var k = 0; k < source.length; k++) {
                        if (data[j] == source[k].key) {
                            result.push(source[k].value);
                        }
                    }
                }
                return result;
            },
            onSubmit() {
               
                let self = this;
                      self.parameter = this.params();

                this.getData(self.parameter);
            },
            clearForm() {
                this.form = {
                    range: "", //日期
                    interval: "1", //报表间隔
                    size: "", //尺寸
                    type: "", //展现类型
                    media: "", //媒体
                    ad: "", //广告位
                    width: "",
                    height: ""
                };
                this.chekcboxResource = [];
                this.checkboxView = [];
                this.timePeriod = [];
                this.customer_val = [];
                this.customer = [];
                this.setDefaultTime();
                this.$store.state.reportList = [];

                this.checkedSize=false,
                this.checkedViewType=false,
                this.checkedMeadia=-false,
                this.checkedSpace=false,
                this.checkedmeadiaType=false 
            },
            download(url) {
                let self = this;
                report.campbasedown(this.parameter).then(res => {
                    
                    if (res.data.code == 0) {
                        if (self.paramsObj.ext == "1") {
                            self.downloadCSV(res.data.data, self.paramsObj.filename ? self.paramsObj.filename : "report");
                        } else {
                            self.downloadTxt(res.data.data, self.paramsObj.filename.filename ? self.paramsObj.filename : "report");
                        }
                    } else {}
                });
            },
            downloadCSV(val, filename) {
                function datenum(v, date1904) {
                    if (date1904) v += 1462;
                    var epoch = Date.parse(v);
                    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
                }
                function sheet_from_array_of_arrays(data, opts) {
                    var ws = {};
                    var range = {
                        s: {
                            c: 10000000,
                            r: 10000000
                        },
                        e: {
                            c: 0,
                            r: 0
                        }
                    };
                    for (var R = 0; R != data.length; ++R) {
                        for (var C = 0; C != data[R].length; ++C) {
                            if (range.s.r > R) range.s.r = R;
                            if (range.s.c > C) range.s.c = C;
                            if (range.e.r < R) range.e.r = R;
                            if (range.e.c < C) range.e.c = C;
                            var cell = {
                                v: data[R][C]
                            };
                            if (cell.v == null) continue;
                            var cell_ref = XLSX.utils.encode_cell({
                                c: C,
                                r: R
                            });
                            if (typeof cell.v === 'number') cell.t = 'n';
                            else if (typeof cell.v === 'boolean') cell.t = 'b';
                            else if (cell.v instanceof Date) {
                                cell.t = 'n';
                                cell.z = XLSX.SSF._table[14];
                                cell.v = datenum(cell.v);
                            } else cell.t = 's';
                            ws[cell_ref] = cell;
                        }
                    }
                    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                    return ws;
                }
                function Workbook() {
                    if (!(this instanceof Workbook)) return new Workbook();
                    this.SheetNames = [];
                    this.Sheets = {};
                }
                var key = XLSX.utils.encode_cell({
                    c: 0,
                    r: 0
                });
                var ws = sheet_from_array_of_arrays(val);
                var workbook = new Workbook();
                workbook.SheetNames.push("kdg");
                workbook.Sheets["kdg"] = ws;
                var wbout = XLSX.write(workbook, {
                    bookType: 'xlsx',
                    bookSST: true,
                    type: 'binary'
                });
                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
                fileServer.saveAs(new Blob([s2ab(wbout)], {
                    type: ""
                }), filename + ".xlsx");
            },
            downloadTxt(val, filename) {
                let str = ""
                _.forEach(val, function(item) {
                    _.forEach(item, function(val, key) {
                        if (key == item.length - 1) {
                            str += val + "\r\n"
                        } else {
                            str += val + " ";
                        }
                    })
                });
                var blob = new Blob([str], {
                    type: "text/plain;charset=utf-8"
                });
                fileServer.saveAs(blob, filename + ".txt");
            },
            parseParam(param) {
                let url = "?";
                for (var key in param) {
                    url += key + "=" + param[key] + "&"
                }
                return url;
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
            },
            changeDate() {
                this.defaultDate = "";
            },
            getAdList(val) {
                let self = this;
                this.adList = [];
                //检测是否是数组
                put.mediaadName({
                    media_id: val
                }).then(res => {
                    this.form.ad = "";
                    _.forEach(res.data.data, function(item) {
                        self.adList.push({
                            key: item.ad_id,
                            value: item.ad_id,
                            label: item.ad_name
                        })
                    });

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
                if (this.form.media) {
                   this.checkedMeadia=true;
                }
            },
            setDefaultTime() {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                this.timePeriod = [date, date]
            },
            verfiy(val) {
                // let data = val == "width" ? this.form.width : this.form.height;
                // if (!isPositiveInteger(data)) {
                //     this.$message({
                //         message: '请输入正整数!',
                //         type: 'warning'
                //     });
                //     if (val == "width") {
                //         this.form.width = "";
                //     } else {
                //         this.form.height = "";
                //     }
                // };

                // if(this.form.width&&this.form.height){
                //      this.checkedSize=true;
                // }

                if(val){
                    this.checkedSize=true;

                }else{
                    this.checkedSize=false;
                }
            },
            ad(val) {

               
                if (val) {
                    this.checkedSpace=true;
                }
            },
            showType() {
                if (this.form.type) {
                  this.checkedViewType=true;
                }
            },

              params() {
                var parameter = {
                    start_date: moment(this.timePeriod[0]).format("YYYY-MM-DD"),
                    end_date: moment(this.timePeriod[1]).format("YYYY-MM-DD"),
                    interval: this.form.interval,
                    // customer: _.uniq(this.customer),
                    // customer_val: _.uniq(this.customer_val),
                     customer : {
                             adSize:{
                                "ch":this.checkedSize,
                                // "val":this.form.width!=""?this.form.width+"*"+this.form.height:""
                                val:this.form.size
                             },
                             adType:{
                                "ch":this.checkedViewType,
                                "val":this.form.type,
                             },
                             mcf:{
                                 "ch":this.checkedmeadiaType,
                                 "val":this.form.firstindustry,
                             },

                             mcs:{
                                 "ch":this.checkedmeadiaType,
                                 "val":this.form.secondindustry,
                             },
                             media:{
                                "ch":this.checkedMeadia,
                                "val":this.form.media,
                             },
                             adSpace:{
                                "ch":this.checkedSpace,
                                "val":this.form.ad,
                             },
                       },

                    present: _.uniq(this.checkboxView)
                }


               for(let attr in parameter.customer){
                     let _val = parameter.customer[attr];
                     if(!_val.ch){
                        delete (parameter.customer[attr])
                     }
               }

                parameter.customer = JSON.stringify(parameter.customer)

                //console.log(parameter)
                return parameter;
            },

            //   <!-- checkedSize:false,
            //     checkedViewType:false,
            //     checkedMeadia:false,
            //     checkedSpace:false,
            //     checkedmeadiaType:false -->

            //   size: "", //尺寸
            //         type: "", //展现类型
            //         media: "", //媒体
            //         ad: "", //广告位

            setCheckedSize(val){
                // if(!val){
                //     this.form.width="";
                //     this.form.height="";
                //     this.form.size
                // }

                this.form.size="";
            },
            setCheckedViewType(val){
                 if(!val){

                     this.form.type="";

                 }

            },
            setCheckedMeadia(val){
                if(!val){

                    this.form.media="";
                     
                 }

            },
            setCheckedSpace(val){
                if(!val){

                     this.form.ad="";
                     
                 }

            },
            setCheckedmeadiaType(val){
                if(!val){
                     this.form.firstindustry="";
                     this.form.secondindustry="";
                 }

            }

        }
    };
</script>

<style lang="scss">
    @import "../../../style/mixin";
    @import "../../../style/common";
    .base-data-report {
        // 用于继承字号12
        .font12 {
            font-size: 12px;
        }
        .el-main {
            background-color: transparent;
        }
        .template-hd,
        .base-bd,
        .display-dimension,
        .export-report {
            background-color: #fff;
        }
        .template-hd {
            padding: 20px 0 20px 30px;
            border-bottom-width: 1px;
        }
        .base-bd {
            padding: 20px 0 0 30px;
        } // single row
        .base-row {
            margin-bottom: 23px;
            &:last-child {
                margin-bottom: 0;
            }
            .el-radio__label {
                @include sc(12px, $secondc);
            }
        } // date style
        .el-date-editor {
            margin-right: 8px;
            width: 240px;
        } // row label
        .data-item {
            margin-right: 5px;
            color: $firstc !important;
        }
        .el-checkbox+.el-checkbox {
            margin: 0 0 0 16px;
        }
        .el-checkbox__label {
            color: $secondc !important;
            @extend .font12;
        }
        .resource-data-item {
            margin-top: 9px;
        } // resource row style
        .resource-wrap {
            .el-input {
                width: 99px;
            }
            .multiply {
                margin: 0 16px 0 17px;
                font-size: 14px;
                color: #515974;
            }
            tr.space-under>td {
                padding-bottom: 15px;
            }
            .ajust-full-width {
                .el-input {
                    width: 240px;
                }
            }
            .classify {
                .el-input {
                    width: 115px;
                }
                &:first-child {
                    margin-right: 10px;
                }
            }
            .classify7{
                float: left !important;
                display: inline-block !important;
                .el-input {
                    width: 177px;
                }
            }
        } // display dimension
        .display-dimension {
            .template-hd {
                padding-top: 7px;
            } // solve font size problem in el-checkbox-group
            .el-checkbox-group {
                font-size: 14px;
            }
            .show-bd {
                padding: 20px 0 30px 30px;
            }
            .checkbox-group-item {
                margin-bottom: 20px;
            }
            .show-title {
                color: $secondc;
                margin-right: 5px;
            }
            .el-checkbox__label {
                color: $secondc !important;
                @extend .font12;
            }
            .is-confirm {
                padding-top: 10px;
                background-color: $fc;
            }
        } // export report template
        .export-report {
            margin-top: 20px;
            .export-hd {
                padding: 20px 0 20px 30px;
            }
            .export-title {
                color: $firstc;
                padding-right: 1px;
            }
            .ajust-full-width {
                margin-right: 16px;
            }
            .el-input--prefix {
                width: 180px;
                margin-right: 5px;
            }
            .el-input__inner {
                // padding: 0 28px 0 14px !important;
            }
            .el-input__prefix {
                left: 83% !important;
            }
        }
    }
</style>