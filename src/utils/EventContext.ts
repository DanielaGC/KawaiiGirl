export default class EventContext {
    public client: any
    public name: string
    public constructor(client: any, name: string) {
        this.client = client
        this.name = name
    }
}