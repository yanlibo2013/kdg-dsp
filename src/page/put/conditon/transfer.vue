<template>
    <div>
        <!-- left hobbies -->
        <div class="single-row-search re-orientation-item left">
            <div class="el-input el-input--prefix">
                <input autocomplete="off" placeholder="请输入应用名称..." type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" />
                <span class="el-input__prefix">
                                        <i class="el-input__icon el-icon-search"></i>
                                    </span>
                <!-- <span class="el-input__prefix">
                                        <span class="el-input__prefix-inner">
                                            <i class="el-input__icon el-icon-circle-close el-input__clear"></i>
                                        </span>
                                    </span> -->
            </div>
            <el-col :span="24">
                <div class="district-bd innerbox">
                    <div class="check-all-wrap">
                        <el-checkbox>全选</el-checkbox>
                    </div>
                    <el-checkbox-group>
                        <el-checkbox>网易新闻-信息流-单图</el-checkbox>
                        <el-checkbox>网易新闻-信息流-大图</el-checkbox>
                        <el-checkbox>网易新闻-信息流-大图</el-checkbox>
                        <el-checkbox>网易新闻-信息流-大图</el-checkbox>
                        <el-checkbox>网易新闻-信息流-大图</el-checkbox>
                        <el-checkbox>网易新闻-信息流-大图</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
        </div>
        <!-- right hobbies -->
        <div class="area-list">
            <span class="turn-iron"></span>
            <div class="inferior-hd">
                <span class="clear-all">全部清除</span>
            </div>
            <div class="inferior-bd clear">
                <div class="innerbox">
                    <ul class="area-item-row">
                        <li class="search-item">
                            <span class="account-name">网易新闻-信息流-单图</span>
                            <i class="el-icon-close"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['list'],
        data: function() {
            return {}
        },
        mounted () {
            console.log(this.list);
        },
        
    }
</script>

<style lang="scss">

</style>