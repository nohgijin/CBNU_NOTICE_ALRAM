module.exports = {
    url: "http://civil.chungbuk.ac.kr/index.php?mid=civil_sub0301",
    site_id: 20801,
    getData: function getData() {
        var list = document.querySelectorAll('#bd_300_0 > div.bd_lst_wrp > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "토목공학부",
                category: "공지사항",
                site_id: 20801,
                title: td[1].innerText.trim().replace('Viewer', ''),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
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

        return document.querySelector('#content > div.bd.hover_effect > div.rd.rd_nav_style2.clear > div.rd_body.clear').outerHTML
    },
}