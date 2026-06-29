# Prompts de construcción — Funnel Cana Vacations
*One-page landing bilingüe (ES/EN) enfocada a convertir 4 excursiones, construida en vibe-coding de código (React + Tailwind + Framer Motion) e integrada a GoHighLevel. Síntesis de los 2 informes de investigación + marca real del sitio.*

---

## 0. Cómo usar este documento

- **Herramienta recomendada:** **Lovable** o **Bolt.new** para construir la app completa (mejor para one-page funnels). **v0** si prefieres generar componente por componente. **Cursor** si trabajarás dentro de un repo.
- **Orden:** pega **PROMPT 0 (Fundación)** primero. Luego ejecuta del 1 al 9 **en orden**, revisando el preview tras cada uno. Cada prompt asume el contexto del anterior.
- **Idioma de los prompts:** están en español; los modelos los entienden perfecto. Pídeme la **versión en inglés** si tu herramienta rinde mejor así.
- **Lo que TÚ pegas después:** los embeds reales de GHL (formulario/calendario), tu webhook, tu número de WhatsApp y tus fotos/videos. Los prompts dejan los huecos listos.

## Decisiones aplicadas (de la investigación — puedes vetar cualquiera)

| Tema | Decisión | Por qué |
|---|---|---|
| **Nombre de planes** | Público: **"Clásica" (ES) / "Classic" (EN)** + **"VIP"**. NO usar "Simple/Sencilla" en EN. | "Sencilla" suena pobre; good-better convierte mejor con naming aspiracional. |
| **Precios + ancla** | Mostrar precio VIP con un **valor comparable tachado** (precio típico OTA). | Anclaje/charm pricing cuantifica el ahorro. *(Verifica los anclas antes de publicar.)* |
| **Paleta** | **Navy dominante** (fondos inmersivos) + teal (agua/acento) + **coral = único color de acción** + rojo solo urgencia. | Eleva sin perder marca; el navy del sitio real pasa a protagonista. |
| **Tipografía** | **Poppins** (se conserva). | Equity de marca + legible. |
| **Cierre** | **GHL/Stripe = checkout** (depósito $15–25). **WhatsApp = concierge/soporte + recuperación de carrito.** | Reduce fricción del turista que reserva a las 2am; WhatsApp deja de ser el único cierre. |
| **Arquitectura** | De "catálogo" → **funnel editorial de elección guiada**. | Ventana de compra corta: resolver qué es / cuál elijo / cuánto / por qué confío / qué hago ahora. |
| **Otros servicios** | Franja de **banners** (Hoteles, Vuelos, Autos, Paquetes) que **redirigen a canavacations.com**. | Mantiene el foco en los 4 productos; el resto vive en el sitio principal. |

**Tabla de precios y anclas (editable):**
| Producto | Clásica/Classic | VIP | Valor comparable tachado (VIP) |
|---|---|---|---|
| Isla Saona | **$85** | **$120** | ~~$160~~ |
| Excursión Buggy | **$65** | **$95** | ~~$130~~ |
| Party Boat | **$65** | **$90** | ~~$120~~ |
| City Tour Santo Domingo | **$90** | **$160** | ~~$210~~ |

---

## PROMPT 0 — Fundación / sistema de diseño *(pegar primero)*

````text
Eres un ingeniero front-end senior + director de arte. Vas a construir una LANDING PAGE de UNA SOLA PÁGINA (one-page funnel), mobile-first, de altísima conversión y visualmente premium para "Cana Vacations", una agencia de excursiones en Punta Cana, República Dominicana, que vende 4 excursiones, cada una con dos planes (Classic y VIP).

STACK OBLIGATORIO: React + Vite + TypeScript + Tailwind CSS + Framer Motion. Sin librerías de UI pesadas. Código limpio y componentizado. Accesible (WCAG AA: contraste, foco visible, alt text, navegación por teclado, aria-labels). Optimizado para Core Web Vitals: LCP < 2.5s (hero con poster + lazy del resto), INP < 200ms, CLS < 0.1 (toda imagen con width/height fijos). Imágenes en formato moderno (webp/avif) con lazy-loading salvo el hero.

