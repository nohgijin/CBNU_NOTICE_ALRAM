module.exports = {
    url: "http://env.cbnu.ac.kr/index.php?mid=env_sub05",
    site_id: 21001,
    getData: function getData() {
        var list = document.querySelectorAll('div.bd_lst_wrp > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "환경공학과",
                category: "공지사항",
                site_id:21001,
                title: td[1].innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: td[3].innerText.trim(),
                contentsSelector:'#bd_675_16796 > div.rd.rd_nav_style2.clear > div.rd_body.clear > article',
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
      
        return document.querySelector('#content > div.bd.hover_effect > div.rd.rd_nav_style2.clear > div.rd_body.clear').outerHTML
    },   
}