const Discord     = require("discord.js");
const Colors      = require("colors");
const sloc        = require("sloc");
const fs          = require("fs");
const client      = new Discord.Client();
const BotSettings = require("./BotSettings.json");

//console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
//client.on("error", (e) => console.error(e));
//client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));
//console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");

function CheckForPermissions(){
  for (var [key, value] of permissionlist){
    console.log("has: " + key + " : " + role.hasPermission(value));
  }
}



//TODO: https://www.npmjs.com/package/sloc
var total="";
function FileInfo(){
  total = "";
  fs.readFile("Main.js", "utf8", function(err, code){
    if(err){console.error(err)}
    else{
      var stats = sloc(code,"coffee");
     // for(i in sloc.keys){
        var a = sloc.keys[0];
        var b = sloc.keys[1];
        var c = sloc.keys[2];
        var d = sloc.keys[7];
        total = total + (a + " : " + stats[a]) + "\n";
        total = total + (b + " : " + stats[b]) + "\n";
        total = total + (c + " : " + stats[c]) + "\n";
        total = total + (d + " : " + stats[d]) + "\n";
        //if(i >= sloc.length) return total;
        return total;
      //}
    }
  });
}

Date.prototype.today = function () { //For todays date
  return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}
Date.prototype.timeNow = function () { // For the time now
   return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

let commandlist = new Map([
  
])

let permissionlist = new Map([
  ["administrator", "administrator"],
  ["createInstantInvite", "createInstantInvite"],
  ["kickMembers", "kickMembers"],
  ["banMembers", "banMembers"],
  ["manageRoles", "manageRoles"],
  ["managePermissions", "managePermissions"],
  ["manageChannels", "manageChannels"],
  ["manageChannel", "manageChannel"]
]);

let shortcuts = new Map([
  ["lenny", "( ͡° ͜ʖ ͡°)"],
  ["shrug", "¯\\_(ツ)_/¯"],
  ["justright", "✋😩👌"],
  ["tableflip", "(╯°□°）╯︵ ┻━┻"],
  ["unflip", "┬──┬﻿ ノ( ゜-゜ノ)"],
  ["sunglasses", "(⌐■_■)"],
  ["magic", "(∩♥ ͟ʖ♥)⊃━☆ﾟ.*"],
  ["inlove", "q♥ᗝ♥p"]
]);

const memes_ETS = [
  "https://i.imgur.com/RRxU2NZ.png",
  "https://i.imgur.com/5N9xqIa.png",
  "https://i.imgur.com/mhvXK7N.png",
  "https://i.imgur.com/8YE4hQD.png",
  "https://i.imgur.com/c4hcYMm.png",
  "https://i.imgur.com/xc9Z9YK.png",
  "https://i.imgur.com/p7HcWrw.png",
  "https://i.imgur.com/9JSTYsZ.png",
  "https://i.imgur.com/o2l2Et1.png",
  "https://i.imgur.com/c9Apg58.png",
  "https://i.imgur.com/1fULCpC.png",
  "https://i.imgur.com/0ZA2EcK.png",
  "https://www.youtube.com/watch?v=OF_4OEoFOgU"
]

var uptime = "Online since: " + new Date().today() + " @ " + new Date().timeNow();
var loggertime //Defining the variable for the logger timer to use
    loggertime = "[" + new Date().timeNow()+ "]"; //This is here to be able to show the logged time
const msglvl = {
  info: "[INFO] ".green,
  warn: "[WARN] ".yellow,
  err: "[ERROR ALERT] ".red,
  log: "[LOG] ".cyan
}

// ---PROGRAM-SETTINGS

var Richinfo = 0x3498db;


// ---INFINITE-LOOPS---------------------------------------------------------------------------

setInterval(PlayingRefresh, 600000);
function PlayingRefresh(){ // This timer will refresh the "playing" status below the name of the bot in the user list
// This will refresh the the information showed below the bot its name.
var gameto = ("Prefix: " + BotSettings.prefix);
client.user.setGame(gameto);
clearInterval(PlayingRefresh); // This will reset the timer and loop another 150000 ms
console.log(loggertime + msglvl.log + "Playing status is now: -   " + gameto + "   -");
}

setInterval(LoggerRefresh, 1000);
function LoggerRefresh(){ // This timer is used to put a timestap on the lines in the console
    loggertime = "[" + new Date().timeNow()+ "]"; // this will refresh the value
    clearInterval(LoggerRefresh); // This will reset the timer and loop another 1000 ms
}

//---BOT-INIT-----------------------------------------------------------------------------------

client.login(`${BotSettings.BotToken}`);
client.on('ready', () => {
  console.log(); //This is just to get some lines of clearance in the logs
  console.log(); //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  console.log(loggertime + `${msglvl.log}---------- ${uptime} ----------`);
  console.log(loggertime + `${msglvl.info}Logged in as ${client.user.tag}!`);
  console.log(loggertime + `${msglvl.info}Invite url: https://discordapp.com/oauth2/authorize?client_id=400543333602033664&scope=bot&permissions=2146958591`);
  console.log(loggertime + `${msglvl.info}Bot loaded ${BotSettings.prefix} as the prefix`);
  console.log(loggertime + `${msglvl.info}serving ` + client.guilds.size + " guilds, with " + client.users.size + " users.");
  console.log(loggertime + "-----------------------------------------------------------");
  
  //CheckForPermissions(); //ONLY ENABLE FOR DEBUGING

  PlayingRefresh();
});

//Custom join message
client.on('guildMemberAdd', member => {
    let guild = member.guild;
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('User Update',
      `${member.user} has joined! :white_check_mark: `)
    guild.defaultChannel.sendEmbed(embed);
  });
//Custom leave message
client.on('guildMemberRemove', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .addField('User Update',
    `${member.user} has left! :neutral_face: `)
  guild.defaultChannel.sendEmbed(embed);
});