BILINGÜE ES/EN: crea un LanguageContext + diccionarios de strings (src/i18n/es.ts y en.ts). Idioma por defecto: detectar navegador; persistir elección en localStorage. TODO texto visible sale de los diccionarios (nada hardcodeado). El toggle ES/EN vive en el navbar.

DESIGN TOKENS EXACTOS (configúralos en tailwind.config como colores y como CSS vars):
--navy:#1A2B50 (fondo dominante de secciones inmersivas / dark)
--navy-deep:#12203D (variante más profunda)
--teal:#0E7A8C (agua / acento funcional / íconos)
--teal-bright:#00C1CF (acento vivo / hovers de íconos)
--coral:#FFAB53 (ÚNICO color de acción: botones, hovers, highlights, precios destacados)
--alert:#ED0925 (SOLO escasez/urgencia)
--white:#FFFFFF / --bg-soft:#F7F7F7 / --text:#666666 / --slate:#5E6D77 / --muted:#A0A9B2
Tipografía: Poppins (400/500/600/700) vía Google Fonts con display=swap. Headings 600/700, cuerpo 400.

DIRECCIÓN DE ARTE: "Tropical Editorial Premium".
- Navy como base de las secciones inmersivas (modo oscuro parcial); blanco/bg-soft para secciones de lectura.
- Teal para degradados MUY sutiles que evoquen agua y para íconos.
- Coral como único color de acción (CTAs, hovers, badges "Más elegido", precios VIP).
- Fotografía caribeña cinematográfica a sangre completa (full-bleed), con leve grano/contraste editorial.
- Titulares Poppins grandes y editoriales; layout ASIMÉTRICO tipo Bento Grid (no listas verticales infinitas).
- Glassmorphism SOLO en overlays del hero. Motion con mesura: fade/slide al entrar en viewport, elevación sutil en hover de cards, parallax leve en el hero.
- EVITA el look genérico de IA: nada de hero centrado con gradiente morado, nada de cards todas iguales, nada de emojis decorando todo. Debe sentirse MÁS premium que una OTA (Viator/GetYourGuide) pero claramente caribeño y humano.

ESTRUCTURA DE LA PÁGINA (en este orden, como componentes en src/sections/):
1) Navbar (logo + toggle ES/EN + CTA "Reservar")
2) Hero inmersivo
3) ExperienceSelector (4 cards: Saona, Buggy, Party Boat, Santo Domingo)
4) TrustBar (rating agregado + "operando desde 2017" + logos Google/Tripadvisor + ES/EN)
5) ProductSection ×4 (reutilizable, con comparador Classic vs VIP)
6) OtherServices (franja de banners → canavacations.com)
7) Logistics (zonas de pickup, clima, pago, cancelación, idiomas)
8) LeadMagnet (guía pre-viaje, captura de email)
9) FAQ (accordion)
10) Footer transaccional (contacto, teléfonos, redes, legal)
Globales: StickyCTA (barra inferior en mobile con "Ver planes" + "WhatsApp"), WhatsAppFloat (botón flotante), BookingModal (slide-over para GHL).

TAREA DE ESTE PROMPT (solo fundación, NO contenido aún):
- Crea el scaffold del proyecto con Vite + TS + Tailwind + Framer Motion.
- Configura tailwind.config con los tokens y Poppins; importa la fuente.
- Crea LanguageContext + es.ts/en.ts con un par de strings de ejemplo y el toggle funcionando.
- Crea los 10 componentes de sección + los 3 globales como PLACEHOLDERS (cada uno renderiza su nombre y un borde, para ver el orden).
- Entrégame el árbol de carpetas y confirma que el toggle ES/EN cambia el idioma.
````

---

## PROMPT 1 — Navbar, toggle de idioma, Sticky CTA y WhatsApp flotante

````text
Construye los componentes globales de navegación e interacción, manteniendo la dirección de arte "Tropical Editorial Premium" y los tokens definidos.

NAVBAR (sticky, transparente sobre el hero y con fondo navy al hacer scroll):
- Izquierda: logo "Cana Vacations" (usa placeholder de texto con Poppins 700 + ícono de pájaro/ola; dejaré el SVG real luego).
- Centro (desktop): enlaces ancla suaves a #experiencias, #saona, #confianza, #faq.
- Derecha: toggle ES/EN (pill con dos estados, coral el activo) + botón coral "Reservar / Book".
- Mobile: menú hamburguesa que abre un panel navy full-screen con motion.

