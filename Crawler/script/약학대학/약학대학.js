module.exports = {
    url: "http://pharm.chungbuk.ac.kr/app/index.html?pg_idx=21",
    site_id: 80101,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            let urltmp = td[1].querySelector('a').href.trim().toString().split('"')[1]
            let urla = `http://pharm.chungbuk.ac.kr/app/index.html?mod=view&pg_idx=21&pidx=${urltmp}`
            data.push({
                site: "약학대학",
                category: "공지사항",
                site_id: 80101,
                title: td[1].innerText.trim(),
                url: urla,
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
        if(document.querySelector('#bbs_contnets > div.rd_body.clear > div:nth-child(3) > small')) document.querySelector('#bbs_contnets > div.rd_body.clear > div:nth-child(3) > small').remove()
        return document.querySelector('#bbs_contnets > div.rd_body.clear').outerHTML
    }
}