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
    const user = {
      id: uuidv4(),
      name: name,
      admin: false,
      email: email,
      created_at: new Date(),
      updated_at: new Date(),
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
    const newUser = {...receivedUser, admin: true}
    const indexOld = this.users.findIndex(item => item.id === newUser.id)
    this.users[indexOld] = newUser
    return newUser
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
