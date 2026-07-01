# PROJECT_RULES.md

**Asesor Digital de Motos — Manual Interno de Ingeniería**
Versión 1.0 — Documento vivo. Toda excepción a estas reglas debe justificarse por escrito en el Pull Request correspondiente.

Este documento es la fuente de verdad del proyecto. Ante cualquier duda técnica, esta es la referencia que prevalece sobre preferencias personales, tendencias de la industria o hábitos de otros proyectos.

---

## 1. Filosofía del producto

1.1. Este NO es un catálogo de motos. Es un asesor de decisión. Cualquier feature que se sienta como "agregar un filtro más" debe cuestionarse: ¿ayuda a decidir, o solo ayuda a buscar?

1.2. Toda recomendación debe ser explicable. Está prohibido mostrar un resultado sin una razón estructurada detrás. Si el sistema no puede explicar por qué recomienda una moto, no debe recomendarla.

1.3. El usuario recibe valor antes de dar datos personales. Ninguna feature del flujo principal puede exigir registro, email o teléfono antes de mostrar la recomendación.

1.4. Se prioriza la confianza sobre la conversión agresiva. No se implementan patrones de diseño manipulativos (dark patterns), urgencia falsa, ni comparaciones sesgadas hacia un tercero que pague por posicionamiento, sin que esto se declare explícitamente al usuario.

1.5. Cada decisión de producto debe poder responder: "¿esto ayuda a alguien a elegir mejor su moto, o solo se ve bien en una demo?"

---

## 2. Principios de arquitectura

2.1. **El dominio no depende de la infraestructura.** La lógica de recomendación (`recommendation-engine`) no importa Next.js, Prisma, ni ningún SDK externo. Se comunica con el resto del sistema únicamente a través de tipos definidos por el propio dominio.

2.2. **Los datos entran validados o no entran.** Ningún dato cruza un límite de módulo (API → dominio, DB → dominio) sin pasar por un esquema Zod o un mapeo explícito.

2.3. **Explicación es dato, no texto libre.** El "por qué" de una recomendación se modela como una estructura (`RecommendationExplanation`), nunca como un string generado ad-hoc dentro de un componente.

2.4. **Repository pattern para todo acceso a datos.** Ningún módulo de dominio ni de UI llama a Prisma directamente. Siempre a través de un repositorio (`lib/catalog/motorcycle-repository.ts` y equivalentes).

2.5. **Strategy pattern para algoritmos.** Cualquier lógica de scoring o ranking se implementa detrás de una interfaz (`ScoringStrategy`), nunca como una función monolítica con `if/else` acoplada al resto del sistema.

2.6. **No se introduce infraestructura para problemas que no existen todavía.** Colas de mensajes, microservicios, caché distribuida, arquitectura de eventos: prohibidos hasta que exista evidencia medible (no intuición) de que se necesitan.

2.7. **Toda excepción a la arquitectura definida requiere justificación escrita en el PR.** No se aceptan cambios de arquitectura "silenciosos".

---

## 3. Convenciones de nombres

3.1. Archivos y carpetas: `kebab-case` (`motorcycle-repository.ts`, `questionnaire-form/`).

3.2. Componentes React: `PascalCase` (`ResultCard.tsx`), y el nombre del archivo coincide exactamente con el nombre exportado.

3.3. Funciones y variables: `camelCase`. Prohibido usar abreviaciones ambiguas (`calc`, `proc`, `mgr`); se prefiere claridad sobre brevedad (`calculateMotorcycleScore`, no `calcScore`).

3.4. Tipos e interfaces: `PascalCase`, sin prefijo `I` (`UserProfile`, no `IUserProfile`).

3.5. Constantes globales: `SCREAMING_SNAKE_CASE` (`MAX_BUDGET_COP`).

3.6. Booleanos: siempre con prefijo semántico (`isEligible`, `hasEnoughBudget`, `canRecommend`), nunca nombres ambiguos (`flag`, `check`).

3.7. Nombres de rutas y endpoints en inglés técnico interno (`/api/recommendations`), pero todo copy visible al usuario en español de Colombia, natural y sin tecnicismos.

3.8. Prohibido usar nombres genéricos sin contexto (`data`, `info`, `item`, `temp`, `handleClick2`) en código que se integre a `main`.

---

## 4. Organización de carpetas

4.1. La estructura de carpetas definida en el documento de arquitectura es obligatoria y no se modifica sin discusión explícita documentada.

