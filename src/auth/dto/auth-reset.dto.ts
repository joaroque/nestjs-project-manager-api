import { IsJWT, IsStrongPassword,  } from "class-validator";

export class AuthResetDto {
   
    @IsJWT()
    token: string;

    @IsStrongPassword({ 
        "minLength": 10, 
        "minLowercase": 0, 
        "minSymbols": 0, 
        "minUppercase": 0 
    })
    password: string;
    
}