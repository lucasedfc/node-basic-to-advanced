//@ts-check
const fs = require('fs');
const colors = require('colors');

const createTableFile = async (base, mustList = false, limit = 10) => {

    try {
        
        let output = '';
        for (let i = 1; i <= limit; i++) {
            output += (`${base} X ${i} = ${base * i} \n`);
        } 

        if (mustList) {
             console.log("========================".green);
             console.log("Table of:".green, colors.blue(base));
             console.log("========================".green);
             console.log(colors.rainbow(output));
         }       

        fs.writeFileSync(`./output/table-${base}.txt`, output);    
        return `${colors.bgBlue(`table-${base}.txt`)}`;
    } catch (error) {
        throw error;        
    }

}

module.exports = { createTableFile }