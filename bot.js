const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace with your actual values
const TELEGRAM_TOKEN = '7729339808:AAH1wUH6pmH7qUoVZvZnbQj44-uPUC0S2sI';
const PAIR_CODE_API = 'https://sarkar-md-session-generator.koyeb.app/code?number=$'; // or POST if needed

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Listen for /getcode
bot.onText(/\/getcode/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, '🔄 Generating your WhatsApp pairing code...');

    try {
        const response = await axios.get(PAIR_CODE_API); // or axios.post if needed

        const code = response.data.pairing_code;

        if (code) {
            bot.sendMessage(chatId, `✅ Your WhatsApp Pairing Code:\n\n\`\`\`\n${code}\n\`\`\`\nPaste this code in your WhatsApp terminal or client to log in.`, {
                parse_mode: 'Markdown',
            });
        } else {
            bot.sendMessage(chatId, '❌ Failed to get a pairing code from the server.');
        }
    } catch (error) {
        console.error('Error fetching pairing code:', error.message);
        bot.sendMessage(chatId, '⚠️ Error while contacting the API. Please try again later.');
    }
});
