const argv = require("./config/yargs");
const { createTableFile } = require("./helpers/multiply");
const colors = require('colors');

createTableFile(argv.b, argv.s, argv.l)
    .then((filename) => console.log(filename, colors.blue('created')))
    .catch((err) => console.error(err));

