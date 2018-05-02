// function a(){
//     console.log('a');
//     c();
// };
// function b() {
//     console.log('b');
//     a();
// }
// function c() {
//     console.log('c')
// }
// a();//a,c
// b();//b,a
// c();//c
// function a(fun) {
//     console.log('a');
//     fun(function () {
//         c();
//     })
// }
// function b(fun) {
//     console.log('b');
//     fun();
// }
// function c() {
//     console.log('c')
// }
// a(b);
// c();
//
// var aa= function (item) {
//     console.info(item.a)
// };
// var list = [{a:1},{a:2},{a:3}];
//
// for(var i=0;i<list.length;i++){
//     aa(list[i]);
// }
function a(fun){console.log('a');fun(function () {console.log('211');c()})}
function b(fun){console.log('b')}
function c(){console.log('c')}
a(function(fun){fun();b()})

a(b);