STICKY CTA (solo mobile, aparece tras pasar el hero): barra inferior fija con dos acciones:
- Primario coral: "Ver planes / See plans" (scroll a #experiencias).
- Secundario outline: "WhatsApp" (abre wa.me con contexto general).
Animar entrada/salida con Framer Motion. No debe tapar el footer.

WHATSAPP FLOAT (todas las pantallas, esquina inferior derecha por encima del sticky en mobile):
- Botón circular con ícono WhatsApp. Tooltip al hover: "¿Dudas? Te respondemos rápido / Questions? Quick reply".
- Crea un helper buildWhatsAppLink({ product?, plan?, date? }) que arme la URL:
  https://wa.me/18093602625?text=<mensaje URL-encoded con producto/plan/fecha + utm>
  Número RD: +1 809 360 2625 (déjalo como const editable; también existe el +1 704 649 0329 EE.UU.).

Todo el texto desde los diccionarios ES/EN. Asegura foco por teclado y aria-labels.
````

---

## PROMPT 2 — Hero inmersivo

````text
Construye el Hero inmersivo full-bleed. Fondo: video corto en loop (con poster.jpg para LCP) o imagen cinemática del mar de Saona; overlay navy degradado (de transparente arriba a navy-deep abajo) para legibilidad. Glassmorphism sutil solo en la tarjeta de contenido.

LAYOUT: asimétrico. Titular grande Poppins 700 a la izquierda; a la derecha/abajo una franja de "trust chips" en glass. CTA primario coral dominante + CTA secundario outline (WhatsApp). Selector ES/EN ya visible en navbar.

COPY (desde diccionarios):
ES:
- Headline: "Elige el día que recordarás de Punta Cana."
- Subheadline: "4 excursiones top. Planes Classic y VIP. Atención en español e inglés, pickup por zonas y reserva con cancelación flexible."
- CTA primario: "Ver planes y precios"  | CTA secundario: "Hablar por WhatsApp"
- Microcopy bajo el CTA: "¿Viajas esta semana? Confirmamos disponibilidad y pickup en minutos."
EN:
- Headline: "Pick the Punta Cana day you’ll actually remember."
- Subheadline: "Four top experiences. Classic and VIP plans. Fast answers in English or Spanish, hotel-area pickup, and flexible cancellation."
- CTA primario: "See plans & prices" | CTA secundario: "Chat on WhatsApp"
- Microcopy: "Traveling this week? We confirm availability and pickup in minutes."

TRUST CHIPS (4, con ícono + texto corto, desde diccionarios):
ES: "Cancelación flexible" · "Confirmación rápida" · "Pickup por zonas" · "Atención ES/EN"
EN: "Flexible cancellation" · "Fast confirmation" · "Hotel-area pickup" · "English & Spanish"

Motion: parallax leve del fondo al hacer scroll; fade-up del contenido al cargar. El CTA primario dispara scroll suave a #experiencias. Garantiza CLS 0 (poster con dimensiones; reserva de espacio del video).
````

---

## PROMPT 3 — Selector de experiencias + Barra de confianza

````text
1) EXPERIENCE SELECTOR (#experiencias): grid responsivo de 4 cards (Saona, Buggy, Party Boat, Santo Domingo) en estilo Bento (tamaños ligeramente distintos, no uniformes). Cada card:
- Imagen full-bleed con overlay navy al hover y elevación sutil (Framer Motion).
- Nombre del tour (Poppins 600), "desde / from US$XX", duración, y un tag "best for / ideal para".
- Botón coral "Explorar / Explore" que hace scroll a la sección del producto (#saona, #buggy, #party, #santo-domingo).
Datos (desde diccionarios):
- Isla Saona — desde US$85 — 7h — ES "Ideal para: familias y primera vez" / EN "Best for: families & first-timers"
- Excursión Buggy — desde US$65 — 4h — ES "Ideal para: aventura y adrenalina" / EN "Best for: adventure & adrenaline"
- Party Boat — desde US$65 — 3h — ES "Ideal para: grupos y fiesta" / EN "Best for: groups & party"
- Santo Domingo — desde US$90 — 9h — ES "Ideal para: cultura e historia" / EN "Best for: culture & history"

2) TRUST BAR (#confianza), banda inmersiva navy bajo el selector:
- Rating agregado grande (ej. "4.9 ★ · +1,200 viajeros felices" — placeholder editable).
- Logos: Google Reviews, Tripadvisor (placeholders).
- Bloque de autoridad local (desde diccionarios):
  ES: "Operado por expertos locales con +17 años de experiencia (ex-equipo comercial del Hard Rock Hotel Punta Cana). Oficinas en RD y Carolina del Norte."
  EN: "Run by local experts with 17+ years of experience (former Hard Rock Hotel Punta Cana commercial team). Offices in the DR and North Carolina."
- 3 reseñas reales en cards con foto + nombre + bandera/idioma (placeholders editables).
Nada de "0 reviews": si no hay API, los testimonios van hardcodeados como contenido visual.
````

---

## PROMPT 4 — Componente reutilizable ProductSection + comparador Classic vs VIP

````text
Crea un componente REUTILIZABLE <ProductSection data={...} /> que renderiza la sección completa de un producto y se usará 4 veces. Diseño Bento, no tablas HTML clásicas.

ESTRUCTURA de cada ProductSection:
a) Encabezado: nombre del tour + frase emocional (headline) + duración + chips (idioma, pickup, cancelación).
b) Galería/UGC strip: 3–5 imágenes/clips (placeholders), formato historias en mobile.
c) Highlights secuenciales (timeline en chips): pickup → salida → spot 1 → spot 2 → comida → regreso.
d) Bento de "Incluye / No incluye" con íconos (checks coral para incluye, cruces slate para no incluye).
e) COMPARADOR Classic vs VIP: dos tarjetas lado a lado (en mobile, apiladas con la VIP primero).
   - Tarjeta Classic: fondo blanco/bg-soft, minimalista, precio "Desde US$XX", badge "La más popular / Most popular".
   - Tarjeta VIP: fondo navy, texto blanco, borde coral sutil con glow, badge coral superpuesto "Más elegido / Traveler favorite". Precio con ancla: valor comparable TACHADO (slate) + precio VIP en coral grande. Microcopy: "Tarifa internacional por persona (USD) / International rate per person (USD)".
   - Comparación de máximo 6 filas (íconos + 2 columnas): Tipo de grupo · Transporte/embarcación/vehículo · Paradas destacadas · Bebidas/comida · Ritmo/comodidad · Ideal para.
   - Cada tarjeta tiene su CTA coral propio que abre el BookingModal con el plan preseleccionado: "Reservar Classic" / "Reservar VIP" (EN: "Book Classic" / "Book VIP").
