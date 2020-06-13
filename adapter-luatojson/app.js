// ==== Libraries
const fs = require('fs')

// ==== Main
var file = 'Archrist.lua'
var read = fs.readFileSync(file, 'utf-8')

read = read
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

read = read
    .replace(/\}\}/g,']]')
    .replace(/\]\]\]\]\,|\]\]\]\]/, ']]}}')

// },"global" : 

fs.writeFileSync('output.json', read)