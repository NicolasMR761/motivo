# PRD — MOTivo
**Product Requirements Document**
Versión 1.0

---

## 1. Visión del producto

MOTivo existe para que ninguna persona en Colombia tenga que comprar una moto a ciegas.

Hoy, elegir una moto depende de lo que diga el vendedor del concesionario, un video de YouTube, o el cuñado que "sabe de motos". No existe un lugar neutral que entienda el contexto real de una persona —su presupuesto, su experiencia, para qué la va a usar— y le diga con claridad qué moto le conviene y por qué.

MOTivo es ese lugar. No vendemos motos, no mostramos un catálogo para que el usuario se pierda comparando specs: le hacemos las preguntas correctas y le damos una respuesta clara, honesta y explicada, como lo haría un amigo experto en motos que no tiene ningún interés comercial en la respuesta.

La visión de largo plazo es que MOTivo se convierta en el paso obligatorio antes de comprar una moto en Colombia — de la misma forma en que hoy nadie compra un vuelo sin pasar por un comparador, nadie debería comprar una moto sin pasar por un asesor confiable.

---

## 2. Problema que resuelve

**El problema no es falta de información. Es exceso de información sin criterio.**

Una persona que quiere comprar su primera moto —o cambiar la que tiene— enfrenta:

- Decenas de modelos, marcas y versiones, con specs técnicas que no sabe interpretar.
- Vendedores cuyo incentivo es vender lo que tienen en inventario, no lo que más le conviene al comprador.
- Información dispersa y contradictoria entre foros, redes sociales y videos, sin ninguna estructura ni forma de comparar sus propias necesidades contra los datos.
- Ningún lugar que traduzca "tengo $8 millones, la necesito para trabajar en domicilios y nunca he manejado moto" en una respuesta concreta y justificada.

El resultado: la gente compra motos que no le sirven, se arrepiente, gasta más de lo necesario, o termina eligiendo por presión social en vez de necesidad real.

MOTivo resuelve esto convirtiendo una decisión confusa y llena de sesgos comerciales en una recomendación clara, explicada y centrada exclusivamente en el usuario.

---

## 3. Público objetivo

**Perfil primario — Comprador de primera moto o moto de trabajo:**
Personas en Colombia, principalmente entre 18 y 40 años, que están considerando comprar su primera moto o reemplazar la actual, muchas veces con un uso ligado al sustento diario (domicilios, transporte al trabajo, movilidad urbana). Tienen presupuesto limitado y definido, poca o ninguna experiencia técnica sobre motocicletas, y buscan tomar una decisión segura sin sentirse manipulados por un vendedor.

**Perfil secundario — Comprador experimentado buscando su siguiente moto:**
Personas que ya han tenido una o más motos y buscan actualizar (por ejemplo, pasar de una moto urbana a una de mayor cilindraje, o a una categoría distinta como adventure o naked). Tienen más criterio propio, pero valoran una segunda opinión estructurada y objetiva antes de una compra de mayor valor.

**Lo que NO es nuestro público inicial:**
Coleccionistas, motociclistas de alta gama o de nicho (motos de competencia, importadas de lujo), y compradores corporativos/flotas. Estos segmentos pueden explorarse en el futuro, pero no son el foco del MVP.

---

## 4. Objetivos del MVP

El MVP tiene un único objetivo central: **validar que una recomendación explicada genera más confianza y mejores decisiones que un catálogo tradicional.**

Objetivos específicos:

1. Que un usuario pueda completar un cuestionario corto y recibir una recomendación de moto en menos de 2 minutos, sin fricción ni registro previo.
2. Que la recomendación se sienta acertada y bien justificada, no genérica — medido por el comportamiento del usuario (ver sección 8), no solo por percepción.
3. Validar que las personas confían lo suficiente en la recomendación como para dar el siguiente paso (contactar un concesionario, guardar el resultado, compartirlo).
4. Generar el primer conjunto de datos reales de comportamiento (qué preguntas responde la gente, en qué parte abandona, qué recomendaciones genera más interés) para guiar la siguiente fase del producto.
5. Establecer a MOTivo como una fuente confiable y neutral, no como un vendedor más — esto es una decisión de producto, no solo de marketing: cada interacción debe reforzar esa percepción.

---

## 5. Qué NO hará el MVP

Ser explícitos aquí es tan importante como definir qué sí construimos.

- **No será un catálogo navegable.** No habrá una sección para "explorar todas las motos" con filtros libres. El único camino para ver una moto recomendada es a través del cuestionario.
- **No venderá motos directamente ni procesará pagos.** MOTivo asesora; no es una tienda ni un marketplace.
- **No requerirá registro ni login para recibir una recomendación.** El valor se entrega primero; cualquier dato de contacto se pide después, y de forma opcional.
- **No tendrá comparador tradicional lado a lado.** El usuario no arma su propia comparación manual de specs; el sistema decide y explica, no delega esa carga cognitiva de vuelta al usuario.
- **No incluirá foro, comunidad, reseñas de usuarios ni contenido generado por terceros.** Eso introduce ruido y opiniones no verificadas, justo lo que MOTivo busca reemplazar con criterio estructurado.
- **No tendrá aplicación móvil nativa.** El producto vive en la web, optimizado para uso móvil vía navegador.
- **No incluirá financiamiento, seguros ni trámites de compra.** Puede ser parte del roadmap futuro, pero no valida la hipótesis central del MVP.
- **No personalizará la recomendación con historial de usuario ni cuentas guardadas.** Cada sesión es independiente en esta fase.