f) Modal "Zonas de pickup": botón que abre un modal con zonas incluidas y zonas con suplemento (lo llenamos en el Prompt 7).

Reglas: todo el texto del componente viene del objeto `data` (bilingüe) que definiré en el siguiente prompt. Motion: fade-up por bloque al entrar en viewport; hover-elevación en las tarjetas de plan. La tarjeta VIP debe tener MAYOR jerarquía visual que la Classic. Dispara evento dataLayer "select_plan" al hacer clic en cualquier CTA de plan.
````

---

## PROMPT 5 — Datos de los 4 productos (contenido bilingüe + precios + diferencias)

````text
Crea el archivo src/data/products.ts con un array tipado `products` que alimenta a <ProductSection>. Usa EXACTAMENTE este contenido (bilingüe). Mantén las claves; rellena imágenes con placeholders.

1) ISLA SAONA (id: "saona", anchor: "#saona", duration ES "7 horas"/EN "7 hours")
   headline ES Classic: "La Saona clásica que todos quieren vivir." / VIP: "Saona VIP: menos gente, más paraíso."
   headline EN Classic: "The classic Saona day everyone comes for." / VIP: "Saona VIP for fewer crowds and more paradise."
   Classic US$85 | VIP US$120 (ancla tachada US$160)
   Comparador (Classic → VIP):
   - Grupo: ES "Catamarán compartido (grupo grande)" → "Grupo reducido semi-privado" | EN "Shared catamaran (large group)" → "Small semi-private group"
   - Transporte: ES "Catamarán" → "Lancha rápida" | EN "Catamaran" → "Speedboat"
   - Paradas: ES "1 playa + piscina natural" → "3 playas vírgenes + piscina natural" | EN "1 beach + natural pool" → "3 pristine beaches + natural pool"
   - Bebidas/comida: ES "Almuerzo buffet + open bar nacional" → "Buffet + bebidas premium" | EN "Buffet + national open bar" → "Buffet + premium drinks"
   - Ritmo: ES "Ritmo de grupo grande" → "Salida más temprana, sin multitudes" | EN "Large-group pace" → "Earlier start, no crowds"
   - Ideal para: ES "Primera vez, presupuesto" → "Quien quiere la foto sin desconocidos" | EN "First-timers, budget" → "Travelers who want the crowd-free photo"
   includes: transporte ida/vuelta, guía bilingüe, almuerzo buffet, snorkel, piscina natural. notIncludes: propinas, fotos, consumos extra.

