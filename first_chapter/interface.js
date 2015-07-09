/**
 *  js中实现接口的方式 ：
 *
 *     1. 用注释描述接口
 */


/**
 *  用注释描述接口的实现  start
 * */

/**
 *  interface  composite{
 *      function add(child);
 *      function remove(child);
 *      function getChild(index);
 *  }
 *
 *  interface formItem{
 *      function save();
 *  }
 */


/*
var CompositeForm = function(id,method,action){};

// implement the Composite Interface
CompositeForm.prototype.add = function(child){};
CompositeForm.prototype.remove = function(child){};
CompositeForm.prototype.getchild = function(index){};

// implement the formItem Interface
CompositeForm.prototype.save = function(){};
 */

 /**
 *  用注释描述接口的实现  end
 * */




/**
 *  用户属性检查模仿接口   start
 *
 * */

/*
var CompileForm = function (id,method,action) {
    this.implementInterfaces = ['composite','formItem'];
};

function addForm(formInstance){
    if(!implements(formInstance,'composite','formItem')){

        throw new Error('Object does not implement a required interface.');
    }else{

        console.info('you have implement some interface');
    }
};

function implements(obj){

    return function(){

        for(var i=1;i<arguments.length;i++){
            var interfaceName = arguments[i];
            var interfaceFound = false;
            for(var j = 0;j<obj.implementInterfaces.length;j++){
                if(interfaceName ===obj.implementInterfaces[j] ){
                    return true;
                    break;
                }
            }
            if(!interfaceFound){
                return false;
            }
        }
        return true;
    }

    //for(var i=1;i<arguments.length;i++){
    //
    //    var interfaceName = arguments[i];
    //    var interfaceFound = false;
    //    for(var j = 0 ;j<obj.implementInterfaces.length;j++){
    //        if(obj.implementInterfaces[j] === interfaceName){
    //            return true;
    //            break;
    //        }
    //    }
    //    if(!interfaceFound){
    //        return false;
    //    }
    //    return true;
    //}
};

//addForm(new CompileForm());

*/
/**
 *  用户属性检查模仿接口   end
 * */

/**
 *  用鸭式辨型模仿接口
 *    实现原理： 如果对象具有与接口定义的方法同名的所有方法 ，那么就要以认为它实现了这个接口;
 */

var Interface = function(name,method){  /* name: 接口的名字  ， method: 接口内容的方法 ;*/
    if(arguments.length != 2){
        throw new Error('interface constructor called with ' + arguments.length + 'arguments,but expected exactly 2.');
    }

    this.name = name;
    this.methods = [];
    /*
    *  将所有的接口方法添加到指定接口中
    * */
    for(var i= 0,len = method.length;i<len;i++){
        if(typeof method[i] !== 'string'){
            throw new Error('interface constructor expects method name to be passed in as a string');
        }

        this.methods.push(method[i]);
    }
};

Interface.ensureImplements = function(obj){
    if(arguments.length < 2){
        throw new Error('Function Interface.ensureImplements called with ' + arguments.length + 'arguments,but expected at least 2');
    }

    for(var i= 1,len = arguments.length;i<len;i++){
        var interface = arguments[i];
        if(interface.constructor !== Interface){
            throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface;');
        }
        for(var j= 0,methodLen = interface.methods.length;j<methodLen;j++){

            var method = interface.methods[j];
            if(!obj[method] || typeof obj[method] !== 'function'){
                throw new Error('Function Interface.ensureImplements: obj' +
                'does not implement the interface name' +
                ' interface. Method ' + method + ' was not found');
            }
        }
    }
}

var Composite = new Interface('composite',['add','remove','getChild']);
var FormItem = new Interface('formItem',['save']);

var CompositeForm = function(id,action,method){};

function addForm(formInstance){

    Interface.ensureImplements(formInstance,Composite,FormItem);
};

addForm(new CompositeForm());