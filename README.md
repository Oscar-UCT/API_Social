# API_Social
API demo simulando una red social desarrollada con Node.js, Express y MongoDB.
## Colecciones
La API cuenta con 3 colecciones o modelos:
* Posts
* Comentarios
* Usuarios
<br>

Cada post tiene su autor (el usuario), y una lista de comentarios. Cada comentario igualmente tiene su autor.
<br>

**GET** /api/v1/posts entregaría algo así:
<br>

![Ejemplo GET](https://github.com/user-attachments/assets/fa025975-bd30-42e9-970e-3ccb3cc7708d)
```json
[
    {
        "_id": "6865cfb246b87621c90c8bd2",
        "content": "Este es un nuevo post",
        "createdBy": {
            "_id": "6865b6276a53fbba26f93a31",
            "username": "Oscar"
        },
        "comments": [
            {
                "_id": "6865d507797fd57514cb897a",
                "content": "Nuevo comentario",
                "createdBy": {
                    "_id": "6865b6276a53fbba26f93a31",
                    "username": "Oscar"
                }
            }
        ],
        "createdAt": "2025-07-03T00:32:50.405Z",
        "updatedAt": "2025-07-03T00:55:35.993Z",
        "__v": 0
    },
    {
        "_id": "6865d7983f7f10508adf3742",
        "content": "Hola, soy nuevo en este sitio",
        "createdBy": {
            "_id": "6865d7613f7f10508adf373f",
            "username": "Rodrigo Rodriguez"
        },
        "comments": [
            {
                "_id": "6865d7c33f7f10508adf3748",
                "content": "¡Bienvenido!",
                "createdBy": {
                    "_id": "6865b6276a53fbba26f93a31",
                    "username": "Oscar"
                }
            },
            {
                "_id": "6865da8d3f7f10508adf3774",
                "content": "¡Hola!",
                "createdBy": {
                    "_id": "6865da483f7f10508adf376f",
                    "username": "Martin Tomillo"
                }
            }
        ],
        "createdAt": "2025-07-03T01:06:32.620Z",
        "updatedAt": "2025-07-03T01:19:09.514Z",
        "__v": 0
    },
    {
        "_id": "6865da6e3f7f10508adf3772",
        "content": "¿Cómo se usa esto?",
        "createdBy": {
            "_id": "6865da483f7f10508adf376f",
            "username": "Martin Tomillo"
        },
        "comments": [],
        "createdAt": "2025-07-03T01:18:38.666Z",
        "updatedAt": "2025-07-03T01:18:38.666Z",
        "__v": 0
    }
]
```