//Command list
//
// avatar
// art
// meme
// botinfo

//this event is triggerd everytime someone sends a message in one of the guilds this bot is active in
client.on("message", async message => {
  if(!message.author.id === "277763396731142144") return; //TEST IF USER IS WIETSE

  if(message.author.bot) return; //testing if the user is a bot
  if(message.channel.type === "dm") return; //testing if the message has been send via DM
  if(!message.content.startsWith(BotSettings.prefix)) return; //Test if the message contains the command prefix

  let messageArray = message.content.split(" "); //splitting the message per word
  let command = messageArray[0]; //setting the command as the first part of the message
  let args = messageArray.slice(1); //removing the first item as it is the command


  if(command === BotSettings.prefix + "avatar"){ // Sending a message to the same channel as the author with their avatar
      message.channel.sendMessage(message.author.avatarURL);
  }

  if(command === BotSettings.prefix + "art"){
    let command_name = message.content.slice(1); // removes the prefix, keeps the rest
      if(args[0]==="help"){
        var counter = 0;
        var arthelp = "";
        for (var [key, value] of shortcuts){
          console.log("**" +key + "** = " + value + "\n");
          arthelp = arthelp + ("**" +key + "** = " + value + "\n");
          counter++
           if(counter >= shortcuts.size){
            message.channel.send({embed:{
              color: Richinfo,
              description: `${arthelp}`
            }})
            return;
          } 
        }
      } else { message.channel.send(shortcuts.get(args[0])); }
    if (shortcuts.has(args[0])) {
      return;
    }else{
      message.channel.send({embed:{
        color: 0xe74c3c,
        description: `ERROR: unknown command, use **${command} help  for a list of options for this command`
      }})
    }
  }

  if(command === BotSettings.prefix + "meme"){
    message.channel.send(memes_ETS[Math.floor((Math.random() * memes_ETS.length))]);
  }

  if(command === BotSettings.prefix + "botinfo"){
    //message.channel.sendMessage(`***${client.user.username}'s info*** \n **This bot has been up since:** ${uptime} \n\n **Development started on (dd/mm/yyyy):** 10/01/2018 \n **Code by:** wietse292`);
    message.channel.send({embed:{
      color: 0x3498db,
      description: `**This bot has been up since:** ${uptime} \n\n **Development started on (dd/mm/yyyy):** 10/01/2018 \n **Code by:** wietse292 \n\n **Stats about code:** \n *comming soon!*`,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: `***${client.user.username}'s info***`,
      footer: {
        icon_url: client.user.avatarURL,
        text: "© DVT Logistics & Wietse292"
      }
    }})
  }
});