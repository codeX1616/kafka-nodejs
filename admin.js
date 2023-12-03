const { kafka } = require('./client')

async function init() {
    console.log('Admin connecting...')
    const admin = kafka.admin();
    
    console.log('Admin connection success!')
    admin.connect();
    
    console.log('Creating topic sample-topic')
    admin.createTopics({
        topics: [{
            topic: 'sample-topic',
            numPartitions: 2
        }]
    })

    console.log('Topic created successfully!')

    console.log('Disconnecting admin!')
    await admin.disconnect();
}

init();