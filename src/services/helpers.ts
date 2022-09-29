import hmacsha1 from 'hmacsha1';
import {v4 as uuid} from "uuid"; 

export function generateAuthSignature(uri: string): string {
  let appid = 'challenge_uprodit';
  let env = 'production';
  let auth_signature_method = 'HMAC-SHA1';
  let auth_consumer_key = encodeURIComponent(hmacsha1(appid, env));
  let auth_token = uuid();
  let uri_path = uri.replace(new RegExp('http(s)?://[^/]*'), '')
  let auth_signature = encodeURIComponent(hmacsha1(appid, uri_path + auth_token));
  let auth_nonce = encodeURIComponent(hmacsha1(appid, uuid()));
  let auth_callback = encodeURIComponent(uri_path);
  let auth_timestamp = new Date().getTime();

  

  return `Auth ?auth_signature=${auth_signature}&auth_nonce=${auth_nonce}&auth_callback=${auth_callback}&auth_timestamp=${auth_timestamp}&auth_token=${auth_token}&auth_signature_method=${auth_signature_method}&auth_consumer_key=${auth_consumer_key}`;
}