2) EXCURSIÓN BUGGY (id:"buggy", "#buggy", 4h)
   headline ES Classic: "Barro, adrenalina y Macao en una sola mañana." / VIP: "El buggy premium: aventura con más control."
   headline EN Classic: "Mud, adrenaline and Macao in one epic ride." / VIP: "The premium buggy: more control, smoother ride."
   Classic US$65 | VIP US$95 (ancla US$130)
   Comparador:
   - Grupo: ES "Caravana grande compartida" → "Privado o grupo mínimo" | EN "Large shared caravan" → "Private or tiny group"
   - Vehículo: ES "Buggy estándar" → "Polaris / vehículo de alto rendimiento" | EN "Standard buggy" → "Polaris / high-performance vehicle"
   - Paradas: ES "Cueva del agua + Playa Macao" → "+ tiempo extendido en cenotes y rancho" | EN "Water cave + Macao Beach" → "+ extended time at cenotes & ranch"
   - Comida: ES "Almuerzo dominicano" → "Almuerzo + degustaciones" | EN "Dominican lunch" → "Lunch + tastings"
   - Ritmo: ES "Dependes del más lento" → "A tu propio ritmo, sin esperas" | EN "You wait for the slowest" → "Your own pace, no waiting"
   - Ideal para: ES "Aventura económica" → "Quien quiere estatus y mejores fotos" | EN "Budget adventure" → "Those who want status & better photos"
   includes: transporte, guía, buggy/equipo, almuerzo, paradas. notIncludes: propinas, fotos, consumos.

3) PARTY BOAT (id:"party", "#party", 3h)
   headline ES Classic: "La fiesta clásica en el mar de Punta Cana." / VIP: "Tu party boat, mejor servido y mejor vivido."
   headline EN Classic: "Punta Cana’s classic party boat." / VIP: "Your party boat upgrade — better drinks, space and vibes."
   Classic US$65 | VIP US$90 (ancla US$120)
   Comparador:
   - Grupo: ES "Catamarán masivo" → "Grupo reducido / zona reservada" | EN "Packed catamaran" → "Smaller group / reserved area"
   - Bar: ES "Open bar nacional" → "Barra premium (licores internacionales)" | EN "National open bar" → "Premium bar (international spirits)"
   - Agua: ES "Snorkel + piscina natural" → "Snorkel mejor + rayas, spots menos concurridos" | EN "Snorkel + natural pool" → "Better snorkel + rays, quieter spots"
   - Extras: ES "Música y ambiente" → "Zona VIP lounge + aperitivos" | EN "Music & vibe" → "VIP lounge + appetizers"
   - Ritmo: ES "Pista abarrotada" → "Tu propio espacio" | EN "Crowded deck" → "Your own space"
   - Ideal para: ES "Grupos que buscan fiesta" → "Quien quiere confort y mejor reel" | EN "Party groups" → "Those who want comfort & a better reel"
   includes: transporte, catamarán, open bar, snorkel, música. notIncludes: propinas, fotos, consumos extra.

