module.exports = {
    url: "http://design.chungbuk.ac.kr/gnuboard5/bbs/board.php?bo_table=community",
    site_id: 90101,
    getData: function getData() {
        var list = document.querySelectorAll('#fboardlist > div > table > tbody > tr')
        let i = 0;
        let data = []
        while (i < list.length) {
            let td = list[i].querySelectorAll('td')
            data.push({
                site: "디자인학과",
                category: "공지사항",
                site_id: 90101,
                title: td[1].querySelector('a').innerText.trim(),
                url: td[1].querySelector('a').href.trim(),
                date: null,
            })
            i++;
        }
        return data
    },
    getContentsHtml: function getContentsHtml() {
        let IMG = document.querySelectorAll('img')
        for (img of IMG) {
            img.src = img.src
        }
        return document.querySelector('#bo_v_atc').outerHTML
    },
    getDate: function getDate() {
        return document.querySelector(`#bo_v_info > strong:nth-child(4)`).innerText
    }
}