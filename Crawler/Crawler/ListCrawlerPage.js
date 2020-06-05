
const {
    log
} = require('../Log')

const {
    send_notice
} = require('../fm')

class Page {
    constructor(page, siteList, contentsQueue) {
        this.page = page
        this.siteList = siteList
        this.contentsQueue = contentsQueue
        this.nextSiteIndex = 0
    }

    async startCollect() {
        const site = this.siteList[this.nextSiteIndex]

        await this.page.goto(site.url)
        await this.page.evaluate(site.getData.toString())
        // 딜레이 1분
        await this.page.waitFor(60000)

        let notice_list = await this.page.evaluate(() => {
            return getData()
        })

        for (const notice of notice_list) {
            // console.log(notice)

            try {
                // 게시물이 존재하는지 여부
                if (!(await hasNotice(notice))) {
                    log.info("[새로운 게시물] " + JSON.stringify(notice))

                    var result = await insertNotice(notice)
                    // console.log(result)
                    notice.id = result.insertId
                    this.contentsQueue.enqueue(notice)


                   
                }
            } catch (error) {

            }


        }

        this.nextSiteIndex++
        if (this.nextSiteIndex >= this.siteList.length) this.nextSiteIndex = 0

        // 딜레이 3초
        setTimeout(this.startCollect.bind(this), 3000)
    }

}

module.exports = Page