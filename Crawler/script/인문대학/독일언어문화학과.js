module.exports = {
    url: "http://humanum.chungbuk.ac.kr/german/selectBbsNttList.do?bbsNo=149&key=506",
    site_id: 110301,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "독일언어문화학과",
                category: "공지사항",
                site_id:110301,
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