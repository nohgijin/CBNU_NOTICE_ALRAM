/**
 * This Script Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */

module.exports = {
    url: "https://www.chungbuk.ac.kr/site/www/boardList.do?boardSeq=114&key=701",
      site_id: 140303,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > div > form > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            let tmpnum=td[0].innerText.trim()
            data.push({
                site: "충북대학교",
                category: "행사세미나",
                site_id:140303,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
            })
            i++;
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG=document.querySelectorAll('img')
        for(img of IMG){
            img.src=img.src
        }
        return document.querySelector('#view > table > tbody > tr:nth-child(4)').outerHTML
    }
}