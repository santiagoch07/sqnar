"use client";

import { useEffect, useState } from "react";

export default function TimeGreeting({ nombre }: { nombre: string }) {
  const [saludo, setSaludo] = useState(`Hola, ${nombre}`);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setSaludo(`Buen día, ${nombre}`);
    else if (hour >= 12 && hour < 19) setSaludo(`Buenas tardes, ${nombre}`);
    else setSaludo(`Buenas noches, ${nombre}`);
  }, [nombre]);

  return (
    <h1 className="text-4xl font-semibold text-text-strong">{saludo}</h1>
  );
}
