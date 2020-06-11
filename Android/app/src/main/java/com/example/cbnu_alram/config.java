package com.example.cbnu_alram;

import android.app.Activity;
import android.app.Application;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Vector;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class config  extends Activity {

    private String category1 = "전체";
    private String category2;
    private String category3;
    public String fcm_token;
    public Vector<String> vector = new Vector<String>();
    public int level = 1;

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    OkHttpClient client = new OkHttpClient();



    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate((savedInstanceState));
        setContentView(R.layout.config);


        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(new OnSuccessListener<InstanceIdResult>() {
            @Override
            public void onSuccess(InstanceIdResult instanceIdResult) {
                String token = instanceIdResult.getToken();
                Log.d("FCM : ", token);
                fcm_token = token;
                // send it to server

                getAllowSite("https://api.cmi.jaryapp.kro.kr/api/v2/allow/site" , "", new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        // Something went wrong
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        if (response.isSuccessful()) {

                            String str = response.body().string();

                            try {
                                JSONArray arr = new JSONArray(str);

                                for (int i = 0; i < arr.length(); i++) {
                                    vector.add(arr.getString(i));
                                    Log.d("xzxc",arr.getString(i));
                                }


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
        });
        setInit();


    }

    public void setInit(){
        ArrayList<String> arraylist = new ArrayList<String>();
        arraylist.add("전공");
        arraylist.add("공통");

        setTrack();


        ArrayAdapter<String> Adapter;
        Adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, arraylist);

        final ListView list = (ListView)findViewById(R.id.list);

        list.setClickable(true);

        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> arg0, View arg1, int position, long arg3) {

                Object o = list.getItemAtPosition(position);
                category2 =o.toString();
                setTrack();
                level++;
                if(o.toString() == "전공") setUniversity();
                else setCommon();



            }
        });


        list.setAdapter(Adapter);

    }

    public void setUniversity(){

        ArrayList<String> arraylist = new ArrayList<String>();
        arraylist.add("경영대학");
        arraylist.add("공과대학");
        arraylist.add("농업생명환경대학");
        arraylist.add("사범대학");
        arraylist.add("사회과학대학");
        arraylist.add("생활과학대학");
        arraylist.add("수의과대학");
        arraylist.add("약학대학");
        arraylist.add("융합학과군");
        arraylist.add("의과대학");
        arraylist.add("인문대학");
        arraylist.add("자연과학대학");
        arraylist.add("전자정보대학");

        ArrayAdapter<String> Adapter;
        Adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, arraylist);

        final ListView list = (ListView)findViewById(R.id.list);

        list.setVerticalScrollBarEnabled(true);

        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> arg0, View arg1, int position, long arg3) {

                level++;
                Object o = list.getItemAtPosition(position);
                category3 =o.toString();
                setTrack();
                setMajor(o.toString());


            }
        });


        list.setAdapter(Adapter);
    }

    public void setCommon(){

        final ArrayList<String> arraylist = new ArrayList<String>();
        arraylist.add("국제교류본부");
        arraylist.add("학생생활관");
        arraylist.add("충북대학교");
        arraylist.add("linc사업단");
        arraylist.add("sw중심대학사업단");
        arraylist.add("취업지원본부");


        final ArrayAdapter<String> Adapter;
        Adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, arraylist);

        final ListView list = (ListView)findViewById(R.id.list);

        list.setVerticalScrollBarEnabled(true);

        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> arg0, View arg1, final int position, long arg3) {

                final Object o = list.getItemAtPosition(position);

                if(o.toString().contains("🔔")){

                    final String mj = o.toString().replace("🔔","");

                    offAlram("https://api.cmi.jaryapp.kro.kr/api/v2/allow?site_name="+mj , "", new Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {
                            // Something went wrong
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            if (response.isSuccessful()) {


                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        runOnUiThread(new Runnable() {
                                            @Override
                                            public void run() {
                                                arraylist.set(position, mj);
                                                Adapter.notifyDataSetChanged();

                                                Toast toast = Toast.makeText(getApplicationContext(), mj + " 공지사항 알림이 해제되었습니다.", Toast.LENGTH_SHORT);
                                                toast.show();

                                            }
                                        });
                                    }
                                }).start();

//                            String responseStr = response.body().string();
                                // Do what you want to do with the response.
                            } else {
                                // Request not successful
                            }
                        }
                    });
                }
                else {


                    setAlram("https://api.cmi.jaryapp.kro.kr/api/allow/site", "{\"site_name\":\"" + o.toString() + "\"}", new Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {

                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            if (response.isSuccessful()) {



                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        runOnUiThread(new Runnable() {
                                            @Override
                                            public void run() {
                                                arraylist.set(position, o.toString() + " 🔔");
                                                Adapter.notifyDataSetChanged();

                                                Toast toast = Toast.makeText(getApplicationContext(), o.toString() + " 공지사항 알림이 설정되었습니다.", Toast.LENGTH_SHORT);
                                                toast.show();

                                            }
                                        });
                                    }
                                }).start();

//                            String responseStr = response.body().string();
                                // Do what you want to do with the response.
                            } else {
                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        runOnUiThread(new Runnable() {
                                            @Override
                                            public void run() {
                                                arraylist.set(position, o.toString() + " 🔔");
                                                Adapter.notifyDataSetChanged();

                                                Toast toast = Toast.makeText(getApplicationContext(),  "이미 공지사항 알림이 설정되었습니다.", Toast.LENGTH_SHORT);
                                                toast.show();

                                            }
                                        });
                                    }
                                }).start();
                            }
                        }
                    });
                }



            }
        });


        list.setAdapter(Adapter);
    }


    public void setMajor(String major){

        final ArrayList<String> arraylist = new ArrayList<String>();

        String[] str = new String[20];

        if(major == "경영대학"){
            str = new String[]{"경영정보학과", "경영학부", "국제경영학과"};

        }
        else if(major == "공과대학"){
            str = new String[]{"건축공학과","건축학과","공업화학과","기계공학부","도시공학과","신소재공학과","안전공학과","신소재공학과","안전공학과","토목공학부","화학공학과","환경공학과"};
        }
        else if(major == "농업생명환경대학"){
            str = new String[]{"농업경제학과","목재종이과학과","바이오시스템공학과","산림학과","식물의학과","식물자원학과","식품생명학과","원예학과","지역건설공학과","축산학과","특용식물학과","환경생명화학과"};
        }
        else if(major == "사범대학"){
            str = new String[]{"교육학과","국어교육과","물리교육과","사회교육과","생물교육과","수학교육과","역사교육과","영어교육과","윤리교육과","지구과학교육과","지리교육과","체육교육과","화학교육과"};
        }
        else if(major == "사회과학대학"){
            str = new String[]{"경제학과","사회학과","심리학과","정치외교학과","행정학과"};
        }
        else if(major == "생활과학대학"){
            str = new String[]{"소비자학과","식품영양학과","아동복지학과","의류학과","주거환경학과"};
        }
        else if(major == "수의과대학"){
            str = new String[]{"수의예과","수의학과"};
        }
        else if(major == "약학대학"){
            str = new String[]{"약학대학"};
        }
        else if(major == "융합학과군"){
            str = new String[]{"디자인학과","조형예술학과"};
        }
        else if(major == "의과대학"){
            str = new String[]{"의과대학"};
        }
        else if(major == "인문대학"){
            str = new String[]{"고고미술사학과","국어국문학과","독일언어문화학과","러시아언어문화학과","사학과","영어영문학과","중어중문학과","철학과","프랑스언어문화학과"};
        }
        else if(major == "자연과학대학"){
            str = new String[]{"물리학과","미생물학과","생물학과","생화학과","수학과","정보통계학과","지구환경과학과","천문우주학과","화학과"};
        }
        else if(major == "전자정보대학"){
            str = new String[]{"소프트웨어학과","전기공학부","전자공학부","정보통신공학부","컴퓨터공학과"};
        }

        for(int i = 0; i < str.length; i++){
            if(vector.contains(str[i]))
                arraylist.add(str[i] + "🔔");
            else arraylist.add(str[i]);
        }

        final ArrayAdapter<String> Adapter;
        Adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, arraylist);

        final ListView list = (ListView)findViewById(R.id.list);

        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> arg0, View arg1, final int position, long arg3) {

                final Object o = list.getItemAtPosition(position);

                if(o.toString().contains("🔔")){

                    final String mj = o.toString().replace("🔔","");

                    offAlram("https://api.cmi.jaryapp.kro.kr/api/v2/allow?site_name="+mj , "", new Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {
                            // Something went wrong
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            if (response.isSuccessful()) {


                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        runOnUiThread(new Runnable() {
                                            @Override
                                            public void run() {
                                                arraylist.set(position, mj);
                                                Adapter.notifyDataSetChanged();

                                                Toast toast = Toast.makeText(getApplicationContext(), mj + " 공지사항 알림이 해제되었습니다.", Toast.LENGTH_SHORT);
                                                toast.show();

                                            }
                                        });
                                    }
                                }).start();

//                            String responseStr = response.body().string();
                                // Do what you want to do with the response.
                            } else {
                                // Request not successful
                            }
                        }
                    });
                }
                else {


                    setAlram("https://api.cmi.jaryapp.kro.kr/api/allow/site", "{\"site_name\":\"" + o.toString() + "\"}", new Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {

                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            if (response.isSuccessful()) {



                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        runOnUiThread(new Runnable() {
                                            @Override
                                            public void run() {
                                                arraylist.set(position, o.toString() + " 🔔");
                                                Adapter.notifyDataSetChanged();

                                                Toast toast = Toast.makeText(getApplicationContext(), o.toString() + " 공지사항 알림이 설정되었습니다.", Toast.LENGTH_SHORT);
                                                toast.show();

                                            }
                                        });
                                    }
                                }).start();

//                            String responseStr = response.body().string();
                                // Do what you want to do with the response.
                            } else {
                                // Request not successful

                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        runOnUiThread(new Runnable() {
                                            @Override
                                            public void run() {
                                                arraylist.set(position, o.toString() + " 🔔");
                                                Adapter.notifyDataSetChanged();

                                                Toast toast = Toast.makeText(getApplicationContext(),  "이미 공지사항 알림이 설정되었습니다.", Toast.LENGTH_SHORT);
                                                toast.show();

                                            }
                                        });
                                    }
                                }).start();

                            }
                        }
                    });
                }



            }
        });


        list.setAdapter(Adapter);
    }

    public void setTrack(){

        String track = "";
        if(category1 != null){
            track += category1;
        }
        if(category2 != null){
            track += " > "+category2;
        }
        if(category3 != null){
            track += " > "+category3;
        }

        TextView tv_track = (TextView)findViewById(R.id.textTrack);
        tv_track.setText(track);
    }



}
