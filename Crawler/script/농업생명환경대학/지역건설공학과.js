module.exports = {
    url: "http://jigong.chungbuk.ac.kr/index.html?pg_idx=23",
    site_id: 30901,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "지역건설공학과",
                category: "공지사항",
                site_id: 30901,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
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
        let IFRAME = document.querySelectorAll('iframe')
        for (iframe of IFRAME) {
            iframe.src = iframe.src
        }

        if (document.querySelector('#bbs_contnets > div.rd_body.clear > div > small')) {
            document.querySelector('#bbs_contnets > div.rd_body.clear > div:last-child').remove()
        }

        // 비밀글
        if (document.querySelector('#bbs_contnets > div.rd_body.clear')) {
            document.querySelector('#bbs_contnets > div.rd_body.clear > div:last-child').remove()
            return document.querySelector('#bbs_contnets > div.rd_body.clear').outerHTML
        } else return null
    },
}