# TASAv1 BACKEND

## Install

Create virtualenv and install dependencies

### Create environment

```bash
cd tasa_v1/backend/
virtualenv -p python3
source bin/activate
```

### Install MySql

Follow the [documentation](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

MAC pro tip

```bash
brew install mysql
brew services start mysql
```

### Install dependencies

```bash
pip install -r requeriments.txt
```

### Initialize BD

search in [bd](../bd) folder the scripts to initialize mysql database or skip this and connect to remote db.

**NOTE:** you would run sql scripts in crazy combinations

## Run

Override correct env values on [run.sh](./run.sh) and then run

``` bash
bash run.sh  
```

## Save User
curl -XPOST -H 'Cookie: session=eyJ1c2VyIjoiYWRtaW5AMTIzIn0.XxB_Iw.F5Y5cauXMvoAH3esJYhwiAGJBr8' -d 'name=Julian&last_name=Linares&age=22&profesion=web&email=julianlg97@hotmail.com&password=abc123&role_id=1' 'localhost:5000/saveUser'

## Update User 
curl -XPOST -H 'Cookie: session=eyJ1c2VyIjoiYWRtaW5AMTIzIn0.XxB_Iw.F5Y5cauXMvoAH3esJYhwiAGJBr8' -d 'name=Enrique&last_name=Linares&age=24&profesion=MovilApp&email=julianlg97@hotmail.com&password=abc1234&role_id=1' 'localhost:5000/updateUser'

## User List
curl -XPOST -H 'Cookie: session=eyJ1c2VyIjoiYWRtaW5AMTIzIn0.XxB_Iw.F5Y5cauXMvoAH3esJYhwiAGJBr8' 'localhost:5000/userList'

## User [Email]
curl -XGET -H 'Cookie: session=eyJ1c2VyIjoiYWRtaW5AMTIzIn0.XxB_Iw.F5Y5cauXMvoAH3esJYhwiAGJBr8' 'localhost:5000/userList?user=julianlg97%40hotmail.com'


## Save Property
curl -H 'Cookie: session=eyJ1c2VyIjoiQWRtaW5AdGFzYS5jb20ifQ.Xzh-Rg.KN_0lyW5tJJGy22Bup0xe_JT_3g' --location --request POST 'http://127.0.0.1:5000/save_property' --form 'property_name=Tierrita Natural' --form 'business_name=No Name' --form 'phone=9090990' --form 'property_address=av siempre viva' --form 'web_site=something' --form 'total_ha_property=100' --form 'sowing_system=1' --form 'vendor_id=2' --form 'lands=[{"land_name":"lote_1", "land_ha":"90"}, {"land_name":"lote2", "land_ha":"70"}, {"land_name":"lote80", "land_ha":"100"}]' --form 'table_name=property'
curl 'http://localhost:5000/save_property' \
  -H 'Connection: keep-alive' \
  -H 'Cache-Control: max-age=0' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'Origin: http://localhost:5000' \
  -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundary5Er2RQF7Dd3KjxTT' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-User: ?1' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Referer: http://localhost:5000/' \
  -H 'Accept-Language: es-CO,es-MX;q=0.9,es;q=0.8,en-US;q=0.7,en;q=0.6,es-US;q=0.5,es-ES;q=0.4,es-419;q=0.3' \
  -H 'Cookie: session=eyJ1c2VyIjoiQWRtaW5AdGFzYS5jb20ifQ.Xzh-Rg.KN_0lyW5tJJGy22Bup0xe_JT_3g' \
  --data-binary $'------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="property_name"\r\n\r\n90\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="business_name"\r\n\r\n47\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="phone"\r\n\r\n\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="property_address"\r\n\r\n584\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="web_site"\r\n\r\n632\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="total_ha_property"\r\n\r\n387\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="sowing_system"\r\n\r\n1\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="name_land_1"\r\n\r\n904\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="hec_land_1"\r\n\r\n343\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="name_land_1"\r\n\r\n903\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="hec_land_1"\r\n\r\n637\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="name_land_1"\r\n\r\n951\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="hec_land_1"\r\n\r\n286\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="lands"\r\n\r\n[{"land_name":"904","land_ha":"343"},{"land_name":"903","land_ha":"637"},{"land_name":"951","land_ha":"286"}]\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT\r\nContent-Disposition: form-data; name="table_name"\r\n\r\nproperty\r\n------WebKitFormBoundary5Er2RQF7Dd3KjxTT--\r\n' \
  --compressed


  curl -H 'Cookie: session=eyJ1c2VyIjoiQWRtaW5AdGFzYS5jb20ifQ.Xzh-Rg.KN_0lyW5tJJGy22Bup0xe_JT_3g' --location --request POST 'http://127.0.0.1:5000/save_property' --form 'property_name=Tierrita Natural' --form 'business_name=No Name' --form 'phone=9090990' --form 'property_address=av siempre viva' --form 'web_site=something' --form 'total_ha_property=100' --form 'sowing_system=1' --form 'vendor_id=2' --form 'lands=[{"land_name":"lote_1", "land_ha":"90"}, {"land_name":"lote2", "land_ha":"70"}, {"land_name":"lote80", "land_ha":"100"}]' --form 'table_name=property'


## Add Stage

curl 'http://localhost:5000/add_stage' \
  -H 'Connection: keep-alive' \
  -H 'Cache-Control: max-age=0' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'Origin: http://localhost:5000' \
  -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryQBTltEn94pLZiZTp' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-User: ?1' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Referer: http://localhost:5000/' \
  -H 'Accept-Language: es-CO,es-MX;q=0.9,es;q=0.8,en-US;q=0.7,en;q=0.6,es-US;q=0.5,es-ES;q=0.4,es-419;q=0.3' \
  -H 'Cookie: session=eyJyb2xlIjoxLCJ1c2VyIjoiQWRtaW5AdGFzYS5jb20iLCJ1c2VyX2lkIjozNH0.X1Kp_A.4FqC45ENMCuSRe1MqvN1an6PI4c' \
  --data-binary $'------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="property_id"\r\n\r\n66\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="total_kg_3"\r\n\r\n999\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="total_kg_1"\r\n\r\n000\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="total_kg_2"\r\n\r\n7777\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="custom_product_0"\r\n\r\n\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="custom_ing_active_0"\r\n\r\n\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="custom_provider_0"\r\n\r\n\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="custom_dose_by_ha_0"\r\n\r\n\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="custom_total_kg_0"\r\n\r\n\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="observation"\r\n\r\nffffffffff\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp\r\nContent-Disposition: form-data; name="segment_stage"\r\n\r\n1\r\n------WebKitFormBoundaryQBTltEn94pLZiZTp--\r\n' \
  --compressed
