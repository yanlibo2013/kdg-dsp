<template>
    <div class="">
        <el-main>
            <el-row class="ad-list-content">
                <el-col :span="24" class="border-bottom-2">
                    <div class="ad-module-hd ">
                        <div class="function-list" style="height:78px">
                            <a href="javascript:void(0);" class="single-link el-link-add" @click="edit('')" v-show="setPermission(61)">
                                <i class="add-iron" >+</i>
                                <span class="add-msg">创建广告位</span>
                                
                            </a>
                            
            <el-button 
            type="click" 
            :class="{'open-clicked1':isLighten}" 
            @click="open"
            v-show="setPermission(62)">
            开启</el-button>
            <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close" v-show="setPermission(62)">关闭</el-button>
            <el-button type="click" 
            :class="{'delete-clicked1':isLighten}" 
            @click="del" v-show="setPermission(63)">删除</el-button>

             <div class="seek-box">
                            
                          <!--   <el-select 
                            style="width:180px"
                            v-model="dropvalue" 
                            @change="changefilterstate"
                            placeholder="全部">
                                    <el-option v-for="item in dropoptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                             </el-select>  -->

                            <el-input 
                            style="width:180px"
                            placeholder="请输入关键词" 
                            prefix-icon="el-icon-search" 
                            v-model="keyWords" 
                            @keyup.native="searchDataByName" 
                            clearable>
                            </el-input>
                        </div>

            
                        </div>
                       
                    </div>
                    <el-table :data="list.data" style="width: 100%" @selection-change="handleSelectionChange">

                        <el-table-column type="selection">
                        </el-table-column>


						
						 <el-table-column prop="a_id" label="ID" width="90">
<template slot-scope="scope">
<span>{{ scope.row.ad_id }}</span>
</template>
                            </el-table-column>

                        <el-table-column prop="name" label="广告位名称" width="180">
                            <template slot-scope="scope">
                            	<span :title="scope.row.ad_name" style="display:inline-block;width:120px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;vertical-align: middle;">{{scope.row.ad_name}}</span>
                            	<a href="javascript:void(0);" class="el-icon-revise" @click="edit(scope.row.id)" v-show="setPermission(61)">
                            	</a>
