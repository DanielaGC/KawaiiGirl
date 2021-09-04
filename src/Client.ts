import { Client, ClientOptions, Collection } from "discord.js";
import { readdir } from "fs";
import { CommandListener } from "./utils";

function isConstructor(classe: new (...args: any[]) => any, ...args: any[]) {
  try {
    new classe(...args);
    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
}

export class IllyaClient extends Client {
  aliases: Collection<string, string>;
  commands: Collection<string, CommandListener>;
  constructor(options: ClientOptions) {
    super(options);
    this.aliases = new Collection();
    this.commands = new Collection();
  }

  loadCommands() {
    readdir(`${__dirname}/commands`, (err, files) => {
      if (err) return console.error(err.message);
      files.forEach(async (file: string) => {
        const Command = (await import(`${__dirname}/commands/${file}`)).default;

        if (isConstructor(Command)) {
          const command = new Command(this);

          this.commands.set(command.config.name, command);

          for (const alias of command.config.aliases) {
            this.aliases.set(alias, command.config.name);
          }
        }
      });
    });
  }

  loadEvents() {
    readdir(`${__dirname}/events`, (err, files) => {
      if (err) return console.log(err.message);
      files.forEach(async (file: string) => {
        const Events = (await import(`${__dirname}/events/${file}`)).default;

        if (isConstructor(Events)) {
          const events = new Events(this);
          super.on(events.name, (...args: any[]) => events.run(...args));
        }
      });
    });
  }

  async startBot(token?: string) {
    this.loadCommands();
    this.loadEvents();
    return await super.login(token);
  }
}
