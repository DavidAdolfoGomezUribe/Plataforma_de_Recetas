# 📚 Plataforma de Recetas Culinarias

API REST construida con **Node.js**, **Express** y **MongoDB**, diseñada para gestionar usuarios, recetas e ingredientes.  
Permite crear, actualizar y eliminar usuarios; añadir recetas tanto de manera independiente como asociadas a un usuario; y administrar ingredientes de forma detallada.

---

## Integrante 
David Adolfo Gomez Uribe

## Video explicativo
[Video explicativo](https://www.tiktok.com/@davidgomez071/video/7538658992990604549)


## 🚀 Tecnologías utilizadas
- **Node.js** (runtime de JavaScript)
- **Express** (framework para el servidor)
- **MongoDB** (base de datos NoSQL)
- **dotenv** (manejo de variables de entorno)
- **nodemon** (desarrollo con autoreload)

---

## 📦 Instalación y configuración

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPO>
   cd plataforma_de_recetas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz con el siguiente contenido:
   ```env
   MONGODB_URI=mongodb://localhost:27017/recetas_db
   PORT=5500
   ```

4. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```
   Esto iniciará el servidor con **nodemon**.

---

## 📂 Estructura del proyecto

```
src/
 ├── routes/
 │    ├── users.routes.js       # Endpoints para gestión de usuarios
 │    ├── recipes.routes.js     # Endpoints para gestión de recetas
 │    ├── ingredientes.routes.js# Endpoints para gestión de ingredientes
 │
 ├── db/
 │    ├── config.js             # Conexión a MongoDB
 │    ├── seeders.js            # Script para poblar la base de datos
 │
 ├── utils/
 │    ├── asyncHandler.js       # Manejo simplificado de errores async
 │
 ├── app.js                     # Configuración principal de Express
 ├── index.js                   # Punto de entrada del servidor
```

---

## 📜 Documentación de la API

Para ver todos los **endpoints**, ejemplos de requests y responses, visita:  
👉 **[Documentación Postman](https://documenter.getpostman.com/view/42985627/2sB3BHjTvy)**

---

## 🛠 Scripts disponibles


- `npx nodemon app.js` → Inicia el servidor con **nodemon** (modo desarrollo)
- `node src/db/seeders.js` → Ejecuta el seeder para poblar la base de datos con datos iniciales

---

## ✨ Funcionalidades principales
- **Usuarios**:
  - Crear, obtener, actualizar y eliminar usuarios.
  - Añadir recetas directamente a un usuario.
- **Recetas**:
  - Crear recetas independientes (libro general).
  - Editar título o descripción.
  - Añadir/eliminar ingredientes.
  - Buscar recetas por ingrediente.
- **Ingredientes**:
  - Listado general con descripción.
  - Administración independiente o dentro de recetas.

---

## 📌 Ejemplo de endpoint

**Crear un usuario**
```http
POST /api/users
Content-Type: application/json

{
  "nombre": "Pedro Gonzales"
}
```

**Respuesta exitosa**
```json
{
  "message": "Creating user ok",
  "user": {
    "id": 1,
    "nombre": "Pedro Gonzales",
    "recetas": []
  }
}
```

---

## 📝 Licencia
Este proyecto se distribuye bajo la licencia **ISC**.
