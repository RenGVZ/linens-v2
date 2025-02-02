import { createClient } from "@/utils/supabase/server"
import Post from "@/app/components/ui/post/Post"

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()
  const { slug } = await params
  const { data: postData } = await supabase
    .from("posts")
    .select()
    .eq("id", slug)
    .single()

  if (!postData) {
    return <div>Post not found</div>
  }

  return <Post {...postData} />
}
