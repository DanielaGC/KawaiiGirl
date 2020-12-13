import IllyaClient from '../Client'
import { EventContext } from '../utils'
const { prefix } = require('../config.json')

export default class ReadyListener extends EventContext {
    public constructor(client: IllyaClient) {
        super(client, 'ready')
    }

    run() {
        const status: any = [
            { name: 'Fate/kaleid liner Prisma☆Illya', type: 3 },
            { name: 'Fate/kaleid liner Prisma☆Illya 2wei Herz!', type: 3 },
            { name: 'Fate/kaleid liner Prisma☆Illya 3rei!!', type: 3 },
            { name: 'Fate/kaleid liner Prisma☆Illya: Sekka no Chikai', type: 3 },
            { name: 'Fate/kaleid liner Prisma☆Illya Movie 2', type: 3 },
            { name: `${prefix}help | https://github.com/DanielaGC/KawaiiGirl`, type: 1, url: 'https://twitch.tv/danielagc' }
        ]
        console.log('Eu estou online!')
        setInterval(() => this.client.editStatus('online', status[Math.floor(Math.random() * status.length)]), 15000)
    }
}