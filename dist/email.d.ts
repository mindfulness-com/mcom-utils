export declare const cleanEmail: (email: string) => string;
export declare const teamEmailAlias: (email: string) => string;
interface User {
    id: string;
    publicId: string;
    firstName: Maybe<string>;
    lastName: Maybe<string>;
    email: Maybe<string>;
}
export declare const toRecipient: (user: User) => string;
export declare const send: (recipient: string, template: string, vars: Record<string, string>, args?: Record<string, string> | undefined) => Promise<void>;
export declare const sendToUser: (user: User, template: string, vars: Record<string, string>, args?: Record<string, string> | undefined) => Promise<void>;
export {};
