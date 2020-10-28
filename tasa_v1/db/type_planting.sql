create table type_planting(
	id int auto_increment,
	name varchar(255),
	primary key (id)
);

insert into type_planting (name) values('Arroz Secano'), ('Arroz de Riego');

create table property2product (
	property_id int,
	product_id int,
	land_id int,
	total_kg_lt varchar(255),
	foreign key(property_id) references property(id),
	foreign key(product_id) references product(id),
	foreign key(land_id) references land(id)
);

create table property_procedure (
	id int auto_increment,
	property_id int,
	stage_id int,
	land_id int,
	visit_date datetime,
	segment_start datetime,
	segment_end datetime,
	observation text,
	procedure_image text,
	primary key(id),
	foreign key(property_id) references property(id),
	foreign key(stage_id) references stage(id),
	foreign key(land_id) references land(id)
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


alter table stage add column segment_days varchar(255);
alter table stage add column notification_days varchar(255);

alter table land add column seedtime date;
alter table land add column variety varchar(255);

----------------------- Stage 1 products
insert into product(stage_id, type_planting_id, commercial_name, ing_active, segment, presentation, concentration, color, formulator, provider, dose_by_ha) values(1,1,'Cosmo agua','Regulador de ph','Regulador de ph',' 1 Kg','N/D','N/D','Cosmoagro','Cosmoagro','0,1'),
(1,1,'Cosmo In D','Coadyuvante','Coadyuvante','1 lt,4 lt, 20 Lts','N/D','N/D','Cosmoagro','Cosmoagro','0,2'),
(1,1,'Tornado 48 SL','Glifosato','Herbicida','19 lts ','480 grs','Verde','Sunjoycrop','ABY tech SA','4 a 5'),
(1,1,'Fritzz 25 SC','Oxifluorfen ','Activador','1 lt y 5 Lts','250 gr','Verde','UH','UH','0,25'),
(1,1,'Stuble digest','Bacterias ','Bactericida','1 y 20 Lts','0,05','N/D','Soiltec','Soiltec','1'),
(1,1,'Tricho plus','Trichoderma H y V','Biologico','1 y 20 Lts','1 x 109 U.F.C./gr','N/D','Soiltec','Soiltec','0,15');

insert into product(stage_id, type_planting_id, commercial_name, ing_active, segment, presentation, concentration, color, formulator, provider, dose_by_ha) values(1,2,'Cosmo agua','Regulador de ph','Regulador de ph','1 Kg','N/D','N/D','Cosmoagro','Cosmoagro','0,1'),
(1,2,'Cosmo In D','Coadyuvante','Coadyuvante','1 lt,4 lt, 20 Lts','N/D','N/D','Cosmoagro','Cosmoagro','0,2'),
(1,2,'Tornado 48 SL','Glifosato','Herbicida','19 lts ','480 grs','Verde','ABY tech SA','Sunjoycrop','4 a 5'),
(1,2,'Stuble digest','Bacterias ','Bactericida','Biologicos','0,05','N/D','Soilte','Soiltec','1'),
(1,2,'Tricho pus','Trichoderma H y V','Micro','Biologicos','1 x 109 U.F.C./gr','N/D','Soilte','Soiltec','0,15'),
(1,2,'Pilarice 10 WP','Piraxozulfuron','Preemergente','1 Kg','100 gr','Verde','Pilarquin','Pilarquin','0,4'),
(1,2,'Fritzz 25 SC','Oxifluorfen ','Activador','1lt y 5 Lts','250 gr','Verde','UH','UH','0,5-1,5');



--------------------- Stage 2 Products
insert into product(stage_id, type_planting_id, commercial_name, ing_active, segment, presentation, concentration, color, formulator, provider, dose_by_ha) values(2,1,'Semillon','21.9 Zn+14.6 B+14.6 Mn','Nutricion de semillas','1 lts','186 grs','N/D','Aglukon','Aglukon','0,25'),
(2,1,'Robust ','Rizobacterias y Bacillus','Biologicos','1 y 20 lts','0,031','N/D','Soieltec','Soiltec','0,25'),
(2,1,'Tricho plus','Trichoderma H y V','Biologicos','1 kg','1 x 109 U.F.C./gr','N/D','Ssoiltec','Soiltec','0,15'),
(2,1,'Fipromaxx 80 WG','Fipronil','Insecticida','50 kg, 250 y Kg','800 gr','amarillo','DVA','DVA','0,07'),
(2,2,'Semillon','21.9 Zn+14.6 B+14.6 Mn','Nutricion de semillas','1 lts','186 grs','N/D','Aglukon','Aglukon','0,25'),
(2,2,'Robust ','Rizobacterias','Rizobacterias','1 y 20 lts','S/N','N/D','Soilte','Soiltec','0,25'),
(2,2,'Tricho plus','Trichoderma H y V','Hongos','1 kg','1 x 109 U.F.C./gr','N/D','Soilte','Soiltec','0,15'),
(2,2,'Fipromaxx 80 WG','Fipronil 80','Insecticida','250 grs y Kg','800 gr','Amarilla','DVA','DVA','60-70');




--------------------- Stage 3 Products
update stage set stage_name='Pre-Emergencia Total - 0 a 3 días después de la siembra' where id=3;
update stage set segment_days='+0,+3' where id=3;
insert into product(stage_id, type_planting_id, commercial_name, ing_active, segment, presentation, concentration, color, formulator, provider, dose_by_ha) values(3,1,'Cosmo agua ','Regulador de ph','Regulador de ph','1 Kg','N/D','N/D','Cosmoagro','Cosmoagro','0,1'),
(3,1,'Cosmo flux','Coadyuvante','Coadyuvante','1 lt,4 lts,20 lts','N/D','N/D','Cosmoagro','Cosmoagro','0,2'),
(3,1,'Up Stage 50 EC','Clomazone','Pre-emerg','1 y 10 lts','500 grs','Amarilla','UPL','UPL','0.6 a 0.8'),
(3,1,'Fritzz 25 SC','Oxifluorfen ','Pre-emerg','1 lt,5 lt ','250 gr','Verde','UH','UH','0,6'),
(3,1,'Pilarice 10 WP','Piraxozulfuron','Preemergente','1 Kg','100 gr','Verde','Pilarquin','Pilarquin','0,4'),
(3,2,'Cosmo agua ','Regulador de ph','Regulador de ph','1 Kg','N/D','N/D','Cosmoagro','Cosmoagro','0,1'),
(3,2,'Cosmo flux','Coadyuvante','Coadyuvante','1 lt,4 lt,20 lts','N/D','N/D','Cosmoagro','Cosmoagro','0,2'),
(3,2,'Up Stage 50 EC','Clomazone','Pre-emergente','1 lt,10 lts','500 gr','Amarilla','UPL','UPL','0,8'),
(3,2,'Fritzz 25 SC','Oxifluorfen ','Pre-emergente','1lt y 5 Lts','250 gr','Verde','UH','UH','0,6');



--------------------- Stage 4 Products


--------------------- Stage 5 Products
update stage set stage_name='Fertilizacion #1 - 13 a 16 días después de la siembra' where id=5;
update stage set segment_days='+13,+16' where id=5;
insert into stage(stage_name, segment_days) values('Fertilizacion #1 - 12 a 18 días después de la siembra', '+12,+18');
insert into product(stage_id, type_planting_id, commercial_name, ing_active, segment, presentation, concentration, color, formulator, provider, dose_by_ha) values(5,1,'Formula (15-25-18)','15N+25P205+15K20','FERTILIZACION','45 Kg','0,58','N/D','N/D','N/D','4'),
(5,1,'Polisulfato ','Polihalita','Fertilizacion','25 kg','NPK2OCaMgOS','','ICL','ICL','100kg'),
(20,2,'Formula 16.5-15-26.6','Mezcla Fisaca','Nutrición','45 Kg','16.5+15+26.6','-','N/D','N/D','5-6'),
(20,2,'Polisulfato','Polialita','Nutrición','25 Kg','19.2 S+14 K20+17Cao+6 Mg','-','ICL ','ICL','100 Kg');
