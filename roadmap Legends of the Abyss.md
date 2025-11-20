# Roadmap de Versiones – Legends of the Abyss

Este documento define el plan completo de versiones usando *Semantic Versioning (SemVer)* para tu juego estilo **Vampire Survivors** desarrollado en Godot.

---

## 📌 Estado Actual — **0.5.0**
Funcionalidades ya implementadas:
- Jugador con 2 ataques y movimiento.
- Sistema simple de nivel/experiencia (aún sin efectos en stats, daño o armas).
- 2 enemigos melee y 2 a distancia.
- Mapa estático 5000x5000.
- 3 NPC aliado: curador, bonificador, vendedor.
- 6 ítems comerciables por oro.
- Oro como recurso principal.
- Sistema de inventario.
- Pausa básica.
- Pantalla de Game Over funcional.
- Generador de oleadas con escalado de estadísticas al avanzar de oleada.
- Menú principal básico.
- Música de fondo y efectos de sonido implementados.

---

## 🟩 **0.6.0 – Sistema de Progresión del Jugador (PARCIAL)**
Características a implementar:
*(Nota: el sistema de nivel/experiencia ya existe, pero aún no afecta estadísticas ni armas)*
- Sistema de experiencia.
- Subida de nivel.
- Mejoras de armas y estadísticas.
- Pantalla de selección de mejoras (tipo VS).
- Balance inicial del juego.

**Parches**:
- `0.6.1` Ajustes de XP y stats.
- `0.6.2` Corrección de bugs del sistema de progreso.

---

## 🟩 **0.7.0 – UI Completa y Menús**
Características:
- Menú de pausa completo (opciones, sonido, controles).
- Menú principal funcional.
- Pantalla de Game Over.
- Opciones gráficas simples.
- Interfaz coherente y estética definida.

**Parches**:
- `0.7.1` Correcciones UI.
- `0.7.2` Mejoras de navegación y control.

---

## 🟩 **0.8.0 – Sistema de Hordas y Escalado (parcialmente implementado)****
Características:
- Generador de oleadas.
- Escalado de dificultad por minuto.
- Nuevos enemigos (2–4 tipos adicionales).
- Mini-jefe simple.

**Parches**:
- `0.8.1` Ajustes de dificultad.
- `0.8.2` Corrección de bugs de IA.

---

## 🟩 **0.9.0 – Contenido Base Completo**
Contenido ampliado:
- 10–12 ítems totales.
- 4–6 armas jugables.
- 6–8 tipos de enemigos.
- 1 boss completo.
- Mapa con arte mejorado.
- Reemplazo de sprites "chibi" por estética final.

**Parches**:
- `0.9.1` Correcciones visuales.
- `0.9.2` Ajustes de balance.

---

## 🟧 **0.10.0 – Beta de Calidad**
Enfoque en pulido:
- Optimización del rendimiento.
- Música y efectos sonoros finales.
- Loot mejorado (tablas de drop).
- Ajustes UX / accesibilidad.
- Preparación para primera demo pública.

**Parches**:
- `0.10.1` Optimización FPS.
- `0.10.2` Corrección de bugs de combate.

---

# 🟥 **1.0.0 – Versión Final / Lanzamiento**
El juego debe incluir:
- Arte final completo.
- 1–2 bosses.
- 10+ enemigos.
- 6+ armas.
- 12+ ítems.
- NPCs funcionando perfectamente.
- Menús completos.
- Gameplay de 20–30 minutos.
- Balance sólido.

---

# 🚀 Post-Lanzamiento

## 🔵 **1.1.0 – Mapa Procedural**
- Implementación completa del nuevo mapa procedural.
- Sistema de biomas generados por seed.
- Spawns dinámicos de enemigos y loot.
- Optimización de generación y streaming.

## 🔵 **1.2.0 – Creador de Personajes (estilo Terraria)**
- Sistema para crear tu propio personaje.
- Personalización de cuerpo, ropa y colores.
- Guardado de presets de personaje.
- Compatibilidad con animaciones y armaduras.

## 🔵 **1.3.0 – Nuevas Armas y Nuevos Biomas**
- Nuevas armas y evoluciones avanzadas.
- Introducción de nuevos biomas.
- Enemigos temáticos por bioma.
- Ajustes de balance para la nueva variedad.

### Parches continuos → `1.1.1`, `1.1.2`, etc.


> Nota: En versiones futuras planificar **implementación de mapa procedural** (reemplazo del mapa fijo actual). Esto incluye:
> - Diseño del algoritmo procedural (biomas, spawn points, zonas seguras).
> - Sistemas de generación de loot y enemigos por región.
> - Ajustes de rendimiento y streaming de tiles.
> - Herramientas internas para testeo y reproducción de seeds.

---

