const Discord = require("discord.js");

const logger = require("winston");

const token = process.env.BOT_TOKEN;

// Configure logger settings

logger.remove(logger.transports.Console);

logger.add(new logger.transports.Console(), {
  colorize: true,
});

logger.level = "debug";

// Initialize Discord Bot

const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

bot.on("ready", function (evt) {
  logger.info("Connected");

  logger.info("Logged in as: ");

  logger.info(bot.username + " - (" + bot.id + ")");
});

const prefix = "!";

bot.on("messageCreate", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply(`Ping! I am alive`);
  }

  if (command === "runjs") {
    if (!args[1]) {
      message.reply(`Please provide a code snippet that return something`);
    }

    const code = message.content.replace("!runjs", "");
    var F = new Function(code);

    console.log(code);

    message.reply(F().toString() || "Your code has to return something");
  }

  if (command === "leave") {
    const currentlyOnLeave = [
      "Werner Potgieter",
      "Frikan Erwee",
      "Wilco Breedt",
    ];
    const soonOnLeave = ["Werner Potgieter", "Frikan Erwee", "Wilco Breedt"];
    let reply = "People currently on Leave \n";
    reply += "\n";
    reply += currentlyOnLeave.join("\n");
    reply += "\n";
    reply += "\n";
    reply += "People going on Leave \n";
    reply += "\n";
    reply += soonOnLeave.join("\n");

    reply += "Bye boo!";

    message.reply(reply);
  }
});

bot.login(token);
