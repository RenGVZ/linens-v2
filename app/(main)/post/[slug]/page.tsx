import { createClient } from "@/utils/supabase/server"
import Post from "@components/ui/post/Post"

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

  const { data: commentData } = await supabase
    .from("comments")
    .select()
    .in("id", postData?.comment_ids || [])
    .order("created_at", { ascending: false })

  if (!postData) {
    return <div>Post not found</div>
  }

  return (
    <>
      <Post {...postData} />
      {commentData &&
        commentData.length > 0 &&
        commentData.map((comment) => {
          return <Post key={comment.id} {...comment} />
        })}
    </>
  )
}
