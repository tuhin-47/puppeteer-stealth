/**
 *  Node Version: 24.0.1
 *         Name : Hasan Mahmud Tuhin
 *         Email: tuhin.mc@gmail.com
 */
import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import { setTimeout } from 'timers/promises'
import { platform } from 'os'

main().catch( err => console.log(`Error in main Script. ${err}`))

async function main() {
    console.log(`OPENING BROWSER`)
    const url ='https://example.com/'
    const browser = await puppeteer.launch({
        headless: true,
        args:[`--start-maximized`],
        defaultViewport :{
            width:1200,
            height:800,
            deviceScaleFactor:1
        }
    })
    const page = await browser.newPage()
    await page.goto(url,{waitUntil: 'load'})
    // execuate some javascript on browser.
    const result = await page.evaluate( ()=>{
        return {
            userAgent: navigator.userAgent,
            webdriver: navigator.webdriver,
            platform: navigator.platform,
            plugins : navigator.plugins.length,
            title : document.title
        }
    })
    console.log(result)
    await page.screenshot({path:'example.png'})
    await page.close()
    await browser.close()
}
