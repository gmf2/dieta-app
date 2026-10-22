# Mi Dieta (app Android)

Aplicación Android de dieta y calorías: calcula tu objetivo diario con la fórmula de
Mifflin-St Jeor (peso, altura, edad, sexo, días de deporte y objetivo), te da opciones
de desayuno, comida y cena con las cantidades ajustadas a esas calorías, y recetas de
temporada que cambian cada mes.

La app es un envoltorio nativo (WebView) de la web app alojada en:
https://files.instinct.com/qa9rxs91z36r-tu-dieta-y-calorias-a-medida
Por eso necesita conexión a internet. Tus datos (peso, revisiones, elecciones) se guardan
en tu sesión y no se comparten. Los cálculos son orientación general, no consejo médico.

## Cómo se genera el APK

Cada vez que se sube código a `main`, GitHub Actions compila el APK automáticamente
(flujo `.github/workflows/build-apk.yml`):

1. En GitHub, entra en la pestaña **Actions** y abre la última ejecución en verde.
2. Abajo, en **Artifacts**, descarga `dieta-app-apk` (un zip con `app-debug.apk` dentro).
3. O más fácil: en la pestaña **Releases** (o en
   `https://github.com/<tu-usuario>/dieta-app/releases`) descarga directamente el
   `app-debug.apk` de la última versión.

## Cómo instalarlo en tu Android

1. Descarga el `app-debug.apk` en el móvil desde Releases.
2. Al abrirlo, Android te pedirá permitir "instalar apps de orígenes desconocidos"
   para el navegador o gestor de archivos: acéptalo (solo para esta instalación).
3. Instala y abre "Mi Dieta".

El APK es de depuración (debug), firmado con el certificado de pruebas estándar de
Android: vale para uso personal. Para publicarlo en Google Play haría falta firmarlo
con una clave propia y pasar el proceso de la tienda.

## Estructura

- `app/src/main/java/com/gabriel/dieta/MainActivity.java`: actividad con el WebView.
- `app/src/main/AndroidManifest.xml`: permisos (solo internet) y pantalla principal.
- `.github/workflows/build-apk.yml`: compilación automática del APK en GitHub Actions.
