
var fs = require('fs');

var Crawler = require('./Crawler/ListCrawler')

const HOME = `./script`

var dirList = fs.readdirSync(HOME)
var siteList = []


for (const dir of dirList) {
    if (dir == '.git') continue
    var dirPath = HOME + '/' + dir
    if (dir.includes('.')) continue
    var fileList = fs.readdirSync(dirPath)
    for (const file of fileList) {
        if (!file.includes('.js')) continue
        var filePath = dirPath + '/' + file
        siteList.push(require(filePath))
    }
}

new Crawler(siteList)