4) CITY TOUR SANTO DOMINGO (id:"santo-domingo", "#santo-domingo", 9h)
   headline ES Classic: "Conoce la capital sin complicarte." / VIP: "Santo Domingo VIP: la historia con otro nivel de confort."
   headline EN Classic: "Discover the capital without the hassle." / VIP: "Santo Domingo VIP: history with next-level comfort."
   Classic US$90 | VIP US$160 (ancla US$210)
   Comparador:
   - Grupo: ES "Autobús grande (30+)" → "Privado o grupo íntimo (<8)" | EN "Large bus (30+)" → "Private or intimate group (<8)"
   - Transporte: ES "Bus turístico" → "Minivan/SUV cómoda" | EN "Tour bus" → "Comfortable minivan/SUV"
   - Recorrido: ES "Ruta fija + parada en tiendas" → "Ruta flexible, sin paradas forzadas" | EN "Fixed route + shop stops" → "Flexible route, no forced stops"
   - Guía/comida: ES "Guía estándar + almuerzo típico" → "Guía historiador + almuerzo gastronómico" | EN "Standard guide + set lunch" → "Historian guide + gourmet lunch"
   - Ritmo: ES "Te sientes 'en grupo'" → "A tu propio ritmo" | EN "Herd pace" → "Your own pace"
   - Ideal para: ES "Ver lo top rápido" → "Viajero cultural que odia sentirse turista" | EN "See the top sights fast" → "Culture lovers who hate feeling like tourists"
   includes: transporte, guía, Ciudad Colonial, Los Tres Ojos, Faro a Colón, almuerzo. notIncludes: propinas, entradas opcionales, fotos.

Tipa todo con una interface Product que soporte ambos idiomas (ej. { es: {...}, en: {...} }). Conecta `products` a las 4 instancias de <ProductSection> en la página.
````

---

## PROMPT 6 — Franja "Otros servicios" (banners → canavacations.com)

````text
Crea la sección <OtherServices> (#otros-servicios): una franja compacta, secundaria (NO debe competir con los 4 productos), que presenta el resto de la agencia con banners pequeños que redirigen al sitio principal. Título de sección (desde diccionarios):
ES: "¿Buscas algo más? Cana Vacations también te resuelve el viaje completo."
EN: "Need more? Cana Vacations handles your whole trip."

4 banners pequeños horizontales (grid 2x2 en mobile, 4x1 en desktop), cada uno con ícono + título + 1 línea + flecha. Abren en nueva pestaña (rel="noopener"):
- Hoteles → https://canavacations.com/hoteles/  | ES "Hoteles" / "Las mejores tarifas en Punta Cana y RD" — EN "Hotels" / "Best rates in Punta Cana & the DR"
- Vuelos → https://canavacations.com/  | ES "Vuelos" / "Ofertas de vuelos a tu medida" — EN "Flights" / "Flight deals made for you"
- Alquiler de autos → https://canavacations.com/alquiler-de-autos/  | ES "Alquiler de autos" / "Muévete a tu ritmo" — EN "Car rental" / "Move at your own pace"
- Paquetes a la medida → https://canavacations.com/  | ES "Paquetes a la medida" / "Diseñamos tu viaje completo" — EN "Custom packages" / "We design your whole trip"

Estilo: cards bg-soft con borde sutil, ícono teal, hover con elevación leve y flecha coral. Discretos, elegantes, claramente "salida" hacia el sitio principal. Dispara evento dataLayer "outbound_service_click" con el nombre del servicio.
````

---

## PROMPT 7 — Logística & confianza + Lead magnet + FAQ + Footer

````text
Construye 4 secciones de cierre, todas con copy bilingüe desde diccionarios.

1) LOGISTICS (#logistica) — "ansiolítico digital" que mata fricción. Bento navy con íconos:
- Zonas de pickup (también alimenta el modal del Prompt 4): INCLUIDAS gratis → Bávaro, Punta Cana, Cabeza de Toro, Arena Gorda, Uvero Alto, Macao. CON SUPLEMENTO/punto de encuentro → Cap Cana, Bayahibe.
- Política de clima (ES "Política de lluvia 100% flexible: reprogramas sin penalidad" / EN "100% flexible weather policy: reschedule with no penalty").
- Pago (ES "Asegura tu cupo con un depósito; paga el resto el día del tour" / EN "Lock your spot with a deposit; pay the rest on tour day").
- Cancelación, idiomas (guías bilingües), confirmación rápida, equipo sanitizado.
- Bloque humano: foto + nombre de un asesor real (placeholder) "Tu asesor: [Nombre] — te acompaña en ES/EN".

2) LEADMAGNET (#guia) — captura top-of-funnel:
ES: "¿Viajas pronto a Punta Cana? Descarga la Guía de Clima, Zonas y Empaque 2026 y recibe un 5% en tu primera excursión VIP."
EN: "Traveling to Punta Cana soon? Get the 2026 Weather, Zones & Packing Guide and 5% off your first VIP tour."
Formulario corto (nombre + email + fecha aproximada de viaje) que enviará a GHL (deja el contenedor/hook listo; integración en Prompt 8). Botón coral "Quiero la guía / Get the guide".

3) FAQ (#faq) — accordion limpio (10–12 preguntas), bilingüe. Incluye: ¿vale la pena el VIP?, ¿y si llueve?, ¿es seguro?, ¿tengo que pagar todo ahora?, ¿de qué zonas recogen?, ¿en qué idioma es el tour?, ¿cuánto tardan en confirmar?, ¿puedo pagar en mi moneda? (respuesta: tarifa internacional en USD, tu banco convierte), ¿los niños pagan?, ¿qué llevo?
Responde con diferencia de EXPERIENCIA, no con listas infinitas (ej. VIP = más cómodo, más ágil, menos masivo).

4) FOOTER transaccional (navy): logo, claim "Diseñamos tus viajes, creamos tus memorias / We design your trips, we create your memories", teléfonos +1 809 360 2625 (RD) y +1 704 649 0329 (EE.UU.), email contacto@canavacations.com, WhatsApp, redes (Facebook /canavacationsoficial, Instagram @canavacations), enlace al sitio principal canavacations.com, métodos de pago, oficinas (RD - Aeropuerto Las Américas / Carolina del Norte), © 2017–2026 Cana Vacations, links legales (placeholders).
````

