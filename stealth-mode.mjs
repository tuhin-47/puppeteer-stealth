/***
 * Node Version :24.0.1
 *       Name   : Hasan Mahmud Tuhin
 *       Email  : tuhin.mc@gmail.com
 * 
 * Topic: extracting data from webpage
 * 
 * Plugin:
 * ------
 * [1]https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth
 */
import puppeteer from 'puppeteer-extra'
import { setTimeout } from 'timers/promises'
import fs from 'fs/promises'
import StealthPlugin  from 'puppeteer-extra-plugin-stealth'
import { platform } from 'os'

main().catch(err => console.log(`ERROR on main script. ${err}`))

async function main() {
    const url_1 = 'https://www.myplates.com.au/create-plate'
    const url_2 = 'https://vplates.com.au'
    const url = "https://example.com/"

    puppeteer.use(StealthPlugin ())
    console.log(`OPEN STEALTH BROWSER`)
    const browser = await puppeteer.launch({
           headless: 'new',
           args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled'
           ],
            defaultViewport: {
                width: 1280,
                height: 800
            }
    })
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36')
    await page.goto(url_2,{
        waitUntil:'load'
    })
    // console.log(`waiting for 5 seconds`)
    // await setTimeout(5000)
    // const html = await page.content()
    // await fs.writeFile('url_2_data.html',html,'utf-8')
    // console.log(`Data Saved to file`)
    // await page.screenshot({path:'url_2.png'})

    //check if webdriver is controlling the page
    const data = await page.evaluate( ()=> {
        return {
            userAgent: navigator.userAgent,
            webdriver: navigator.webdriver,
            platform : navigator.platform,
            plugins  : navigator.plugins.length,
            title    : document.title
        }
    })
    console.log(data)
    await page.close()
    await browser.close()

}
