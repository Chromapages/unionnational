import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('service').title('Services'),
      S.divider(),
      S.listItem()
        .title('Shop')
        .child(
          S.list()
            .title('Shop Content')
            .items([
              S.listItem()
                .title('Settings')
                .child(
                  S.document()
                    .schemaType('shopSettings')
                    .documentId('shopSettings')
                ),
              S.documentTypeListItem('product').title('Products'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog Content')
            .items([
              S.listItem()
                .title('Settings')
                .child(
                  S.document()
                    .schemaType('blogSettings')
                    .documentId('blogSettings')
                ),
              S.documentTypeListItem('blogPost').title('All Posts'),
              S.documentTypeListItem('blogCategory').title('Categories'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Team Page')
        .child(
          S.document()
            .schemaType('teamPage')
            .documentId('teamPage')
        ),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['teamPage', 'teamMember', 'blogPost', 'blogCategory', 'blogSettings', 'service', 'product', 'shopSettings'].includes(item.getId()!)
      ),
    ])
