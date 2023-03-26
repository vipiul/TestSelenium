require('chromedriver');

const express = require('express')
const chrome = require('selenium-webdriver/chrome');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const roll = 2218102218;
const port = 8080;

const URL1 = 'https://andhra-pradesh.result91.com/bseap/ap-board-ssc-exam-result-2022/119518/';

let data;
let status = false;
const screen = {
    width: 640,
    height: 480
  };

function GetData(roll) {
    let swd = require("selenium-webdriver");
    let browser = new swd.Builder();

    let tab = browser.forBrowser("/usr/lib/chrome").setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();
    let tabToOpen =
        tab.get(URL1);
    tabToOpen
        .then(function () {

            // Timeout to wait if connection is slow
            let findTimeOutP =
                tab.manage().setTimeouts({
                    implicit: 10000, // 10 seconds
                });
            return findTimeOutP;
        })
        .then(function () {

            // Step 2 - Finding the username input
            let promiseUsernameBox =
                tab.findElement(swd.By.css("#rollfrm_ROllNo"));
            return promiseUsernameBox;
        })
        .then(function (usernameBox) {

            // Step 3 - Entering the username
            let promiseFillUsername =
                usernameBox.sendKeys(roll);
            return promiseFillUsername;
        })
        .then(function () {
            console.log(
                "Username entered successfully in" +
                "'login demonstration' for GEEKSFORGEEKS"
            );

            // Step 6 - Finding the Sign In button
            let promiseSignInBtn = tab.findElement(
                swd.By.css('[action*="/result/show"] button.btn.btn-info')
            );
            return promiseSignInBtn;
        })
        .then(function (signInBtn) {
            // Step 7 - Clicking the Sign In button
            let promiseClickSignIn = signInBtn.click();
            return promiseClickSignIn;
        })
        .then(function () {
            console.log("Successfully signed in GEEKSFORGEEKS!");
        })
        .then(function () {
            return tab.getCurrentUrl();
        })
        .then(function (currentUrl) {
            console.log(currentUrl, "getCurrentUrl");
            // let html =
               return tab.findElement(swd.By.css("#table36"))
            // return html
        }).then(function (tat){
            return tat.getAttribute('innerHTML')
        })
        .then(function (html) {
            // console.log(html.getAttribute('innerHTML'));
            if (html) {
                data = html
                status = true;
            }
            return html;
        })
        .catch(function (err) {
            console.log("Error ", err, " occurred!");
        });
}


app.get('/', (req, res) => {
    console.log('get');
    res.send('Hello World!')
})
app.post('/', (req, res) => {
    console.log('post', req.body);
    if (req.body.roll) {
        GetData(req.body.roll)
    }
    // GetData(roll)
    setTimeout(()=>{
         if (status) {
            console.log('if ====>');
            res.send(data)
        }else{
            console.log('else ====>');
            res.send('some error')
        }
    }, 50000, 'funky');

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
