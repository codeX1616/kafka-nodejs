const { kafka } = require('./client');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function init() {
    const producer = kafka.producer();

    console.log('Connecting producer...')
    await producer.connect();
    console.log('Producer Connected Successfully')

    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', async function(line) {
        const [riderName, loc] = line.split(' ');
        
        await producer.send({
            topic: 'sample-topic',
            messages: [{
                partition: loc.toLowerCase() === '0' ? 0 : 1,
                key: 'name',
                value: JSON.stringify({
                    name: riderName,
                    location: loc
                })
            }]
        })
    }).on('close', async () => {
        await producer.disconnect();
    })
}

init();