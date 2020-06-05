module.exports = {
    url: "http://biz.chungbuk.ac.kr/?pg_idx=7",
    site_id: 10201,
    getData: function getData() {
        var list = document.querySelectorAll('.bbs_body>#rows')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('div')
            data.push({
                site: "경영학부",
                category: "대학공지",
                site_id:10201,
                title: td[1].innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
            })
            i++
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG=document.querySelectorAll('img')
        for(img of IMG){
            img.src=img.src
        }
        var DEL=document.querySelectorAll('a')
        for(del of DEL){
            del.remove()
        }
        return document.querySelector('#bbs_contnets > div.rd_body.row').outerHTML
    }
}