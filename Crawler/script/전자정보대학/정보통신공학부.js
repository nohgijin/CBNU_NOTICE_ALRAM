module.exports = {
    url: "http://inform.chungbuk.ac.kr/bbs/bbs.php?db=notice",
    site_id: 130401,
    getData: function getData() {
        var list = document.querySelectorAll('#content1 > div.section.clear > table:nth-child(6) > tbody > tr')
        let i = 3;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "정보통신공학부",
                category: "공지사항",
                site_id:130401,
                title: td[2].innerText.trim(),
                url: td[2].querySelector('a').href.trim(),
                date: td[6].innerText.trim()
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
        return document.querySelectorAll('#articles')[1].outerHTML
    }
}