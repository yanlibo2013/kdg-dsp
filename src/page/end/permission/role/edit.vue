<template>
    <el-container class="is-vertical role-list" >
        <el-main style="min-width:1000px;overflow-x: auto">
            <!-- 基本资料 start -->
            <el-col :span="24" class="border-bottom-2 margin-bottom-20">
                <h1 class="template-hd">基本资料</h1>
                <div class="template-bd">
                    <div class="basic-set-row">
                        <i class="neccessary left">*</i>
                        <label for="" class="data-item left">角色名称</label>
                        <el-input v-model="name"></el-input>
                    </div>
                </div>
            </el-col>
            <!-- 基本资料 end -->
            <!-- 帐户信息 start -->
            <el-col :span="24" class="border-bottom-2 margin-bottom-20">
                <h1 class="template-hd">帐户信息</h1>
                <div class="template-bd">
                    <div class="account-search-wrap left">
                        <el-input 
                        @input="searchBykeyword(search)"
                        placeholder="搜索内容..." 
                        prefix-icon="el-icon-search"
                         v-model="search">
                        </el-input>
                        <el-scrollbar class="account-search-bd">
                            <ul>
                                <li class="search-item" v-for="item in leftData" :key="item.id">
                                    <el-checkbox @change="selectAccount(item.id)">{{item.name}}</el-checkbox>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>
                    <div class="account-list">
                        <span class="turn-iron"></span>
                        <div class="inferior-hd" @click="clearAllAccount">全部清除</div>
                        <el-scrollbar class="account-clear-bd clear">
                            <ul class="account-items-row">
                                <li class="search-item" @click="selectDelITem(item.id)" v-for="item in rightData" :key="item.id">
                                    <span class="account-name">{{item.name}}</span>
                                     <span class="account-delete" v-if="item.id==currentItemId" @click="delAccount(item.id)">x</span>
                                   
                                </li>
                            </ul>
                            
                        </el-scrollbar>
                    </div>
                </div>
            </el-col>
            <!-- 帐户信息 end -->
            <!-- 权限信息 start -->
            <el-col :span="24" class="role-list-content border-bottom-2">
                <h1 class="template-hd">权限信息</h1>
                <div class="grid-content clear grid-content1" style="min-width: 1000px;overflow-x: auto">
                    
                    <el-row >
                        <el-col :span="6" v-for="item in power" style="width:20%;font-size:12px">
                            <v-tree ref='tree'
                              :key="item.id"
                              :data='item' 
                              :multiple='true' 
                              @node-click="getSelectedNodes"
                              :halfcheck='true'
                           />
                        </el-col>
                    </el-row>
                
                </div>
            </el-col> 
            <!-- 权限信息 end -->
            <!-- 确认，取消 -->
            <el-col :span="24">
                <div class="is-confirm">
                    <el-button type="confirm" @click="onSubmit">确认</el-button>
                    <el-button type="cancel" @click="onCancel">取消</el-button>
                </div>
            </el-col>
        </el-main>
    </el-container>
            
