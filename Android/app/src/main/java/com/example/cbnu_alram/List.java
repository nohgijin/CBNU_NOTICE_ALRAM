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


public class List extends AppCompatActivity {
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    OkHttpClient client = new OkHttpClient();
    private ListView mListView;
    public String fcm_token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list);


        /* 위젯과 멤버변수 참조 획득 */
        mListView = (ListView)findViewById(R.id.listView2);

        Intent intent = getIntent();
        String site = intent.getStringExtra("site");


        loadNoticeList("https://api.cmi.jaryapp.kro.kr/api/v2/site/notice?site="+site);

        // listView의 ItemClickListener
        mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // adapter.getItem(position)의 return 값은 Object 형
                // 실제 Item의 자료형은 CustomDTO 형이기 때문에
                // 형변환을 시켜야 getResId() 메소드를 호출할 수 있습니다.
//                int imgRes = ((CustomDTO)adapter.getItem(position)).getResId();

//                // new Intent(현재 Activity의 Context, 시작할 Activity 클래스)
                Intent intent = new Intent(List.this, Notice.class);
//                 putExtra(key, value)
                Object o = ((Item)mListView.getItemAtPosition(position)).getId();
//                Log.d("zxc",o.toString());
                intent.putExtra("notice_id", o.toString());
                startActivity(intent);
            }
        });



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
