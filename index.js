const Telegraf = require('telegraf')
var sqlite3 = require('sqlite3').verbose();
const CronJob = require('cron').job
require('dotenv/config')

var db = new sqlite3.Database('meusIds.db');
db.serialize(() => db.run("CREATE TABLE IF NOT EXISTS ids (id INT)"))

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(Telegraf.log())

bot.start((ctx) => {
  ctx.reply("Este é o bot do bom dia. A partir do momento em que você mandar o comando start, vou te enviar bom dia todos os dias :)")
  var toInsert = db.prepare("INSERT INTO ids VALUES (?)")
  toInsert.run(ctx.message.from.id)
  toInsert.finalize();
})

const job = new CronJob('0 0 8 * * *', () => {
  db.each("SELECT DISTINCT id FROM ids", (err, row) => bot.telegram.sendAudio(row.id, {source: `./bomdia.mp3`}))
  }, null, true, 'America/Sao_Paulo')

bot.launch({
  webhook: {
    domain: 'https://bot-bomdia.herokuapp.com/',
    hookPath: '/RANDOM_ID',
    port: process.env.PORT
  }
});