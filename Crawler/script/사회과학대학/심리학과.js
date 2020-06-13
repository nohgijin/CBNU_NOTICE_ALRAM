module.exports = {
    url: "http://psychology.chungbuk.ac.kr/bbs/board.php?bo_table=bbs7_1",
    site_id: 50301,
    getData: function getData() {
        var list = document.querySelectorAll('body > table:nth-child(11) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > form > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "심리학과",
                category: "공지사항",
                site_id:50301,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim()
            })
            i=i+2
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG=document.querySelectorAll('img')
        for(img of IMG){
            img.src=img.src
        }
        return document.querySelector('body > table:nth-child(11) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:last-child').outerHTML
    }
}