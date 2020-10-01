import IllyaClient from "../Client"
import { EventContext } from "../utils"

export default class ReadyListener extends EventContext {
    public constructor(client: IllyaClient) {
        super(client, "ready")
    }

    run() {
        console.log("Eu estou online!")
        this.client.editStatus("online", { name: "Fate⭐Kaleid Liner Prisma Illya", type: 3 })
    }
}