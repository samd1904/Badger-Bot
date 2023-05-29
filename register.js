import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'roll',
        description: 'Roll a dice',
        options:[
            {
                name: 'dice_expression',
                description: 'The dice expression in the format NdM (eg: 1d8)',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'find-deal':
        description: 'Find any ongoing deals on a game',
        options:[
            {
                name: 'game',
                description: 'Name of the game to find a deal for',
                type: 3,
                required: true
            }   
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.APPLICATON_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
