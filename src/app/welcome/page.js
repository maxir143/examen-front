"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ searchParams }) {
  const [image, setImage] = useState(null);
  const [welcome, setWelcome] = useState(false);

  const { name, title, age } = searchParams;

  useEffect(() => {
    if (image) alert("imagen cargada correctamente");
  }, [image]);

  if (!name || !title || !age) {
    redirect("/");
  }

  function handleClick() {
    setWelcome(true);
  }

  if (welcome) {
    return (
      <>
        <div className="flex flex-col gap-5 p-5 border-2 border-zinc-100 rounded-xl shadow-lg max-w-lg bg-purple-900 text-white">
          <h3 className="text-500 text-2xl border-b-2 border-white pb-2">
            Bienvenido
          </h3>
          <p>
            {name}, profesión {title}, edad {age}.
          </p>
          <small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            ipsum enim, porta eu dui pellentesque, congue volutpat est. Donec
            quis est venenatis, laoreet enim sed, egestas velit. Cras non urna.
          </small>
          <img
            className="object-cover w-full max-w-lg aspect-video object-center"
            src={image}
            alt="profile image"
          />
        </div>
        <div className="w-full flex justify-end">
          <a
            href="/"
            className="bg-red-500 rounded-xl text-white font-bold p-3 py-1"
          >
            Nuevo usuario
          </a>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg">
      <h1 className="text-2xl font-medium py-5">Cargar imagen de perfil</h1>
      <label>
        Nombre:
        <input value={name} disabled />
      </label>
      <label>
        Profesión:
        <input value={title} disabled />
      </label>
      <label>
        Edad:
        <input value={age} disabled />
      </label>

      <label>
        Foto:
        <input
          type="file"
          onChange={(ev) => {
            try {
              const url = URL.createObjectURL(ev.target.files?.[0]);
              if (!url) return;
              setImage(url);
            } catch {
              console.error("error al cargar imagen");
            }
          }}
          accept="image/png, image/jpeg"
        />
      </label>
      {image && (
        <>
          <img
            className="object-cover w-full max-w-lg aspect-video object-center"
            src={image}
            alt="profile image"
          />
          <button
            onClick={handleClick}
            className="bg-purple-700 focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            type="submit"
          >
            Siguiente
          </button>
        </>
      )}
    </div>
  );
}
