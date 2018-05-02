var vm = new Vue({
    el:".container",
    data:{
        limitNum:3,
        addressList:[],
    },
    mounted:function () {
        this.$nextTick(function () {
            vm.getAddressList();
        })
    },
    computed:{
            filtersList:function () {
                return this.addressList.splice(0,this.limitNum);
            }
    },

    methods:{
        getAddressList:function () {
            var _this = this;
            this.$http.get("./address.json").then(res=> {
                 var rew = res.data;
                 if(rew.status == "0"){
                     _this.addressList = rew.result;
                 }
            })
        },
        loadMore:function () {
            this.limitNum = this.addressList.length;
        },

    }
});