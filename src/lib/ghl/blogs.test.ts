import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getGhlPostBySlug, getGhlPosts } from './blogs'

// Mock the auth module
vi.mock('./auth', () => ({
  getGhlAccessToken: vi.fn().mockResolvedValue('fake-token'),
}))

describe('GHL Blogs Utility', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    process.env.GHL_LOCATION_ID = 'fake-location'
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('maps raw GHL posts to canonical format', async () => {
    const mockRawData = {
      posts: [
        {
          id: 'post-1',
          title: 'Test Post',
          slug: 'test-post',
          description: 'A test description',
          body: '<p>Test body</p>',
          imageUrl: 'https://test.com/img.jpg',
          publishedAt: '2026-05-01T12:00:00Z',
          author: { name: 'Test Author' },
          categories: ['Category 1', { name: 'Category 2' }],
        },
      ],
      total: 1,
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockRawData,
    } as Response)

    const result = await getGhlPosts('blog-1')

    expect(result.posts).toHaveLength(1)
    const post = result.posts[0]
    expect(post.id).toBe('post-1')
    expect(post.title).toBe('Test Post')
    expect(post.excerpt).toBe('A test description')
    expect(post.content).toBe('<p>Test body</p>')
    expect(post.categories).toEqual(['Category 1', 'Category 2'])
    expect(post.authorName).toBe('Test Author')
  })

  it('returns empty list and total 0 on API error', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Error' }),
    } as Response)

    const result = await getGhlPosts('blog-1')
    expect(result.posts).toHaveLength(0)
    expect(result.total).toBe(0)
  })

  it('returns mock data in development when credentials missing', async () => {
    delete process.env.GHL_LOCATION_ID
    vi.stubEnv('NODE_ENV', 'development')

    const result = await getGhlPosts('blog-1')
    expect(result.posts.length).toBeGreaterThan(0)
    expect(result.total).toBeGreaterThan(0)
  })

  it('returns an empty response in production when credentials are missing', async () => {
    delete process.env.GHL_LOCATION_ID
    vi.stubEnv('NODE_ENV', 'production')

    const result = await getGhlPosts('blog-1')

    expect(result).toEqual({ posts: [], total: 0 })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('falls back fields when optional GHL fields are missing', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        posts: [
          {
            id: 'post-2',
            title: 'Fallback Post',
            slug: 'fallback-post',
            excerpt: 'Fallback excerpt',
            content: '<p>Fallback content</p>',
            featuredImage: 'https://test.com/fallback.jpg',
            createdAt: '2026-05-02T12:00:00Z',
            categories: [{ name: 'Fallback Category' }],
          },
        ],
      }),
    } as Response)

    const result = await getGhlPosts('blog-1')

    expect(result.total).toBe(1)
    expect(result.posts[0]).toMatchObject({
      excerpt: 'Fallback excerpt',
      content: '<p>Fallback content</p>',
      featuredImage: 'https://test.com/fallback.jpg',
      publishedDate: '2026-05-02T12:00:00Z',
      authorName: 'Union National Team',
      categories: ['Fallback Category'],
    })
  })

  it('returns an empty list when fetch throws', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network down'))

    const result = await getGhlPosts('blog-1')

    expect(result).toEqual({ posts: [], total: 0 })
  })

  it('finds a post by slug from the fetched list', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        posts: [
          { id: 'post-1', title: 'One', slug: 'one', publishedAt: '2026-05-01T12:00:00Z' },
          { id: 'post-2', title: 'Two', slug: 'two', publishedAt: '2026-05-02T12:00:00Z' },
        ],
        total: 2,
      }),
    } as Response)

    await expect(getGhlPostBySlug('blog-1', 'two')).resolves.toMatchObject({
      id: 'post-2',
      slug: 'two',
    })
    await expect(getGhlPostBySlug('blog-1', 'missing')).resolves.toBeNull()
  })
})
