import axios from 'axios';

export const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!axios.isAxiosError(error)) {
    return fallbackMessage;
  }

  const responseData = error.response?.data;

  if (typeof responseData === 'string' && responseData.trim().length > 0) {
    return responseData;
  }

  if (responseData && typeof responseData === 'object') {
    const message = (responseData as { message?: string | string[] }).message;

    if (Array.isArray(message) && message.length > 0) {
      return message.join(', ');
    }

    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }

  if (error.response?.status === 401) {
    return 'E-mail ou senha invalidos.';
  }

  if (error.response?.status === 409) {
    return 'Ja existe uma conta com este e-mail.';
  }

  if (error.response?.status === 400) {
    return 'Confira os dados informados e tente novamente.';
  }

  return fallbackMessage;
};
