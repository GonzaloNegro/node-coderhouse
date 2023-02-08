--RUTAS--

-REGISTRO/LOGIN-

curl --location --request POST 'https://terceraentreganodejsrailway-production.up.railway.app/api/usuario/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
"usernname": "testMail@mail.com",
"password": "1234",
"name": "testName",
"adress": "testAdress",
"age": "30",
"phone": "5411924084422",
"picture": "testPicture",
"admin": "true"
}'

curl --location --request POST 'https://terceraentreganodejsrailway-production.up.railway.app/api/usuario/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"usernname": "testMail@mail.com",
"password": "1234"
}'

curl --location --request GET 'https://terceraentreganodejsrailway-production.up.railway.app/api/usuario/logout'

-PRODUCTOS-

curl --location --request GET 'https://terceraentreganodejsrailway-production.up.railway.app/api/producto'

curl --location --request GET 'https://terceraentreganodejsrailway-production.up.railway.app/api/producto/:id'

curl --location --request POST 'https://terceraentreganodejsrailway-production.up.railway.app/api/producto' \
--header 'Content-Type: application/json' \
--data-raw '{
"title": "testTitle",
"description": "testDescription",
"code": "testCode",
"photo": "testPhoto",
"value": "100.00",
"stock": "100"
}'

curl --location --request PUT 'https://terceraentreganodejsrailway-production.up.railway.app/api/producto/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
"title": "testTitle",
"description": "testDescription",
"code": "testCode",
"photo": "testPhoto",
"value": "200.00",
"stock": "200"
}'

curl --location --request DELETE 'https://terceraentreganodejsrailway-production.up.railway.app/api/producto/:id'

-CARRITO-

curl --location --request GET 'https://terceraentreganodejsrailway-production.up.railway.app/api/carrito/:id/productos'

curl --location --request POST 'https://terceraentreganodejsrailway-production.up.railway.app/api/carrito/'

curl --location --request POST 'https://terceraentreganodejsrailway-production.up.railway.app/api/carrito/:id/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
"id": "1"
}'

curl --location --request DELETE 'https://terceraentreganodejsrailway-production.up.railway.app/api/carrito/:id'

curl --location --request DELETE 'https://terceraentreganodejsrailway-production.up.railway.app/api/carrito/:id/productos/:id_prod'

curl --location --request GET 'https://terceraentreganodejsrailway-production.up.railway.app/api/carrito/buy/:id'

-IMAGEN-

curl --location --request POST 'https://terceraentreganodejsrailway-production.up.railway.app/api/image' \
--form 'iamge=@"/path/to/file"'
