import IllyaClient from '../Client'
import { EventContext } from '../utils'

export default class ShardResumeListener extends EventContext {
  public constructor(client: IllyaClient) {
    super(client, 'shardResume')
  }

  run(id: number) {

    this.client.shardUptime.set(id, {
      shardID: id,
      uptime: Date.now()
    })
  }
}