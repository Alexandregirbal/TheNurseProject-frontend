import { api } from 'src/boot/axios';
import { Company } from 'src/interfaces/entities/company';
import { Round } from 'src/interfaces/entities/round';

export class RoundService {
  static createOne(company: Partial<Company>, round: Round): Promise<Round> {
    return api
      .post(`companies/${company._id}/rounds`, round)
      .then((response) => response.data as Round)
      .catch(() => null);
  }

  /**
   * Get all rounds for a company
   */
  static getAll(company: Partial<Company>): Promise<Round[]> {
    return api
      .get(`companies/${company._id}/rounds`)
      .then((response) => response.data as Round[])
      .catch(() => null);
  }
}
