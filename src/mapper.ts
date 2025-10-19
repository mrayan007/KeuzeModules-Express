import { MappingPair, MapperConfiguration } from '@dynamic-mapper/mapper';
import User from './Domain/Entities/User';
import { OutputUserDTO } from './Interface/DTOs/output';
import { InputLoginUserDTO, InputRegisterUserDTO } from './Interface/DTOs/input';

// input dtos
export const LoginInputToUser = new MappingPair<InputLoginUserDTO, User>();
export const RegisterInputToUser = new MappingPair<InputRegisterUserDTO, User>();

// output dtos
export const OutputUser = new MappingPair<User, OutputUserDTO>();


// config
const config = new MapperConfiguration(cfg => {
    cfg.createAutoMap(OutputUser, {})
    .forSourceMember('password', opt => opt.ignore());

    cfg.createAutoMap(LoginInputToUser, {
        'name': () => null
    });

    cfg.createAutoMap(RegisterInputToUser, {});
});

const mapper = config.createMapper();
export default mapper;