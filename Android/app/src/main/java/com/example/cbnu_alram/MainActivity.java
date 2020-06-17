

package com.example.cbnu_alram;

import androidx.appcompat.app.AppCompatActivity;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import com.example.cbnu_alram.Adapter;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;


/**
 * This Class Created by 조정제
 * Copyright (c) 2020. All rights reserved.
 */
public class MainActivity extends AppCompatActivity {
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    OkHttpClient client = new OkHttpClient();
    private ListView mListView;
    public String fcm_token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    public void init(){

        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(new OnSuccessListener<InstanceIdResult>() {
            @Override
            public void onSuccess(InstanceIdResult instanceIdResult) {
                String token = instanceIdResult.getToken();
                Log.d("FCM : ", token);
                fcm_token = token;
                loadNoticeList("https://api.cmi.jaryapp.kro.kr/api/v2/notice");
                // send it to server
            }
        });


        /* 위젯과 멤버변수 참조 획득 */
        mListView = (ListView)findViewById(R.id.listView);

        mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(MainActivity.this, Notice.class);
                Object o = ((Item)mListView.getItemAtPosition(position)).getId();
                intent.putExtra("notice_id", o.toString());
                startActivity(intent);
            }
        });



        Button btn = (Button)findViewById(R.id.btnConfig);
        btn.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent intent = new Intent(getApplicationContext(),config.class);
                startActivity(intent);
            }
        });

        Button btnRefresh = (Button)findViewById(R.id.btnRefresh);
        btnRefresh.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                loadNoticeList("https://api.cmi.jaryapp.kro.kr/api/v2/notice");
            }
        });

        Button btnMajor = (Button)findViewById(R.id.btnMajor);
        btnMajor.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                loadNoticeList("https://api.cmi.jaryapp.kro.kr/api/v2/notice/major");
            }
        });

        Button btnCommon = (Button)findViewById(R.id.btnCommon);
        btnCommon.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                loadNoticeList("https://api.cmi.jaryapp.kro.kr/api/v2/notice/common");
            }
        });
    }


    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    public void loadNoticeList(String requestURL) {

        getNoticeList(requestURL, "", new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
//
                    String str = response.body().string();

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


    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    Call getNoticeList(String url, String json, Callback callback) {
        RequestBody body = RequestBody.create(JSON, json);
        Request request = new Request.Builder()
                .url(url)
                .header("token",fcm_token)
                .build();
        Call call = client.newCall(request);
        call.enqueue(callback);
        return call;
    }



}
