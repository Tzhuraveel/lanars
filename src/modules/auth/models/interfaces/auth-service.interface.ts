import { SignUpRequestDto } from '../dtos/request/sign-up-request.dto';
import { TokensResponseDto } from '../dtos/response/tokens-response.dto';

export interface AuthServiceInterface {
  login(userId: number): Promise<TokensResponseDto>;
  refresh(userId: number): Promise<TokensResponseDto>;
  signUp(dto: SignUpRequestDto): Promise<TokensResponseDto>;
  logout(userId: number): Promise<void>;
}
