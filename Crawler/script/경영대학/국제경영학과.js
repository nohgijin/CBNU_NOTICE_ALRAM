module.exports = {
    url: "http://ib.chungbuk.ac.kr/master.php?pg_idx=33",
    site_id: 10301,
    getData: function getData() {
        var list = document.querySelectorAll('.bbs_body>#rows')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('div')
            data.push({
                site: "국제경영학과",
                category: "학부공지",
                site_id:10301,
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
    },
}