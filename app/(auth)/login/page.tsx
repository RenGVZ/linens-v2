import { login, signup } from "./actions"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full space-y-4">
      <form className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-xs">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-md h-8 text-black p-2"
        />
        <label htmlFor="password" className="text-xs">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="rounded-md h-8 text-black p-2"
        />
        <button
          className="bg-blue-500 rounded-lg h-8 font-bold"
          formAction={login}
        >
          Log in
        </button>
        <button
          className="bg-blue-950 rounded-lg h-8 font-bold"
          formAction={signup}
        >
          Sign up
        </button>
      </form>
    </div>
  )
}
