export type LoadingState = "loading" | "idle" | "error";

export type Role = "admin" | "citizen";

export type UserDetails = {
    id: string;
    email: string
    firstName: string;
    lastName: string;
    phone: string;
    role: {
        id: number;
        role: Role
    }
}