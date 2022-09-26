import hmacsha1 from 'hmacsha1';
import {v4 as uuid} from "uuid"; 
import { SearchTDO } from './types';

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

const searchUrl = "https://api.uprodit.com/v1/search/all"

export function getSearchApiQueryString(data: SearchTDO): string{
  const {startIndex, maxResults, usecase} = data;
  return searchUrl + `?startIndex=${startIndex}&maxResults=${maxResults}&usecase=${usecase}`
}

export function getProfileImageUri(id: number): string {
  return `https://api.uprodit.com/v2/profile/picture/f/${id}`
}


