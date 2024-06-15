import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  loginTokenOptions = {
    aud: 'users',
    exp: '7 days',
    iss: 'login',
  };

  forgetTokenOptions = {
    aud: 'users',
    exp: '30 minutes',
    iss: 'forget',
  };

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User, options) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: options.exp,
          subject: String(user.id),
          issuer: options.iss,
          audience: options.aud,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const user = this.jwtService.verify(token, {
        issuer: 'login',
        audience: 'users',
      });

      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail or password are incorrect.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('E-mail or password are incorrect.');
    }

    return this.createToken(user, this.loginTokenOptions);
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.userService.create(data);

    return this.createToken(user, this.loginTokenOptions);
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async me(token: string) {
    const user = this.checkToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const token = this.createToken(user, this.forgetTokenOptions);

    return { msg: `Your reset password token : ${token.accessToken}` };
  }

  async reset(token: string, password: string) {
    const data = this.jwtService.verify(token, {
      issuer: this.forgetTokenOptions.iss,
      audience: this.forgetTokenOptions.aud,
    });

    if (isNaN(Number(data.id))) {
      throw new BadRequestException('Invalid Token');
    }

    const encryptedPassword = await this.userService.encryptPassword(password);

    const user = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        password: encryptedPassword,
      },
    });

    return this.createToken(user, this.loginTokenOptions);
  }
}
