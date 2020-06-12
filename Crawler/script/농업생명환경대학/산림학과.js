module.exports = {
    url: "http://forestscience.cbnu.ac.kr/index.html?pg_idx=27",
     site_id: 30401,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "산림학과",
                category: "공지사항",
                site_id:30401,
                title: td[1].querySelector('a').innerText.trim().replace('new',''),
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