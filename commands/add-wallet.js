const { SlashCommandBuilder } = require('discord.js');
const { checkIfAccess } = require('../src/utils');
const { submitWallet } = require('../src/dbFunctions')


module.exports = {
        data: new SlashCommandBuilder()
                .setName('add-wallet')
                .setDescription('add users wallet address!')
                .addUserOption(option =>
                        option.setName('select_user')
                                .setDescription('select user')
                                .setRequired(true)

                )
                .addStringOption(option =>
                        option.setName('wallet_address')
                                .setDescription('User wallet address')
                                .setRequired(true)

                ),

        async execute(interaction) {
                await addUserWallet(interaction);
        },
};


async function addUserWallet(interaction) {
        const isAllowed = await checkIfAccess(interaction)
        if (isAllowed) {
                const client = interaction.client;
                const id = interaction?.options?._hoistedOptions?.[0]?.value
                const address = interaction?.options?._hoistedOptions?.[1]?.value
                await interaction.reply({ content: "Submitting User's Wallet...", ephemeral: true })
                let user = client.users.cache.find(u => u.id === id)


                const data = await submitWallet(user, address)

                const res = `Submitted User's Wallet Address: \`\`\`${data?.user_name}\n${data?.wallet_address}\`\`\``
                await interaction.editReply({ content: res, ephemeral: true });
        } else {
                await interaction.reply({ content: 'Access Denied', ephemeral: true })
        }
}