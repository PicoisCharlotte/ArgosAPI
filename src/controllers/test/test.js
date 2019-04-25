const { exec } = require('child_process');
module.exports = () => {
    return (req, res) => {
        exec('ls -l', (err, stdout, stderr) => {
            if(err) {
                console.error('command not found');
                return;
            }
            res.json('reussi');
        });
    };
}