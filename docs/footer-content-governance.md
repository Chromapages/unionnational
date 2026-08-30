# Footer content governance

## Authoritative sources

| Footer content | Source | Owner / review |
| --- | --- | --- |
| Copyright year | Server-rendered `new Date().getFullYear()` | No editor action required |
| Copyright text | Site Settings `copyrightText` | Legal content owner |
| Phone, email, office-display flag, social URLs | Site Settings | Contact/social verification owner |
| Footer credential label/detail | Site Settings `footerCredentialLabel` / `footerCredentialDetail` | Credential verification owner |
| Footer legal disclaimer summary | Site Settings `footerDisclaimerSummary` | Legal-content verification owner |
| Service, company, resource, and legal route inventory | `Footer.tsx` `navigationGroups` / `legalLinks` | Product/navigation owner |

Desktop and mobile footer navigation consume the same `navigationGroups` data, so they cannot drift into separate inventories. The legal summary is controlled legal content, not editable marketing copy: review changes with `legalContentVerifiedBy` and `legalContentVerifiedAt`.
