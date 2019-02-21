# Apache使用说明

## Apache是什么

Apache是世界使用排名第一的Web服务器软件。它可以运行在几乎所有广泛使用的计算机平台上，由于其跨平台和安全性被广泛使用，是最流行的Web服务器端软件之一。它快速、可靠并且可通过简单的API扩充，将Perl/Python等解释器编译到服务器中。

Apache HTTP Server（简称Apache）是Apache软件基金会的一个开放源码的网页服务器，可以在大多数计算机操作系统中运行，由于其多平台和安全性被广泛使用，是最流行的Web服务器端软件之一。它快速、可靠并且可通过简单的API扩展，将Perl/Python等解释器编译到服务器中。 

Apache HTTP服务器是一个模块化的服务器，源于NCSAhttpd服务器，经过多次修改，成为世界使用排名第一的Web服务器软件。
它可以运行在几乎所有广泛使用的计算机平台上。

## Apache模块

Apache通过引入各种模块来完成不同的功能。

## Apache官方文档

- ## [文档地址](https://httpd.apache.org/docs/2.4/zh-cn/)

## Apache配置

Apache通过conf文件夹下的httpd.conf来配置。

```shell
Define SRVROOT "e:/Apache24"  #此处填入Apache的路径
ServerRoot "${SRVROOT}"
Listen 127.0.0.1:80
Listen 127.0.0.1:443

LoadModule auth_basic_module modules/mod_auth_basic.so
LoadModule authz_core_module modules/mod_authz_core.so
LoadModule deflate_module modules/mod_deflate.so
LoadModule dir_module modules/mod_dir.so
LoadModule env_module modules/mod_env.so
LoadModule isapi_module modules/mod_isapi.so
LoadModule log_config_module modules/mod_log_config.so
LoadModule mime_module modules/mod_mime.so
LoadModule negotiation_module modules/mod_negotiation.so
LoadModule ratelimit_module modules/mod_ratelimit.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule setenvif_module modules/mod_setenvif.so
LoadModule ssl_module modules/mod_ssl.so
LoadFile "e:/php/libssh2.dll" #此处填入PHP的ssh组件路径
LoadModule php7_module "e:/PHP/php7apache2_4.dll" #此处填入PHP的Apache组件路径
PHPIniDir "e:/PHP" #此处填入PHP的路径

<IfModule unixd_module>
User daemon
Group daemon
</IfModule>

ServerAdmin zhangbowang1998@gmail.com
ServerName localhost

<Directory />
    AllowOverride none
    Require all denied
</Directory>

DocumentRoot "${SRVROOT}/htdocs"
<Directory "${SRVROOT}/htdocs">
    Options FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>

<Files ".ht*">
    Require all denied
</Files>

ErrorLog "logs/error.log"
LogLevel info

<IfModule log_config_module>
    LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
    LogFormat "%h %l %u %t \"%r\" %>s %b" common
    <IfModule logio_module>
      LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
    </IfModule>
    CustomLog "logs/access.log" common
</IfModule>

<IfModule alias_module>
    ScriptAlias /cgi-bin/ "${SRVROOT}/cgi-bin/"
</IfModule>

<Directory "${SRVROOT}/cgi-bin">
    AllowOverride None
    Options None
    Require all granted
</Directory>

<IfModule headers_module>
    RequestHeader unset Proxy early
</IfModule>

<IfModule mime_module>
    TypesConfig conf/mime.types
    AddHandler application/x-httpd-php .php
    AddType application/x-compress .Z
    AddType application/x-gzip .gz .tgz
    AddType application/x-httpd-php .php .html
</IfModule>

<IfModule proxy_html_module>
Include conf/extra/proxy-html.conf
</IfModule>
<IfModule ssl_module>
SSLRandomSeed startup builtin
SSLRandomSeed connect builtin
</IfModule>

<VirtualHost *:80>
    ServerAdmin zhangbowang1998@gmail.com
    ServerName nenu.com
    ServerAlias nenuyouth
    DocumentRoot "${SRVROOT}/htdocs"
</VirtualHost>

<VirtualHost *:443>
    ServerAdmin zhangbowang1998@gmail.com
    ServerName mrhope.com
    ServerAlias mrhope
    DocumentRoot "${SRVROOT}/htdocs"
</VirtualHost>
```

- ### ServerRoot
    指定服务器的根目录
- ### Listen
    指定服务器监听的IP与port
- ### LoadModule
    加载指定的模块来使服务器调用
- ### PHPIniDir
    指定PHP目录
- ### unixd_module
    分配用户权限
- ### ServerAdmin
    服务器管理员
- ### ServerName
    服务器名称