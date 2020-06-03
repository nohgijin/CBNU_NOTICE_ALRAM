module.exports = {
    url: "https://software.cbnu.ac.kr/bbs/bbs.php?db=notice&pgID=ID12415888101",
    site_id: 130101,
    getData: function getData() {
        var list = document.querySelectorAll('#content > table:nth-child(8) > tbody > tr')
        let i = 3;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "소프트웨어학과",
                category: "공지사항",
                site_id: 130101,
                title: td[2].innerText.trim(),
                url: td[2].querySelector('a').href.trim(),
                date: td[6].innerText.trim()
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
        return document.querySelector('#content > table > tbody > tr:nth-child(8)').outerHTML
    }
}