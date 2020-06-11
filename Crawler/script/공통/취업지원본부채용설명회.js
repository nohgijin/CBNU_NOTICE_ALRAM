module.exports = {
    url: "http://hrd.cbnu.ac.kr/board/board_list.asp?groupno=1&listno=2",
     site_id: "140602",
    getData: function getData() {
        var list = document.querySelectorAll('#content_main > div:nth-child(3) > table > tbody > tr[align=center]')
        let i = 1;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "취업지원본부",
                category: "채용설명회",
                site_id:"140602",
                title: td[2].innerText.trim(),
                url: td[2].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
            })
            i++
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG=document.querySelectorAll('img')
        let tmp=document.querySelectorAll('#content_main > table > tbody > tr > td > div:nth-child(1) > table > tbody > tr').length
        for(img of IMG){
            img.src=img.src
        }
        if(tmp==10){
            return document.querySelector('#content_main > table > tbody > tr > td > div:nth-child(1) > table > tbody > tr:nth-child(5)').outerHTML
        }
        return document.querySelector('#content_main > table > tbody > tr > td > div:nth-child(1) > table > tbody > tr:nth-child(4)').outerHTML
    },
}