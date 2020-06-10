module.exports = {
    url: "http://humanum.chungbuk.ac.kr/chinese/selectBbsNttList.do?bbsNo=73&key=293",
    site_id: 110701,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "중어중문학과",
                category: "공지사항",
                site_id:110701,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[4].innerText.trim()
            })
            i++
        }
        return data
    },
     getContentsHtml: function getContentsHtml() {
         return document.querySelector('#contents > table > tbody > tr:nth-child(2) > td').outerHTML
     }
}