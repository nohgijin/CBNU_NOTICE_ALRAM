/**
 * This Script Created by 조정제
 * Copyright (c) 2020. All rights reserved.
 */

module.exports = {
    url: "http://ast.chungbuk.ac.kr/info/data/data_list.asp?dev=501&part=",
    site_id: 120801,
    getData: function getData() {
        var list = document.querySelectorAll('#cContents > center > table > tbody > tr > td > table:nth-child(2) > tbody > tr')
        let i = 3;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            let urltmp=td[1].querySelector('a').toString().split("'")[1];
            urltmp="http://ast.chungbuk.ac.kr/info/data/data_view.asp?num="+urltmp+"&dev=501"
            data.push({
                site: "천문우주학과",
                category: "공지사항",
                site_id:120801,
                title: td[1].innerText.trim(),
                url: urltmp,
                date: td[5].innerText.trim()
            })
            i=i+2;
        }
        return data
    },
    getContentsHtml: function getContentsHtml() {
        let IMG = document.querySelectorAll('img')
        for (img of IMG) {
            img.src = img.src
        }
        return document.querySelector('#cContents > center > table > tbody > tr:nth-child(2) > td > center > table > tbody > tr:nth-child(3) > td').innerHTML
    }
}