module.exports = {
    url: "http://humanum.chungbuk.ac.kr/gomisa/selectBbsNttList.do?bbsNo=218&key=683",
    site_id: 110101,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "고고미술사학과",
                category: "공지사항",
                site_id:110101,
                title: td[2].querySelector('a').innerText.trim(),
                url: td[2].querySelector('a').href.trim(),
                date: td[5].innerText.trim()
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
        return document.querySelector('#contents > table > tbody > tr:nth-child(3) > td').outerHTML
    }
}