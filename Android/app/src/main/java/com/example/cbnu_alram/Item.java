package com.example.cbnu_alram;

import android.graphics.drawable.Drawable;

/**
 * This Class Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
public class Item {

    private String id;
    private String name;
    private String contents;
    private String date;

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public String getName() {
        return name;
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public String getContents() {
        return contents;
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public void setContents(String contents) {
        this.contents = contents;
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public String getDate() {
        return date;
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public void setId(String id){this.id = id;}

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public String getId(){return id;}



}