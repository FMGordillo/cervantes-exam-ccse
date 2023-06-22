import Head from "next/head";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { mutateAsync } = api.sessions.create.useMutation();

  const handleNewSession = () => {
    mutateAsync()
      .then((data) => {
        void router.push(`/play/${data.id}`);
      })
      .catch(() => alert("cannot play :c"));
  };

  return (
    <>
      <Head>
        <title>Ensayo de Examen CCSE Cervantes</title>
        <meta
          name="description"
          content="Ensayo de examen CCSE para obtener nacionalidad española"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-200 to-slate-600 text-black dark:from-[#2e026d] dark:to-[#15162c] dark:text-white">
        <h1 className="text-3xl">CCSE Exam</h1>
        <p>
          Disclaimer: These questions are taken from the official app, this is
          just a recreational web application
        </p>
        <div className="flex gap-4">
          <button onClick={handleNewSession} className="rounded bg-slate-400">
            Start
          </button>
          <button className="rounded bg-slate-400">Scoreboard</button>
        </div>
      </main>
    </>
  );
}
