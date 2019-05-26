var dependable=require("dependable");
var path=require("path");
var container=dependable.container();

var MyModule=[
    ["_","lodash"],
    ["async","async"],
    ["passport","passport"],
];
MyModule.forEach(function(val){
    container.register(val[0],function(){
        return require(val[1]);
    })
});
container.load(path.join(__dirname,"/controllers"));
container.load(path.join(__dirname,"/helpers"));


container.register("container",function(){
    return container;
});
module.exports=container;
