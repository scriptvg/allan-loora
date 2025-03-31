import { useState } from 'react';


const generarIdUnico = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substr(2, 9);
  return `id_${timestamp}_${randomString}`;
};

const useGeneradorId = () => {
  const [id, establecerId] = useState(() => generarIdUnico());

  const regenerarId = () => {
    establecerId(generarIdUnico());
  };

  return { id, regenerarId };
};

export default useGeneradorId;
