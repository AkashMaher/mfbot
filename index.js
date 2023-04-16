const fs = require('node:fs');
const path = require('node:path');
const { Client,Collection,Events , ButtonBuilder, ModalBuilder, TextInputBuilder, ButtonStyle, ActionRowBuilder, TextInputStyle, GatewayIntentBits,WebhookClient,PermissionsBitField,InteractionType  } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const keepAlive = require("./server.js");
require('dotenv').config({ path: '.env' })
const axios = require('axios');
const token = process.env['token']
const oskey = process.env['OSKEY']
const mf = process.env['webhook']
const mfSales = new WebhookClient({url:mf});

const {clientId,guildId,MemberRole,OGRole,WLRole, OwnerId, Amos} = require('./config.json')

const {official_links} = require('./src/official-links');
const {faqs} = require('./src/faq')
const {rules} = require('./src/rules')
const {ogBtn} = require('./src/ogButton')
const {submit} = require("./src/DB/submitWallet")
const {check} = require("./src/DB/checkWallet")
const {ogCount} = require("./src/DB/ogCount")
const {checkByAdmin} = require("./src/DB/checkOGbyAdmin")
const {setLastSaleTime, getLastSaleTime} = require("./src/DB/setTime")
const {saleEmbed} = require('./src/saleEmbed')
const {raffleEmbed} = require("./src/raffle.js")
const {rarityEmbed} = require("./src/rarity.js")


client.commands = new Collection();
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const mongourl = process.env['mongodb']
const WalletModel = require('./models/wallet')
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( (db) => {
        db.model('og-wallets')
        
        console.log(`connected to mongodb`) 
    });
mongoose.set('strictQuery', true);
const mongodb = mongoose.connection;

mongodb.on('error', console.error.bind(console, 'Connection error:'));

const mongoClient = new MongoClient(mongourl);
const databaseName = "mf";



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


client.on(Events.ClientReady, () => {
  const Guilds = client.guilds.cache.size;
  const totalMembers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

  console.log(Guilds, totalMembers)
  console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        setTimeout(async function () {
          handleEvents();
        }, 60000);
    }, 60000);
   /*client.user.setPresence({ activities: [{ name: `movinfrens.com` }], status: 'online' });*/
});


const handleEvents = async () => {
	const getTime = await getLastSaleTime()
  // console.log(getTime)
  const options = {
  method: 'GET',
  url: `https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b&event_type=successful&occurred_after=${getTime?getTime:0}`,
  headers: {accept: 'application/json', 'X-API-KEY': oskey}
};

  axios
  .request(options)
  .then(function (response) {
    // console.log(response?.data?.asset_events[0]);
    sendSaleInfo(response?.data?.asset_events);
    let timestamp = Date.now();
    // console.log(parseInt(timestamp/1000))
    setLastSaleTime(parseInt(timestamp/1000))
  })
  .catch(function (error) {
    console.error(error);
  });
}

const sendSaleInfo = async (events) => {
    const channel = client.channels.cache.find(channel =>     channel.id === '1093550339942273046')
    let j = events?.length-1
    for(let i = 0;i<events?.length;i++) {
    let sale = await saleEmbed(events[j])
    // console.log(sale)
    j--;
    channel.send({embeds:[sale]})
    await mfSales.send({embeds:[sale]})
    }
}


// const getNFTDetails = (winningNumber) => {
//       const options = {
//           method: 'GET',
//           url: `https://api.opensea.io/api/v1/asset/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/${winningNumber}/?include_orders=true`,
//           headers: {accept: 'application/json', 'X-API-KEY': ''}
//         }
//         axios.request(options).then(async function (response) {
//           console.log(response?.data)
//           return response?.data
//         })
//         //   .catch(function (error) {
//         //     console.log(error)
            
//         // })
// }


function checkIfAdmin(userId){
	let guild = client.guilds.cache.get(guildId)
	let user = guild.members.cache.get(userId)
	if(!user){
		return false
	}
	let checkIfuserHasRole = user.permissions.has(PermissionsBitField.Flags.Administrator);
	return {
		message:checkIfuserHasRole?true:false,
		user:user,
	}
}


function checkIfWLable(userId){
	let guild = client.guilds.cache.get(guildId)
	let user = guild?.members.cache.get(userId)
	if(!user){
		return false
	}
  let og = (user._roles.includes(WLRole)) 
  let wl = (user._roles.includes(OGRole))
  let mem = user._roles.includes(MemberRole) 
	let checkIfuserHasRole = mem && (!og && !wl)
  
	return {
		message:checkIfuserHasRole?true:false,
		user:user,
	}
}



