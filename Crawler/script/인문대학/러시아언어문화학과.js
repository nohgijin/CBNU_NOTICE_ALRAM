module.exports = {
    url: "http://humanum.chungbuk.ac.kr/russian/selectBbsNttList.do?bbsNo=93&key=339",
    site_id: 110401,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "러시아언어문화학과",
                category: "공지사항",
                site_id: 110401,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
            })
            i++
        }
        return data
    },
    getContentsHtml: function getContentsHtml() {
        return document.querySelector('#contents > table > tbody > tr:nth-child(2) > td').outerHTML
    }
}