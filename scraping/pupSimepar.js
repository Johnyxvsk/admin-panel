const puppeteer = require('puppeteer');
const axios = require("axios");

(async () => {

    const checkTempData = async () => {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        await page.goto("http://www.simepar.br/prognozweb/simepar/dados_estacoes/23185109");
    
        await page.waitForSelector('.current_conditions .item-left .data')
        let getTemp = await page.$('.current_conditions .item-left .data')
        let getPrecipita = await page.$('.item-right.item-bottom .data')
        let valTemp = await page.evaluate(el => el.textContent, getTemp)
        let valPrecipita = await page.evaluate(el => el.textContent, getPrecipita)
        let temp = valTemp.trim();
        let precipita = valPrecipita.trim();

        let data = {
            temp,
            precipita
        }

        const urlApi = 'http://localhost:4000/api/temp'
        const urlApiLive = 'https://adminpanel-349600.rj.r.appspot.com/api/temp'

        let res = await axios.post(urlApiLive, data)
        console.log(res.data)
        browser.close()
    }
    checkTempData()
    setInterval(()=>{
        checkTempData()
    },5*60000)
})();

