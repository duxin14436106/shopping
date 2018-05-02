
var vm =new Vue({
    el: "#app",
    data: {
        lists: [],
        totalMoney: 0,
        totalPrice: 0,
        checkAlls: false,
        delFlag: false,
        curProduct: '',
    },
    filters: {
        formatMoney: function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function () {

        //this.cartView();//this指向vm,但使用vm.cartView()是报错；mounted是vue2版本的内容，取代了ready,如要使用vm，需加入this.$neatTick()
        this.$nextTick(function () {
            vm.cartView();
        })
    },
    methods: {
        cartView: function () {
            let _this = this; //this--->vm
            this.$http.get("cart.json", {"id": 123}).then(res => { //es6语法 =>代表的就是function ，res=>{}=====》function(res){};
                this.lists = res.body.result.list;
                // this.totalMoney = res.body.result.totalMoney;
            });
        },
        //数量的加减
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calTotalPrice();
        },
        selectProduct: function (item) {
            if (typeof (item.checked) == "undefined") {
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAlls = flag;
            var _this = this;
            this.lists.forEach(function (item, index) {
                if (typeof item.checked == "undefined") {//判断是否存在 item.checked
                    _this.$set(item, "checked", _this.checkAlls);//注册
                } else {
                    item.checked = _this.checkAlls;
                }
            });
            this.calTotalPrice();
        },
        //        计算总价
        calTotalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.lists.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
//        删除
        delProduct: function (item) {
            this.delFlag = true;
            this.curProduct = item;//保存当前删除的对象
        },
        //点击YES删除
        delProducts: function () {
            // 通过indexof 来搜索当前选中的商品 找到索引 index
            var index = this.lists.indexOf(this.curProduct);
            // 获取索引 后删除元素 splice(index，1) 两个参数  第一个参数索引 第二个参数 删除个数
            this.lists.splice(index, 1);// 从当前索引开始删，删除一个元素
            this.delFlag = false; // 删除后 弹框消失
        }
    },
});
//全局过滤器
Vue.filter ("money", function (value,type) {
    return "￥"+ value.toFixed(2)+type;
});

