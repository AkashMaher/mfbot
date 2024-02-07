const { SlashCommandBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Get info about a role.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to get info about.')
                .setRequired(true)

        ),
    async execute(interaction) {
        await roleinfo(interaction);
    },
};


async function roleinfo(interaction) {
    try {
        const client = interaction.client;
        const roleId = interaction?.options?._hoistedOptions?.[0]?.value;
        const role = interaction.guild.roles.cache.find(role => role.id === roleId);

        if (!role) return await interaction.reply({ content: 'invalid role', ephemeral: true });

        const guild = interaction.guild;
        let count = 0;
        guild.members.cache.forEach(member => {
            if (member.roles.cache.has(role.id)) {
                count++;
            }
        });
        let embeds = {
            color: role.color,
            thumbnail: {
                url: client.user.avatarURL()
            },
            fields: [
                {
                    name: 'ID',
                    value: role.id,
                    inline: true
                },
                {
                    name: 'Name',
                    value: role.name,
                    inline: true
                },
                {
                    name: 'Color',
                    value: role.hexColor,
                    inline: true
                },
                {
                    name: 'Mention',
                    value: role.toString(),
                    inline: true
                },
                {
                    name: "Hoisted",
                    value: role.hoist ? 'Yes' : 'No',
                    inline: true
                },
                {
                    name: "Mentionable",
                    value: role.mentionable ? 'Yes' : 'No',
                    inline: true
                },
                {
                    name: "Position",
                    value: role.position,
                    inline: true
                },
                {
                    name: "Members",
                    value: count,
                    inline: true
                },
                {
                    name: "Managed",
                    value: role.managed ? 'Yes' : 'No',
                    inline: true
                }
            ],
            timestamp: new Date(role.createdAt),
            footer: {
                text: 'Role Created At',
                icon_url: client.user.avatarURL()
            }
        }
        await interaction.reply({ embeds: [embeds], ephemeral: true })

    } catch (error) {
        console.log(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}