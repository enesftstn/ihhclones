import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, User, Share2 } from "lucide-react"
import Link from "next/link"
import { LiveChatWidget } from "@/components/live-chat-widget"

async function getBlogPost(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/blog?slug=${slug}`,
      {
        cache: "no-store",
      },
    )
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
            <img
              src={post.featured_image || "/placeholder.svg"}
              alt={post.title_en}
              className="w-full h-full object-cover"
            />
          </div>

          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="capitalize">{post.category}</Badge>
              {post.is_featured && <Badge variant="outline">Featured</Badge>}
            </div>

            <h1 className="text-4xl font-bold">{post.title_en}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {post.author_name && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author_name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(post.published_at), "MMMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.view_count} views</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none space-y-4">
            <p className="text-xl text-muted-foreground">{post.excerpt_en}</p>
            <div className="border-t pt-6">
              <div className="whitespace-pre-wrap">{post.content_en}</div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-6">
              <Button>
                <Share2 className="mr-2 h-4 w-4" />
                Share Article
              </Button>
              <Button variant="outline" asChild>
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <LiveChatWidget />
    </div>
  )
}