</template>
                            </el-table-column>

 						<el-table-column prop="add_id" label="广告位ID" width="100">
							<template slot-scope="scope">
                            <span>{{ scope.row.ad_pid1 }}</span>
                            <br v-if="scope.row.ad_pid2 && scope.row.ad_pid1">
							<span>{{ scope.row.ad_pid2 }}</span>

							</template>
                        </el-table-column>


                            <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                            <el-switch v-model='scope.row.Iconflag'
                             active-text="关闭" 
                             inactive-text="开启"
                             @change="modifyStatus(scope.row.id,scope.row.Iconflag)"
                             >
                            </el-switch>
                            </template>
                            </el-table-column>


                            <!-- <el-table-column prop="style" label="广告样式" width="100">
							<template slot-scope="scope">
							<span>{{ scope.row.style_id }}</span>
							</template>
                            </el-table-column>

                             <el-table-column prop="rules" label="广告位规范" >
							<template slot-scope="scope">
							<span>{{ scope.row.style_details.toString()}}</span>
							</template>
                            </el-table-column>

                             <el-table-column prop="price" label="采购价格" width="70">
							<template slot-scope="scope">
							<span>{{ scope.row.cost }}</span>
							</template>
                            </el-table-column>

                            <el-table-column prop="ratio" label="损耗系数" width="70">
							<template slot-scope="scope">
							<span>{{ scope.row.price_rate }}</span>
							</template>
                            </el-table-column> -->

                            <el-table-column prop="pv" label="每日预计PV">
							<template slot-scope="scope">
							<span>{{ scope.row.pv }}</span>
							</template>
                            </el-table-column>

                            <el-table-column prop="pv" label="广告样式">
							<template slot-scope="scope">
                                
                                <a href="javascript:void(0);" class="link-jump" 
                                @click="adStyle(scope.row.id)">{{ scope.row.style_id }}</a>
                                
                                <el-dialog class="adStyleList" title="广告样式" width="952" 
                                    :show-close="true" :visible.sync="adStyleVisible">
                                        <el-table :data="auditList" height="250" style="width: 100%">
                                            <el-table-column label="广告样式">
                                                <template prop="name" slot-scope="scope">
                                                    {{scope.row.style}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="广告位规范" width="300">
                                                <template prop="name" slot-scope="scope">

            <span v-if="scope.row.style_details.type =='image'">
                广告类型:图片; &nbsp;图片数量:{{scope.row.style_details.imagenumber}};&nbsp; 图片尺寸:{{scope.row.style_details.W}}x{{scope.row.style_details.H}};&nbsp; 图片类型:{{scope.row.style_details.imagetype}};&nbsp; 是否logo:{{scope.row.style_details.image?'是':'否'}}
            </span>

            <span v-if="scope.row.style_details.type =='imagegroup'">
                广告类型：组图;&nbsp;图片数量:{{scope.row.style_details.imagenumber}};&nbsp;图片尺寸:{{scope.row.style_details.W}}x{{scope.row.style_details.H}};&nbsp;图片类型:{{scope.row.style_details.imagetype}};&nbsp;标题字数:{{scope.row.style_details.title}};&nbsp;描述字数:{{scope.row.style_details.desc}};&nbsp;是否logo:{{scope.row.style_details.image?'是':'否'}}
            </span>

            <span v-if="scope.row.style_details.type =='shortvideo'">
                广告类型:短视频;&nbsp;图片数量:{{scope.row.style_details.imagenumber}};&nbsp;图片尺寸:{{scope.row.style_details.W}}x{{scope.row.style_details.H}};&nbsp;图片类型:{{scope.row.style_details.imagetype}};&nbsp;视频尺寸:{{scope.row.style_details.videowidth}}x{{scope.row.style_details.videoheight}};&nbsp;视频格式:{{scope.row.style_details.videotype}};&nbsp;视频时长:{{scope.row.style_details.videotime}}s;&nbsp;
                标题字数:{{scope.row.style_details.title}};&nbsp;描述字数:{{scope.row.style_details.desc}};&nbsp;是否logo:{{scope.row.style_details.image?'是':'否'}}
            </span> 

            <span v-if="scope.row.style_details.type =='imagetext'">
                广告类型:图文;&nbsp;图片数量:{{scope.row.style_details.imagenumber}};&nbsp;图片尺寸:{{scope.row.style_details.W}}x{{scope.row.style_details.H}};&nbsp;图片类型:{{scope.row.style_details.imagetype}};&nbsp;
                标题字数:{{scope.row.style_details.title}};&nbsp;描述字数:{{scope.row.style_details.desc}},是否logo:{{scope.row.style_details.image?'是':'否'}}
            </span> 

             <span v-if="scope.row.style_details.type =='longvideo'">
                广告类型:视频;&nbsp;视频尺寸:{{scope.row.style_details.videowidth}}x{{scope.row.style_details.videoheight}};&nbsp;视频格式:{{scope.row.style_details.videotype}};&nbsp;视频时长:{{scope.row.style_details.videotime}}s
            </span> 

          
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="媒价采购价格">
                                                <template prop="simplename" slot-scope="scope">
                                                    {{scope.row.settlement_price}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="资源售卖价格">
                                                <template prop="remark" slot-scope="scope">
                                                    {{scope.row.sale}}
                                                </template>
                                            </el-table-column>
                                            
                                            
                                        </el-table>
                                            <div slot="footer" class="dialog-footer">
                                                <div class="block">
                                                    <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="creativeList.current_page" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="creativeList.total">
                                                    </el-pagination> -->
                                                </div>

                                            </div>
                                    </el-dialog>

							</template>
                            </el-table-column>
                           
                            <el-table-column prop="date" width="90" label="更新时间">
							<template slot-scope="scope">
							<span>{{ scope.row.update_time }}</span>
							</template>
                            </el-table-column>
                        </el-table>
                        <!-- pagenation -->
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                :current-page="list&&list.current_page" :page-sizes="[10, 20, 30, 40]" 
                :page-size="list&&list.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                :total="list&&list.total">
                </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </div>
        
</template>

<script>
//创建和修改的请求地址  mediaAdlistNew_mediaAdlitEdit
    import {
        meadia
    } from "../../../service/index"
    import {isPermission} from "../../../common/utils";
    import {
        mapState,
        mapActions
    } from "vuex";
    const typeOptions = ['Banner', 'Video', 'Native'];
    const statusOptions = ['开启', '关闭'];
    export default {
        data() {
            return {
            	dropvalue:'',//状态信息
                multipleSelection: [],
                keyWords: "",
                dropoptions: [
                { //下拉选项
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '已开启'
                }, {
                    value: '2',
                    label: '已关闭'
                }],
                //列表
                list: [],
                isLighten: false,
                postData:{//向后台进行穿参数
                    media_id:21,//媒体id
                    pagesize:10,//每页显示数据
                    page:1,//当前页码
                },
                //广告弹出层
                adStyleVisible: false,
                auditList: [{
                    name: '',
                    simplename: '',
                    remark: ''
                }],
                creativeList: [],
                currentItem: "",
            }
        },
        mounted() {
            //从媒体列表进入到广告位的列表
            this.postData.media_id = this.$route.params.id || 28;//默认值
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.getList(this.postData);
        },
        components: {
            // headTop
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            adStyle(val){
                meadia.mediaAdlistNew_mediaAdAttr({
                    id: val,
                }).then(res => {
                    if (res.data.code == 0) {
                        this.auditList = res.data.data;
                        this.adStyleVisible = true;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                })
            },
            setPermission(val){
                return isPermission(val);
            },
            modifyStatus(val,flag) {//改变状态
                console.log(flag)
                if(flag){
                       meadia.mediaAdlistNew_flagOpenajax({
                        id: [val]
                        }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            
                        } else {
                             this.loading2 = false;
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }
                      });
                }else{
                     meadia.mediaAdlistNew_flagCloseajax({
                        id: [val]
                        }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                        } else {
                             this.loading2 = false;
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }
                      });

                }
            
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
           
            edit(val) {
                if (!val) {
                    this.$router.push({
                        path: "/advertiseedit",
                        query: { meadiaId: this.postData.media_id || 28}
                    });
                } else {
                    this.$router.push({
                        path: "/advertiseedit/" + val,
                        query: { meadiaId: this.postData.media_id || 28}
                    });
                   
                }
            },

            open() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                meadia.mediaAdlistNew_flagOpenajax({
                    // ad_id: this.$route.params.id,
                    id: this.getids()
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        //开启或者关闭的时候，重新执行一下数据的请求
                        this.getList(this.postData);
                    } else {
                         this.loading2 = false;
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                });
            },
            close() {

                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                meadia.mediaAdlistNew_flagCloseajax({
                    // ad_id: this.$route.params.id,
                    // id: "[" + this.getids() + "]"
                    id: this.getids()
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList(this.postData);
                    } else {
                         this.loading2 = false;
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                });
            },
            del() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                meadia.mediaAdlistNew_mediaAdlitDel({
                    // ad_id: this.$route.params.id,
                    // id: "[" + this.getids() + "]"
                    id: this.getids()
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList(this.postData);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                });
            },
            searchDataByName() {
                this.postData.search = this.keyWords;
                this.postData.page = 1;
                this.postData.pagesize = 10;
                this.getList(this.postData);
            },
            //状态的开启和关闭
            // flag 1开启。flag 2关闭
            changefilterstate(val){
                if(val == 0){
                    delete this.postData.flag
                }else{
                    this.postData.flag = val;
                }
                this.getList(this.postData);
            },
             getNameById(id,obj){//通过获得name  7,8,9
                if(!id){
                    return
                }
                let name = "";
                let idAry = id.split(",");
                for(var i=0;i<idAry.length;i++){
                    for(var attr in obj){
                        if(attr == idAry[i]){
                            if(i == idAry.length-1){//最后一项  
                                name += obj[attr]
                            }else{
                                name += obj[attr] + "," ;
                            }
                            break;
                        }
                   }
                }
                
                return name;
             },
            getList(data) {
                let that = this;
                meadia.mediaAdlistNew_mediaAdlitlist(data).then(res => {
                    if (res.data.code == 0) {
                        res.data.data.data.forEach(function(item,index){

                            if(item.flag ==1){
                                item.Iconflag = true;
                            }else if(item.flag == 2){
                                item.Iconflag = false;
                            }
                            let tempAry = JSON.parse(item.ad_pid);

                            //ad_pid:"["1267","2323"]"  
                            if(item.ad_type == 1){
                                 item.ad_pid1 = 'A:'+tempAry[0];
                            }else if(item.ad_type == 2){
                                 item.ad_pid2 = 'I:'+tempAry[0];
                            }else if(item.ad_type == 3){
                                for(var i=0;i<tempAry.length;i++){
                                 if(i ==0){
                                    tempAry[i] = 'A:'+tempAry[i];
                                 }else if(i ==1){
                                    tempAry[i] = 'I:'+tempAry[i];
                                 }
                                 }
                                item.ad_pid1 = tempAry[0];
                                item.ad_pid2 = tempAry[1];
                            }
                            

                            let str = "";//处理广告位规范
                            item.style_details = item.style_details.map(function(item){
                                switch(item.type){
                                    case "image":
                                        str+=`类型:图片,宽:${item.W},高:${item.H},格式:${item.imagetype},浮动系数:${item.float_x}`
                                        break;
                                     case "imagetext":
                                       str+=`类型:图文,宽:${item.W},高:${item.H},格式:${item.imagetype},标题:${item.title},描述:${item.desc},浮动系数:${item.float_x}`
                                        break;
                                    case 'imagegroup':
                                        str+=`类型:组图,宽:${item.W},高:${item.H},格式:${item.imagetype},个数:${item.imagenumber},标题:${item.title},描述:${item.desc},浮动系数:${item.float_x}`
                                        break;
                                     case "shortvideo":
                                         str+=`类型:短视频,封面宽:${item.W},封面高:${item.H},封面格式:${item.imagetype},视频宽:${item.videowidth},视频高:${item.videoheight},视频格式:${item.videotype},视频时长:${item.videotime},标题:${item.title},描述:${item.desc},浮动系数:${item.float_x}`
                                        break;
                                    case 'longvideo':
                                        str+=`类型:视频,视频宽:${item.videowidth},视频高:${item.videoheight},视频格式:${item.videotype},视频时长:${item.videotime},浮动系数:${item.float_x}`
                                        break;               
                                   }
                                return str;



                            })


                        })
                        this.list = res.data.data;
                    }
                });
            },
            //页数的改变
            handleSizeChange(val) {
                this.postData.pagesize = val;
                this.getList(this.postData);
            },
            handleCurrentChange(val) {
                this.postData.page = val;
                this.getList(this.postData);
            },
            //创意列表全选
            handleCheckAllChange(val) {
        
                this.checkedTypes = val ? typeOptions : [];
                this.checkedStatuss = val ? statusOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedSizesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.sizes.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.sizes.length;
            },
            handleCheckedTypesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.types.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
            },
            handleCheckedStatussChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.statuss.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.statuss.length;
            }
        }
    }
