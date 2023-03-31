drop database if exists collect_me_production;
create database collect_me_production;
use collect_me_production;

create table user (
user_id int primary key auto_increment,
username varchar(60) not null,
first_name varchar(64) not null,
last_name varchar(64) not null,
location varchar(255) null,
password_hash varchar(1028) not null,
phone varchar(64) null,
email varchar(64) not null,
enabled bit not null default(1),
locked bit not null default(0)
);

create table item (
item_id int primary key auto_increment,
`name` varchar(30) not null,
description varchar(128) not null,
`value` decimal(10,2) null,
user_id int not null,
image varchar(1028) not null,
constraint fk_item_user_id
        foreign key (user_id)
       references user(user_id)
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


create table role (
role_id int primary key auto_increment,
role_name varchar(32) not null
);

create table user_role (
    user_id int not null,
    role_id int not null,
    constraint pk_user_role
        primary key (user_id, role_id),
    constraint fk_user_role_user_id
        foreign key (user_id)
        references user(user_id),
    constraint fk_user_role_role_id
        foreign key (role_id)
        references role(role_id)
);

create table category (
category_id int primary key,
`name` varchar(64) not null
);

create table category_item (
category_id int not null,
item_id int not null,
constraint pk_category_item
primary key (category_id, item_id),
constraint fk_category_item_category_id
foreign key (category_id)
references category(category_id),
constraint fk_category_item_item_id
foreign key (item_id)
references item(item_id)
);

create table comment (
comment_id int primary key auto_increment,
user_id int not null,
item_id int not null,
content varchar(1028) not null,
constraint fk_comment_user_id
foreign key (user_id)
references user(user_id),
constraint fk_comment_item_id
foreign key (item_id)
references item(item_id)
);