---

## 6. Funcionalidades principales

**6.1. Cuestionario de perfil de usuario**
Una serie corta de preguntas que capturan lo esencial para recomendar bien: presupuesto disponible, uso principal (trabajo/domicilios, movilidad urbana, viajes, mixto), experiencia previa manejando moto, y prioridades personales (ahorro en mantenimiento, comodidad, potencia, facilidad de reventa). El cuestionario debe sentirse corto y conversacional, nunca como un formulario largo y burocrático.

**6.2. Motor de recomendación**
El núcleo del producto. A partir de las respuestas del usuario, selecciona y ordena las motos más adecuadas del catálogo, priorizando ajuste real a la necesidad declarada por encima de popularidad o margen comercial.

**6.3. Resultado explicado**
La pantalla más importante del producto. Muestra **una recomendación principal claramente destacada**, acompañada de **hasta dos alternativas secundarias**, cada una con una explicación breve de por qué también podría encajar. Esta estructura busca reducir la indecisión del usuario (hay una respuesta clara) sin eliminar su capacidad de elegir (no se le impone una única opción sin alternativa).

Cada recomendación —principal o secundaria— debe incluir, sin excepción, **al menos una limitación o desventaja explícita** (por ejemplo, "es la más económica dentro de tu presupuesto, aunque tiene menor potencia que otras opciones"). Esto no es un detalle de copywriting: es un requisito de producto. Una recomendación sin ninguna desventaja mencionada se siente publicitaria, no asesorada, y rompe la confianza que es la base de MOTivo. Si el sistema no encuentra ninguna limitación genuina que comunicar, es señal de que la explicación no está lo suficientemente elaborada, no de que la moto sea perfecta.

**6.4. Manejo de casos sin match ideal**
Si ninguna moto del catálogo cumple bien el perfil (por ejemplo, presupuesto muy bajo), el sistema lo comunica con honestidad y ofrece la alternativa más cercana posible, explicando explícitamente en qué se aleja del ideal. Nunca se fuerza una recomendación de mala calidad para evitar un resultado vacío.

**6.5. Landing de entrada**
Página simple que comunica la propuesta de valor y lleva directo al cuestionario, sin distraer con navegación ni contenido innecesario en esta fase.

**6.6. Contenido de descubrimiento (SEO)**
Un conjunto pequeño de páginas de contenido (por ejemplo, guías tipo "mejores motos para domicilios en Colombia") que sirven como puerta de entrada orgánica al producto para usuarios que aún no saben que MOTivo existe.

---

## 7. Flujo del usuario

1. El usuario llega a la landing (por búsqueda orgánica, recomendación, o red social) y entiende en segundos qué hace MOTivo.
2. Hace clic en "Empezar" y comienza el cuestionario, sin necesidad de crear cuenta.
3. Responde preguntas breves y progresivas sobre presupuesto, uso, experiencia y prioridades. Puede avanzar y retroceder libremente.
4. Al finalizar, el sistema procesa sus respuestas y presenta el resultado: una recomendación principal claramente destacada, junto con hasta dos alternativas secundarias, cada una con su propia explicación breve. Toda recomendación incluye al menos una limitación o desventaja explícita, para que el usuario entienda no solo por qué le conviene, sino también en qué no es perfecta.
5. El usuario puede, si quiere, ver más detalle de la recomendación principal o de las alternativas (por qué encaja cada una, en qué no es perfecta, qué la diferencia de las demás).
6. El usuario decide su siguiente paso: puede reiniciar el cuestionario con otro perfil, explorar contenido relacionado, o (en fases posteriores) contactar a un concesionario o dejar sus datos para más información.
7. Si el usuario abandona antes de terminar, no se pierde valor de negocio irrecuperable en el MVP: no hay cuenta ni progreso guardado que gestionar, la próxima visita simplemente empieza de nuevo.

Este flujo está diseñado deliberadamente para que el usuario reciba valor real (la recomendación) antes de que se le pida cualquier cosa a cambio.

---

## 8. Métricas de éxito

**Métrica principal (North Star del MVP):**
Tasa de finalización del cuestionario (usuarios que llegan al resultado / usuarios que lo inician). Es el indicador más directo de si el flujo genera suficiente confianza y valor percibido como para completarlo.

