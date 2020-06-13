module.exports = {
    url: "http://edu.chungbuk.ac.kr/physicaledu/selectBbsNttList.do?key=479&bbsNo=96",
    site_id: 41201,
    getData: function getData() {
        var list = document.querySelectorAll('#board > div.tableA > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "체육교육과",
                category: "공지사항",
                site_id:41201,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[4].innerText.trim(),
            })
            i++
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG=document.querySelectorAll('img')
        for(img of IMG){
            img.src=img.src
        }
        return document.querySelector('#board > div > div.tit_area > ul > li:nth-child(3) > div').outerHTML
    },
}