<template>
    <el-col :span="18">
        <h1 class="template-hd" v-show='isshownetwork'>网络类型</h1>
        <div class="select-bd margin-bottom-10" v-show='isshownetwork'>
            <el-checkbox-group v-model="networktype">
                <el-checkbox v-for="type in types" :label="type" :key="type" @change="getcheckItem">{{type}} </el-checkbox>
            </el-checkbox-group>
        </div>
        <h1 class="template-hd" v-show='isshowdevice'>设备定向</h1>
        <div class="select-bd" v-show='isshowdevice'>
            <el-checkbox-group v-model="device">
                <el-checkbox v-for="type in equipment" :label="type" :key="type">{{type}}</el-checkbox>
            </el-checkbox-group>
        </div>
    </el-col>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        computed: {
            ...mapState({
                tempnetwork: "tempnetwork",
                tempdevice: "tempdevice",
                networktype: "networktype"
            }),
            ...mapGetters({
                isshownetwork: "isshownetwork",
                isshowdevice: "isshowdevice"
            }),
            networktype: {
                get: function() {
                    return this.$store.state.networktype;
                },
                set: function(newValue) {
                    this.$store.state.networktype = newValue;
                }
            },
            device: {
                get: function() {
                    return this.$store.state.device;
                },
                set: function(newValue) {
                    this.$store.state.device = newValue;
                }
            },
            getcheckType() {
                if (this.$store.state.networktype.length != 0) {
                    this.modelType = this.$store.state.networktype;
                } else {
                    this.modelType = [];
                }
                return this.modelType;
            }
        },
        data: function() {
            return {
                modelType: [],
                modelEqu: [],
                types: ["wifi", "5G", "4G", "3G", "2G", "gprs"],
                equipment: ["android", "ios", "windows", "mac", "OS", "other"] //android,ios,windows,mac OS,other
            };
        },
        methods: {
            getcheckItem() {
                //console.log(this.modelType);
            }
        }
    };
</script>

<style lang="scss">
    
</style>