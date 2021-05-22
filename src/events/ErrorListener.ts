import { IllyaClient } from '../Client'
import { EventListener } from '../utils'

module.exports = class ErrorListener extends EventListener {
  public constructor(client: IllyaClient) {
    super(client, 'error')
  }

  run(error: Error) {
    console.log(error.name, error.message)
  }
}