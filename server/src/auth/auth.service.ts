import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signup(signupDto: SignupDto) {
    const { First_Name, Last_Name, email, Password } = signupDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const newUser = new this.userModel({
      First_Name,
      Last_Name,
      email,
      Password,
      Last_Login: new Date(),
    });

    await newUser.save();

    const token = this.jwtService.sign(
      { userId: newUser._id, email: newUser.email },
      { expiresIn: '24h' }
    );

    return {
      success: true,
      message: 'Account created successfully',
      data: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.First_Name,
        lastName: newUser.Last_Name,
        token,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, Password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user || user.Password !== Password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    user.Last_Login = new Date();
    await user.save();

    const token = this.jwtService.sign(
      { userId: user._id, email: user.email },
      { expiresIn: '24h' }
    );

    return {
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.First_Name,
        lastName: user.Last_Name,
        token
      },
    };
  }
}