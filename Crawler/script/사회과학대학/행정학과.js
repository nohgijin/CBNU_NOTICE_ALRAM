module.exports = {
    url: "http://public.chungbuk.ac.kr/bbs/board.php?bo_table=bbs7_1",
    site_id: 50501,
    getData: function getData() {
        var list = document.querySelectorAll('body > table:nth-child(8) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > form:nth-child(2) > table > tbody > tr')
        let i = 1;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "행정학과",
                category: "공지사항",
                site_id:50501,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim()
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
         return document.querySelector('body > table:nth-child(8) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:last-child').outerHTML
     },
}
