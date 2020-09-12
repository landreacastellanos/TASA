-- vim sw=4 ts=4 expandtab

create database if not exists tasa;
use tasa;

create table role (
	id int auto_increment,
	role varchar(255),
	primary key(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table user (
	id int auto_increment,
	name varchar(255),
	last_name varchar(255),
	age char(3),
	profesion varchar(100),
	email varchar(255),
	password varchar(500),
	created_date datetime,
	role_id int,
	unique(email),
	primary key(id),
	foreign key (role_id) references role(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table property (
	id int auto_increment,
	property_name varchar(255),
	business_name varchar(255),
	phone varchar(255),
	property_address varchar(255),
	web_site varchar(255), 
	total_ha_property varchar(255),
	sowing_system varchar(255),
	created_date datetime,
	primary key (id),
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table property_user (
	property_id int auto_increment,
	name varchar(255),
	last_name varchar(255),
	email varchar(255),
	phone varchar(255),
	age char(3),
	profesion varchar(255),
	created_date datetime,
	foreign key(property_id) references property(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table land (
	property_id int,
	land_name varchar(255),
	land_ha varchar(255),
	sowing_date date,
	sowing_type varchar(255),
	foreign key(property_id) references property(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table stage (
	id int auto_increment,
	stage_name varchar(255),
	primary key(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table product (
	id int auto_increment,
	stage_id int,
	type_planting_id int,
	commercial_name varchar(255),
	ing_active varchar(255),
	segment varchar(255),
	presentation varchar(255),
	concentration varchar(255),
	color varchar(255),
	formulator varchar(255),
	provider varchar(255),
	dose_by_ha varchar(255),
	primary key(id),
	foreign key(stage_id) references stage(id),
	foreign key(type_planting_id) references type_planting(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into role(role) values('administrator');
insert into user(name, email, password, role_id) values('admin', 'admin@123', '123', 1);

ALTER TABLE user add column phone VARCHAR(255);
ALTER TABLE `tasa`.`user` 
CHANGE COLUMN `phone` `phone` VARCHAR(255) NULL DEFAULT NULL AFTER `email`;

alter table property add column property_ca varchar(255);
alter table property add column property_df varchar(255);
alter table property add column property_rdc varchar(255);
alter table property add column property_v varchar(255);

alter table property add column property_sa varchar(255);
alter table property add column property_idc varchar(255);
alter table property add column property_ec varchar(255);
alter table property add column property_ep varchar(255);

alter table property change column `property_ca` `property_ca` varchar(255) null default null after sowing_system;
alter table property change column `property_df` `property_df` varchar(255) null default null after property_ca;
alter table property change column `property_ec` `property_ec` varchar(255) null default null after property_df;
alter table property change column `property_ep` `property_ep` varchar(255) null default null after property_ec;
alter table property change column `property_idc` `property_idc` varchar(255) null default null after property_ep;
alter table property change column `property_rdc` `property_rdc` varchar(255) null default null after property_idc;
alter table property change column `property_sa` `property_sa` varchar(255) null default null after property_rdc;
alter table property change column `property_v` `property_v` varchar(255) null default null after property_sa;
alter table property drop column property_admin;
alter table property change column property_name name varchar(255);
alter table property change column property_address address varchar(255);

ALTER TABLE `tasa`.`property` 
DROP FOREIGN KEY `property_ibfk_1`;
ALTER TABLE `tasa`.`property` 
DROP COLUMN `vendor_id`,
DROP INDEX `vendor_id` ;
;

