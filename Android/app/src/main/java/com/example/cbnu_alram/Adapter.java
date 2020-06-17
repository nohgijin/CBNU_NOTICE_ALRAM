
package com.example.cbnu_alram;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

/**
 * This Class Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
public class Adapter extends BaseAdapter{

    private ArrayList<Item> mItems = new ArrayList<>();

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    @Override
    public int getCount() {
        return mItems.size();
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    @Override
    public Item getItem(int position) {
        return mItems.get(position);
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    @Override
    public long getItemId(int position) {
        return 0;
    }

    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        Context context = parent.getContext();

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.item, parent, false);
        }

        TextView tv_name = (TextView) convertView.findViewById(R.id.tv_name) ;
        TextView tv_contents = (TextView) convertView.findViewById(R.id.tv_contents) ;
        TextView tv_date = (TextView) convertView.findViewById(R.id.tv_date) ;

        Item myItem = getItem(position);

        tv_name.setText(myItem.getName());
        tv_contents.setText(myItem.getContents());
        tv_date.setText(myItem.getDate());

        return convertView;
    }


    /**
     * This Function Created by 노기진
     * Copyright (c) 2020. All rights reserved.
     */
    public void addItem(String id,String name, String contents, String date) {

        Item mItem = new Item();

        mItem.setId(id);
        mItem.setName(name);
        mItem.setContents(contents);
        mItem.setDate(date);

        mItems.add(mItem);

    }
}