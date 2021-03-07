import {writeFile} from 'fs/promises';
import puppeteer from 'puppeteer';
import {go, map, join} from "fxjs";
import isSunday from "./internal/isSunday.js";
import getToday from "./internal/getToday.js";

import makeSentenceForMemo from "./internal/makeSentenceForMemo.js";


(async () => {
    if (!isSunday()) {
        const today = getToday();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(`https://learn.dict.naver.com/conversation#/endic/${today}`);

        await page.waitForTimeout(1000);

        const enList = await page.$$eval(".reading_lst .txt_origin > .ng-isolate-scope", nodes => nodes.map(n => n.innerText));

        await go(
            enList,
            map(makeSentenceForMemo),
            arr => {
                let index = 1;
                const result = [];
                for (const value of arr) {
                    result.push(`${index}. ${value}`)
                    index++;
                }

                return result;
            },
            arr => ([today,...arr]),
            join("\n\n"),
            result => writeFile(`out_en_memo/${today}`, result, {encoding: "utf-8"})
        )

        await browser.close();
    } else {
        console.log("일요일에는 크롤링을 하지 않습니다.");
    }
})();





