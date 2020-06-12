module.exports = {
    url: "http://me.chungbuk.ac.kr/index.php?mid=me_sub04",
    site_id: 20401,
    getData: function getData() {
        var list = document.querySelectorAll('#bd_839_0 > div.bd_lst_wrp > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "기계공학부",
                category: "공지사항",
                site_id:20401,
                title: td[2].innerText.trim(),
                url: td[2].querySelector('a').href.trim(),
                date: td[4].innerText.trim(),
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
       
        return document.querySelector('#content > div.bd.hover_effect > div.rd.rd_nav_style2.clear > div.rd_body.clear > article').outerHTML
    },
}