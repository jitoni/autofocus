// ==== Libraries
const fs = require('fs')

// ==== Main
var file = 'example.lua'
var read = fs.readFileSync('example.lua', 'utf-8')

read = read
    .replace(/^(.*?)(?<=ArchLootDB\s\=\s)/, '')             //:: Variable declaration sil
    .replace(/\=/g,':')                                     //:: = leri : ile degistir
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\-\-.*$/gm,'')       //:: commentleri sil
    .replace(/  |\r\n|\n|\r/gm,"")                          //:: remove tabs & returns
    // .replace(/--\s\[\d+\]/g,'')                          //:: numara commentlerini sil
    .replace(/(\[(?="))|((?<=\")(\]))/g,'')                 //:: " den once ve sonraki [] karakterlerini sil
    .replace(/\{\{/g,'[[')                                  //:: change double curlies to square brackets
    .replace(/\}\,\{/g,'],[')                               //:: replace curly bracket set with square brackets
    .replace(/\}\}\,/g,']],')
    .replace(/\}\}\,/g,']],')
    .replace(/\}\}\}/g,']]}')
    .replace(/^(.*?)(?<=\},"global"\s:)/, '')  
    .replace(/\}$/, '')             //:: Variable declaration sil

// },"global" : 

fs.writeFileSync('output.json', read)