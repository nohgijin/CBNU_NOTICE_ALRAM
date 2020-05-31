const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://software.cbnu.ac.kr/bbs/bbs.php?db=notice&pgID=ID12415888101');

    var data = await page.evaluate(() => {
        getData: function getData() {
            var list = document.querySelectorAll('#content > table:nth-child(8) > tbody > tr')
            let i = 3;
            let data = []
            while (i < list.length) {
                let td = list[i].querySelectorAll('td')
                data.push({
                    site: "소프트웨어학과",
                    category: "공지사항",
                    site_id: 130101,
                    title: td[2].innerText.trim(),
                    url: td[2].querySelector('a').href.trim(),
                    date: td[6].innerText.trim()
                })
                i++
            }
            return data
        }
        return getData()
    })

    console.log(data)

    await browser.close();
})();