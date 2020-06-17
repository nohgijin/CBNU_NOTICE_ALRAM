/**
 * This Script Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */


module.exports = {
    url: "http://swapi.cbnu.ac.kr/v1/notice?page=1&limit=20&sort=-createdAt",
    site_id: 140501,
    getData: function getData() {
        var list = JSON.parse(document.querySelector('pre').innerText).data.documents
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i]
            let date = new Date(td.createdAt)
            data.push({
                site: "sw중심대학사업단",
                category: "공지사항",
                site_id: 140501,
                title: td.title,
                url: "http://sw7up.cbnu.ac.kr/notice/detail/" + td._id,
                date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            })
            i++;
        }
        return data
    },
    getContentsHtml: function getContentsHtml() {
        let IMG = document.querySelectorAll('img')
        for (img of IMG) {
            img.src = img.src
        }
        return document.querySelector('body > lf-root > main > lf-notice-detail-page > div > div.mt-4.ck.ck-blurred.ck-content.ck-editor__editable.ck-editor__editable_inline.ck-rounded-corners').outerHTML
    },
}