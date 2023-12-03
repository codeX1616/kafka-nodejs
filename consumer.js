const {kafka} = require('./client')
const group = process.argv[2];

async function init() {
    const consumer = kafka.consumer({groupId: group.toString()})
    await consumer.connect();

    await consumer.subscribe({topics: ["sample-topic"], fromBeginning: true})

    await consumer.run({
        eachMessage: async({topic, partition, message, heartbeat, pause}) => {
            console.log(`group: ${group}, [${topic}]: partition: ${partition}: ${message.value.toString()}`)
        }
    })

    
}

init();