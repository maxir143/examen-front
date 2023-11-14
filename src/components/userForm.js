"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { object, string, number } from "yup";

const schema = object({
  name: string().required("campo requerido"),
  age: number()
    .required("campo requerido")
    .positive("no se aceptan valores negativos")
    .integer("numero invalido")
    .min(18, "necesitas ser mayor de edad"),
  title: string().required("campo requerido"),
});

export function UserForm() {
  const router = useRouter();
  return (
    <Formik
      onSubmit={({ name, title, age }) => {
        router.push(`/welcome?name=${name}&title=${title}&age=${age}`);
      }}
      initialValues={{
        name: "",
        title: "",
        age: 0,
      }}
      validationSchema={schema}
      validateOnBlur
      validateOnChange
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-5 w-full max-w-lg">
          <h1 className="text-2xl font-medium py-5">Nuevo usuario</h1>
          {/* NAME */}
          <label className="flex flex-col gap-1">
            Nombre: *
            <Field type="text" name="name" required />
            <ErrorMessage
              name="name"
              component="small"
              className="text-red-500"
            />
          </label>

          {/* Title */}
          <label className="flex flex-col gpa-1">
            Profesión: *
            <Field type="text" name="title" component="select" required>
              <option value="" disabled>
                selecciona una profesión
              </option>
              <option value="maestro">maestro</option>
              <option value="programador">programador</option>
              <option value="doctor">doctor</option>
            </Field>
            <ErrorMessage
              name="title"
              component="small"
              className="text-red-500"
            />
          </label>

          {/* Age */}
          <label className="flex flex-col gap-1">
            Edad: *
            <Field type="number" name="age" required />
            <ErrorMessage
              name="age"
              component="small"
              className="text-red-500"
            />
          </label>

          <button
            className="bg-purple-700 focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            type="submit"
            disabled={isSubmitting}
          >
            Siguiente
          </button>
        </Form>
      )}
    </Formik>
  );
}
