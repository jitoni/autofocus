// ==== Libraries
const fs = require('fs')

// ==== Main
//:: Variables
var readFile = 'Archrist.lua'
var writeFile = 'output.json'
var writeFile2 = 'lastRaid.json'

//:: Manipulate readFile
var cachedDocs = fs.readFileSync(readFile, 'utf-8')
cachedDocs = cachedDocs
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\-\-.*$/gm, '')                      //:: commentleri sil
    .replace(/  |\r\n|\n|\r|\t|\t\n/gm, "")                                 //:: remove tabs & returns
    .replace(/\=/g, ':')                                                    //:: = leri : ile degistir
    .replace(/^(.*?)(?<=ArchLootDB\s\:\s)/, '')                             //:: Variable declaration sil
    .replace(/(\[(?="))|((?<=\")(\]))/g, '')                                //:: " den once ve sonraki [] karakterlerini sil
    .replace(/\{\{/g, '[[')                                                 //:: change double curlies to square brackets
    .replace(/\}\,\{/g, '],[')                                              //:: replace curly bracket set with square brackets
    .replace(/,(\}|\])/g, '$1')                                             //:: remove trailing comma
    .replace(/^(.*?)(?<=\},"global"\s:)|^(.*?)(?<=\},\s"global"\s:)/, '')
    .replace(/\}$/, '')                                                     //:: sonraki tek } sil
cachedDocs = cachedDocs
    .replace(/\}\}/g,']]')
    .replace(/\]\]\]\]\,|\]\]\]\]/, ']]}}')
    .replace(/\{\]\]\}/, '{}}}')

var cachedDocs2 = fs.readFileSync(readFile,'utf-8')
cachedDocs2 = cachedDocs2
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\-\-.*$/gm, '')                        //:: commentleri sil
    .replace(/  |\r\n|\n|\r|\t|\t\n/gm, "")                                   //:: remove tabs & returns
    .replace(/\=/g, ':')                                                      //:: = leri : ile degistir
    .replace(/(\[(?="))|((?<=\")(\]))/g, '')                                  //:: " den once ve sonraki [] karakterlerini si
    .replace(/^(.*?)(?<="lastRaid"\s:)|^(.*?)(?<=\s"lastRaid"\s:)/, '') //:: start scope
    .replace(/(?=\},).*$/, '}}')                                               //:: end scope
    .replace(/,(\}|\])/g, '$1')                                               //:: remove trailing comma
    .replace(/,\{/,':[')
    .replace(/\}\}/,']}')

//:: Format the JSON  
var temp = JSON.parse(cachedDocs)
cachedDocs = JSON.stringify(temp, null, 4)
//:: Write File
fs.writeFile(writeFile, cachedDocs, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + writeFile);
    }
})

temp = JSON.parse(cachedDocs2)
cachedDocs2 = JSON.stringify(temp, null, 4)
fs.writeFile(writeFile2, cachedDocs2, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + writeFile2);
  }
})