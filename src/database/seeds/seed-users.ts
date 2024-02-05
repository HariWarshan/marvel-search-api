import { UserModel } from '../entity/user.model';
import AppDataSource from '..';
import { IUserModel } from '../../types/db-model-types';
import { v4 as uuidv4 } from 'uuid';
import { generateSaltedHash } from '../../utils';

const seedUsers = async () => {

  await AppDataSource.initialize()
  const userRepository = AppDataSource.getRepository(UserModel)

  const dummyUsers: Partial<IUserModel>[] = [
    { name: 'Akash', email: 'akash@test.com', password: generateSaltedHash('ironman-here', process.env.PASSWORD_SALT_VALUE as string),  phone_number: '9000100020', uuid: uuidv4(), },
    { name: 'John', email: 'john@test.com', password: generateSaltedHash('DoctorStrange@Portals', process.env.PASSWORD_SALT_VALUE as string),  phone_number: '8000100020', uuid: uuidv4(), },
  ];

  try{
    await userRepository.save(dummyUsers);
    console.log('[seed]: data seeded successfully')
    process.exit(0)
  }catch(err){
    console.log('[seed-error]: error in seeding data', err)
    process.exit(1)
  }
  finally{
    AppDataSource.destroy()
  }
};

seedUsers();
