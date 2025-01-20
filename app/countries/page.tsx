import { createClient } from "@/utils/supabase/server"

type Country = {
  id: string
  name: string
}

export default async function Countries() {
  const supabase = await createClient()
  const { data: countries } = await supabase.from("countries").select()

  return (
    <>
      <h1>Countries:</h1>
      {countries?.map((country: Country )=> (
        <div key={country.id}>
          <h2>{country.name}</h2>
        </div>
      ))}
    </>
  )
}
