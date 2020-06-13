module.exports = {
    url: "http://edu.chungbuk.ac.kr/soc/selectBbsNttList.do?key=297&bbsNo=40",
    site_id: 40401,
    getData: function getData() {
        var list = document.querySelectorAll('#board > div.tableA > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "사회교육과",
                category: "공지사항",
                site_id:40401,
                title: td[2].querySelector('a').innerText.trim(),
                url: td[2].querySelector('a').href.trim(),
                date: td[5].innerText.trim(),
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
        return document.querySelector('#board > div > div.tit_area > ul > li:nth-child(4) > div').outerHTML
    },
}