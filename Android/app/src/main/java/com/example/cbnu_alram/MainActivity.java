package com.example.cbnu_alram;

import androidx.appcompat.app.AppCompatActivity;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import android.os.Bundle;
import android.widget.ListView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    OkHttpClient client = new OkHttpClient();
    private ListView mListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mListView = (ListView)findViewById(R.id.listView);

    }

    public void loadNoticeList(String requestURL) {

        getNoticeList(requestURL, "", new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // Something went wrong
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
//                            String responseStr = response.body().string();

                    String str = response.body().string();

                    //
                    try {
                        JSONArray arr = new JSONArray(str);

                        final Adapter mMyAdapter = new Adapter();


                        for (int i = 0; i < arr.length(); i++) {
                            JSONObject json = arr.getJSONObject(i);
                            mMyAdapter.addItem(json.getString("id"), json.getString("title"), json.getString("category2"), json.getString("date"));
                        }

                        /* 리스트뷰에 어댑터 등록 */

                        new Thread(new Runnable() {
                            @Override
                            public void run() {
                                runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        // 해당 작업을 처리함
                                        mListView.setAdapter(mMyAdapter);
                                    }
                                });
                            }
                        }).start();
                    }
                    catch (JSONException e) {
                        e.printStackTrace();
                    }

                } else {
                    // Request not successful
                }
            }
        });

    }

    Call getNoticeList(String url, String json, Callback callback) {
        RequestBody body = RequestBody.create(JSON, json);
        Request request = new Request.Builder()
                .url(url)
//                .header("token",fcm_token)
                .build();
        Call call = client.newCall(request);
        call.enqueue(callback);
        return call;
    }
}
