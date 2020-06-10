module.exports = {
    url: "http://humanum.chungbuk.ac.kr/cbnuhistory/selectBbsNttList.do?bbsNo=98&key=388",
    site_id: 110501,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "사학과",
                category: "공지사항",
                site_id:110501,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[4].innerText.trim()
            })
            i++
        }
        return data
    },
    getContentsHtml: function getContentsHtml() {
        let IMG = document.querySelectorAll('img')
        for (img of IMG) {
            img.src = img.src
        }
        return document.querySelector('#contents > table > tbody > tr:nth-child(2) > td').outerHTML
    }
}