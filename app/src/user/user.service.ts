import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { argumentsAssert } from '../../errors';
import { User } from './user.entity';
import { UserRole } from './roles/role.enum';
import { updateUserBossDto } from './user.dto';
import { UserHelper } from './user.helper';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(UserHelper)
    private readonly helper: UserHelper,
  ) {
  }

  getList(user: any): Promise<User[]> {
    const userId = user.id;
    const role = user.role;

    const handlersByRole = {
      admin  : () => this.userRepository.find(),
      boss   : () => this.helper.getSubordinatesDeep(user),
      regular: () => this.userRepository.findOneBy({ id: userId }),
    };

    return handlersByRole[role]();
  }

  async update(boss: any, userId: number, newBossDto: updateUserBossDto): Promise<User> {
    const isUserSubordinate = await this.helper.isSubordinate(boss.id, userId);

    argumentsAssert(isUserSubordinate, 'Provided user is not your subordinate');

    const userToUpdate = await this.userRepository.findOneBy({ id: userId });

    const oldBossId = userToUpdate.bossId;
    const newBossId = newBossDto.id;

    userToUpdate.bossId = newBossId;

    const updatedUser = await this.userRepository.save(userToUpdate);

    if (oldBossId !== newBossId) {
      await this.updateBossRolesIfNeed(oldBossId, newBossId);
    }

    return updatedUser;
  }

  private async updateBossRolesIfNeed(oldBossId: number, newBossId: number): Promise<void> {
    const [subordinatesOfOldBoss, newBoss] = await Promise.all([
      this.userRepository.find({
        where : { bossId: oldBossId },
        select: ['id'],
      }),
      this.userRepository.findOne({
        where    : { id: newBossId },
        select   : ['id', 'role'],
      }),
    ]);

    if (!subordinatesOfOldBoss.length) {
      await this.updateUserRole(oldBossId, UserRole.Regular);
    }

    if (newBoss.role !== UserRole.Boss) {
      await this.updateUserRole(newBossId, UserRole.Boss);
    }
  }

  updateUserRole(id: number, roleName: UserRole): Promise<User> {
    const userToUpdate = new User({ id });

    userToUpdate.role = roleName;

    return this.userRepository.save(userToUpdate);
  }
}