4.2. `lib/recommendation-engine/` no importa nada de `app/` ni de `lib/db/`. Esta regla se verifica en cada PR que la toque.

4.3. Cada módulo de `lib/` es responsable de un solo dominio de negocio (catálogo, cuestionario, motor de recomendación, autenticación). Ningún archivo mezcla responsabilidades de más de un dominio.

4.4. Los componentes de UI compartidos van en `components/ui/` (shadcn) y `components/` (propios). Componentes específicos de una sola pantalla viven junto a esa pantalla, no en la carpeta compartida.

4.5. Prohibido crear carpetas `utils/` o `helpers/` genéricas sin nombre de dominio. Toda función utilitaria pertenece a un dominio identificable.

---

## 5. Estilo de código

5.1. Funciones puras siempre que sea posible, especialmente en `recommendation-engine`. Efectos secundarios (DB, red, fecha actual, random) se aíslan en los bordes del sistema, nunca dentro de la lógica de negocio.

5.2. Máximo de responsabilidad única por función: si una función necesita un comentario tipo "// ahora hacemos X" para separar bloques internos, probablemente debe dividirse en dos funciones.

5.3. Longitud de función orientativa: si supera ~40 líneas, se revisa si debe descomponerse. No es una regla dura, es una señal de alerta.

5.4. Prohibido el anidamiento profundo (`if` dentro de `if` dentro de `if`). Se prefiere retorno temprano (early return / guard clauses).

5.5. Comentarios explican el **por qué**, no el qué. Si el código necesita un comentario para explicar qué hace, probablemente necesita un mejor nombre, no un comentario.

5.6. Prohibido dejar código comentado ("por si acaso") en commits a `main`. Para eso existe el historial de Git.

5.7. Formateo automático vía Prettier, sin discusión manual de estilo en revisiones de código. Si Prettier lo permite, no se debate en el PR.

---

## 6. Manejo de errores

6.1. Prohibido `throw new Error("algo salió mal")` genérico. Todo error de dominio usa clases tipadas (`ValidationError`, `RecommendationError`, `NotFoundError`, etc.), definidas en `lib/errors/`.

6.2. Toda función que pueda fallar de forma esperada (no un bug, sino un caso de negocio: "no hay motos que cumplan el perfil") debe modelar ese caso explícitamente en su tipo de retorno, no lanzar una excepción para flujo de control normal.

6.3. Los Route Handlers son responsables de traducir errores de dominio a respuestas HTTP con código y mensaje adecuados. La lógica de negocio nunca conoce el concepto de "status code".

6.4. Todo error no controlado en producción se reporta a Sentry con contexto suficiente para reproducirlo (qué endpoint, qué input relevante, sin datos sensibles).

6.5. Los mensajes de error mostrados al usuario final son siempre humanos y accionables ("No encontramos motos dentro de tu presupuesto, prueba ajustándolo"), nunca stack traces ni mensajes técnicos.

---

## 7. Validaciones

7.1. Todo input externo (formulario, API, query params) se valida con Zod antes de tocar cualquier lógica de negocio. Sin excepciones.

7.2. Los esquemas Zod viven junto al dominio al que pertenecen (`lib/questionnaire/schemas.ts`), no dispersos en componentes.

7.3. La validación de negocio (ej. "el presupuesto mínimo para cualquier moto es X") vive en el dominio, no en el esquema de validación de forma. El esquema Zod valida forma y tipo; el dominio valida reglas de negocio.

7.4. Nunca se confía únicamente en validación de cliente. Toda validación de cliente es una mejora de UX, no una medida de seguridad ni de integridad de datos.

---

## 8. TypeScript

8.1. `strict: true` en `tsconfig.json`, sin excepciones ni desactivaciones parciales.

8.2. Prohibido el uso de `any`. Si el tipo es genuinamente desconocido, se usa `unknown` y se estrecha explícitamente.

8.3. Prohibido `as` para forzar tipos sin justificación. Si es necesario, se documenta por qué con un comentario junto a la línea.

8.4. Los tipos del dominio (`UserProfile`, `Motorcycle`, `ScoredMotorcycle`) son la fuente de verdad. Los tipos generados por Prisma se mapean a estos tipos en la capa de repositorio; no se filtran directamente a la UI ni al dominio.

8.5. Se prefieren `type` para uniones y composición, `interface` para formas de objetos extensibles (contratos de repositorios, estrategias). Consistencia dentro de cada módulo es más importante que la regla en sí.

