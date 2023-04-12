use collect_me_test;

select * from category order by `name`;

select * from item;

select
	ci.category_id,
    ci.item_id,
    c.`name`,
    i.`name`,
    i.`description`,
    i.`value`,
    i.user_id
from category_item ci
inner join item i on ci.item_id = i.item_id
inner join category c on ci.category_id = c.category_id
where ci.category_id = 2;

select
	ia.item_id,
    a.`status`
from item_action ia
inner join item i on ia.item_id = i.item_id
inner join `action` a on ia.action_id = a.action_id
where i.item_id = 2;

select
    i.item_id,
    i.`name`,
    i.`description`,
    i.`value`,
    i.user_id,
    i.image
from category_item ci
inner join item i on ci.item_id = i.item_id
inner join category c on ci.category_id = c.category_id
where i.item_id = 2;

select
    c.comment_id,
    u.user_id,
    c.content
from `comment` c
inner join item i on c.item_id = i.item_id
inner join `user` u on c.comment_id = u.user_id
where i.item_id = 1;

