curl -X GET "http://localhost:8080/info"

autocannon -c 100 -d 20 'http://localhost:8080/info'
    # -c es el nro de clientes en simultaneo conectados
    # -d es el tiempo que va a estar corriendo autocannon
    
