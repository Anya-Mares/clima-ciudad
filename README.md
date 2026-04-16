# 🌤️ Aplicación del Clima

## 📌 Descripción del proyecto
Esta aplicación web permite a los usuarios consultar el clima actual de cualquier ciudad.  
El usuario ingresa el nombre de una ciudad y la aplicación obtiene sus coordenadas mediante la API de geocodificación de Open-Meteo. Posteriormente, utiliza estas coordenadas para consultar la API de pronóstico del tiempo y mostrar información meteorológica en tiempo real.

La aplicación muestra:
- Temperatura
- Humedad
- Velocidad del viento
- Precipitación
- Descripción del clima

---

## 📂 Estructura del proyecto


clima-ciudad/
├── index.html
├── css/
│ └── styles.css
└── js/
├── app.js
└── api.js


---

## ▶️ Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio:

git clone https://github.com/Anya-Mares/clima-ciudad.git


2. Abrir el archivo `index.html` en el navegador.

3. Escribir el nombre de una ciudad en el campo de búsqueda.

4. Hacer clic en el botón "Buscar" para visualizar el clima.

---

## 🧭 Cómo navegar en el código

- `index.html` → estructura de la aplicación  
- `css/styles.css` → estilos y diseño visual  
- `js/app.js` → manejo de eventos y renderizado en pantalla  
- `js/api.js` → lógica para consumir la API de Open-Meteo  

---

## ⚠️ Notas

- Se requiere conexión a internet para obtener los datos del clima.
- La aplicación maneja errores cuando la ciudad no es válida o no se encuentra.
