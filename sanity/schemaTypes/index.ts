import { type SchemaTypeDefinition } from 'sanity'
import { service } from './service'
import { hero } from './hero'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, hero],
}