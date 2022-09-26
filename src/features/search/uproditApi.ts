
import axios from "axios"
import { generateAuthSignature, getProfileImageUri, getSearchApiQueryString } from "./helpers";
import { SearchTDO, UprodiImageResponse, UproditUser } from "./types";


const myCorsAnyWhereProxy = "https://fathomless-lowlands-92998.herokuapp.com/"


export const searchUproditUsers = async (searchData: SearchTDO): Promise<[UproditUser]> => {
    let uri = getSearchApiQueryString(searchData);
    let authSignature = await grabAuthSignature(uri);
    let headers = {
        ...authSignature //generateAuthSignature(uri)
    }
    console.log(headers);
    return await (await axios.get(uri, { headers })).data;
} 

export const getUproditUserImage = async (id: number): Promise<UprodiImageResponse> => {
    let uri = getProfileImageUri(id);
    let headers = {
        ...await grabAuthSignature(uri)//authorization: generateAuthSignature(uri)
    } 
    return await (await axios.get(uri, {headers})).data;
}

export const grabAuthSignature = async (uri: string): Promise<{authorization: string}> => {
    let signatureData = {
      "appid":"challenge_uprodit",
      "env":"production",
      "uri" : uri
    }
    return await (await axios.post("https://api.uprodit.com/v1/authheader", signatureData)).data
}

