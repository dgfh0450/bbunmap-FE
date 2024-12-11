import Request from "@/lib/fetch";
import { Session } from "next-auth";
import { TypesUserInfo } from "./types";

export function getUserInfo(session: Session | null, update: (data: any) => Promise<Session | null>
): Promise<TypesUserInfo> {
    const request = new Request(session, update);
    return request.get('/secured/user')
}