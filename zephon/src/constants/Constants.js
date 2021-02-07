
export const port = 5000;
export const baseUrl = `http://localhost:${port}/`;
export const chatsUrl = `${baseUrl}chats`;
export const authUrl = `${baseUrl}auth`;


export const getDate = (format) =>{
    const today = new Date(format);
    const hour = today.getHours();
    const minutes = today.getMinutes();

    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const addZero = (number) => {
      return number < 10 ? `0${number}` : number;
    }

    return `${addZero(hour)}:${addZero(minutes)} ${addZero(day)}/${addZero(month)}/${year}`
  }