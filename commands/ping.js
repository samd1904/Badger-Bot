import { SlashCommandBuilder } from "discord.js";

const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('Replies to ping');


//Create a generic ping command 
async function execute(interaction){
    await interaction.reply("Pong!")
}

export {
    pingCommand,
    execute,
}
