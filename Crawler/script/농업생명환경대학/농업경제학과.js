module.exports = {
    url: "http://agecon.cbnu.ac.kr/dsoft/index.html?pg_idx=26",
    site_id: 30101,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "농업경제학과",
                category: "공지사항",
                site_id: 30101,
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
        return document.querySelector('#bbs_contnets > div.rd_body.clear').outerHTML
    },
}