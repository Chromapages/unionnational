import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('caseStudy').title('Case Studies'),
      S.documentTypeListItem('pricingTier').title('Pricing Tiers'),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Page Content')
            .items([
              S.listItem()
                .title('Home Page')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              S.listItem()
                .title('About Page')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              S.listItem()
                .title('Services Page')
                .child(
                  S.document()
                    .schemaType('servicesPage')
                    .documentId('servicesPage')
                ),
              S.listItem()
                .title('Team Page')
                .child(
                  S.document()
                    .schemaType('teamPage')
                    .documentId('teamPage')
                ),
              S.listItem()
                .title('Legal Pages')
                .child(S.documentTypeList('legalPage').title('Legal Pages')),
            ])
        ),
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
        .title('Global Settings')
        .child(
          S.list()
            .title('Global Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Contact Settings')
                .child(
                  S.document()
                    .schemaType('contactSettings')
                    .documentId('contactSettings')
                ),
            ])
        ),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['teamPage', 'teamMember', 'blogPost', 'blogCategory', 'blogSettings', 'service', 'product', 'shopSettings', 'siteSettings', 'testimonial', 'faq', 'homePage', 'aboutPage', 'servicesPage', 'contactSettings', 'caseStudy', 'pricingTier', 'legalPage'].includes(item.getId()!)
      ),
    ])
