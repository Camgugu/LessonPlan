/**
 * Created by li-rz on 16-3-8.
 */
kill_dragon.init = (function () {
    var query_element = {},
        initQuery,
        xhr,
        submit,
        query,
        ajax,
        refresh,
        is_email = /^(.+)@(.+)\.(.+)$/,
        module;

    xhr = new XMLHttpRequest();

    query = function (element) {
        return document.querySelectorAll(element);
    };

    initQuery = function () {
        query_element.form = query('form');
        query_element.submit = query('form button');
        query_element.button = query('#refresh');
        query_element.content = query('div');
    };

    ajax = function(obj) {
        // 异步
        console.log(xhr);
        if (obj.async === true) {
            // 异步的时候需要触发onreadystatechange事件
            xhr.onreadystatechange = function () {
                // 执行完成
                if (xhr.readyState == 4) {
                    callBack();
                }
            }
        }
        xhr.open(obj.method, obj.url, obj.async);  // false是同步 true是异步
        if (obj.method === "post") {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(obj.data);
        } else {
            xhr.send(null);
        }
        // xhr.abort(); // 取消异步请求
        // 同步
        if (obj.async === false) {
            callBack();
        }
        // 返回数据
        function callBack() {
            // 判断是否返回正确
            if (xhr.status == 200) {
                obj.success(xhr.responseText);
            } else {
                obj.Error("获取数据失败，错误代号为：" + xhr.status + "错误信息为：" + xhr.statusText);
            }
        }
    };

    submit = function () {
        query_element.form[0].addEventListener('submit', function (event) {
            event.preventDefault();
            console.log(this);
            var form = this,
                data = {};
            var input = form.querySelectorAll('input');
            var button = form.querySelectorAll('button');

            function setDisabled(element, if_set) {
                var i = 0;
                if (if_set) {
                    for(i = 0; i < element.length; ++i) {
                        element[i].setAttribute('disabled', true);
                    }
                } else {
                    for(i = 0; i < element.length; ++i) {
                        element[i].removeAttribute('disabled');
                    }
                }
            }
            setDisabled(input, true);
            setDisabled(button, true);

            Object.keys(form)
                .filter(function (element) {
                    return form[element].type === 'text' || form[element].type === 'email' || form[element].type === 'password';
                })
                .forEach(function (element) {
                    data[form[element].name] = form[element].value;
                });

            if (is_email.test(data['username']) && data['title'] && data['password']) {
                ajax({
                    "method": form.method,
                    "url": "/",
                    "data": JSON.stringify(data),
                    "success": function (get_data) {
                        console.log(get_data);
                        var $ul = query_element.content[0].querySelectorAll('ul'),
                        //    $li = $ul[0].querySelectorAll('li'),
                            new_li = document.createElement('li'),
                            data = JSON.parse(xhr.responseText),
                            text = [];
                        for (var i in data) {
                            if (data.hasOwnProperty(i)) {
                                text.push(data[i]);
                            }
                        }
                        var text_str = text.join(',');
                        new_li.textContent = text_str;
                        if (text_str) {
                            $ul[0].appendChild(new_li);
                        }
                    },
                    "Error": function (text) {
                        console.error(text);
                    },
                    "async": true
                });
            }
            setDisabled(input, false);
            setDisabled(button, false);

        });
    };

    refresh = function () {
        query_element.button[0].addEventListener('click', function (event) {
            event.preventDefault();
            ajax({
                "method": 'post',
                "url": "/",
                "data": JSON.stringify({method: "refresh"}),
                "success": function (data) {
                    console.log(data);
                    var $ul = query_element.content[0].querySelectorAll('ul'),
                        str = '',
                        insert_data = JSON.parse(data);
                    //debugger;
                    for (var i = 0; i < insert_data.length; ++i) {
                        str += "<li>" + insert_data[i]['title'] +
                            ", " + insert_data[i]['username'] +
                            ", " + insert_data[i]['password'] +
                            ", " + insert_data[i]['time'] + "</li>"
                    }
                    // console.log($ul);
                    while($ul[0].firstChild) {
                        $ul[0].removeChild($ul[0].firstChild);
                    }
                    $ul[0].innerHTML = str;
                    // $ul.innerHTML = str;
                },
                "Error": function (text) {
                    console.error(text);
                },
                "async": true
            })
        });
    };

    module = function () {
        initQuery();
        submit();
        refresh();
    };

    return {
        module : module
    }
}());