</template>
<script>
    import 'element-ui/lib/theme-chalk/index.css'
    import {
        mapState,
        mapActions
    } from "vuex";
    import {end} from "../../../../service/index"
    export default {
        data() {
            return {
                name:'',//角色名称
                search:'',//账户搜素
                isEdit:false,//是否是编辑状态
                leftData:[],//账户左侧内容
                rightData:[],//账户右侧内容
                currentItemId:-1,
                accountSourceData:[],//左侧原始账户信息
               
                power:[],//用户的权限信息
                privilege:[],//用户的权限信息
                isActive:false,//控制权限的样式
                editprivilege:[],//页面编辑的时候的权限的获取
            }
        },
        mounted() {
            if(this.$route.params.id){
                this.isEdit = true;
            }else{
                 this.isEdit = false;
            }
           const p1 = new Promise((resolve, reject) => {
                     end.getAdAcount().then(res => {
                        if (res.data.code == 0) {
                            this.accountSourceData = res.data.data;
                            this.leftData = res.data.data;
                            resolve();
                        }
                        if (res.data.code == -1) {
                                this.$router.push({
                                    path: "/login"
                                });
                        }
                     });
              })
              const p2 = new Promise((resolve, reject) => {
                       //获取所有的权限 publicPrivilege
                       end.publicPrivilege().then(res => {
                            if (res.data.code == 0) {
                                let data = res.data.data;
                                func(data);
                                function func (DD){
                                     DD.forEach((item)=>{
                                        item.expanded = true;
                                        item.checked = false;
                                        item.isChecked = false;
                                        item.selected = false;
                                        if(item.children && item.children.length >0){
                                            func(item.children)
                                        }
                                     })
                                };
                                data = data.map((item,index)=>{
                                    let arr =[];
                                    arr.push(item)
                                    return arr
                                });
                                this.power = data;
                                resolve();
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error"
                                });
                            }
                     });
                 })
           Promise.all([p1, p2]).then(()=>{
                if(this.isEdit){//是编辑状态的时候，页面赋值
                    end.roleDefault({
                        id: this.$route.params.id
                    }).then(ress => {
                        if (ress.data.code == 0) {
                            let data = ress.data.data;
                            let addefault = data.addefault;
                            this.editprivilege = data.data.privilege_id;
                            this.name = data.data.name;
                            function fund (DD,id){//this.power  {name:'',id:2,"select":true} 1 6 7
                                 DD.forEach((item)=>{
                                        if(item.id == id){
                                                function selectItem(itemm){
                                                     itemm.isChecked = true;
                                                     itemm.checked = true;
                                                     itemm.selected = true;
                                                     if(itemm.parent){//将当前元素的父级元素也设置选中的状态
                                                        selectItem(itemm.parent)
                                                     }
                                                }
                                                selectItem(item)
                                         }else{
                                             if(item.children && item.children.length >0){
                                                   fund(item.children,id)
                                             }
                                         }
                                 })
                            }
                            for(let m=0;m<this.editprivilege.length;m++){// 2 1
                                 let item =this.editprivilege[m];
                                 for(let k=0;k<this.power.length;k++){// 7,1,2,3,4
                                    fund(this.power[k],item)
                                 }
                                 
                            }
                            //账户信息赋值操作 。。。
                            addefault.forEach((item,index)=>{//item 3 5
                                  this.accountSourceData.forEach((iitem,iindex)=>{
                                     if(item == iitem.id){
                                        this.rightData.push(iitem)
                                     }
                                  })
                            });
                            let totalData = this.accountSourceData.slice(0);
                            for(let j=0;j<addefault.length;j++){
                                let item =addefault[j];
                                for(let k=0;k<totalData.length;k++){
                                    if(item == totalData[k].id){
                                        totalData.splice(k,1)
                                    }
                                }
                            }
                            this.leftData = totalData;
                        } else {
                            this.$message({
                                //showClose: true,
                                //message: res.data.msg,
                                //type: "error"
                            });
                        }
                    });
                  }
            })
        },
      
        methods: {
            getSelectedNodes(item){//点击对应的节点数  如果是选中状态数false的时候，将后代进行清空
                 let that = this;
                 function funH(obj){//this.power
                        if(obj.checked){
                            if(that.privilege.indexOf(obj.id) == -1){
                                that.privilege.push(obj.id)
                            }
                            if(obj.parent){
                               obj.parent.checked = true;
                               obj.parent.isChecked = true;
                               obj.parent.selected = true;
                               funH(obj.parent)
                            }
                        }else{
                            if(that.privilege.indexOf(obj.id) > -1){
                                that.privilege.splice(that.privilege.indexOf(obj.id),1)
                            }
                            clearSel(obj);
                            function clearSel(curItem){
                                 curItem.checked = false;
                                 curItem.isChecked = false;
                                 curItem.selected = false;
                                 if(curItem.children && curItem.children.length > 0){//子级元素是一个数组的形式
                                    curItem.children.forEach((ooo,iii)=>{
                                        clearSel(ooo)
                                    })
                                 }
                            
                             }
                        }
                       
                }
                funH(item);
            },
            validataForm(){
                if(!this.name){
                    this.$message({
                            message: "角色名称不为空",
                            type: "warning"
                     });
                    return false;
                }
                return true;
            },
            onSubmit(){//确认
                let that = this;
                let data={};
                data["name"] = this.name;
                data['advlist'] = this.getAdvlist();
              
                function funH(DD){//this.power
                     DD.forEach((item,index)=>{
                        if(item.checked){
                            if(that.privilege.indexOf(item.id) == -1){
                                that.privilege.push(item.id)
                            }
                        }else{
                            if(that.privilege.indexOf(item.id) != -1){
                                that.privilege.splice(index,1)
                            }
                        }
                        if(item.children && item.children.length >0){
                            funH(item.children)
                        }
                     })
                }
                for(let i=0;i<this.power.length;i++){
                    let item = this.power[i];
                    funH(item)
                };
                data['privilege_id'] = this.privilege;
                if(this.$route.params.id){
                     data['id'] = this.$route.params.id;
                }
                if(this.validataForm()){
                    end.roleAdd(data).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.$router.go(-1);
                       
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
            getAdvlist(){
                let ary=[];
                this.rightData.forEach((item,index)=>{
                    ary.push(item.id)
                });
                return ary;
            },
            onCancel(){//取消
                this.$router.go(-1)
            },
            clearAllAccount(){//清除所有的账户信息
                this.rightData =[];
                this.leftData = this.accountSourceData;
            },
            delAccount(id){//右侧账户单个删除  根据id进行找到具体位置
                let filterData = this.accountSourceData.find((item)=>{
                    return item.id == id
                });
                this.rightData = this.rightData.filter((item)=>{//在自身数据基础上改变
                    return item.id != filterData.id
                })
                this.leftData.push(filterData);
            },
            selectAccount(id){//左侧账户的选择
                let filterData = this.accountSourceData.find((item)=>{
                    return item.id == id
                });
                this.leftData = this.leftData.filter((item)=>{//在自身数据基础上改变
                    return item.id != filterData.id
                })
                this.rightData.push(filterData);
            },
            searchBykeyword(val){//账户的搜索
                let filterData = this.accountSourceData.filter((item)=>{
                    return item.name.indexOf(val) > -1
                })
                if(filterData.length > 0){
                    this.leftData = filterData;
                }else{
                    this.leftData = this.accountSourceData;
                }
                
            },
            selectDelITem(val) {
                this.currentItemId = val;
            },
           
        }
    }
</script>
        
<style lang="scss">
    @import '../../../../style/mixin';
    .role-list{
        .el-main{
            background-color: transparent;
        }
        .el-col-24{
            background-color: #ffffff;
        }
        // basic info
        .template-hd{
            padding: 16px 0 18px 30px;
            border-bottom: 1px solid #e1e7f0;
        }
        .template-bd{
            padding: 20px 0 30px 30px;
        }
        .neccessary {
            color: #ff7a81;
            width: 16px;
            text-align: left;
        }
        .data-item {
            color: #515974;
            padding-right: 14px;
        }
        .el-input {
            width: 22.8%;
        }
        .neccessary,
        .data-item {
            line-height: 38px;
            height: 38px;
        }
        // account msg
        .account-search-wrap{
            width: 300px;
            .el-input{
                width: 100%;
            }
            .account-search-bd{
                height: 360px;
                border: 1px solid #e1e7f0;
                @include bottomLeftRadius(5px);
                @include bottomRightRadius(5px);
                border-top: 0 none;
            }
            // input search remove bottom radius
            .el-input__inner{
                @include bottomLeftRadius(0);
                @include bottomRightRadius(0);
            }
            .el-checkbox__label{
                @include sc(12px, #bdbecd);
            }
            .is-checked+.el-checkbox__label{
                @include sc(12px, #515974);
            }
        }
        
        // search each item
        .search-item{
            height: 36px;
            line-height: 36px;
            padding: 0 20px;
            &:hover,
            &.active{
                background-color: #f6f8fa;
            }
        }
        // all remove
        .account-list{
            margin-left: 338px;
            position: relative;
            border: 1px solid #e1e7f0;
            width: 300px;
            @include borderRadius(5px);
            .turn-iron{
                @include svgbg("../../../../style/image/put/turn.svg");
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
            .account-clear-bd{
                height: 360px;
            }
            .search-item{
                padding: 0 15px 0 19px;
            }
            .account-name{
                @include sc(12px, #7f8599);
            }
            .account-delete{
                color: #515974;
                float: right;
                cursor: pointer;
            }
        }
        // extend class position
        .position-absolute{
            position: absolute;
        }
        .position-relative{
            position: relative;
        }
        // authority msg
        .margin-bottom-10{
            margin-bottom: 10px;
        }
        .border-left{
            border-left: 1px solid #e1e7f0;
            display: block;
            position: absolute;
            top: -10px;
        }
        // power msg module
        .role-list-content{
            .grid-content{
                padding: 20px 30px 40px 30px;
            }
        }
        .power-msg{
            height: 500px;
            position: relative;
            font-size: 12px;
            // line
            .border-left-wrap{
                @extend .border-left;
                left: 10px;
                top: 28px;
            }
            .power-msg-item{
                color: #515974;
                width: 160px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                border-radius: 5px;
                border: 1px solid #e1e7f0;
                @extend .margin-bottom-10;
                cursor: pointer;
            }
            .power-active{
                background-color: #6cabff;
                color: #ffffff;
                border-color: #6cabff;
            }
            // each class style
            .inferior-class{
                margin-left: 20px;
                @extend .position-relative;
            }
            .third-class{
                margin-left: 30px;
                @extend .position-relative;
                .power-group{
                    padding-left: 10px;
                }
            }
            .fouth-class{
                margin-left: 50px;
                @extend .position-relative;
                .power-group{
                    padding-left: 10px;
                }
            }
            .class-item{
                @extend .position-relative;
                margin-bottom: 10px;
            }
            .last-class{
                @extend .position-relative;
                margin-left: 40px;
            }
            // 横线
            .column{
                @extend .position-absolute;
                width: 10px;
                height: 1px;
                left: -10px;
                top: 14px;
                background-color: #e1e7f0;
            }
        }
        // creative center
        .creative-center{
            .last-class{
                margin-left: 20px;
            }
            .wider{
                width: 142px;
            }
        
        }
        .end-manage-second{
            margin-top: 38px;
        }
        .is-confirm{
            margin-left: 30px;
        }
    }
    //add Style
    .grid-content1{
        .activeClass{
                background-color: #6cabff;
                color: #ffffff;
                border-color: #6cabff;
        }
        .halo-tree .inputCheck{
           display: none
         }
        .halo-tree{
            font-size:12px
        }
        .halo-tree ul{
            padding-top: 0px !important
        }
        .halo-tree .tree-close, .halo-tree .tree-open{
            vertical-align: 10px;
        }
        .halo-tree li.leaf{
            padding-bottom:0px
        }
    
        .halo-tree .node-title{
                 display:inline-block;
                color: #515974;
                padding:0px 10px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                border-radius: 5px;
                border: 1px solid #e1e7f0;
                cursor: pointer;
                width:100px;
                overflow: hidden
        }
        .halo-tree .node-title:hover{
            background-color: #6cabff;
            color: #ffffff;
            border-color: #6cabff;
        }
        
        .halo-tree li:before {
            border-left: 1px solid #e1e7f0;
            bottom: 50px;
            top: -8px;
            width: 1px;
        }
        
        .halo-tree li.leaf:after {
            content: "";
            left: -7px;
            position: absolute;
            right: auto;
            border-width: 1px;
            border-top: 1px solid #e1e7f0;
            height: 20px;
            top: 17px;
            width: 25px;
        }
        .halo-tree li:after {
            border-top: 1px solid #e1e7f0;
            height: 20px;
            top: 17px;
            width: 28px;
        }
        .halo-tree>li.only-node:after {
            border-top: none;
        }
         .halo-tree li:before{
            position:absolute;
            z-index: 55
         }
        .halo-tree .node-selected{
            background-color: #6cabff;
            color: #ffffff;
            border-color: #6cabff;
        }
       
    }
    
</style>