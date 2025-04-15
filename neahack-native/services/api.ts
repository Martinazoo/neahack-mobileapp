export const uploadImage = async (uri: string) => {
  const filename = uri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename || '');
  const type = match ? `image/${match[1]}` : `image`;

  const formData = new FormData();
  formData.append('photo', {
    uri,
    name: filename,
    type,
  } as any); // 👈 necesario en React Native

  try {
    const response = await fetch('http://172.20.10.4:8000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Imagen subida correctamente:', data);
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch('http://172.20.10.4:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registro fallido');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('http://172.20.10.4:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    return data; 
    //save the token in the future
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};
