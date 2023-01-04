/* eslint-disable prettier/prettier */
interface DefaultResponseDTO<T = any> {
    message: string;
    data?: T;
  }

export default DefaultResponseDTO;