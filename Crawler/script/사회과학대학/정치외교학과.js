module.exports = {
    url: "http://politics.chungbuk.ac.kr/bbs/board.php?bo_table=bbs5_1",
    site_id: 50401,
    getData: function getData() {
        var list = document.querySelectorAll('body > table:nth-child(11) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > form > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "정치외교학과",
                category: "공지사항",
                site_id:50401,
                title: td[1].querySelector('nobr > a').innerText.trim(),
                url: td[1].querySelector('nobr > a').href.trim(),
                date: td[3].innerText.trim()
            })
            i=i+2;
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG=document.querySelectorAll('img')
        for(img of IMG){
            img.src=img.src
        }
        return document.querySelector('body > table:nth-child(11) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:last-child').outerHTML
    },
}