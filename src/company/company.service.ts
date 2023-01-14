import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}
  async create(companyDto: CompanyDto): Promise<Company> {
    return this.companyModel.create({ ...companyDto });
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.findAll();
  }

  async findOne(id: number): Promise<Company> {
    return this.companyModel.findByPk(id);
  }

  async update(id: number, companyDto: CompanyDto): Promise<Company> {
    await this.companyModel.update(companyDto, {
      where: {
        id: id,
      },
    });

    return this.findOne(id);
  }

  async searchByName(name: string): Promise<Company[]> {
    return this.companyModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })
  }

  async remove(id: number): Promise<boolean> {
    const countDelete = await this.companyModel.destroy({
      where: {
        id: id,
      },
    });

    if(countDelete > 0) {
      return true
    } else {
      return false
    }
     
  }
}
