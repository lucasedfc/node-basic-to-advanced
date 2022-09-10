const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'The base of the multiplication table'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',        
        default: false,
        describe: 'Show the table on the console'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',        
        default: 10,
        describe: 'Number for the end of the table'
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'Base must be a number'
        }
        if (isNaN(argv.l)) {
            throw 'Limit must be a number'
        }
        if (argv.l < 1 || argv.l > 100) {
            throw 'Limit must be a number between 1 to 100'
        }
        return true
    }).argv;

module.exports = argv;