</script>

        
<style lang="scss">
    @import '../../../style/mixin';
    @import '../../../style/common';
    .ad-list-content{
        .ad-module-hd {
            position: relative;
        }
        .el-col-24{
            background-color: #fff;
        }
        .seek-box {
            position: absolute;
            right: 30px;
            top: 20px;
            .el-input {
                width: auto;
                margin-left: 6px;
            }
        }
        .function-list {
            padding: 20px 0 20px 30px;
            .el-link-add{
                vertical-align: -3px;
                // margin-right: 
            }
            .el-button+.el-button{
                margin-left: 6px;
            }
        }
        .el-icon-revise {
            vertical-align: -4px;
            cursor: pointer;
            background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            &:hover {
                background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
        .el-table{
            th:first-child,
            td:first-child{
                padding-left: 16px;
            }
         
            th:nth-child(5),
            td:nth-child(5){
                text-align: center;
            }

            th:last-child,
            td:last-child{
                text-align: left;
            }
            td:last-child span{
                color: #6cabff;
            }
            .link-jump{
                color: #6cabff;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        .adStyleList{
            .el-dialog__header{
                padding: 20px 20px 20px 30px;
            }
            .el-dialog__headerbtn{
                display: inline;
            }
            .el-dialog__body,
            .el-dialog__footer{
                padding: 0;
            }
            .el-pagination{
                text-align: left;
            }
            .el-table{
                th:first-child,
                td:first-child{
                    padding-left: 20px;
                }
            }
        }
        .block .el-pagination{
            padding: 30px;
        }
        a.el-link-add{
        	width:118px
        }
    }
</style>