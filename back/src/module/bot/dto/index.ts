import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SendAppDTO {
	@IsString()
	@IsNotEmpty()
	name: string;
	
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber()
	phone: string;
	
	@IsNotEmpty()
	@IsEmail()
	email: string;
	
	@IsString()
	tourName: string;
}
