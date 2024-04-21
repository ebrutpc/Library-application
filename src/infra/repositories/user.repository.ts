import { UserRepository } from 'domain/entities/entitiesWithRepository';
import { User } from '../../domain/entities/user.entity';
import ConflictError from '../../common/errors/conflict.error';
import InternalServerError from '../../common/errors/internalServer.error';

class UserRepositories {
  static async getUsers(): Promise<User[]> {
    return UserRepository.find();
  }

  static async getUserById(id: number): Promise<User | null> {
    return UserRepository.findOne({ where: { id } });
  }
  static async createUser(name: string): Promise<void> {
    const user = UserRepository.create({ name });
    try {
      const found = await UserRepository.findOne({
        where: { name: user.name },
      });
      if (found) {
        throw new ConflictError('User already exists.');
      }
      await UserRepository.save(user);
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error;
      } else {
        throw new InternalServerError();
      }
    }
  }
}

export default UserRepositories;
