# Mi Dieta (Android)

App Android de dieta y calorías personalizadas. La interfaz es una web app local
incluida dentro del propio APK (`app/src/main/assets/www`), cargada en un WebView:
**funciona sin conexión** y sin depender de ninguna página externa.

## Qué hace

- **Perfil**: peso, altura, edad, sexo, días de deporte y objetivo (perder grasa,
  mantener o ganar músculo). Calcula el objetivo diario de calorías con la fórmula
  de Mifflin-St Jeor (orientación general, no consejo médico) y la revisión quincenal
  del peso con gráfica de evolución.
- **Hoy**: desayuno, comida y cena con varias opciones con foto; las cantidades en
  gramos se escalan solas para que las tres comidas sumen tu objetivo (30/40/30).
- **Recetas**: tres recetas de temporada que cambian cada mes, sustituibles por la
  comida correspondiente con un toque.

Los datos (perfil, elecciones y revisiones) se guardan en el propio dispositivo
(localStorage del WebView). Las fotos de los platos son ilustraciones generadas
por IA para esta app.

## Compilar el APK

Cada push a `main` lanza GitHub Actions: compila `app-debug.apk` y publica una
Release nueva (`v0.1.N`) con el APK listo para descargar e instalar.

Para compilarlo en local: `./gradlew assembleDebug` (JDK 17).

## Instalar

Descarga `app-debug.apk` de la última Release, ábrelo en tu Android y permite la
instalación de apps de orígenes desconocidos cuando lo pida. Es un APK de
depuración para uso personal, no está firmado para Google Play.
