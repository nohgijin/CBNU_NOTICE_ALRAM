module.exports = {
    url: "https://linc.chungbuk.ac.kr/board/notice.do",
      site_id: 140401,
    getData: function getData() {
        var list = document.querySelectorAll('#section > div > div > div.boardListContainer > div.boardList > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "linc사업단",
                category: "공지사항",
                site_id:140401,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
            })
            i++;
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG=document.querySelectorAll('img')
        for(img of IMG){
            img.src=img.src
        }
        return document.querySelector('#section > div > div > div.boardViewContainer > div.boardViewContent').outerHTML
    },
}