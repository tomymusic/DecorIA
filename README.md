🏡 DecorIA - Plugin de Shopify para Remodelación con IA
DecorIA es un plugin para Shopify que transforma la experiencia de compra al permitir que los clientes rediseñen sus habitaciones con Inteligencia Artificial y descubran productos de la tienda que encajan perfectamente en su espacio.

🔹 ¿Cómo funciona?
1️⃣ El usuario sube una foto de la habitación que quiere remodelar.
2️⃣ La IA genera automáticamente una versión renovada, integrando productos disponibles en la tienda Shopify donde está instalado el plugin.
3️⃣ Los productos utilizados en la remodelación se muestran con enlaces directos para que los clientes puedan agregarlos al carrito y comprarlos de inmediato.

🎯 Beneficios para tu tienda Shopify
✅ Aumenta la conversión: Los clientes visualizan cómo se verán los productos en su propio espacio antes de comprarlos.
✅ Experiencia de compra innovadora: Convierte la tienda en una plataforma interactiva y personalizada.
✅ Integración sin complicaciones: Se instala fácilmente y se sincroniza con el catálogo de productos de Shopify.

🚀 Principales funcionalidades
✔️ Subida de imágenes: Los usuarios pueden cargar fotos de sus habitaciones.
✔️ Remodelación con IA: Genera automáticamente un nuevo diseño utilizando los productos de la tienda.
✔️ Integración con Shopify: Extrae productos del catálogo de la tienda y los muestra en la imagen remodelada.
✔️ Carrito de compras: Los productos utilizados en la remodelación pueden agregarse al carrito y comprarse directamente en Shopify.
✔️ Autenticación OAuth: Conexión segura y confiable con Shopify.

🚀 Convierte visitas en ventas con DecorIA y revoluciona la forma en que los clientes compran productos para el hogar!

# DecorIA

### 📌 Descripción
DecorIA es una aplicación de Shopify que permite rediseñar habitaciones utilizando IA. Se integra con Shopify para administrar productos y pedidos, y con un servicio de IA para generar imágenes de rediseño.

---

### 📦 Estructura del Proyecto
```
backend/
  ├── api/
  │   ├── index.js
  │   ├── shopify-auth.js
  │   ├── shopify-products.js
  │   ├── redesign-room.js
  ├── package.json
  ├── replicate.js
public/
src/
  ├── .gitignore
  ├── README.md
  ├── package.json
  ├── tailwind.config.js
  ├── vercel.json
```

---

## 🛠 Ejecución
DecorIA se ejecuta en **Vercel** y se despliega automáticamente desde **GitHub**. No requiere ejecución local.

### 1️⃣ Variables de Entorno

```
SHOPIFY_API_SECRET=your_secret_key
SHOPIFY_API_KEY=your_api_key
APP_URL=https://decor-ia.vercel.app
SHOPIFY_STORE_URL=your_store_url
REPLICATE_API_TOKEN=your_replicate_api_token
ENABLE_EXPERIMENTAL_CACHE=true
```

## 📌 Endpoints de la API
| Método | Ruta | Descripción |
|--------|------|-------------|
| **GET** | `/api/` | Verifica que el backend esté activo |
| **GET** | `/api/shopify-auth` | Inicia autenticación con Shopify |
| **GET** | `/api/shopify-auth/callback` | Callback de autenticación |
| **GET** | `/api/shopify-products` | Obtiene productos de la tienda |
| **POST** | `/api/redesign-room` | Aplica IA para rediseño de habitaciones |

---

## 🔥 Debugging en Producción
Si encuentras errores, revisa los logs en Vercel:
1. Ve a `DecorIA > Deployments > Logs`

📌 **TIP:** Usa `console.log()` para depurar en el código y ver resultados en logs de Vercel.

---

### 📞 Soporte
Si tienes dudas, revisa los logs en Vercel o revisa la documentación de Shopify y Replicate API.
