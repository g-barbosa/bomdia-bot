import { Telegraf } from 'telegraf'

export const handler = async (event) => {
  let body = JSON.parse(event.body)
  const bot = new Telegraf(process.env.BOT_TOKEN)
  
  bot.telegram.sendAudio(process.env.CHAT_ID, { source: '../../bomdia.mp3' })

  await bot.handleUpdate(body)

  return {statusCode: 200, body: 'upload do arquivo feito com sucesso'}
}