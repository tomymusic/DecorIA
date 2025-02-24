# 🏡 **DecorIA - Plugin de Shopify para Remodelación con IA**  

**DecorIA** es un **plugin para Shopify** que transforma la experiencia de compra al permitir que los clientes **rediseñen sus habitaciones con Inteligencia Artificial** y descubran productos de la tienda que encajan perfectamente en su espacio.  

---

## 🛡️ **¿Cómo funciona?**
1️⃣ **El usuario sube una foto** de la habitación que quiere remodelar.  
2️⃣ **La IA genera automáticamente una versión renovada**, integrando productos disponibles en la tienda Shopify donde está instalado el plugin.  
3️⃣ **Los productos utilizados en la remodelación se muestran con enlaces directos** para que los clientes puedan agregarlos al carrito y comprarlos de inmediato.  

---

## 🎯 **Beneficios para tu tienda Shopify**
✅ **Aumenta la conversión**: Los clientes visualizan cómo se verán los productos en su propio espacio antes de comprarlos.  
✅ **Experiencia de compra innovadora**: Convierte la tienda en una plataforma interactiva y personalizada.  
✅ **Integración sin complicaciones**: Se instala fácilmente y se sincroniza con el catálogo de productos de Shopify.  

---

## 🚀 **Principales funcionalidades**
✔️ **Subida de imágenes**: Los usuarios pueden cargar fotos de sus habitaciones.  
✔️ **Remodelación con IA**: Genera automáticamente un nuevo diseño utilizando los productos de la tienda.  
✔️ **Integración con Shopify**: Extrae productos del catálogo de la tienda y los muestra en la imagen remodelada.  
✔️ **Carrito de compras**: Los productos utilizados en la remodelación pueden agregarse al carrito y comprarse directamente en Shopify.  
✔️ **Autenticación OAuth**: Conexión segura y confiable con Shopify.  

🚀 **Convierte visitas en ventas con DecorIA y revoluciona la forma en que los clientes compran productos para el hogar!**  

---

## 📦 **Estructura del Proyecto**
```
DecorIA/
├── public/
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   ├── GeistVF.woff
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── api/
│   │   │   ├── redesign-room/
│   │   │   │   ├── route.ts
│
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── textarea.tsx
│   │   ├── Header.tsx
│   │   ├── PromptInput.tsx
│   │   ├── PromptSuggestions.tsx
│
│   ├── lib/
│   │   ├── replicate.ts
│
│   ├── styles/
│   │   ├── globals.css
│
├── .gitignore
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
```

---

## 🛠 **Ejecución**
**DecorIA** se ejecuta en **Vercel** y se despliega automáticamente desde **GitHub**. No requiere ejecución local.

### 1️⃣ **Variables de Entorno**
Para que la aplicación funcione correctamente, debes configurar las siguientes variables de entorno en **Vercel**:

```
REPLICATE_API_TOKEN=your_replicate_api_token
ENABLE_EXPERIMENTAL_CACHE=true
```

Puedes agregarlas en el panel de configuración de Vercel (`Settings > Environment Variables`).

---

## 📌 **Endpoints de la API**
| Método | Ruta | Descripción |
|--------|------|-------------|
| **GET** | `/api/` | Verifica que el backend esté activo |
| **POST** | `/api/redesign-room` | Aplica IA para rediseño de habitaciones |

📌 **Ejemplo de solicitud:**  
```json
{
  "imageUrl": "https://ejemplo.com/imagen.jpg",
  "prompt": "Modernizar la habitación con un estilo minimalista."
}
```

---

## ⚙️ **Tecnologías Utilizadas**
DecorIA está construido con las últimas tecnologías para garantizar rendimiento y escalabilidad:

✅ **Next.js** `15.1.7` (App Router)  
✅ **React** `19.0.0`  
✅ **TypeScript** `5.7.3`  
✅ **Tailwind CSS** `3.3.0`  
✅ **Vercel Deployment**  
✅ **Replicate API** (Generación de imágenes con IA)  

---

## 🔥 **Debugging en Producción**
Si encuentras errores, revisa los logs en Vercel:
1️⃣ **Ve a `DecorIA > Deployments > Logs`**  
2️⃣ **Revisa los mensajes de error en el backend**  

📌 **TIP:** Usa `console.log()` en el código para ver resultados en los logs de Vercel.

---

### 📞 **Soporte**
Si tienes dudas o necesitas ayuda, revisa:
- **[Documentación de Shopify](https://shopify.dev/)**
- **[API de Replicate](https://replicate.com/docs)**
- **[Foros de Next.js](https://github.com/vercel/next.js/discussions)**

🚀 **¡Construye la mejor experiencia de compra con DecorIA!**

