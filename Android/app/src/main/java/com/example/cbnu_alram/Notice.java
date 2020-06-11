package com.example.cbnu_alram;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class Notice  extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate((savedInstanceState));
        setContentView(R.layout.notice);

        Intent intent = getIntent();
        

        String notice_id = intent.getStringExtra("notice_id");

        get2("https://api.cmi.jaryapp.kro.kr/api/v2/notice/detail?id="+notice_id);


    }

    public void get2(String requestURL) {
        try {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
//                    .addHeader("x-api-key", RestTestCommon.API_KEY)
                    .url(requestURL)
                    .build();

            //비동기 처리 (enqueue 사용)
            client.newCall(request).enqueue(new Callback() {
                //비동기 처리를 위해 Callback 구현
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println("error + Connect Server Error is " + e.toString());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    //System.out.println("Response Body is " + response.body().string());

                    String str = response.body().string();

                    Log.d("as","xzc");

                    //
                    try {
                        JSONArray arr = new JSONArray(str);
                        final JSONObject json = arr.getJSONObject(0);



                        new Thread(new Runnable() {
                            @Override
                            public void run() {
                                runOnUiThread(new Runnable(){
                                    @Override
                                    public void run() {
                                        try {
                                            TextView tv_title = (TextView)findViewById(R.id.notice_title);
                                            TextView tv_date = (TextView)findViewById(R.id.notice_date);
                                            final WebView wv_contents = (WebView)findViewById(R.id.notice_contents);

                                            tv_title.setText(json.getString("title"));
                                            tv_date.setText(json.getString("date"));
                                            wv_contents.loadDataWithBaseURL(null,json.getString("contents"),"text/html; charset=utf-8","UTF-8","about:blank");


                                            Button btnLocation = (Button)findViewById(R.id.btnLocation);
                                            btnLocation.setOnClickListener(new View.OnClickListener(){
                                                public void onClick(View v){
                                                    String url = null;
                                                    try {
                                                        url = json.getString("url");
                                                    } catch (JSONException e) {
                                                        e.printStackTrace();
                                                    }
                                                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                                                    startActivity(intent);
                                                }
                                            });
                                        } catch (JSONException e) {
                                            e.printStackTrace();
                                        }
                                    }
                                });
                            }
                        }).start();




                        //Log.d("zxf",arr.getJSONObject(0).getString("title"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    // Log.d("a",response.body().string());
                }
            });

        } catch (Exception e){
            System.err.println(e.toString());
        }

    }

}
