README - Middleware de Autorización en la API de Tareas y Metas
Requisitos
- Node.js (versión LTS recomendada)
- Express.js para crear el backend
- Conexión a internet para instalar dependencias (a través de npm)
- Herramienta para probar APIs como Postman o Insomnia
Para instalar las dependencias, puedes ejecutar el siguiente comando en la terminal:
 npm install
Descripción
El middleware de autorización en este proyecto es una capa intermedia entre las solicitudes
del cliente y la respuesta del servidor. Su objetivo es verificar si la solicitud contiene un
encabezado 'Authorization' válido antes de permitir el acceso a las rutas protegidas de la API.
Solo las solicitudes con un valor de autorización correcto podrán interactuar con los endpoints de
tareas y metas.
Si la autorización es incorrecta o está ausente, la respuesta será un error que indica la falta de
autorización.
Ejecución
1. Clona este repositorio en tu máquina local:
 git clone <url_del_repositorio>
2. Navega hasta la carpeta del proyecto:
 cd nombre_del_proyecto
3. Instala las dependencias:
 npm install
4. Ejecuta el servidor:
 npm start
5. Abre Postman o tu herramienta preferida para realizar solicitudes HTTP y prueba los endpoints.
 Asegúrate de incluir el encabezado de autorización en las solicitudes:
 Authorization: 123456
Código del Middleware
El código del middleware se encuentra en el archivo `app.js` y su función es asegurarse de que solo
las solicitudes
autorizadas puedan acceder a las rutas protegidas de la API:
```javascript
// Middleware de autorización aplicado a todas las rutas
router.use((req, res, next) => {
 if (req.headers.authorization && req.headers.authorization === '123456') {
 next(); // Permite que la solicitud continúe
 } else {
 res.status(401).json({'error': 'No se encontró autorización!'}); // Error 401 por falta de autorización
 }
});
```
Explicación del Middleware
1. **Verificación de autorización**: El código verifica que el encabezado `Authorization` esté
presente y que contenga el valor esperado, "123456".
2. **Autorización válida**: Si la autorización es correcta, se llama a `next()`, lo que permite que la
solicitud continúe hacia la ruta de destino.
3. **Autorización no válida**: Si el encabezado de autorización está ausente o contiene un valor
incorrecto, se devuelve un error con el código de estado **401 Unauthorized** y un mensaje
indicando la falta de autorización.
Este middleware se aplica a todas las rutas de la API antes de las rutas relacionadas con las tareas
y las metas, garantizando la validación de la autorización antes de que cualquier operación sea
realizada sobre esos endpoints.
Endpoints de la API
1. **GET /getTasks**: Recupera todas las tareas.
2. **GET /getGoals**: Recupera todas las metas.
3. **POST /addTask**: Agrega una nueva tarea.
4. **POST /addGoal**: Agrega una nueva meta.
5. **DELETE /removeTask**: Elimina una tarea por su ID.
6. **DELETE /removeGoal**: Elimina una meta por su ID.
Para cada endpoint, asegúrate de incluir el encabezado de autorización con el valor "123456" en la
solicitud.
