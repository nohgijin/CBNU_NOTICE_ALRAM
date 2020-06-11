module.exports = {
    url: "https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20039",
     site_id: 140201,
    getData: function getData() {
        var list = document.querySelectorAll('#contentBody > form > div.containerIn > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "학생생활관",
                category: "공지사항",
                site_id:140201,
                title: td[1].innerText.trim(),
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
        return document.querySelector('#contentBody > div.containerIn > div').outerHTML
    }
}