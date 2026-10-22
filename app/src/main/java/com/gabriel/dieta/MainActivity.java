package com.gabriel.dieta;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Envoltorio nativo de la app de dieta: carga la web app alojada
 * (https://files.instinct.com/qa9rxs91z36r-tu-dieta-y-calorias-a-medida)
 * en un WebView a pantalla completa. Necesita conexión a internet.
 */
public class MainActivity extends Activity {

    private static final String APP_URL =
            "https://files.instinct.com/qa9rxs91z36r-tu-dieta-y-calorias-a-medida";

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl(APP_URL);
        setContentView(webView);
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
