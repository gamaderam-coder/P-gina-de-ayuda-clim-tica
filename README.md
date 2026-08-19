Page & Test de Hábitos Climáticos

Landing page sobre cambio climático con un test interactivo de 10 preguntas que evalúa los hábitos del usuario y le entrega un resultado personalizado sobre su huella ambiental.

## 🌱 Descripción

El sitio tiene dos páginas:

- **Inicio** — landing con estadísticas de calentamiento global, tres acciones recomendadas y un llamado a la acción.
- **Test de hábitos** — cuestionario de 10 preguntas simples (transporte, energía, consumo, reciclaje, etc.) que calcula un puntaje y muestra uno de cuatro resultados: *eco-guardián, buena dirección, punto de partida* o *momento de actuar*.

## 🛠️ Tecnologías

- **Backend:** Python + Flask
- **Frontend:** HTML, CSS y JavaScript puro (sin frameworks)
- **Fuentes:** Fraunces, Inter y JetBrains Mono (Google Fonts)

## 📁 Estructura del proyecto

```
Proyecto/
├── app.py                  # Servidor Flask y rutas
├── templates/
│   ├── index.html          # Landing page
│   └── quiz.html           # Página del test
└── static/
    ├── css/
    │   └── styles.css      # Estilos de ambas páginas
    └── js/
        └── quiz.js         # Lógica del test (preguntas, puntaje, resultado)
```

## 🚀 Cómo correrlo

### 1. Requisitos
- Python 3.10 o superior instalado y agregado al PATH

### 2. Instalar Flask

pip install flask

### 3. Ejecutar el servidor
Desde la carpeta raíz del proyecto (`Proyecto/`):
python app.py

### 4. Abrir en el navegador
```
http://127.0.0.1:5000/
```

> ⚠️ Este proyecto usa `{{ url_for(...) }}` de Jinja2 para las rutas de CSS/JS, por lo que **no funciona con Live Server** — debe correrse siempre con `python app.py`.

## 🔀 Rutas disponibles

| Ruta      | Página             |
|-----------|---------------------|
| `/`       | Landing page (`index.html`) |
| `/quiz`   | Test de hábitos (`quiz.html`) |

## ✏️ Personalizar las preguntas

Las 10 preguntas, sus opciones y los resultados finales se editan directamente en `static/js/quiz.js`, en los arreglos `QUESTIONS` y `RESULTS`. Cada opción de respuesta tiene un `score` de 0 (mejor hábito) a 3 (mayor impacto), y el puntaje total decide qué resultado final se muestra.

## 📌 Estado del proyecto

Plantilla funcional en desarrollo. Pendientes sugeridos:
- Recomendaciones personalizadas según las respuestas más débiles del usuario
- Guardado de resultados (base de datos o sesión)
- Contenido real en las secciones "Sobre nosotros" y "Blog"

Colaboraciones: Especiales gracias a Claude IA y mi persona.
