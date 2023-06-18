import { Client, Events, GatewayIntentBits } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    try{
        if(!interaction.isChatInputCommand()) return;
        //replace if statements with switch case
        console.log("Command: ",interaction.commandName)
        switch (interaction.commandName) {
            case 'ping':
                await interaction.reply("Pong!");
                break;
            case 'roll':
                //TODO: Need to add validations to command options to avoid any code breaking cases
                if(interaction.options.getString('dice_expression').includes('d')){
                    const optionStrArr = interaction.options.getString('dice_expression').split('d');
                    const dCount = optionStrArr[0];
                    const dice = parseInt(optionStrArr[1]);
                    const maxRoll = parseInt(optionStrArr[1])*dCount
                    let i = 0;
                    let rolls = [];
                    let rollTotal = 0;
                    while(i < dCount){
                        let roll = Math.round(Math.random()*(dice-1+1)+1);
                        rollTotal += roll;
                        rolls.push(roll);
                        ++i;
                    }
                    await interaction.reply(`${interaction.member.user.username} rolled ${rolls}. The total is ${rollTotal} out of ${maxRoll}`);
                    return;
                }else{
                    await interaction.reply(`Format is incorrect, please pass the dice expression in NdM format (eg: 2d8)`);
                    return;
                }
                break;
            case 'find-deal':
                const gameString = interaction.options.getString('game');
                const url = process.env.CHEAP_SHARK_DEAL_URL+gameString;
                const baseUrl = process.env.CHEAP_SHARK_BASE_URL;
                const result = await axios.get(url);
                let urlString = ""
                for(let i in result.data){
                    urlString += `${i}. ${baseUrl+result.data[i].dealID}\n`;
                }
                if(urlString.length>0){
                await interaction.reply('Found the following deals!\n');
                await interaction.followUp(urlString);
                }else{
                    await interaction.reply('No deals available at the moment!\n');
                }
                break;
        }
    }catch(error){
        console.error(error.code);
        console.error(error.message);
        if(interaction.replied)
            await interaction.followUp("Failed to process command!");
        else
            await interaction.reply("Failed to process command!")
        return;
    }
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
