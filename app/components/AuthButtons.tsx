import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database";

interface AuthButtonsProps {
  client: SupabaseClient<Database>;
}

export default function AuthButtons({ client }: AuthButtonsProps) {
  const [session, setSession] = useState<typeof client.auth.session>();

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, [client]);

  return session ? (
    <button
      onClick={() => client.auth.signOut()}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Sign Out
    </button>
  ) : (
    <div className="flex gap-2">
      <button
        onClick={() => client.auth.signInWithOAuth({ provider: "github" })}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Sign In with GitHub
      </button>
      <button
        onClick={() => client.auth.signInWithOAuth({ provider: "google" })}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign In with Google
      </button>
    </div>
  );
}
