create table type_planting(
	id int auto_increment,
	name varchar(255),
	primary key (id)
);

insert into type_planting (name) values('Arroz Secano'), ('Arroz de Riego');

create table property2product (
	property_id int,
	product_id int,
	total_kg_lt varchar(255),
	foreign key(property_id) references property(id),
	foreign key(product_id) references product(id)
);	

create table property_procedure (
	id int auto_increment,
	property_id int,
	stage_id int,
	land_name varchar(255),
	visit_date datetime,
	segment_start datetime,
	segment_end datetime,
	observation text,
	procedure_image text,
	primary key(id),
	foreign key(property_id) references property(id),
	foreign key(stage_id) references stage(id)
);


insert into stage(stage_name) values('Quema Para Siembra');
insert into stage(stage_name) values('Tratamiento de Semillas');
insert into stage(stage_name) values('Pre-Emergencia Total');
insert into stage(stage_name) values('Post Emergencia Temprana');
insert into stage(stage_name) values('Fertilizacion #1');
insert into stage(stage_name) values('Post Emergencia Tardía');
insert into stage(stage_name) values('Fertilizacion #2');
insert into stage(stage_name) values('Control de Enfermedades');
insert into stage(stage_name) values('Fertilizacion #3');
insert into stage(stage_name) values('Control de Enfermedades 2');
insert into stage(stage_name) values('Fertilizacion #4');
insert into stage(stage_name) values('Control de Enfermedades 3');
insert into stage(stage_name) values('Proteccion de Espiga');
insert into stage(stage_name) values('Fecha de Siembra');
insert into stage(stage_name) values('Fecha de Cosecha');
insert into stage(stage_name) values('Control de Hongos');
insert into stage(stage_name) values('Preventiva');
insert into stage(stage_name) values('Aplicación de Embucahmiento');
insert into stage(stage_name) values('Protección de Espiga o de Grano');



----------------------- Stage 1 products
insert into product(stage_id, type_planting_id, commercial_name, ing_active, segment, presentation, concentration, color, formulator, provider, dose_by_ha) values(1,1,'Cosmo agua','Regulador de ph','Regulador de ph',' 1 Kg','N/D','N/D','Cosmoagro','Cosmoagro','0,1'), 
(1,1,'Cosmo In D','Coadyuvante','Coadyuvante','1 lt,4 lt, 20 Lts','N/D','N/D','Cosmoagro','Cosmoagro','0,2'), 
(1,1,'Tornado 48 SL','Glifosato','Herbicida','19 lts ','480 grs','Verde','Sunjoycrop','ABY tech SA','4 a 5'), 
(1,1,'Fritzz 25 SC','Oxifluorfen ','Activador','1 lt y 5 Lts','250 gr','Verde','UH','UH','0,25'), 
(1,1,'Stuble digest','Bacterias ','Bactericida','1 y 20 Lts','0,05','N/D','Soiltec','Soiltec','1'), 
(1,1,'Tricho plus','Trichoderma H y V','Biologico','1 y 20 Lts','1 x 109 U.F.C./gr','N/D','Soiltec','Soiltec','0,15');


