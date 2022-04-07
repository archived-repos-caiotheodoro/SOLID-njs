import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";
import { v4 as uuidv4 } from 'uuid'
class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    let user = new User();
    user = {
      ...user,
      name,
      email,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(user)


    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find(user => user.id === id)
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email)
  }

  turnAdmin(receivedUser: User): User {
    const user = receivedUser
    user.admin = true
    user.updated_at = new Date()

    return user
 
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
