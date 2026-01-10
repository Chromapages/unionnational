import { type SchemaTypeDefinition } from 'sanity'
import { teamMember } from './teamMember'
import { teamPage } from './teamPage'
import { blogPost } from './blogPost'
import { blogCategory } from './blogCategory'
import { blogSettings } from './blogSettings'
import { service } from './service'
import { product } from './product'
import { shopSettings } from './shopSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teamMember, teamPage, blogPost, blogCategory, blogSettings, service, product, shopSettings],
}
