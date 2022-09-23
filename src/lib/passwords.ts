import bcrypt from 'bcrypt';

export const compare = async (password: string, hash: string) => 
  bcrypt.compare(password, hash);