---

## PROMPT 8 — Integración GoHighLevel (reserva, depósito, eventos)

````text
Integra el funnel con GoHighLevel manteniendo la estética (GHL no debe romper el diseño). Implementa:

1) BOOKINGMODAL (slide-over que NO abandona la página): recibe { productId, plan } y muestra el flujo de reserva del plan elegido (sin mezclar Classic/VIP dentro del checkout). Dos modos, configurable por una constante:
   - MODO A (embed): renderiza dentro del modal un <iframe> con el formulario/calendario de GHL (dejaré la URL del embed). Estilízalo para que el contenedor combine con la marca (header navy con nombre del tour + plan + precio).
   - MODO B (custom → webhook): formulario propio de DOS PASOS:
     Paso 1: Nombre, Email, WhatsApp, Hotel/Zona (select con las zonas de pickup), Fecha, Nº de viajeros.
     Paso 2: Resumen + botón "Pagar depósito" que redirige al Stripe/GHL payment link correspondiente a ese productId y plan obtenido desde CONFIG.paymentLinks en src/config.ts.
     El Paso 1 hace POST a un webhook de GHL (dejaré la URL como env var) con todos los campos + productId + plan + idioma + UTMs.
   Tras enviar: pantalla de "¡Gracias! Te confirmamos por WhatsApp en minutos" con el mismo estilo.

2) WHATSAPP con contexto: el helper buildWhatsAppLink ya existe; en el modal y en los CTAs de plan, prearma el mensaje con producto + plan + fecha si está disponible.

3) EVENTOS dataLayer (para Meta Pixel / Google) en: view_content (carga), select_plan (clic en plan), start_booking (abre modal), submit_lead (paso 1), whatsapp_click, deposit_click. Deja window.dataLayer.push listo; comenta dónde irían los IDs de píxel.

4) LEAD MAGNET: conecta su formulario al mismo webhook de GHL (tag "lead-magnet").

