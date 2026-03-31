import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface OrderRecord {
    status: Status;
    businessName: string;
    numPosts: bigint;
    logoURL: string;
    colorPalette: string;
    niche: string;
    timestamp: Time;
    stylePreferences: string;
}
export interface UserProfile {
    name: string;
}
export enum Status {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOrders(): Promise<Array<OrderRecord>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrderById(id: string): Promise<OrderRecord>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitOrder(order: OrderRecord): Promise<string | null>;
    updateOrderStatus(id: string, status: Status): Promise<void>;
}
