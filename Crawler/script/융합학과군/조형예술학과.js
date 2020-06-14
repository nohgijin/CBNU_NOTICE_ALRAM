module.exports = {
    url: "http://fineart.cbnu.ac.kr/bbs/bbs.php?db=notice&pgID=ID13971124002",
    site_id: 90201,
    getData: function getData() {
        var list = document.querySelectorAll('#contentR > table:nth-child(9) > tbody > tr')
        let i = 3;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "조형예술학과",
                category: "공지사항",
                site_id:90201,
                title: td[2].querySelector('nobr > a').innerText.trim(),
                url: td[2].querySelector('nobr > a').href.trim(),
                date: td[6].innerText.trim()
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
        return document.querySelector('#articles').outerHTML
    }
}