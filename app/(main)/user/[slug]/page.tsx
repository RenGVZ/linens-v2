import { createClient } from "@/utils/supabase/server"
import ProfilePic from "@components/shared/ProfilePic"
import CreatePostZone from "@components/shared/CreatePostZone"
import { ChartBarSquareIcon, CameraIcon } from "@heroicons/react/24/outline"

const UserPage = async ({ params }: { params: { slug: string } }) => {
  const supabase = await createClient()
  const { slug } = params

  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("uuid", slug)
    .single()

  console.log("data:", userData)
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col w-full px-6 py-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold">{userData.display_name}</h1>
            <p className="text-[15px]">{userData?.email}</p>
          </div>
          <ProfilePic
            userId={userData.uuid}
            profilePic={userData.profile_pic}
            size="large"
          />
        </div>
        <div className="w-full pt-4">
          <span className="text-[15px]">{userData.bio}</span>
        </div>
        <div className="w-full flex justify-between py-3">
          <div className="text-zinc-500">followers</div>
          <div className="flex space-x-2">
            <ChartBarSquareIcon height={24} width={24} />
            <CameraIcon height={24} width={24} />
          </div>
        </div>
        <div className="py-3">
          <button className="w-full flex justify-center border-[0.5px] border-zinc-700 rounded-lg">
            <span className="text-[15px] font-semibold p-1.5">
              Edit profile
            </span>
          </button>
        </div>
      </div>
      <CreatePostZone userProfile={userData} />
    </div>
  )
}

export default UserPage
