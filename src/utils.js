const { OwnerId, Amos, OGRole } = require('../config.json');

const shortenString = (
    value,
    leftDigits,
    rightDigits,
) => {
    let shortenedString = ''
    if (value) {
        shortenedString =
            value?.substring(0, leftDigits) +
            '...' +
            value?.substring(value?.length - rightDigits)
    }
    return shortenedString
}

const randomPicker = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkIfAccess(interaction) {
    if (interaction.user.id === OwnerId || interaction.user.id === Amos) {
        return true
    } else {
        return false
    }
}

function getOgRole() {
    return OGRole
}

module.exports = {
    shortenString, checkIfAccess, randomPicker, getOgRole
}