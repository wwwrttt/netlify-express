'use strict';
const { spawn } = require('node:child_process');
const app = require('./express/server');

app.listen(3000, () => console.log('Local app listening on port 3000!'));

try {
    const cmd = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    //const command = spawn(cmd, ["http://localhost:3000/"], { stadio: "inherit" });

    // // command.on('error', (err) => {
    // //     console.error('Chrome failed: ' + err);
    // // })

    // // command.stdout.on('data', (stdout) => {
    // //     console.log("Result: \n" + stdout)
    // // });
} catch (ex) {
    console.log("ERROR: " + ex);
}
