<template>
    <div>
        <el-form>
            <el-form-item>
                <template slot-scope="scope">
                    <div class="select-bd">
                        <el-input placeholder="搜索内容..." prefix-icon="el-icon-search" v-model="input21">
                    </el-input>
                    
                    <el-scrollbar class="orientation-bd clear">
                        <el-col :span="11">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
                            <el-checkbox-group v-model="checkedTypes">
                                <el-checkbox v-for="type in types" :label="type" :key="type">{{type}}</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="13">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
                            <el-checkbox-group v-model="checkedTypes">
                                <el-checkbox v-for="type in types" :label="type" :key="type">{{type}}</el-checkbox>
                            </el-checkbox-group>

                        </el-col>
                        
                    </el-scrollbar>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        
                        <div class="is-confirm">
                            <el-button type="confirm" >确认</el-button>
                            <el-button type="cancel" @click="close">取消</el-button>
                        </div>

                    </div>
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                dialogFormVisible: false
                
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            close() {
                console.log("close");
                this.$emit('hideDialog',false)
            }
        },
        mounted() {
            console.log("测试");
        }
    }
</script>

<style lang="scss">
    @import "../../../style/mixin";
     //pop layer
    .pop-data-report{
        .el-dialog__header {
            border-bottom: 1px solid #e1e7f0;
            padding: 15px 0 16px 30px;
            height: 56px;
        }
        .el-dialog__title {
            font-size: 16px;
            font-weight: bold;
            float: left;
        }
        .el-dialog__headerbtn {
            display: none;
        }
        .el-dialog__body {
            padding: 20px 30px 0 30px;
        }
        // area direct content left        
        .orientation-bd {
            height: 400px;
            border: 1px solid #e1e7f0;
            border-top: 0 none;
            @include bottomLeftRadius(5px);
            @include bottomRightRadius(5px);
            .el-col-11 {
                border-right: 1px solid #e1e7f0;
            }
        }
        .el-checkbox {
            display: block;
            padding: 0 0 0 20px;
            height: 37px;
            &.is-checked {
                background-color: #f6f8fa;
            }
        }
        .el-input {
            width: 100%!important;
        }
        .el-checkbox__label {
            font-size: 12px;
        }
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
        .el-input__inner {
            padding-left: 12px !important;
            @include bottomRightRadius(0);
            @include bottomLeftRadius(0);
        }
    
        // form search and label
        .el-form-item {
            margin: 0;
        }
        .el-input__prefix{
            left: 95%!important;
        }
        .el-form-item__label {
            text-align: left;
            font-size: 14px;
            color: #515974;
            padding: 0 0 0 30px;
        }
        // foot and confirm cancel button
        .el-dialog__footer {
            padding: 20px 0 20px 30px;
        }
        .is-confirm {
            padding: 20px 0 20px;
            background-color: #fff;
            text-align: left;
        }
    }
    
    
</style>