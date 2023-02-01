"# Tercera_Entrega_Node_JS_Railway"

-Comentarios-

1. Si el phone lo ingresan con 9 incluido, va a servir para Whatsapp. Ahora, si lo ingresan sin 9, va a servir para SMS. Esto no se porque motivo Twilio lo maneja así, pero, dependiendo de como ingresen el phone, es una vía o la otra.
   Ambas dos ya fueron probadas, pero como aviso funcional.
2. Se contempla si el usuario es administrador, si el carrito le pertenece y si el mismo ya fue "comprado" o no.
3. Todo funciona logueado, asi que es indispensable estarlo para manejar las rutas.

-Deuda Técnica-

1. Se deja hacer SignUp de un usuario cuando se esta logueado, lo cual no es correcto, por lo que se debería validar esto.
2. Mejorar el tema del stock. En este momento, al ingresar un producto al carro o sacarlo, se le resta o suma del producto original, lo cual esta bien, pero, cuando se saca, se eliminan todos los productos con ese idy se restituye la cantidad entera.
   Me gustaria que el usuario puede ingresar la cantidad que quiere y no ingresar, por ejemplo, tres objetos de un mismo producto, los cuales representan que el usuario agrego tres unidades. Además, que pueda sacar una unidad, sin sacar todas.
3. Mejorar los logs. Estan bien, pero me gustaria que la info relevante como mail y demas, en vez de ir a warn, vaya a un info. Esto lo hice asi porque cuestiones de practicidad y tiempos.
4. Se puede mejorar el codigo y su organizacion. Esto se contemplara para la entrega final.
5. Mejorar el diseño del mail para el usuario.
6. Agregar un front?
7. Mejorar la validacion de los campos que ingresa el usuario en productos por ejemplo.
8. No mostrar el stock en el carrito, sino que apilar los productos en uno solo y mostrrar la cantidad a llevar. Cuando se saque uno solo retirar una unidad, o, mejor aun, dejar que el usuario eliga cuantas agregar y cuantas eliminar.
