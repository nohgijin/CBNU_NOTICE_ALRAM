module.exports = {
    url: "http://koamma.chungbuk.ac.kr/bbs/bbs.php?db=notice",
    site_id: 130201,
    getData: function getData() {
        var list = document.querySelectorAll('#subContent > div.section > table:nth-child(6) > tbody > tr')
        let i = 3;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "전기공학부",
                category: "공지&뉴스",
                site_id: 130201,
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
        return document.querySelector('#articles').outerHTML
    }
}