8.6. Los tipos se exportan desde un único punto por módulo (`types.ts` o `index.ts`), no se duplican entre archivos.

---

## 9. Componentes React

9.1. Server Components por defecto. Un componente se marca `"use client"` únicamente cuando necesita interactividad, estado o efectos del navegador, y esa necesidad se justifica.

9.2. Componentes de presentación (UI pura) separados de componentes de datos (que hacen fetching o reciben props complejas). Un componente no mezcla "traer datos" con "verse bonito".

9.3. Props tipadas explícitamente, nunca `any` ni props implícitas por desestructuración sin tipo.

9.4. Prohibido lógica de negocio dentro de componentes. Un componente puede llamar a una función del dominio, pero no puede reimplementar reglas de scoring, validación o formato de datos crítico dentro de su propio cuerpo.

9.5. Componentes de shadcn/ui se instalan solo cuando se van a usar en un sprint activo. No se pre-instala el catálogo completo "por si acaso".

9.6. Nombres de componentes describen qué muestran, no cómo se ven (`RecommendationCard`, no `BlueBoxWithShadow`).

---

## 10. Accesibilidad

10.1. Todo el flujo del cuestionario debe ser completable con teclado, sin depender del mouse.

10.2. Todo elemento interactivo tiene estado de foco visible. Prohibido remover `outline` sin reemplazo accesible equivalente.

10.3. Imágenes de motos llevan `alt` descriptivo real (marca, modelo, categoría), nunca vacío ni genérico ("imagen", "moto").

10.4. Contraste de color cumple mínimo WCAG AA en todo texto y componente interactivo.

10.5. Formularios usan `label` asociado correctamente a cada input; ningún campo depende solo de `placeholder` como etiqueta.

10.6. Auditoría de accesibilidad (Lighthouse/axe) obligatoria antes de cada release que toque el flujo del cuestionario o resultados.

---

## 11. SEO

11.1. Toda página pública tiene metadata explícita (title, description, Open Graph) definida vía la Metadata API de Next.js, nunca dejada por defecto.

11.2. Las páginas de contenido SEO (comparativas, guías) se generan a partir de datos reales del catálogo y del motor de recomendación, nunca como texto genérico desconectado del sistema.

11.3. `sitemap.xml` y `robots.txt` se generan de forma automática y se mantienen sincronizados con las rutas reales del proyecto, nunca mantenidos a mano.

11.4. Las páginas de resultado de sesión (personalizadas por usuario) no se indexan. Las páginas de contenido general sí.

11.5. Se usa marcado estructurado (`schema.org`) donde aplique (`Product`, `FAQPage`), siempre reflejando datos reales.

---

## 12. Performance

12.1. `next/image` es obligatorio para toda imagen de moto o contenido visual; prohibido usar `<img>` sin justificación explícita.

12.2. Páginas de contenido y catálogo usan ISR (Incremental Static Regeneration); no se recalculan en cada request si el dato no cambia con esa frecuencia.

12.3. No se agrega una dependencia de JavaScript al cliente para resolver algo que puede resolverse en el servidor.

12.4. Toda nueva feature que afecte el flujo del cuestionario o resultados se valida contra Core Web Vitals antes de mergear a `main`.

12.5. No se optimiza prematuramente: no se introduce caché, memoización agresiva ni lazy loading complejo sin evidencia de que el rendimiento actual es insuficiente.

---

## 13. Testing

13.1. `recommendation-engine` es el módulo con mayor exigencia de cobertura de tests unitarios del proyecto, por ser el activo central del producto. Todo cambio en su lógica requiere test que lo respalde.

13.2. Se testean casos límite de negocio explícitamente: presupuesto insuficiente, catálogo vacío, empate de scores, perfil incompleto.

13.3. Tests E2E (Playwright) cubren únicamente los flujos críticos de negocio (completar cuestionario, ver resultado, manejo de error de input), no cada micro-interacción de UI.

13.4. No se persigue cobertura de código como métrica de vanidad. Se testea lo que más cuesta si falla, no todo por igual.

13.5. Ningún PR que modifique `recommendation-engine`, `catalog` o `questionnaire` se aprueba sin tests actualizados o justificación explícita de por qué no aplica.

---

## 14. Git

14.1. `main` está siempre en estado desplegable. Nunca se commitea directamente código roto a `main`.

