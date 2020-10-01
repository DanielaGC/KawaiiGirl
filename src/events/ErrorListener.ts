import IllyaClient from "../Client"
import { EventContext } from "../utils"

export default class ErrorListener extends EventContext {
    public constructor(client: IllyaClient) {
        super(client, "error")
    }

    run(err: any) {
        console.log(err.stack)
    }
}