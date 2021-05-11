import { EmbedFooter, EmbedField, EmbedImage, EmbedAuthor } from 'eris'

export default class EmbedBuilder {
  fields: EmbedField[]
  author: EmbedAuthor
  description: string
  color: number
  file: string[]
  footer: EmbedFooter
  image: object
  timestamp: string | Date
  title: string
  thumbnail: EmbedImage
  url: string
  public constructor() {
    this.fields = []
    this.author
    this.description = null
    this.color = null
    this.file = null
    this.footer = null
    this.image = null
    this.timestamp = null
    this.title = null
    this.thumbnail = null
    this.url = null
  }

  public setAuthor(name: string, icon_url: string, url: string) {
    this.author = { name, icon_url, url }
    return this
  }

  private _resolveColor(color: any) {
    if (typeof color === 'string') {
      if (color === 'RANDOM') return Math.floor(Math.random() * (0xFFFFFF))
      color = parseInt(color.replace('#', ''), 16)
      return color
    }
  }

  public setColor(color: string) {
    this.color = this._resolveColor(color)
    return this
  }

  public setDescription(desc: string) {
    this.description = desc.toString().substr(0, 2048)
    return this
  }

  public setFooter(text: string, icon_url: string = '') {
    this.footer = { text: text.toString().substr(0, 2048), icon_url }
    return this
  }

  public setImage(url: string) {
    this.image = { url }
    return this
  }

  public setTimestamp(time: Date = new Date()) {
    this.timestamp = time
    return this
  }

  public setTitle(title: string) {
    this.title = title.toString().substr(0, 256)
    return this
  }

  public setThumbnail(url: string) {
    this.thumbnail = { url }
    return this
  }

  public setURL(url: string) {
    this.url = url
    return this
  }

  public addField(name: string, value: string, inline: boolean = false) {
    if (!name || this.fields.length >= 25) return this
    if (!value) return false

    this.fields.push({ name: name.toString().substr(0, 256), value: value.toString().substr(0, 1024), inline })
    return this
  }

  public addBlankField(inline: boolean = false) {
    return this.addField('\u200B', '\u200B', inline)
  }

  attachFile(file: string[]) {
    this.file = file
    return this
  }
}