14.2. Todo trabajo se hace en rama, con nombre descriptivo con prefijo de tipo: `feature/`, `fix/`, `chore/`, `refactor/` (ej. `feature/questionnaire-budget-step`).

14.3. Ninguna rama vive más de lo necesario para completar un sprint. Ramas de larga duración son señal de que el sprint fue mal dimensionado.

14.4. Prohibido `git push --force` sobre `main`. Sobre ramas propias, permitido con criterio.

---

## 15. Commits

15.1. Conventional Commits obligatorio: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, `style:`.

15.2. Cada commit representa una unidad de cambio coherente y funcional, no un checkpoint arbitrario ("wip", "cambios", "arreglos varios" están prohibidos como mensajes).

15.3. El cuerpo del commit explica el **por qué** del cambio cuando no es obvio desde el título, especialmente en cambios de arquitectura o de reglas de negocio.

15.4. No se mezclan cambios de distinta naturaleza en un mismo commit (ej. un `feat` no debe incluir un `refactor` no relacionado).

---

## 16. Pull Requests

16.1. Todo cambio a `main` pasa por PR, incluso trabajando en solitario. Es la disciplina que permite revisar el propio trabajo con distancia.

16.2. Todo PR describe: qué sprint u objetivo resuelve, qué decisión de arquitectura o de negocio implica (si aplica), y cómo se verificó que funciona.

16.3. El pipeline de CI (lint, typecheck, tests) debe pasar en verde antes de mergear. Sin excepciones "solo por esta vez".

16.4. Un PR resuelve un solo objetivo de sprint. PRs que mezclan múltiples objetivos no expresados en el roadmap se dividen.

16.5. Todo PR que se desvíe de la arquitectura definida en este documento debe justificar explícitamente el desvío en la descripción, o no se mergea.

---

## 17. Variables de entorno

17.1. Ninguna variable sensible se hardcodea en el código ni se commitea al repositorio, bajo ninguna circunstancia.

17.2. `.env.local` para desarrollo, nunca versionado. `.env.example` versionado, con todas las claves necesarias documentadas pero sin valores reales.

17.3. Variables de entorno se validan al arranque de la aplicación con un esquema Zod (patrón T3 Env); si falta una variable crítica, el build falla explícitamente.

17.4. Solo se usa el prefijo `NEXT_PUBLIC_` en variables diseñadas deliberadamente para ser expuestas al navegador. Toda otra variable es server-only por defecto.

17.5. Las variables de producción se gestionan exclusivamente desde el dashboard del proveedor de hosting (Vercel), nunca compartidas por canales inseguros (chat, email plano).

---

## 18. Seguridad

18.1. Row Level Security (RLS) activado en Supabase desde la primera tabla creada. Ninguna tabla se expone sin política explícita.

18.2. Todo input de usuario se valida server-side, sin excepción, sin importar que ya haya sido validado en el cliente.

18.3. Rate limiting activo en endpoints públicos expuestos a abuso (especialmente el endpoint de recomendaciones y cualquier formulario de contacto).

18.4. Ninguna credencial, token o clave de servicio se expone en el bundle de cliente. Se verifica explícitamente antes de cada release.

18.5. Los datos personales del usuario (si se recolectan en fases posteriores) se tratan bajo el principio de mínima recolección: solo se pide lo que el producto necesita para funcionar, nunca "por si acaso es útil después".

18.6. Toda dependencia nueva se evalúa también por su superficie de riesgo (mantenimiento activo, popularidad, historial de vulnerabilidades) antes de instalarse.

---

## 19. Dependencias permitidas

19.1. Se permite instalar una dependencia nueva solo si resuelve un problema real del sprint actual, no un problema hipotético futuro.

19.2. Toda dependencia nueva debe cumplir: mantenimiento activo (commits recientes), adopción amplia en la industria, y ausencia de vulnerabilidades conocidas sin parchear.

19.3. Dependencias del stack oficial (ya aprobadas): Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma, Zod, Vitest, Playwright, Supabase SDK, Sentry.

19.4. Cualquier dependencia fuera de esta lista requiere justificación explícita documentada en el PR que la introduce: qué problema resuelve, por qué no se resuelve con el stack actual, y qué alternativas se descartaron.

---

## 20. Dependencias prohibidas

20.1. Prohibido cualquier ORM adicional a Prisma sin discusión formal de migración completa (no se mezclan ORMs).

