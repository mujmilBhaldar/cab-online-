interface Name {
  first: string;
  last: string;
}

interface UserModel {
  _id?: string;
  id?: number;
  name?: Name;
  mobile?: string;
  email?: string;
  password?: string;
  status?: number;
  createdAt?: Date;
}

export default UserModel;
