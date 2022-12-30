/* eslint-disable prettier/prettier */
import { Role } from 'src/roles/enums/role.enum';

export class CreateUserDto {
    roles: Role[];
}