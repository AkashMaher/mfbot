const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, ButtonBuilder, ModalBuilder, TextInputBuilder, ButtonStyle, ActionRowBuilder, TextInputStyle, GatewayIntentBits, WebhookClient, PermissionsBitField, InteractionType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildInvites] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const keepAlive = require("./server.js");
require('dotenv').config({ path: '.env' })
const axios = require('axios');
const token = process.env['token']
const oskey = process.env['OSKEY']
const mf = process.env['webhook']
const mfSales = new WebhookClient({ url: mf });

const { clientId, guildId, OGRole } = require('./config.json')

const { getMongoClient, getLastSaleTime, setLastSaleTime } = require('./src/dbFunctions')
const { saleEmbed } = require('./src/osFunctions')


client.commands = new Collection();


const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();


client.on(Events.ClientReady, async () => {
  const Guilds = client.guilds.cache.size;
  // fetch all members
  client.guilds.cache.forEach(guild => {
    guild.members.fetch();
  });
  const totalMembers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

  await getMongoClient()

  console.log(Guilds, totalMembers)
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(() => {
    setTimeout(async function () {
      handleEvents();
    }, 120000);
  }, 120000);
  client.user.setPresence({ activities: [{ name: `movinfrens.com`, type: 3 }], status: 'online', });
});


const handleEvents = async () => {
  let getTime = await getLastSaleTime()

  const options = {
    method: 'GET',
    url: `https://api.opensea.io/api/v2/events/collection/movinfrens?after=${getTime ? getTime : 0}&event_type=sale`,
    headers: { accept: 'application/json', 'X-API-KEY': oskey }
  };

  axios
    .request(options)
    .then(function (response) {
      sendSaleInfo(response?.data?.asset_events);
      let timestamp = Date.now();
      // console.log(parseInt(timestamp/1000))
      setLastSaleTime(parseInt(timestamp / 1000))
    })
    .catch(function (error) {
      console.error(error);
    });
}

const sendSaleInfo = async (events) => {
  const channel = client.channels.cache.find(channel => channel.id === '1093550339942273046')
  let j = events?.length - 1
  for (let i = 0; i < events?.length; i++) {
    let sale = await saleEmbed(events[j])
    j--;
    if (!sale) return;
    channel.send({ embeds: [sale] })
    await mfSales.send({ embeds: [sale] })
  }
}



client.on(Events.InteractionCreate, async interaction => {
  try {
    if (interaction.guild.id !== guildId) return interaction.reply({ content: "Access Denied", ephemeral: true })
    if (interaction.isChatInputCommand()) {
      if (interaction.replied) return console.log("already replied");
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      await command.execute(interaction);

    }

    if (interaction.isButton()) {
      if (!interaction.member.roles.cache.has(OGRole)) {
        return interaction.reply({ content: 'You don\'t have the required role to use this button!', ephemeral: true });
      }
      if (interaction.customId == 'submit_wallet') {

        const modal = new ModalBuilder()
          .setCustomId('submit-wallet-modal')
          .setTitle('Submit Your ETH Wallet Address')
          .addComponents([
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId('wallet-input')
                .setLabel('Submit')
                .setStyle(TextInputStyle.Short)
                .setMinLength(40)
                .setMaxLength(50)
                .setPlaceholder('0x....')
                .setRequired(true),
            ),
          ]);

        await interaction.showModal(modal);


      } else if (interaction.customId == 'check_wallet') {
        if (!interaction.member.roles.cache.has(OGRole)) {
          return interaction.reply({ content: 'You don\'t have the required role to use this button!', ephemeral: true });
        }
        await interaction.reply({ content: "Checking Wallet...", ephemeral: true })
        const checker = await check(interaction.user)
        const res = checker.message ? `Your Wallet Address: \`\`\`${checker?.data?.user_name}\n${checker?.data?.wallet_address}\`\`\`You can change wallet by submit new wallet address` : `You have not submitted your wallet address yet`
        await interaction.editReply({ content: res, ephemeral: true });
      }
    }


    if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === 'submit-wallet-modal') {
        await interaction.reply({ content: "Submitting...", ephemeral: true })
        const response = interaction.fields.getTextInputValue('wallet-input');
        const submitRes = submit(interaction.user, response)
        await interaction.editReply({ content: `Wallet Submitted \`\`\`${response}\`\`\``, ephemeral: true });
      }
    }
  } catch (error) {
    // console.error(error);
    const ss = await interaction.fetchReply()
    console.log(ss)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
  }

});


keepAlive()
client.login(token);
