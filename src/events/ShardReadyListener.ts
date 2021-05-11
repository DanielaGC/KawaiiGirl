import IllyaClient from '../Client'
import { EventContext } from '../utils'

export default class ShardReadyListener extends EventContext {
  public constructor(client: IllyaClient) {
    super(client, 'shardReady')
  }

  run(id: number) {

    this.client.shardUptime.set(id, {
      shardID: id,
      uptime: Date.now()
    })
  }
}