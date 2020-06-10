const {
    updateContents,
    updateDate,
    errorContents
} = require('../db')

const {
    log
} = require('../Log')

class Page {
    constructor(page, queue) {
        this.page = page,
        this.queue = queue
        this.collectStart()
    }
    async collectStart() {
        // console.log("ㅎㅇ")
        let notice = this.queue.dequeue()
        let delay = 200

        if (!notice) delay = 1000
        else {
            const site = this.queue.findSite(notice)
            try {

                // 공지사항으로 이동
                await this.page.goto(notice.url)
                // 딜레이
                await this.page.waitFor(2000)
                // 스크린샷
                await this.page.screenshot({
                    path: `./public/capture/${notice.site_id}.png`
                });
                // 컨텐츠 파싱 함수 삽입
                await this.page.evaluate(site.getContentsHtml.toString())

                // 컨텐츠 가져오기 img,iframe 주소 절대주소로 변환
                let contents = await this.page.evaluate(() => {
                    let IMG = document.querySelectorAll('img')
                    for (img of IMG) {
                        img.src = img.src
                    }
                    let IFRAME = document.querySelectorAll('iframe')
                    for (iframe of IFRAME) {
                        iframe.src = iframe.src
                    }
                    return getContentsHtml()
                })

                // 날짜 가져오기
                if (site.getDate) {
                    await this.page.evaluate(site.getDate.toString())
                    var date = await this.page.evaluate(() => {
                        return getDate()
                    })

                    // 날짜 업데이트
                    await updateDate(notice.id, date)
                }

                if (contents) await updateContents(notice.id, contents)
                else {
                    throw new Error('게시물 내용을 수집할 수 없습니다.')
                } // 예외처리해야됨
            } catch (error) {
                log.error(error, 'ContentsCrawlerPage > collectStart')
                log.error(JSON.stringify(notice), 'ContentsCrawlerPage > collectStart')
                await errorContents(notice.id)
            }
        }

        setTimeout(function () {
            this.collectStart()
        }.bind(this), delay)

    }
}

module.exports = Page