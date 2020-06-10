module.exports = {
    url: "http://humanum.chungbuk.ac.kr/philosophy/selectBbsNttList.do?bbsNo=99&key=366",
    site_id: 110801,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "철학과",
                category: "공지사항",
                site_id: 110801,
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