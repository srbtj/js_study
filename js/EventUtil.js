/**
 *  兼容Dom2，Dom 及 IE事件处理
 */

var EventUtil = {

    /*** 跨浏览器事件处理程序**/
    /**
     *  添加事件
     * @param ele  添加事件的元素
     * @param type  事件的类型
     * @param handler  回调函数
     */
    addHandler:function(ele,type,handler){
        if(ele.addEventListener){  // DOM2级事件
            ele.addEventListener(type,handler,false);
        }else if(ele.attachEvent){ // IE事件
            ele.attachEvent('on'+type,handler);
        }else{ // DOM0级事件
            ele['on'+type] = handler;
        }
    },
    /**
     *  删除事件
     * @param ele  添加事件的元素
     * @param type  事件的类型
     * @param handler  回调函数
     */
    removeHandler: function (ele,type,handler) {
        if(ele.removeEventListener){
            ele.removeHandler(type,handler,false);
        }else if(ele.detachEvent){
            ele.detachEvent('on'+type,handler);
        }else{
            elep['on'+type] = null;
        }
    },
    /***跨浏览器事件对象**/

    /**
     *  获得事件对象;
     * @param event
     * @returns {*|Event}
     */
    getEvent:function(event){
       // return event || window.event;
        return event ? event : window.event;
    },
    /**
     *  获得事件的目标;
     * @param event
     * @returns {EventTarget|string|Node|CSSStyleDeclaration.target|*|Object}
     */
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    /**
     *  阻止事件默认行为
     * @param event
     */
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    /**
     *  取消事件的进一步捕获或冒泡;
     * @param event
     */
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation()
        }else{
            event.cancelBubble = true;
        }
    }


};