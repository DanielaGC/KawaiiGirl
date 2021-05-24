export interface CommandInterface {
  name: string
  aliases?: string[]
  description?: string
  category: string
  permissions?: object[]
}