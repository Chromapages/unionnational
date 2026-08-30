# Footer claim verification

The footer draws contact and social destinations from Site Settings. The following fields document the required internal verification record; they do not display publicly.

| Claim family | Required Site Settings fields | Review trigger |
| --- | --- | --- |
| Enrolled Agent credential | `credentialVerifiedBy`, `credentialVerifiedAt` | Credential renewal, team change, or annual review |
| Address, phone, email | `contactDetailsVerifiedBy`, `contactDetailsVerifiedAt` | Any office/contact change or quarterly review |
| Social profiles | `socialLinksVerifiedBy`, `socialLinksVerifiedAt` | Profile ownership change or quarterly review |

The office address links to the existing Contact page and is visibly labeled “Office details.” It is hidden by default and requires the `showOfficeAddressInFooter` Site Settings flag after client-facing-office confirmation. Do not replace it with a maps link until a business-approved directions URL is provided.

Credential, direct contact details, and social icons render only when their corresponding verification owner/date fields are populated. When contact verification is incomplete, the footer shows the existing Contact Us route instead of publishing potentially stale address, phone, or email values. Hardcoded fallback profiles are intentionally not published.
