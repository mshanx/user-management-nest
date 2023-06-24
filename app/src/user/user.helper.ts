import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { omit } from '../../utils/object';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserHelper {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async isSubordinate(bossId: number, userId: number): Promise<boolean> {
    const query = `
      WITH RECURSIVE subordinates AS (
        SELECT id, bossId
        FROM users
        WHERE id = ${userId}
        UNION ALL
        SELECT u.id, u.bossId
        FROM users u
        JOIN subordinates s ON u.id = s.bossId
      )
      SELECT COUNT(*) AS isSubordinate
      FROM subordinates
      WHERE id = ${bossId}
    `;

    const result = await this.userRepository.query(query);

    return Boolean(Number(result[0].isSubordinate));
  }

  private async getSubordinates(bossIds: number[]): Promise<any[]> {
    const queryResult = await this.userRepository.createQueryBuilder('u')
      .select([
        'u.id',
        'u.email',
        'u.password',
        'u.name',
        'u.bossId',
        'u.online',
        'COUNT(s.id) AS subordinateCount',
      ])
      .leftJoin('users', 's', 'u.id = s.bossId')
      .leftJoin('roles', 'r', 'u.role = r.name')
      .where('u.bossId IN (:...bossIds)', { bossIds })
      .groupBy('u.id')
      .getRawMany();

    return queryResult.map(row => ({
      id              : row.u_id,
      email           : row.u_email,
      name            : row.u_name,
      bossId          : row.u_bossId,
      online          : Boolean(row.u_online),
      subordinateCount: Number(row.subordinateCount),
    }));
  }

  async getSubordinatesDeep(user: any): Promise<User[]> {
    const result = [user];

    let bossIds = [user.id];

    do {
      const subordinates = await this.getSubordinates(bossIds);

      result.push(...subordinates);

      const subordinatesBosses = subordinates.filter(s => s.subordinateCount > 0);

      const shouldContinue = Boolean(subordinatesBosses.length);

      if (!shouldContinue) {
        break;
      }

      bossIds = subordinatesBosses.map(s => s.id);
    } while (true);

    return result.map(r => plainToInstance(User, omit(r, ['subordinateCount', 'password', 'role'])));
  }
}