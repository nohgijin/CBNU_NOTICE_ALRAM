module.exports = {
    url: "https://vetmed.chungbuk.ac.kr/board/notice",
    site_id: 70201,
    getData: function getData() {
        var list = document.querySelectorAll('#container > div > div.content_body > div > div.boardList > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "수의학과",
                category: "공지사항",
                site_id:70201,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[2].innerText.trim()
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
        if(document.querySelector('#container > div > div.content_body > div.boardViewContainer > div.pnlAttachedImage')){

        }
        return document.querySelector('#container > div > div.content_body > div.boardViewContainer > div.boardViewContent').outerHTML
    },
}