const amqp = require("amqplib")
const queue = "my_channel";

exports.connect =  async (text)=> {
    try {
        const connection = amqp.connect("amqp://localhost:5672");
        const channel = await (await connection).createChannel();

        process.once("SIGINT", async () => {
            await channel.close();
            await connection.close();
          });

        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
        console.log("jobs sent successfully");
    }
    catch(ex) {
        console.error(ex)
    }
}