// buttons

// client.on(Events.InteractionCreate,async interaction => {
//   if(interaction.guild.id !== guildId) return interaction.reply({content:'incorrect', ephemeral:true});
//   if(!interaction.isButton()) return interaction.reply({content:'error', ephemeral:true});
//    const role = interaction.guild.roles.cache.find(role => role.id === OGRole);
//   if (!role || !interaction.member.roles.cache.has(role.id)) {
//     return interaction.reply('You don\'t have the required role to use this button!');

//     if (interaction.customId === 'submit_button') {
//     await interaction.reply('Button 1 clicked!');
//   } else if (interaction.customId === 'check_wallet') {
//     await interaction.reply('Button 2 clicked!');
//   }
//   }
// })


// slash

const randomPicker = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


client.on(Events.InteractionCreate, async interaction => {
  if(interaction.guild.id !== guildId) return interaction.reply({content:"Access Denied",ephemeral:true})
	if (interaction.isChatInputCommand()) {
	if(interaction.replied) return console.log("already replied");
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {

    
      if(command.data.name == 'links') {
			if(interaction.user.id !== OwnerId) return interaction.reply({content:'<#1049577209469345830>', ephemeral:true});
			const officialLinks = await official_links();
			const messageId = '1079267314647695470';
			const channelId = '1049577209469345830'
			const message = await client.channels.cache.get(channelId).messages.fetch(messageId);
			await message.edit({embeds:[officialLinks]})
			//await interaction.channel.send({embeds:[officialLinks]})
			return interaction.reply({content:'updated', ephemeral:true})
		
		}
        
        
      else if(command.data.name == 'faqs') {
			if(interaction.user.id !== OwnerId) return interaction.reply({content:'<#1080694927090008094>', ephemeral:true});
			const faq = await faqs();
			const messageId = '1080859407455363122';
			const channelId = '1080694927090008094'
			const message = await client.channels.cache.get(channelId).messages.fetch(messageId);
			await message.edit({embeds:[faq]})
			// await interaction.channel.send({embeds:[faq]})
			return interaction.reply({content:'updated', ephemeral:true})
		
		} 
      
      
      else if(command.data.name == 'rules') {
			if(interaction.user.id == OwnerId ) {
			const rule = await rules();
			const messageId = '1081192929802072064';
			const channelId = '1049577209469345826'
			const message = await client.channels.cache.get(channelId).messages.fetch(messageId);
			await message.edit({embeds:[rule]})
			// await interaction.channel.send({embeds:[rule]})
			return interaction.reply({content:'updated', ephemeral:true})
      } return interaction.reply({content:'<#1049577209469345826>', ephemeral:true});
		
		} 

    // else if(command.data.name == 'gif') {
    //   const token_id = interaction?.options?._hoistedOptions?.[0]?.value;
    //   // console.log(token_id)
    //   await interaction.deferReply({content:'Fetching details', ephemeral:true})
    //   let res = await gifEmbed(token_id);
    //   // console.log(res)
    //   await interaction.editReply({embeds:[res], ephemeral:false})
    // }

    else if(command.data.name == 'rarity') {
      const token_id = interaction?.options?._hoistedOptions?.[0]?.value;
      // console.log(token_id)
      if(token_id<=0 || token_id>1511) return await interaction.reply({content:'invalid token id', ephemeral:true})
      await interaction.deferReply({content:'Fetching details', ephemeral:false})
      let res = await rarityEmbed(token_id);
      console.log(res)
      await interaction.editReply({embeds:[res], ephemeral:false})
    }


     else if(command.data.name == 'raffle') {
      if(interaction.user.id == OwnerId || interaction?.user?.id == Amos) {
        // await interaction.deferReply({content:'drawing winner...', ephemeral:true})
        let winningNumber = await randomPicker(62,1511)
        // console.log(winningNumber)
        // let result = await getNFTDetails(winningNumber)
        // await(1000)
        await interaction.deferReply({content:'Raffling winner...'})
        const result = await raffleEmbed(winningNumber)
        // const result = await getNFTInfoFromOS(winningNumber);
        // console.log("result : ", result)
        return await interaction.editReply({embeds:[result]})
        // await interaction.reply({content:'check console', ephemeral:true})
        } else {
          await interaction.reply({content:'Access Denied', ephemeral:true})
        }
     }
    
      else if(command.data.name == 'ogcount') {
        if(interaction.user.id == OwnerId || interaction.channel.id == "1049577209683251218") {
          let count = await ogCount();
          await interaction.reply({content:`Total OG Wallets Submitted: ${count}`, ephemeral:true})
        } else {
          await interaction.reply({content:'Access Denied', ephemeral:true})
        }
      }

        else if(command.data.name == 'check-wallet') {
        if(interaction.user.id == OwnerId || interaction.user.id == '273658836458668033' || interaction.user.id == '382505654998401024' 
|| interaction.channel.id == "1049577209683251218") {
          
        const id = interaction?.options?._hoistedOptions?.[0]?.value
        await interaction.reply({content:"Checking Wallet...",ephemeral:true})
      const checker = await checkByAdmin(id)
      const res = checker.message?`User's Wallet Address: \`\`\`${checker?.data?.user_name}\n${checker?.data?.wallet_address}\`\`\``:`User have not submitted wallet address yet`
		await interaction.editReply({ content: res, ephemeral:true });
        } else {
          await interaction.reply({content:'Access Denied', ephemeral:true})
        }
      }

      else if(command.data.name == 'add-wallet') {
        if(interaction.user.id == OwnerId) {
          
        const id = interaction?.options?._hoistedOptions?.[0]?.value
          const address = interaction?.options?._hoistedOptions?.[1]?.value
        await interaction.reply({content:"Submitting User's Wallet...",ephemeral:true})
          let user = client.users.cache.find(u => u.id === id)
        
        
      const data = await submit(user,address)
          
      const res = `Submitted User's Wallet Address: \`\`\`${data?.user_name}\n${data?.wallet_address}\`\`\``
		await interaction.editReply({ content: res, ephemeral:true });
        } else {
          await interaction.reply({content:'Access Denied', ephemeral:true})
        }
      }
      
      else if(command.data.name == 'og') {
			if(interaction.user.id == OwnerId ) {
			const ogRoleMsg = await ogBtn(OGRole);
      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('submit_wallet')
					.setLabel('Submit Wallet!')
					.setStyle(ButtonStyle.Primary),
			)
      .addComponents(
				new ButtonBuilder()
					.setCustomId('check_wallet')
					.setLabel('Check Wallet!')
					.setStyle(ButtonStyle.Primary),
			)
        ;

			// const messageId = '1081192929802072064';
			// const channelId = '1049577209469345826'
			// const message = await client.channels.cache.get(channelId).messages.fetch(messageId);
			// await message.edit({embeds:[rule]})
			await interaction.channel.send({embeds:[ogRoleMsg], components: [row]})
			return interaction.reply({content:'updated', ephemeral:true})
      } return interaction.reply({content:'<#1049577209469345826>', ephemeral:true});
		
		}

        
		 else {
            await command.execute(interaction);
			
        }    
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
  }

  if(interaction.isButton()) {
  if (!interaction.member.roles.cache.has(OGRole)) {
    return interaction.reply({content:'You don\'t have the required role to use this button!', ephemeral:true});
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

    // await interaction.reply({content:'submit your wallet address', ephemeral:true});
    await interaction.showModal(modal);
    
      
  } else if (interaction.customId == 'check_wallet') {
      if (!interaction.member.roles.cache.has(OGRole)) {
    return interaction.reply({content:'You don\'t have the required role to use this button!', ephemeral:true});
  }
      await interaction.reply({content:"Checking Wallet...",ephemeral:true})
      const checker = await check(interaction.user)
      const res = checker.message?`Your Wallet Address: \`\`\`${checker?.data?.user_name}\n${checker?.data?.wallet_address}\`\`\`You can change wallet by submit new wallet address`:`You have not submitted your wallet address yet`
		await interaction.editReply({ content: res, ephemeral:true });
    }
  }


  if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.customId === 'submit-wallet-modal') {
      await interaction.reply({content:"Submitting...", ephemeral:true})
      const response = interaction.fields.getTextInputValue('wallet-input');
      const submitRes = submit(interaction.user,response)
		await interaction.editReply({ content: `Wallet Submitted \`\`\`${response}\`\`\``, ephemeral:true });
    }
  }
  
});


keepAlive()
client.login(token);
