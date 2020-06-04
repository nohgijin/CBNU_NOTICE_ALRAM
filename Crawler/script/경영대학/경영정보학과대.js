module.exports = {
    url: "http://mis.chungbuk.ac.kr/master.php?pg_idx=33",
    site_id: 10102,
    getData: function getData() {
        var list = document.querySelectorAll('.bbs_body>#rows')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('div')
            data.push({
                site: "경영정보학과",
                category: "대학원공지",
                site_id:10102,
                title: td[1].innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
            })
            i++
        }
        return data
    },
    getContentsHtml: function getContentsHtml(){
        let IMG = document.querySelectorAll('img')
        for(img of IMG){
            img.src=img.src
        }
        var DEL=document.querySelectorAll('a')
        for(del of DEL){
            del.remove()
        }
        if (document.querySelector('#attachedList')) document.querySelector('#attachedList').remove()
        return document.querySelector('#bbs_contnets > div.rd_body.row').outerHTML
    }
}