import { Repository, getRepository } from "typeorm";
import User from "../entities/User";
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
// SOLID
class UsersRepository implements IUsersRepository {
  private ormRepository : Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user || undefined;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user || undefined;
  }


  public async create(userDate: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userDate);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
     return this.ormRepository.save(user);
  }

}

export default UsersRepository;