5) CONFIGURACIÓN CENTRALIZADA: Crea y configura el archivo `src/config.ts` con todos los parámetros del sitio, especialmente mapeando los links de pago reales de Cana Vacations (los de dominio app.canavacations.com deben usarse directamente):

```typescript
export const CONFIG = {
  whatsappNumber: '+18093602625',
  whatsappNumberUS: '+17046490329',
  ghlWebhookUrl: process.env.VITE_GHL_WEBHOOK_URL || '',
  pixelId: 'YOUR_PIXEL_ID_HERE',
  paymentLinks: {
    saona: {
      classic: 'https://app.canavacations.com/payment-link/6a3c041b9b12592b3682449d',
      vip: 'https://app.canavacations.com/payment-link/6a3c04359b12592b3682449e'
    },
    buggy: {
      classic: 'https://app.canavacations.com/payment-link/6a3c054e9b12592b368244a5',
      vip: 'https://app.canavacations.com/payment-link/6a3c0570390a6e280643a66c'
    },
    party: {
      classic: 'https://app.canavacations.com/payment-link/6a3c06269b12592b368244aa',
      vip: 'https://app.canavacations.com/payment-link/6a3c0648390a6e280643a674'
    },
    'santo-domingo': {
      classic: 'https://app.canavacations.com/payment-link/6a3c078f9b12592b368244ba',
      vip: 'https://app.canavacations.com/payment-link/6a3c08129b12592b368244bf'
    }
  }
};
```
````

**Notas de configuración en GHL (lo que harás tú dentro de GHL):**
1. Crea un **Workflow** con trigger *Inbound Webhook* → copia esa URL a `src/config.ts`.
2. Crea un **Form/Survey** o **Calendar** de GHL si usas MODO A → copia el embed URL.
3. Se han configurado los **payment links** de depósito ($15–25) reales para cada producto y plan directamente en `src/config.ts`. Si hay problemas de dominio temporal, estos se mantendrán para cuando el dominio esté operativo.
4. Automatizaciones: (a) mensaje WhatsApp inmediato, (b) **carrito abandonado** a los 15 min si hizo Paso 1 sin pagar, (c) recordatorio de pickup 24h antes, (d) solicitud de reseña 24h después.

---

## PROMPT 9 — QA final: rendimiento, responsive, accesibilidad, i18n

````text
Haz una pasada final de calidad sobre toda la landing:
- PERFORMANCE (Core Web Vitals): verifica LCP<2.5s (hero con poster + preload de la imagen/poster, video diferido), CLS<0.1 (todas las imágenes con width/height, sin saltos de fuente: font-display swap + tamaños reservados), INP<200ms (sin handlers pesados; lazy de secciones bajo el fold con IntersectionObserver/dynamic import). Comprime imágenes a webp/avif.
- RESPONSIVE: revisa 360px, 768px, 1280px. En mobile: comparador de planes apilado con VIP primero; sticky CTA visible; tap targets ≥44px.
- ACCESIBILIDAD (WCAG AA): contraste de coral sobre navy y sobre blanco (ajusta si no pasa), foco visible, alt text en todas las imágenes, aria-labels en botones de ícono, navegación por teclado en navbar/modal/accordion, role y focus-trap en modales.
- I18N: confirma que NINGÚN texto está hardcodeado, que el toggle ES/EN cambia todo (incluidos aria-labels y mensajes de WhatsApp), y que el idioma persiste.
- SEO básico: title/description bilingües, og:tags, lang dinámico en <html>, datos estructurados de "TouristTrip"/"Product" para cada tour.
Entrégame un checklist de lo que pasó y lo que ajustaste.
````

---

## Resumen del flujo de conversión que construyen estos prompts

Hero (sueña + ubica + destraba) → Selector de 4 → Confianza/prueba social → 4 productos con comparador **Classic vs VIP** (ancla de precio + decoy) → banners de otros servicios (salida a canavacations.com) → logística sin fricción → lead magnet → FAQ → footer. **Cierre por GHL/Stripe (depósito)**, **WhatsApp como concierge** y **sticky CTA** siempre presente. Todo bilingüe ES/EN con copy asimétrico (EN = estatus/FOMO, ES = calidez/confianza).
