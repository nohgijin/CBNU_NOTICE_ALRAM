module.exports = {
    url: "https://vmp.cbnu.ac.kr/dsoft/vmp/index.html?pg_idx=40",
    site_id: 70101,
    getData: function getData() {
        var list = document.querySelectorAll('#data_list > tbody >tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "수의예과",
                category: "공지사항",
                site_id:70101,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim()
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
        if(document.querySelector('#bbs_contnets > div.rd_body.clear > div')) document.querySelector('#bbs_contnets > div.rd_body.clear > div').remove()
        return document.querySelector('#bbs_contnets > div.rd_body.clear').outerHTML
    },
}