import puppeteer from 'puppeteer';
import {go, map} from "fxjs";
import isSunday from "./internal/isSunday.js";
import getToday from "./internal/getToday.js";

import makeSentenceForMemo from "./internal/makeSentenceForMemo.js";
import makeHtml from "./internal/makeHtml.js";
import makePdf from "./internal/makePdf.js";



(async () => {
    if (!isSunday()) {
        const today = getToday();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(`https://learn.dict.naver.com/conversation#/endic/${today}`);

        await page.waitForTimeout(2000);

        const enList = await page.$$eval(".reading_lst .txt_origin > .ng-isolate-scope", nodes => nodes.map(n => n.innerText));

        await go(
            enList,
            map(makeSentenceForMemo),
            arr => {
                return {
                    today,
                    sentenceList: arr
                }
            },
            makeHtml,
            html => makePdf(html, today)
        )

        await browser.close();
    } else {
        console.log("일요일에는 크롤링을 하지 않습니다.");
    }
})();





