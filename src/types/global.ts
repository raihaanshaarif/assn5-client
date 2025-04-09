

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TUserPayload = {
  _id: string;
  id: string;
  user: string;
  name: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  gender: 'male' | 'female' | 'other'; // You can adjust based on your app logic
  email: string;
  contactNo: string;
  isDeleted: boolean;
  fullName: string;
};

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};