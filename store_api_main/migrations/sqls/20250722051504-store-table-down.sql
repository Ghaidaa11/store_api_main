drop table products
drop table users
drop table orders
drop table order_products

ALTER TABLE order_products DROP CONSTRAINT fk_product;

ALTER TABLE orders DROP CONSTRAINT fk_user;


