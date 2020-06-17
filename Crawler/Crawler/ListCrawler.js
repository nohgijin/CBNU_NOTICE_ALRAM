const puppeteer = require('puppeteer');


const {
    promisePool
} = require('../db')


/**
 * This Class Created by 조정제
 * Copyright (c) 2020. All rights reserved.
 */
class Crawler {
    constructor(siteList) {
        this.siteList = siteList
        this.init()
    }

    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    async init() {
        // 브라우저 초기화
        this.browser = await puppeteer.launch({
            headless: false,
            args: [
                `--window-size=${ 1920 },${ 1080 }`,
            ],
        });

        // 페이지 탭 개수 결정 사이트를 10개단위로 나눠서 수집
        var tabCnt = Math.ceil(this.siteList.length / 10)

        for (var t = 0; t < tabCnt; t++) {
            // 페이지 생성
            var page = await this.browser.newPage();

            await page.setRequestInterception(true);

            // 페이지 기본설정
            await page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
            });

            // 다이어로그 메시지 무시
            page.on('dialog', async dialog => {
                await dialog.dismiss();
            });

            page.on('request', (request) => {
                if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                    request.abort();
                } else {
                    request.continue();
                }
            });


        }


    }


}

module.exports = Crawler