20.2. Prohibidas librerías de gestión de estado global (Redux, Zustand, Recoil, etc.) mientras el estado del proyecto pueda resolverse con estado local de React y Server Components. Se reevalúa solo si aparece un caso de uso real que lo justifique.

20.3. Prohibidas librerías de UI que dupliquen la función de shadcn/ui (Material UI, Ant Design, Chakra, etc.). Un solo sistema de componentes.

20.4. Prohibidas librerías de utilidades genéricas de gran tamaño (Lodash completo, Moment.js) cuando el problema se resuelve con funciones nativas de JavaScript/TypeScript o utilidades pequeñas y específicas.

20.5. Prohibida cualquier librería de analítica, tracking o publicidad de terceros no evaluada explícitamente por su impacto en privacidad y performance.

20.6. Prohibido instalar frameworks de testing adicionales a Vitest y Playwright. No se fragmenta la estrategia de testing.

---

## 21. Reglas del Decision Engine (motor de recomendación)

21.1. El motor de recomendación no tiene ninguna dependencia de framework, base de datos ni red. Es TypeScript puro, testeable sin infraestructura.

21.2. Toda estrategia de scoring implementa la misma interfaz (`ScoringStrategy`). Cambiar de estrategia (reglas ponderadas → modelo más avanzado → ML futuro) no debe requerir tocar código fuera de `recommendation-engine`.

21.3. Ninguna recomendación se entrega sin su explicación estructurada asociada. Es un requisito funcional, no opcional, no un "nice to have" de UI.

21.4. Los pesos y reglas de scoring viven en un lugar centralizado y documentado dentro del motor, nunca dispersos o hardcodeados en múltiples archivos.

21.5. Todo cambio en la lógica de scoring requiere: test que documente el caso, y una nota breve de por qué se ajustó el peso o la regla (esto construye el historial de decisiones del algoritmo, crítico para auditar recomendaciones futuras).

21.6. El motor nunca recomienda una moto fuera del presupuesto declarado por el usuario, sin excepción, salvo que se comunique explícitamente como "alternativa cercana" y así se etiquete en la explicación.

21.7. Si no existe ninguna moto que cumpla razonablemente el perfil, el sistema lo comunica honestamente. Prohibido forzar una recomendación de baja calidad solo para no mostrar una lista vacía.

---

## 22. Reglas para el catálogo de motos

22.1. Los datos del catálogo se curan manualmente en las fases iniciales del producto. No se hace scraping automatizado sin validación humana de calidad de dato.

22.2. Todo registro de moto debe tener, como mínimo, los campos necesarios para que el motor de recomendación pueda evaluarlo (categoría, precio de referencia, cilindraje, uso recomendado). Un registro incompleto no se publica.

22.3. Los precios se tratan como datos que cambian con frecuencia: se documenta la fecha de última actualización de cada precio, y no se presenta un precio como definitivo o garantizado al usuario.

22.4. El catálogo no admite motos duplicadas ni variantes ambiguas sin diferenciación clara (año, versión, cilindraje) que afecte el criterio de recomendación.

22.5. Ninguna moto se prioriza en el ranking por motivos comerciales (pago de un concesionario, acuerdo comercial) sin que esto se declare explícitamente al usuario como contenido patrocinado, separado del ranking orgánico.

---

## 23. Reglas para cualquier algoritmo futuro

23.1. Todo algoritmo nuevo (scoring más avanzado, modelo de ML, sistema de recomendación colaborativo) debe implementarse como una nueva `ScoringStrategy`, nunca reemplazando ni mezclándose con la lógica existente sin un proceso explícito de migración.

23.2. Ningún algoritmo se despliega a producción sin la capacidad de explicar su resultado de forma estructurada, sin importar su complejidad interna. Si el algoritmo es una caja negra que no puede justificar su output, no cumple con la filosofía del producto (sección 1.2) y no se libera.

23.3. Todo algoritmo nuevo se valida primero contra el conjunto de casos de prueba ya existentes del motor actual, antes de considerarse apto para reemplazar o convivir con la estrategia vigente.

23.4. Ningún algoritmo se entrena o ajusta con datos de usuarios sin que exista una política clara de privacidad y consentimiento informado previamente implementada.

23.5. Los resultados de un algoritmo nuevo se comparan de forma medible (no subjetiva) contra la estrategia anterior antes de convertirse en la estrategia por defecto.

---

*Fin del documento. Este archivo se actualiza solo mediante PR explícito que modifique* `PROJECT_RULES.md`, *nunca por consenso verbal no documentado.*
