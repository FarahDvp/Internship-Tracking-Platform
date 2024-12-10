import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://isamm:BibpnrhxyDhXPrkk@cluster0.mlnuqdm.mongodb.net/test',
  database: 'Cluster0',
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};

