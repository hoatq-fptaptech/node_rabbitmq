const amqp = require("amqplib")
connect();
const queue = "t2204m";
async function connect(){
    try {
        const connection = amqp.connect("amqp://localhost:5672");
        const channel = await (await connection).createChannel();

        await channel.assertQueue(queue);
       
        channel.consume(
            queue,
            (message) => {
                if (message) {
                    // const data = JSON.parse(message.content);
                    console.log(message);
                  }
            },
            { noAck: true }
          );

    }
    catch(ex) {
        console.error(ex)
    }
}
