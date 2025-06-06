import { tools, type Tools } from '@/_libs';
import { AdminJwt } from '@/api/_libs/tools/admin-jwt';
import { Bcrypt } from '@/api/_libs/tools/bcrypt';
import { Cookie } from '@/api/_libs/tools/cookie';
import { Jwt } from '@/api/_libs/tools/jwt';

interface ServerTools extends Tools {
  bcrypt?: Bcrypt;
  jwt?: Jwt;
  adminJwt?: AdminJwt;
  cookie?: Cookie;
}

const serverTools: ServerTools = { ...tools, };

serverTools.bcrypt = new Bcrypt();
serverTools.jwt = new Jwt();
serverTools.adminJwt = new AdminJwt();
serverTools.cookie = new Cookie();

export { serverTools };
