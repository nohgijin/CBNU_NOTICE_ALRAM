const puppeteer = require('puppeteer');
const { getNoticeList } = require('../db')
const { send_notice } = require('../fm')
const Page = require('./ContentsCrawlerPage')

/**
 * This Class Created by 조정제
 * Copyright (c) 2020. All rights reserved.
 */
    
class Queue {
    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    constructor(siteList) {
        this._arr = [];
        this.siteList = siteList
    }
    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    findSite(notice) {
        for (const site of this.siteList) {
            if (site.site_id == notice.site_id) return site
        }
    }
    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    enqueue(item) {
        this._arr.push(item);
    }
    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    dequeue() {
        return this._arr.shift();
    }
}

/**
 * This Class Created by 조정제
 * Copyright (c) 2020. All rights reserved.
 */
class Crawler {
    constructor(siteList) {
        this.queue = new Queue(siteList);
        this.init()
    }

    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    async init() {
        this.browser = await puppeteer.launch({
            // headless: false,
            args: [`--window-size=${ 1920 },${ 1080 }`],
        });


        let notice_list = await getNoticeList()
        for (const notice of notice_list) this.queue.enqueue(notice)


        this.page_list = []
        for (var i = 0; i < 10; i++) {
            var page = await this.browser.newPage();

            await page.setRequestInterception(true);

            page.on('dialog', async dialog => {
                console.log(`dialog message:' ${dialog.message()}`);
                await dialog.dismiss();
            });

            page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
            });

            page.on('request', (request) => {
                if (['stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                    request.abort();
                } else {
                    request.continue();
                }
            });

            this.page_list.push(new Page(page, this.queue))

        }

    }

}

module.exports = Crawler