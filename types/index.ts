type Post = {
  id: string
  content: string
  created_at: string
  likes: number
  user_id: string
}

type User = {
  uuid: string
  email: string
  created_at: string
  display_name: string
  post_ids: string[]
  profile_pic: string
}

export type { Post, User }
