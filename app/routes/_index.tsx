import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChatInterface from "~/components/ChatInterface";
import AuthButtons from "~/components/AuthButtons";
import { createBrowserClient } from "~/utils/supabase.client";
import { createServerClient } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "AI Chat Interface" },
    { name: "description", content: "Supabase-powered AI chat application" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  return json({ session });
};

export default function Index() {
  const { session } = useLoaderData<typeof loader>();
  const supabase = createBrowserClient();

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          AI Chat
        </h1>
        <AuthButtons client={supabase} />
      </header>
      
      <main className="h-[calc(100vh-130px)] overflow-hidden">
        {session ? (
          <ChatInterface />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-600 dark:text-gray-400">
            Please sign in to start chatting
          </div>
        )}
      </main>
    </div>
  );
}
