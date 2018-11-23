<template>
    <el-form>
		<el-form-item>
			<template slot-scope="scope">
				<!-- 权限信息 start -->
            <el-col :span="24" class="role-list-content">
                <div class="grid-content clear grid-content2"  style="min-width: 1000px;">
                    <!-- 投放管理 -->
                    <el-row>
                        <el-col :span="6" v-for="item in powerAll" style="width:20%">
                            <v-tree ref='tree'
                              :key="item.id"
                              :data='item' 
                              :multiple='true' 
                              :halfcheck='true'
                              @node-click="getSelectedNodes"
                           />


                        </el-col>
                    </el-row>
                </div>
                
            </el-col>
            <!-- 权限信息 end -->
			</template>
		</el-form-item>
		
	</el-form>
</template>
<script>

    import 'element-ui/lib/theme-chalk/index.css'
    import {
        mapState,
        mapActions
    } from "vuex";
    // import headTop from '../../components/header/head'
    // import {cityGuess, hotcity, groupcity} from '../../service/getData'
    export default {
        data() {
            return {
                infos:[],
                powerAll:[],//所有的权限
                ids:[],//选中的权限id
            }
        },
        mounted() {
              this.infos = this.data;
              this.powerAll = this.power1;
              this.getSelectStyle();
             
             
        },
        props:["data","power1"],//单独的权限和所有的权限信息 
        watch:{
            infos(newval,oldval){
                this.getIds(newval)
                this.getSelectStyle();
            },
        },
        methods: {
          getSelectedNodes(node){
            node.checked = !node.checked
            node.selected = !node.selected
          },
           getIds(arr){
                     let result = [];
                      for(let i=0;i<arr.length;i++){
                         result.push(arr[i]['id'])
                      }
                      this.ids=result
           },
           getSelectStyle(){
                    function resetStyle(arr) {
                        arr.forEach((item,index)=>{
                                item.checked = false;
                                item.isChecked = false;
                                item.selected = false;
                                if(item.children && item.children.length >0 ){
                                    resetStyle(item.children)
                                }
                       })
                    }

                    for(let i=0;i<this.powerAll.length;i++){
                         resetStyle(this.powerAll[i])
                    }

                   function fund (DD,id){
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
                    for(let m=0;m<this.ids.length;m++){// 2 1
                         let item =this.ids[m];
                         for(let k=0;k<this.powerAll.length;k++){// 7,1,2,3,4
                            fund(this.powerAll[k],item)
                         }
                    }


                        
           }
        },
    }
</script>
        
<style lang="scss">

//add Style
    .grid-content2{
        .activeClass{
                background-color: #6cabff;
                color: #ffffff;
                border-color: #6cabff;
        }
        .halo-tree .inputCheck{
           display: none
         }
        .halo-tree{
            font-size:12px;
            margin-top: -5px
        }
        .halo-tree ul{
            padding-top: 6px
        }
        .halo-tree li {
            padding: 0px; 
           
        }
        .halo-tree .tree-node-el{
            line-height:22px
        }
        .halo-tree .tree-close, .halo-tree .tree-open{
            vertical-align: 6px;
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
                 cursor: auto;
                 width:100px;
                overflow: hidden
        }
         .halo-tree .node-title.node-selected{
                background-color: #6cabff !important;
                color: #ffffff;
                border-color: #6cabff;
               
         }
        .halo-tree .node-title:hover{
           background-color:#fff;
           
        }
         
        .halo-tree li:before {
            border-left: 1px solid #e1e7f0;
            bottom: 50px;
            top: -8px;
            width: 1px;
            position:absolute;
            z-index: 55
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
        .halo-tree .node-selected{
            background-color: #6cabff;
            color: #ffffff;
            border-color: #6cabff;
        }
       
    }
    
</style>