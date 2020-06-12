module.exports = {
    url: "http://plantmed.cbnu.ac.kr/dsoft/index.html?pg_idx=20",
    site_id: 30501,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "식물의학과",
                category: "공지사항",
                site_id: 30501,
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
        if (document.querySelector('#bbs_contnets > div.rd_body.clear > div > small')) document.querySelector('#bbs_contnets > div.rd_body.clear > div:last-child').remove()

        // 비밀글
        if (document.querySelector('#bbs_contnets > div.rd_body.clear')) return document.querySelector('#bbs_contnets > div.rd_body.clear').outerHTML
        else null
    },
}