const { exec, execFile, spawn } = require(`child_process`);

// dir- lh --> dir (windows)

/*
exec(`dir`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return
    }

    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }

    console.log(`stdout: ${stdout}`);
})


execFile(`${__dirname}/dir.sh`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return
    }

    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }

    console.log(`stdout: ${stdout}`);
})
*/

const child = spawn(`find`, [`.`]);

let count = 0;

child.stdout.on(`data`, data => {
    console.log(`stdout`, ++count);
})

child.stderr.on(`data`, data => {
    console.log(`stderr: ${data}`);
})