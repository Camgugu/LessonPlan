# 使用说明
## 首先声明
这东西在windows下可能会因为字符集的问题导致无法启动，如果发生以上事情，不要来找我，因为我也没解决这问题。

尽量使用Ubuntu测试（其他Linux发行版没测试过，不知道会不会有问题）。  
<del>虚拟机大法好</del>
## 使用细则
1. 安装mysql服务端（如果只装了客户端不要问我为什么无法启动）。

2. 在项目根目录下键入
> npm install

  以安装所需的的软件包（第二步必须确认你已经安装了nodejs）。

3. 连接MySQL创建数据库 - 两种方法
  * 命令行  
    终端里键入
    >mysql -u (你的用户名) -p  
    (相应密码)  

    再输入
    >create databases (你想要的数据库名);  

    分号很重要分号很重要分号很重要（重要的事要说三遍）

  * 图形化界面操作  
      Navicat Premium 或 Navicat MySQL 或 JetBrains DataGrip。  
      Navicat的Linux下的破解有点麻烦，要不断的删reg文件。  
      JetBrains如果有学生账号的话是可以免费用一年的，Linux下推荐这个。  
      <del>图形化下操作就不要我教了吧</del>

4. 修改config.js文件  
   进入instance文件夹找到一个名叫config.js的文件，修改为你的配置。  
   name - 数据库名（如果你用的也是MySQL就不用改）  
   username - 你操作数据库的用户名  
   password - 该用户的密码  
   host - 主机的地址（本地主机为127.0.0.1）  
   port - 数据库的端口号（MySQL默认是3306）  
   database - 你要用来存数据的数据库名

5. 创建数据库下的表 - 三种方法
  * 命令行  
  进入数据库，键入
  > use (你的数据库名);  
    create tables (你的表名);  

  * 图形化操作（以上软件任选）

  * 进入models文件夹里的test.js文件，仿照我的写（sequelize.define函数的第一个参数就是你的表名），然后在根目录键入
  > node migrate.js

    PS: sequelize会在你想创建的表名后加一个s。  
    <del>个人比较推荐第三种方法，不容易出错</del>
6. 全局安装supervisor  
    键入
    > npm install -g supervisor

7. 启动服务端
   * Linux  
   根目录终端里键入
   > npm start

   * Windows  
   修改node启动目录至supervisor.cmd
   > supervisor默认安装目录在C:\user\(用户名)\AppData\Roaming\npm

     其实以上步骤不做也行，就是如果修改了服务端代码要手动重启node。

# 文件说明

* instances/  用于存放全局、单例的文件  
* lib/ 能够复用的文件，不仅限于该项目      
* models/   
    - index.js 入口文件，自动加载其他文件     
    > 其他文件需要遵从以下规则   

``` javascript  

    module.exports = (sequelize, DataType) => { return yourModel;};

```


* public/ 资源文件  
   - js/   
   - css/   
* routes/      路由文件
    - index.js 入口文件，自动加载其他文件
      > 其他文件需要遵从以下规则   

``` javascript

    module.exports = (sequelize, DataType) => { return yourModel;};

```
* views/   视图目录
* .bowerrc    bower 配置文件。
* bower.json
* kill_dragon.js 主函数，入口文件。
* migrate.js 创建数据库表，根据models文件夹创建表。
* package.json
