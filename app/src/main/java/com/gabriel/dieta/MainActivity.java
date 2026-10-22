package com.gabriel.dieta;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * NutriSport: la web app va incluida dentro del APK (assets/www)
 * y se carga localmente en un WebView a pantalla completa.
 * Funciona sin conexión a internet y sin cabeceras externas.
 * Soporta subir/sacar fotos (fotos de progreso) desde el WebView.
 */
public class MainActivity extends Activity {

    private static final String APP_URL = "file:///android_asset/www/index.html";
    private static final int FILE_CHOOSER_REQUEST = 1;

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;
    private Uri cameraImageUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(true);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (filePathCallback != null) filePathCallback.onReceiveValue(null);
                filePathCallback = callback;

                // Cámara: guardar en MediaStore (sin permisos extra en Android 10+)
                Intent capture = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                ContentValues values = new ContentValues();
                values.put(MediaStore.Images.Media.DISPLAY_NAME, "nutrisport_" + System.currentTimeMillis() + ".jpg");
                values.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
                cameraImageUri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                capture.putExtra(MediaStore.EXTRA_OUTPUT, cameraImageUri);
                capture.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);

                // Galería
                Intent content = new Intent(Intent.ACTION_GET_CONTENT);
                content.addCategory(Intent.CATEGORY_OPENABLE);
                content.setType("image/*");

                Intent chooser = Intent.createChooser(content, "Foto de progreso");
                chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Intent[]{capture});
                try {
                    startActivityForResult(chooser, FILE_CHOOSER_REQUEST);
                } catch (Exception e) {
                    filePathCallback = null;
                    return false;
                }
                return true;
            }
        });
        webView.loadUrl(APP_URL);
        setContentView(webView);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_CHOOSER_REQUEST && filePathCallback != null) {
            Uri[] results = null;
            if (resultCode == RESULT_OK) {
                if (data == null || data.getData() == null) {
                    if (cameraImageUri != null) results = new Uri[]{cameraImageUri};
                } else {
                    results = new Uri[]{data.getData()};
                }
            }
            filePathCallback.onReceiveValue(results);
            filePathCallback = null;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
