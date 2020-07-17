-- vim sw=4 ts=4 expandtab

create database if not exists tasa;
use tasa;

create table role (
	id int auto_increment,
	role varchar(255),
	primary key(id)
);

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
);


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
	vendor_id int,
	primary key (id),
	foreign key (vendor_id) references user(id)
);

create table property_user(
	property_id int auto_increment,
	name varchar(255),
	last_name varchar(255),
	email varchar(255),
	phone varchar(255),
	age char(3),
	profesion varchar(255),
	created_date datetime,
	foreign key(property_id) references property(id)
);

create table land (
	id int auto_increment,
	property_id int,
	land_name varchar(255),
	land_ha varchar(255),
	primary key(id),
	foreign key(property_id) references property(id)
);

create table stage (
	id int auto_increment,
	stage_name varchar(255),
	primary key(id)
);

create table stage_procedure (
	id int auto_increment,
	stage_id int,
	property_id int,
	visit_date datetime,
	segment_start datetime,
	segment_end datetime,
	commercial_name varchar(255),
	ing_active varchar(255),
	segment varchar(255),
	product_presentation varchar(255),
	product_concentration varchar(255),
	product_color varchar(255),
	product_formulator varchar(255),
	product_provider varchar(255),
	dose_by_ha varchar(255),
	total_kg_lt varchar(255),
	picture varchar(555),
	observation varchar(555),
	primary key(id),
	foreign key(stage_id) references stage(id),
	foreign key(property_id) references property(id)
);


insert into role(role) values('administrator');
insert into user(name, email, password, role_id) values('admin', 'admin@123', '123', 1);
