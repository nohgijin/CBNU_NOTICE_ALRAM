module.exports = {
    url: "https://hrd.cbnu.ac.kr/board/board_list.asp?groupno=1&listno=1",
     site_id: "140601",
    getData: function getData() {
        var list = document.querySelectorAll('#content > div:nth-child(4) > table > tbody > tr[align=center]')
        let i = 1;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "취업지원본부",
                category: "공지사항",
                site_id:"140601",
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
        let tmp = document.querySelectorAll('#frm1 > table > tbody > tr > td > div:nth-child(1) > table > tbody > tr').length
        for(img of IMG){
            img.src=img.src
        }
        if(tmp==10){
            return document.querySelector('#frm1 > table > tbody > tr > td > div:nth-child(1) > table > tbody > tr:nth-child(5)').outerHTML
        }
        return document.querySelector('#frm1 > table > tbody > tr > td > div:nth-child(1) > table > tbody > tr:nth-child(4)').outerHTML
    },
}