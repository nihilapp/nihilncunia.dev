import { tools, type Tools } from '@/_libs';
import { Bcrypt } from '@/api/_libs/tools/bcrypt';
import { Cookie } from '@/api/_libs/tools/cookie';
import { Jwt } from '@/api/_libs/tools/jwt';

interface ServerTools extends Tools {
  bcrypt?: Bcrypt;
  jwt?: Jwt;
  cookie?: Cookie;
}

const serverTools: ServerTools = { ...tools, };

serverTools.bcrypt = new Bcrypt();
serverTools.jwt = new Jwt();
serverTools.cookie = new Cookie();

export { serverTools };
