import { api } from 'src/boot/axios';
import { Company } from 'src/interfaces/entities/company';

export class CompanyService {
  static findOne(companyId: string): Promise<Company> {
    return api
      .get(`companies/${companyId}`)
      .then((response) => response.data as Company)
      .catch();
    // return Promise.resolve([{ id: '124', name: 'Company A' }]);
  }
}
