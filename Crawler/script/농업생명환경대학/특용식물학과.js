module.exports = {
    url: "http://tobagin.cbnu.ac.kr/index.html?pg_idx=34",
    site_id: 31101,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "특용식물학과",
                category: "공지사항",
                site_id: 31101,
                title: td[1].querySelector('a').innerText.trim().replace('new', ''),
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