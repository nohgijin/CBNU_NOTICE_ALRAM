module.exports = {
    url: "http://foodn.cbnu.ac.kr/main/sub.html?pageCode=26",
    site_id: 60201,
    getData: function getData() {
        var list = document.querySelectorAll('#AB_SKIN > div > div.AB_list > ul > li > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length-1) {
            let td = list[i].querySelectorAll('td')
            let urltmp=td[1].querySelector('a').onclick.toString().split("'")[3]
            let urla=`http://foodn.cbnu.ac.kr/main/sub.html?Mode=view&boardID=www26&num=${urltmp}`
            data.push({
                site: "식품영양학과",
                category: "공지사항",
                site_id:60201,
                title: td[1].querySelector('a').innerText.trim(),
                url: urla,
                date: td[3].querySelector('p').innerText.trim()
            })
            i++;
        }
        return data
    },
    getContentsHtml: function getContentsHtml() {

        let IMG = window.frames[0].document.querySelectorAll('img')
        for (img of IMG) {
            img.src = img.src
        }
        return window.frames[0].document.querySelector('body').innerHTML
    },
}