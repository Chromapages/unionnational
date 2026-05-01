import { getGhlPosts } from "./src/lib/ghl/blogs";

async function debugGhlConnection() {
    console.log("🚀 Starting GHL Connection Debug...");
    
    const blogId = process.env.GHL_BLOG_ID;
    const locationId = process.env.GHL_LOCATION_ID;
    
    console.log(`Checking IDs: 
    - Blog ID: ${blogId ? "✅ " + blogId : "❌ Missing"}
    - Location ID: ${locationId ? "✅ " + locationId : "❌ Missing"}`);

    if (!process.env.GHL_CLIENT_ID || !process.env.GHL_CLIENT_SECRET) {
        console.log("\n❌ CRITICAL: GHL_CLIENT_ID or GHL_CLIENT_SECRET is missing in .env.local");
        console.log("Please add your GHL API credentials to enable live blog fetching.");
        return;
    }

    try {
        // We pass the blogId we identified earlier
        const { posts, total } = await getGhlPosts(blogId || "", 10);
        
        console.log(`\n📊 API Response:
        - Total Posts Found in GHL: ${total}
        - Posts Successfully Fetched: ${posts.length}`);

        if (posts.length > 0) {
            console.log("\n✅ Success! Found these posts:");
            posts.forEach(p => console.log(`   - ${p.title} (${new Date(p.publishedDate).toLocaleDateString()})`));
        } else {
            console.log("\n⚠️ No posts returned. Check if they are set to 'Published' (not Draft) in GHL.");
        }
    } catch (error) {
        console.error("\n❌ Connection Failed:", error);
    }
}

debugGhlConnection();
