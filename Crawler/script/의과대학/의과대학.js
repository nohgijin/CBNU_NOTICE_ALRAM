module.exports = {
    url: "http://medweb.chungbuk.ac.kr/master.php?pg_idx=23",
    site_id: 100101,
    getData: function getData() {
        var list = document.querySelectorAll('#bbs_contnets > div.bbs_body > #rows')
        let i = 2;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('div')
            data.push({
                site: "의과대학",
                category: "공지사항",
                site_id: 100101,
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
        let IFRAME = document.querySelectorAll('iframe')
        for (iframe of IFRAME) {
            iframe.src = iframe.src
        }
        document.querySelector('#bbs_contnets > div.rd_body.row > div:last-child').remove()
        document.querySelector('#bbs_contnets > div.rd_body.row > div:last-child').remove()
        return document.querySelector('#bbs_contnets > div.rd_body.row').outerHTML
    }
}