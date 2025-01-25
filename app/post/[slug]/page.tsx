import { createClient } from "@/utils/supabase/server"
import Post from "@components/ui/Post"
import ContentBoard from "@/app/components/ui/ContentBoardLayout"

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

  return (
    <ContentBoard>
      <Post {...postData} />
    </ContentBoard>
  )
}
