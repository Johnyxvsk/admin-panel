const puppeteer = require('puppeteer');
const axios = require("axios");

(async () => {
    const sendStatus = async () => {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        await page.goto("https://cloud.taximachine.com.br/maps/index");
        const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});

        await page.type("#LoginForm_username", "financeiro@taondelivery.com.br")
        await page.type("#LoginForm_password", "jaobundao")

        await page.click('button[id="entrar"]')


        

        await navigationPromise
        setTimeout(async () => {
            await page.waitForSelector('#total_livres p')        
            let totalLivres = await page.$('#total_livres p')
            let livres = await page.evaluate(el => el.textContent, totalLivres)
            
            await page.waitForSelector('#total_em_andamento p')
            let totalAndamento = await page.$('#total_em_andamento p')
            let andamento = await page.evaluate(el => el.textContent, totalAndamento)
            
            await page.waitForSelector('#total_a_caminho p')
            let totalACaminho = await page.$('#total_a_caminho p')
            let aCaminho = await page.evaluate(el => el.textContent, totalACaminho)
            
            await page.waitForSelector('#total_em_coleta p')
            let totalEmColeta = await page.$('#total_em_coleta p')
            let emColeta = await page.evaluate(el => el.textContent, totalEmColeta)
            
            let emOperaçao = parseInt(livres) + parseInt(andamento) + parseInt(aCaminho) + parseInt(emColeta);
            let emAndamento = parseInt(andamento) + parseInt(aCaminho) + parseInt(emColeta);
            let now = new Date();
            
            let data = {
                time: now.toLocaleTimeString(),
                livres,
                emAndamento,
                emOperaçao
            }
                console.log(data)
            const urlApi = 'http://localhost:4000/api'
            const urlApiLive = 'https://adminpanel-349600.rj.r.appspot.com/api'
            const testUrl = "https://data.mongodb-api.com/app/application-0-ryrko/endpoint/teste"
            try {
                let res = await axios.post(urlApiLive, data)
                console.log(res.data)
            } catch (error) {
                console.log('Errooo: '+ error)
            }
            browser.close()
        }, 2000);
   
    }
    sendStatus() 
    setInterval(()=>{
        sendStatus()
    },30000)
})();
