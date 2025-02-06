require('../settings/config');
const fs = require('fs');

let handler = async (m, { client, text, reply, quoted, mime, prefix, command }) => {
    if (!quoted) return reply(`\n*ex:* reply image/video ${prefix + command}\n`);
    try {
        if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await client.sendImageAsSticker(m.chat, media, m, {
                packname: packname,
                author: author,
            });
            await fs.unlinkSync(encmedia);
        } else if (/video/.test(mime)) {
            if ((quoted?.msg || quoted)?.seconds > 10) return reply('Durasi video maksimal 10 detik!')
                const media = await quoted.download();
                let encmedia = await client.sendVideoAsSticker(m.chat, media, m, {
                    packname: packname,
                    author: author,
                });
            await fs.unlinkSync(encmedia);
        } else {
                return reply('Kirim gambar/video dengan caption .s (video durasi 1-10 detik)');
        }
    } catch (error) {
        console.error(error);
        return reply('Terjadi kesalahan saat memproses media. Coba lagi.');
    }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['sticker', 's']

module.exports = handler
