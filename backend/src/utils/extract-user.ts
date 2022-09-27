import { Request } from "express";
import { JWTPayload } from "../modules/auth/auth.utils";
import { RoleType } from "../types";

export default (req: Request) => {
    const user = ((req as any).jwtPayload as JWTPayload).user

    return {
        user: user,
        userRole: user.role.name as RoleType
    }
}