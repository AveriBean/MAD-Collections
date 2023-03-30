drop database if exists collect_me_test;
create database collect_me_test;
use collect_me_test;

create table user (
user_id int primary key auto_increment,
username varchar(60) not null,
first_name varchar(64) not null,
last_name varchar(64) not null,
location varchar(255) null,
password_hash varchar(1028) not null,
phone varchar(64) null,
email varchar(64) not null,
enabled bit not null default(1)
);

create table item (
item_id int primary key auto_increment,
`name` varchar(30) not null,
`description` varchar(128) not null,
`value` decimal(10,2) null,
user_id int not null,
image varchar(1028) not null,
constraint fk_item_user_id
        foreign key (user_id)
       references user(user_id)
);

create table `action` (
action_id int primary key auto_increment,
`status` varchar(60) not null
);


create table item_action (
item_id int not null,
action_id int not null,
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
category_id int primary key auto_increment,
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

delimiter //
create procedure set_known_good_state()
begin

delete from comment;
alter table comment auto_increment = 1;

delete from user_role;

delete from role;
alter table role auto_increment = 1;

delete from item_action;

delete from action;
alter table action auto_increment = 1;

delete from category_item;

delete from category;
alter table category auto_increment = 1;

delete from item;
alter table item auto_increment = 1;

delete from user;
alter table user auto_increment = 1;
  


insert into user (username, first_name, last_name, location, password_hash, phone, email, enabled) 
values 
("JMich","Micahael", "Jackson", null, "passwordHash1", null, "mj@testing.com", 1),
("SWalk","Sally", "Walker", "Sally's Address", "passwordHash2", "2622622626", "sw@testing.com", 1),
("JRipp","Jack", "Ripper", "Jacks's Address", "passwordHash3", "4144144141", "jr@testing.com", 1),
("DKris", "Deorsa",  "Kristiane", "Deorsa's Address", "passwordHash4", null, "dk@testing.com", 1);

insert into category (`name`)
values
('Pokemon'),
('Magic'),
('Baseball'),
('Bug');

insert into action (`status`)
values
("viewable"),
("tradeable"),
("saleable"),
("negotiable");

insert into item (`name`, description, `value`, user_id, image)
values
("Pokemon card A", "Pokemon card A", 25.00, 1, "TestImage"),
("Pokemon card B", "Pokemon card B", 25.00, 1, "TestImage"),
("Pokemon card C", "Pokemon card C", 25.00, 1, "TestImage"),
("Magic card A", "Magic card A", 25.00, 2, "TestImage"),
("Magic card B", "Magic card B", 25.00, 2, "TestImage"),
("Magic card C", "Magic card C", 25.00, 2, "TestImage"),
("Baseball card A", "Baseball card A", 25.00, 3, "TestImage"),
("Baseball card B", "Baseball card B", 25.00, 3, "TestImage"),
("Baseball card C", "Baseball card C", 25.00, 3, "TestImage");

insert into item_action (item_id, action_id)
values
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 1),
(5, 1),
(5, 2),
(5, 3),
(6, 1),
(6, 2),
(6, 3),
(7, 1),
(8, 1),
(9, 1),
(9, 2),
(9, 3);

insert into category_item (item_id, category_id)
values
(1,1),
(2,1),
(3,1),
(4,2),
(5,2),
(6,2),
(7,3),
(8,3),
(9,3);


insert into role (role_name)
values
("ADMIN"),
("USER");

insert into user_role (user_id, role_id)
values 
(1,1),
(1,2),
(2,2),
(3,2);

insert into comment (user_id, item_id, content)
values
(2, 2, "This is a really cool card"),
(3, 2, "I agree"),
(1, 1, "This is my favorite"),
(2, 1, "This caught my eye!");

end //

delimiter ; 

set sql_safe_updates = 0;
call set_known_good_state();
set sql_safe_updates = 1;





