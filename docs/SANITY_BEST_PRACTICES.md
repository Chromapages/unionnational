# Sanity CMS Best Practices

## Key Lessons from UNT Blog Project

### 1. Query Schema First
Always query existing content to match exact format:
```bash
# Get exact field structure from existing post
curl -s "https://PROJECT.api.sanity.io/v2021-10-21/data/query/DATASET?query=*[_type==\"blogPost\"][0]" \
  -H "Authorization: Bearer $TOKEN"

# Get category IDs
curl -s "https://PROJECT.api.sanity.io/v2021-10-21/data/query/DATASET?query=*[_type==\"blogCategory\"]" \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Image Upload (Critical!)
Use `--data-binary` with `Content-Type` header - NOT `-F` form upload:
```bash
curl -s -X POST "https://PROJECT.api.sanity.io/v2024-02-25/assets/images/DATASET" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: image/jpeg" \
  --data-binary "@/path/to/image.jpg"
```

### 3. Bilingual Fields
For bilingual content (EN/ES), use object format:
```json
{
  "title": {"en": "English Title", "es": "Spanish Title"},
  "excerpt": {"en": "English excerpt...", "es": "Spanish excerpt..."},
  "body": {
    "en": [...blocks],
    "es": [...blocks]
  }
}
```

### 4. Body Blocks Need _key
Each block needs a unique `_key`:
```json
[
  {"_key": "e1", "_type": "block", "style": "h2", "children": [{"_type": "span", "text": "Title"}]},
  {"_key": "e2", "_type": "block", "style": "normal", "children": [{"_type": "span", "text": "Content"}]}
]
```

### 5. Correct Reference Types
- Categories: Use `blogCategory` type, not `category`
- Authors: Use `teamMember` reference
- Images: Use `image-xxx` asset references (not `file-xxx`)

### 6. One Complete Mutation > Many Patches
Create post with EVERYTHING in one call:
```json
{
  "mutations": [{
    "create": {
      "_type": "blogPost",
      "_id": "post-slug",
      "title": {"en": "...", "es": "..."},
      "slug": {"_type": "slug", "current": "post-slug"},
      "excerpt": {"en": "...", "es": "..."},
      "body": {"en": [...], "es": [...]},
      "author": {"_type": "reference", "_ref": "AUTHOR_ID"},
      "categories": [{"_type": "reference", "_ref": "CATEGORY_ID", "_key": "1"}],
      "featuredImage": {"_type": "image", "asset": {"_ref": "IMAGE_ASSET_ID"}},
      "keywords": [{"_key": "k1", "_type": "string", "value": "keyword"}],
      "metaTitle": "...",
      "metaDescription": "...",
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "readingTime": 5
    }
  }]
}
```

### Project Credentials (Reference)
- **Project ID:** p1x9y3wz
- **Dataset:** production
- **API Endpoint:** https://p1x9y3wz.api.sanity.io/v2024-02-25/data/mutate/production
- **Asset Endpoint:** https://p1x9y3wz.api.sanity.io/v2024-02-25/assets/images/production
- **Token:** (from .env - use write token for mutations)

---
*Last updated: 2026-02-25*
