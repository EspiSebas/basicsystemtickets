# 🎫 Basic System Tickets

**Basic System Tickets** es una aplicación web diseñada para la gestión y el seguimiento de tickets de soporte técnico. El proyecto busca facilitar la organización de solicitudes, centralizar la información y mejorar el control de los procesos de atención.

## 📌 Descripción del proyecto

Este proyecto implementa una aplicación web con una arquitectura separada en backend y frontend. El backend se encarga de procesar las solicitudes y gestionar la comunicación con la base de datos, mientras que el frontend proporciona la interfaz para interactuar con el sistema.

El proyecto fue desarrollado como una iniciativa práctica para fortalecer conocimientos en desarrollo web, construcción de aplicaciones backend e integración con bases de datos relacionales.

## 🚀 Tecnologías utilizadas

### Backend
- **Node.js:** entorno de ejecución de JavaScript.
- **Express.js:** framework para construir aplicaciones y servicios web.
- **Sequelize:** ORM para interactuar con bases de datos.
- **MySQL2:** controlador para la conexión con MySQL.
- **dotenv:** gestión de variables de entorno.
- **CORS:** configuración de solicitudes entre distintos orígenes.

### Frontend
- **JavaScript:** desarrollo de funcionalidades e interactividad.
- **Bootstrap 5:** diseño de interfaces responsivas.
- **Axios:** comunicación HTTP con el backend.

## 📂 Estructura del proyecto

```text
basicsystemtickets/
├── backend/
│   ├── middleware/
│   └── router/
├── frontend/
│   └── basicsystemtickets/
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Instalación y ejecución

### Requisitos previos

- Node.js y npm instalados.
- Servidor MySQL disponible.
- Git instalado.

### 1. Clonar el repositorio

```bash
git clone https://github.com/EspiSebas/basicsystemtickets.git
```

### 2. Ingresar al proyecto

```bash
cd basicsystemtickets
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias para la conexión a la base de datos y la configuración de la aplicación.

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=nombre_base_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

> **Nota:** Los nombres de las variables deben coincidir con los utilizados en el código. Configura también la base de datos y las tablas que requiera la aplicación.

### 5. Iniciar el servidor

```bash
node server.js
```

El servidor está configurado para escuchar en el puerto `3000`.

Si la configuración es correcta, podrás comenzar a realizar solicitudes al backend desde el cliente.

## 🧩 Organización de la aplicación

El proyecto separa las responsabilidades principales en dos componentes:

- **Backend:** procesa las solicitudes HTTP, organiza las rutas y aplica el middleware correspondiente.
- **Frontend:** contiene la interfaz de usuario y utiliza Axios para comunicarse con los servicios HTTP.

Esta separación facilita el mantenimiento del código y permite desarrollar cada componente de forma independiente.

## 🎯 Objetivos del proyecto

- Practicar el desarrollo de aplicaciones web con Node.js y Express.
- Implementar una estructura organizada para el backend.
- Integrar una aplicación con una base de datos relacional.
- Facilitar la comunicación entre frontend y backend mediante HTTP.
- Fortalecer conocimientos en desarrollo full-stack.

## 🔮 Posibles mejoras futuras

- Incorporar autenticación y autorización de usuarios.
- Implementar filtros por estado, prioridad y fecha.
- Agregar asignación de tickets a responsables.
- Incorporar seguimiento del historial de cada solicitud.
- Mejorar la validación de datos y el manejo de errores.
- Añadir pruebas automatizadas y documentación de la API.

## 👨‍💻 Autor

**Sebastian Espinosa**

- GitHub: [@EspiSebas](https://github.com/EspiSebas)
- LinkedIn: [sebastian-espinosa-dev](https://linkedin.com/in/sebastian-espinosa-dev/)

---

⭐ Si te resulta útil este proyecto, puedes explorar el repositorio y compartir tus sugerencias.
