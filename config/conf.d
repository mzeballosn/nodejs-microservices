[mysqld]
bind-address=0.0.0.0
port = 3306
socket = /tmp/mysql.sock
key_buffer_size = 16M
max_allowed_packet = 8M

query_cache_size = 32M
table_open_cache = 2000
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M

local_infile = 0

[client]
port = 3306
socket = /tmp/mysql.sock

!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/