module.exports = {
    url: "http://humanum.chungbuk.ac.kr/korean/selectBbsNttList.do?key=562&bbsNo=172&searchCtgry=&pageUnit=10&searchCnd=all&searchKrwd=&integrDeptCode=&pageIndex=1",
    site_id: 110201,
    getData: function getData() {
        var list = document.querySelectorAll('#contents > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "국어국문학과",
                category: "공지사항",
                site_id:110201,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[4].innerText.trim()
            })
            i++
        }
        return data
    },
    getContentsHtml: function getContentsHtml() {
        return document.querySelector('#contents > table > tbody > tr:nth-child(2) > td').outerHTML
    }
}