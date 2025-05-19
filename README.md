
# Juego de Memoria

Un juego interactivo de memoria desarrollado con React y Next.js donde los jugadores deben encontrar todas las parejas de cartas iguales en el menor tiempo y con la menor cantidad de movimientos posibles.

![Juego de Memoria](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HGnmRY8NnSBkN7HZy5J2ASUgs5NuHX.png)

## Características

### Funcionalidades principales

- ✅ Tablero dinámico con cartas ocultas (4x4, 5x4 o 6x6 según dificultad)
- ✅ Cartas que se voltean al hacer clic
- ✅ Cartas coincidentes permanecen descubiertas
- ✅ Cartas no coincidentes vuelven a ocultarse tras un breve lapso
- ✅ Contador de movimientos realizados
- ✅ Temporizador en pantalla
- ✅ Botones para iniciar, reiniciar y terminar el juego

### Características adicionales

- ✅ Niveles de dificultad (fácil, medio, difícil) que cambian el tamaño del tablero
- ✅ Animaciones suaves al voltear las cartas usando Framer Motion
- ✅ Sistema de puntuación basado en tiempo y movimientos
- ✅ Efectos de sonido para mejorar la experiencia
- ✅ Efectos visuales como confeti al completar el juego
- ✅ Diseño responsivo que se adapta a diferentes tamaños de pantalla

## Tecnologías utilizadas

- [Next.js](https://nextjs.org/) - Framework de React
- [React](https://reactjs.org/) - Biblioteca JavaScript para construir interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca para animaciones
- [Shadcn/UI](https://ui.shadcn.com/) - Componentes de UI reutilizables
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) - Efectos visuales de confeti

## Instalación

1. Clona este repositorio:<br>
   bash<br>
   git clone <https://github.com/Rumaldo24/memory-game.git><br>
   cd memory-game
   
3. Instala las dependencias:<br>
   bash<br>
   npm install

4. Inicia el servidor de desarrollo:<br>
   bash<br>
   npm run dev

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el juego.

## Cómo jugar

1. **Selecciona un nivel de dificultad**:
   - **Fácil**: Tablero 4x4 con 8 pares de cartas
   - **Medio**: Tablero 5x4 con 10 pares de cartas
   - **Difícil**: Tablero 6x6 con 18 pares de cartas

2. **Haz clic en "Iniciar Juego"** para comenzar la partida.

3. **Encuentra las parejas**:
   - Haz clic en una carta para voltearla
   - Haz clic en otra carta para intentar encontrar su pareja
   - Si las cartas coinciden, permanecerán volteadas
   - Si no coinciden, volverán a ocultarse

4. **Objetivo**: Encontrar todas las parejas en el menor tiempo posible y con la menor cantidad de movimientos.

5. **Controles**:
   - **Reiniciar**: Comienza una nueva partida con el mismo nivel de dificultad
   - **Terminar**: Finaliza la partida actual y vuelve a la pantalla de inicio

6. **Puntuación**:
   - Tu puntuación se calcula en base al tiempo transcurrido y la cantidad de movimientos
   - A menor tiempo y menos movimientos, mayor puntuación
   - La dificultad también afecta a la puntuación (mayor dificultad = mayor puntuación base)

## Personalización

### Añadir nuevos sonidos

1. Coloca los archivos de sonido en el directorio `public/sounds/`
2. Modifica el componente `memory-game.tsx` para usar los nuevos sonidos

### Cambiar los emojis de las cartas

Modifica el array `emojis` en el archivo `lib/game-utils.ts` para usar diferentes emojis o símbolos.

## Licencia

**AVISO IMPORTANTE: TODOS LOS DERECHOS RESERVADOS**

Este software y su código fuente están protegidos por derechos de autor. Está estrictamente prohibida su distribución, reproducción, modificación, uso comercial o cualquier otro uso sin la autorización expresa y por escrito del propietario.

Cualquier uso no autorizado de este software constituye una violación de los derechos de propiedad intelectual y puede resultar en acciones legales.

Si desea obtener permiso para utilizar, modificar o distribuir este software, debe comunicarse directamente con el propietario a través del siguiente correo electrónico:

📩 **Contacto**: [rumaldorv.11@outlook.com](mailto:rumaldorv.11@outlook.com)

© 2024 Todos los derechos reservados.
