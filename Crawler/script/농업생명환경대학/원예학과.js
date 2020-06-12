module.exports = {
    url: "https://hortisci.chungbuk.ac.kr/html/board/board.php?id=hor_news",
    site_id: 30801,
    getData: function getData() {
        var list = document.querySelectorAll('#contentsArea > div > table.basicList > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "원예학과",
                category: "공지사항",
                site_id: 30801,
                title: td[1].querySelector('a').innerText.trim().replace('new', ''),
                url: td[1].querySelector('a').href.trim(),
                date: null,
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
        return document.querySelector('#contentsArea > div > div.tableWrap > table > tbody > tr:nth-child(3)').outerHTML
    },
    getDate: function getDate() {
        return document.querySelector('#contentsArea > div > div.tableWrap > table > tbody > tr:nth-child(1) > td:nth-child(4)').innerText.split(' ')[0]
    }
}