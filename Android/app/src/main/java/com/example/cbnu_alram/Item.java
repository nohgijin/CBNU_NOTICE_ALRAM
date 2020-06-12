package com.example.cbnu_alram;

import android.graphics.drawable.Drawable;

public class Item {

    private String id;
    private String name;
    private String contents;
    private String date;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setId(String id){this.id = id;}
    public String getId(){return id;}



}