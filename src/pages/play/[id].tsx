import invariant from "tiny-invariant";
import { Answer } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { useLeavePageConfirm } from "~/utils/useLeavePageConfirm";

type InitialValues = {
  answer: Answer | undefined;
  answers: Answer[];
};

export default function Play() {
  const {
    query: { id },
  } = useRouter();
  const { mutateAsync } = api.sessions.updateWithAnswer.useMutation();
  const { data: questions } = api.questions.getAll.useQuery();

  useLeavePageConfirm();
  const [idx, setIdx] = useState(0);
  const [optionSelected, setOptionSelected] = useState<string | undefined>(
    undefined
  );

  const initialValues: InitialValues = {
    answer: undefined,
    answers: [],
  };

  const handleFormSubmit = (e: any) => {
    if (!optionSelected || optionSelected !== e.answer) {
      setOptionSelected(e.answer);
      return;
    }

    invariant(typeof id === "string", "id should be a string");

    mutateAsync({
      id,
      answerId: optionSelected,
    })
      .then(() => {
        setOptionSelected(undefined);

        if (idx + 1 === questions?.length) {
          alert("finished");
        }

        setIdx(idx + 1);
      })
      .catch(() => {
        alert("something is not right");
      });
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
        {questions && questions.length > 0 ? (
          <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <p className="text-2xl">{questions[idx]?.text}</p>
                <div className="flex flex-col gap-2">
                  {questions[idx]?.answers?.map((answer) => (
                    <label
                      key={answer.id}
                      className={`${
                        optionSelected === answer.id
                          ? "bg-red-400"
                          : "bg-slate-400"
                      } select-none px-4 py-2 hover:cursor-pointer`}
                    >
                      <span>{answer.text}</span>
                      <Field
                        className="hidden"
                        name="answer"
                        onClick={handleSubmit}
                        type="radio"
                        value={answer.id}
                      />
                    </label>
                  ))}
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <h1>We don't have any question to show here</h1>
        )}
      </main>
    </>
  );
}
