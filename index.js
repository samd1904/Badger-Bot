
// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { pingCommand, execute } from "./commands/ping.js";
import dotenv from "dotenv";
dotenv.config();
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'ping'){
        await execute(interaction);
    }
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
