/**
 * Created by li-rz on 16-3-8.
 */
kill_dragon.init = (function () {
    var query_element = {},
        initQuery,
        xhr,
        submit,
        query,
        processResponse,
        sendMessage,
        module;

    xhr = function () {
        if(typeof XMLHttpRequest != "undefined"){ // 非IE6浏览器
            return new XMLHttpRequest();
        }else if(typeof ActiveXObject != "undefined"){   // IE6浏览器
            var version = [
                "MSXML2.XMLHttp.6.0",
                "MSXML2.XMLHttp.3.0",
                "MSXML2.XMLHttp"
            ];
            for(var i = 0; i < version.length; i++){
                try{
                    return new ActiveXObject(version[i]);
                }catch(e){
                    //跳过
                }
            }
        }else{
            throw new Error("您的系统或浏览器不支持XHR对象！");
        }
    };

    query = function (element) {
        return document.querySelectorAll(element);
    };

    initQuery = function () {
        query_element.form = query('form');
        query_element.submit = query('form button');
        query_element.button = query('#refresh');
        query_element.content = query('div');
    };

    submit = function () {
        query_element.form[0].addEventListener('submit', function (event) {
            event.preventDefault();
            console.log(this);
            var form = this,
                data = {};
            Object.keys(form)
                .filter(function (element) {
                    return form[element].type === 'text' || form[element].type === 'email' || form[element].type === 'password';
                })
                .forEach(function (element) {
                    data[form[element].name] = form[element].value;
                });

            function ajax(obj){
                // 异步
                if(obj.async === true){
                    // 异步的时候需要触发onreadystatechange事件
                    xhr.onreadystatechange = function(){
                        // 执行完成
                        if(xhr.readyState == 4){
                            callBack();
                        }
                    }
                }
                xhr.open(obj.method, obj.url, obj.async);  // false是同步 true是异步
                if(obj.method === "post"){
                    xhr.setRequestHeader("Content-Type","application/json");
                    xhr.send(obj.data);
                }else{
                    xhr.send(null);
                }
                // xhr.abort(); // 取消异步请求
                // 同步
                if(obj.async === false){
                    callBack();
                }
                // 返回数据
                function callBack(){
                    // 判断是否返回正确
                    if(xhr.status == 200){
                        obj.success(xhr.responseText);
                    }else{
                        obj.Error("获取数据失败，错误代号为："+xhr.status+"错误信息为："+xhr.statusText);
                    }
                }
            }

            ajax({
                "method" : "post",
                "url" : "/",
                "data" : JSON.stringify(data),
                "success" : function(data){
                    alert(data);
                },
                "Error" : function(text){
                    alert(text);
                },
                "async" : true
            });
        });
    };

    //processResponse = function (xhr) {
    //    if (xhr.readyState === 4) {
    //        // callback(xhr.responseText);
    //        console.log(xhr.status);
    //    } else {
    //        console.error('error:' + xhr.status);
    //    }
    //    console.log(xhr.response);
    //};
    //
    //sendMessage = function (text) {
    //    xhr.setRequestHeader('Content-Type', 'application/json');
    //    console.log(text);
    //    xhr.send(JSON.stringify(text));
    //};

    module = function () {
        initQuery();
        submit();
    };

    return {
        module : module
    }
}());