module.exports = {
    url: "http://crop.chungbuk.ac.kr/dsoft/index.html?pg_idx=40",
    site_id: 30601,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody >tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "식물자원학과",
                category: "공지사항",
                site_id:30601,
                title: td[2].innerText.trim(),
                url: td[2].querySelector('a').href.trim(),
                date: td[4].innerText.trim(),
            })
            i++;
        }
        return data
    },
     getContentsHtml: function getContentsHtml() {
         let IMG = document.querySelectorAll('img')
         for (img of IMG) {
             img.src = img.src
         }
         if (document.querySelector('#bbs_contnets > div.rd_body.clear > div > small')) document.querySelector('#bbs_contnets > div.rd_body.clear > div:last-child').remove()
         document.querySelector('#bbs_contnets > div.rd_body.clear > div:last-child').remove()
         return document.querySelector('#bbs_contnets > div.rd_body.clear').outerHTML
     }
}