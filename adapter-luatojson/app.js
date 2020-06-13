// ==== Libraries
const fs = require('fs')

// ==== Main
//:: Variables
var readFile = 'example.lua'
var writeFile = 'output.json'

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
    .replace(/^(.*?)(?<=\},"global"\s:)|^(.*?)(?<=\},\s"global"\s:)/, '')
    .replace(/\}$/, '')                                                     //:: sonraki tek } sil
    .replace(/,(\}|\])/g, '$1')                                             //:: remove trailing comma
cachedDocs = cachedDocs
    .replace(/\}\}/g,']]')
    .replace(/\]\]\]\]\,|\]\]\]\]/, ']]}}')

//:: Format the JSON  
var obj = JSON.parse(cachedDocs)
cachedDocs = JSON.stringify(obj, null, 4)

//:: Write File
fs.writeFile(writeFile, cachedDocs, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + writeFile);
    }
})