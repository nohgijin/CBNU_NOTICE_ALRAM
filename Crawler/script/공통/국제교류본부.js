module.exports = {
    url: "https://cia.chungbuk.ac.kr/9000/list.php?test=on&db_code=notice&category=3&PHPSESSID=c4e6de41dd493e08b6a41d1aff4d6f5a",
     site_id: 140101,
    getData: function getData() {
        var list = document.querySelectorAll('#content_wrap > div.content > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr[align=center]')
        let i = 2;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            let tmpnum=td[0].innerText.trim()
            data.push({
                site: "국제교류본부",
                category: "공지사항",
                site_id:140101,
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
        var DEL=document.querySelectorAll('#hwpEditorBoardContent')
        for(del of DEL){
            del.remove()
        }
        return document.querySelector('#content_wrap > div.content > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(6) > td > table > tbody').outerHTML
    }
}