drop database if exists collect_me;
create database collect_me;
use collect_me;

create table item (
item_id int primary key auto_increment,
`name` varchar(30) not null,
description varchar(128) not null
);

create table `action` (
action_id int primary key auto_increment,
viewable binary not null,
tradeable binary not null,
saleable binary not null,
negotiable binary not null
);


create table item_action (
action_id int not null,
item_id int not null,
constraint pk_item_action
        primary key (action_id, item_id),
constraint fk_item_action_action_id
        foreign key (action_id)
       references `action`(action_id),
constraint fk_item_action_item_id
        foreign key (item_id)
        references item(item_id)
  
);

create table user (
user_id int primary key auto_increment,
first_name varchar(64),
last_name varchar(64),
location varchar(255) ,
password_hash varchar(1028) not null,
phone varchar(64) null,
email varchar(64) not null,
);

