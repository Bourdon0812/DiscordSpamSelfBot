var Discord  = require("discord.js-selfbot-v11");
var client = new Discord.Client();
var rl = require("readline");
const TOKEN = ""; //enter your token here

client.login(TOKEN)

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.on("ready", () => {
    console.log(client.user.tag+" connected on "+client.guilds.size +" servers")
    startScript()
})

function startSpam(type, msg, counts, payload, data){
    var count = 0;
    switch (type) {
        case "guild":
            setInterval(() => {
                if(count <= counts) {
                    if (payload !== undefined) {
                        data.sendMessage(msg)
                        count++
                    }
                } else {
                    console.log("close")
                    console.groupEnd()
                }
            }, 10)
            break;

        case "user":
            setInterval(() => {
                if(count <= counts) {
                    if (payload !== undefined) {
                        payload.sendMessage(msg);
                        count++
                    }
                } else {
                    console.log("close")
                    console.groupEnd()
                }
            },10)
            break;
    }
}

function startScript() {
    try {
        readline.question("Enter 1 for spam serveur, 2 for spam a user", (firstresp) => {
            switch (parseInt(firstresp)) {
                case 1:
                    readline.question("enter server id", (secondresp) => {
                        let serveur = client.guilds.get(secondresp);
                        if (serveur !== undefined) {
                            readline.question("enter channel id", (channelresp) => {
                                let channel = serveur.channels.get(channelresp);
                                if (channel !== undefined) {
                                    readline.question("Enter message", (trhresp) => {
                                        let msg = trhresp;
                                        readline.question("enter the number of spam messages", (frresp) => {
                                            let count = frresp;
                                            console.log(isNaN(count));
                                            if (!isNaN(parseInt(count))) {
                                                console.log("spamming");
                                                startSpam("guild", msg, count, serveur, channel);
                                            } else {
                                                console.error("Enter a real number");
                                            }
                                        });
                                    });
                                }
                            });
                        } else {
                            console.error("Server not found");
                        }
                    });
                    break;

                case 2:
                    readline.question("Entrer user id", (secondresp) => {
                        let user = client.users.get(secondresp);
                        if (user !== undefined) {
                            readline.question("Enter message",(trhresp) => {
                                let msg = trhresp;
                                readline.question("enter the number of spam messages ", (frresp) => {
                                    let count = frresp;
                                    if (!isNaN(count)) {
                                        startSpam("user", msg, count, user, null);
                                    } else {
                                        console.error("enter a real number")
                                    }
                                })
                            });
                        } else {
                            console.error("User not found")
                        }
                    });
                    break;
            }

        });

    } catch(error) {
        console.warn("Error " + error)
    }

}
