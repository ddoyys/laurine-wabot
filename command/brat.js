require('../settings/config');

let handler = async (m, { client, text, reply }) => {
  if (!text) return reply(`\n*ex:* ${prefix + command} apanih cok\n`)
