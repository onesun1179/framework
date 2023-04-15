import { UserEntity } from '@modules/user/entity/user.entity';
import { JwtStrategy } from '@auth/strategy';

// iss: 토큰 발급자 (issuer)
// sub: 토큰 제목 (subject)
// aud: 토큰 대상자 (audience)
// exp: 토큰의 만료시간 (expiraton), 시간은 NumericDate 형식으로 되어있어야 하며 (예: 1480849147370) 언제나 현재 시간보다 이후로 설정되어있어야합니다.
//   nbf: Not Before 를 의미하며, 토큰의 활성 날짜와 비슷한 개념입니다. 여기에도 NumericDate 형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는 토큰이 처리되지 않습니다.
//   iat: 토큰이 발급된 시간 (issued at), 이 값을 사용하여 토큰의 age 가 얼마나 되었는지 판단 할 수 있습니다.
//   jti: JWT의 고유 식별자로서, 주로 중복적인 처리를 방지하기 위하여 사용됩니다. 일회용 토큰에 사용하면 유용합니다.
export class AccessToken extends JwtStrategy {
  userId!: UserEntity['id'];
  googleAccessToken!: string;
  iat!: number;
  exp!: number;
  // 구글 토큰
  accessToken!: string;
}