**Métricas secundarias de producto:**
- Tasa de abandono por pregunta específica del cuestionario (identifica fricción puntual).
- Tiempo promedio de finalización del cuestionario.
- Tasa de usuarios que, tras ver el resultado, ejecutan una acción de interés (ver más detalle, reiniciar con otro perfil, intentar contacto si esa función ya existe).
- Tasa de rebote en la landing (mide si la propuesta de valor se entiende de inmediato).

**Métricas de validación de confianza (cualitativas, complementarias):**
- Retroalimentación directa recolectada de forma ligera (por ejemplo, una pregunta simple tipo "¿sentiste que esta recomendación tenía sentido para ti?" tras el resultado).
- Volumen y naturaleza de tráfico orgánico entrante a las páginas de contenido SEO, como señal de que el problema que resolvemos realmente se está buscando.

**Métricas de adquisición:**
- Número de sesiones de cuestionario iniciadas por semana.
- Proporción de tráfico orgánico vs. directo/referido, como validación de la estrategia de contenido sin presupuesto de marketing.

No se define en el MVP ninguna métrica de monetización directa (conversión a venta, comisión, etc.) porque el MVP no está diseñado todavía para capturar ese valor — está diseñado para validar que la recomendación genera confianza suficiente para, más adelante, construir el modelo de negocio sobre esa confianza.

---

## 9. Riesgos

**Riesgo de calidad de recomendación.**
Si la recomendación se siente genérica, obvia o desconectada de lo que el usuario realmente necesita, se pierde la propuesta de valor central del producto de forma inmediata. Mitigación: catálogo inicial curado con cuidado, y revisión manual constante de recomendaciones reales generadas durante los primeros usuarios.

**Riesgo de confianza percibida.**
Si el usuario sospecha que la recomendación está sesgada hacia algún interés comercial (aunque no lo esté), se rompe la confianza que es la base de todo el producto. Mitigación: transparencia explícita en cada explicación, y ausencia total de contenido patrocinado no declarado en el MVP.

**Riesgo de calidad y vigencia de datos del catálogo.**
Los precios y disponibilidad de motos en Colombia cambian con frecuencia. Un dato desactualizado puede generar una recomendación que se sienta errónea o poco confiable. Mitigación: proceso definido de actualización manual periódica del catálogo durante el MVP, antes de automatizar esta parte.

**Riesgo de adquisición sin presupuesto.**
Sin inversión en marketing, el crecimiento depende casi enteramente de SEO y recomendación orgánica, lo cual es lento por naturaleza. Mitigación: apostar desde el día 1 por contenido de descubrimiento genuinamente útil, no solo optimizado para buscadores.

**Riesgo de expectativas desalineadas del usuario.**
Algunos usuarios pueden esperar un catálogo o un comparador tradicional, y confundirse con un flujo que no les permite "buscar libremente". Mitigación: comunicación clara desde la landing sobre qué es y qué no es MOTivo.

**Riesgo de alcance (scope creep).**
La tentación de agregar comparador, foro, cuentas de usuario o catálogo navegable "para no perder usuarios que buscan eso" puede diluir la propuesta de valor central antes de validarla. Mitigación: disciplina estricta sobre la sección 5 de este documento.

---

## 10. Roadmap futuro

**Fase posterior 1 — Cerrar el loop de confianza**
Permitir que el usuario le diga a MOTivo si terminó comprando la moto recomendada (o no, y por qué). Esto no solo mejora el producto, es la base de datos que permite validar si las recomendaciones realmente se traducen en mejores decisiones reales, no solo percibidas.

**Fase posterior 2 — Monetización vía intención de compra**
Conectar al usuario, con su consentimiento explícito, con concesionarios o financieras relevantes a su recomendación. Aquí es donde probablemente viva el modelo de negocio real, una vez validada la confianza del usuario en el producto.

**Fase posterior 3 — Contenido y educación**
Expandir las guías de descubrimiento hacia contenido educativo más profundo (costos reales de mantenimiento por modelo, comparativas de consumo, guías de primera compra), reforzando a MOTivo como autoridad neutral del tema, no solo como herramienta puntual.

**Fase posterior 4 — Cuenta de usuario y seguimiento**
Permitir guardar resultados, comparar sesiones anteriores, y recibir alertas cuando cambie el precio o disponibilidad de la moto que le interesó. Este paso solo se justifica una vez que exista evidencia de que los usuarios regresan al producto más de una vez.

**Fase posterior 5 — Ampliación de perfil de usuario**
Explorar segmentos actualmente fuera de foco (motociclistas experimentados de nicho, compradores corporativos/flotas), solo si el mercado inicial valida el modelo y existe demanda real identificada, no supuesta.

**Fase posterior 6 — Inteligencia adaptativa**
Con suficiente historial de sesiones y resultados reales de compra, evolucionar el motor de recomendación de un sistema de reglas explicables a un sistema más sofisticado, manteniendo siempre como requisito no negociable que toda recomendación siga siendo explicable para el usuario.

---

*Este documento define el producto, no la implementación. Cualquier decisión técnica o de arquitectura debe subordinarse a lo aquí definido, no al revés.*
