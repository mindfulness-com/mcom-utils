import * as sendgrid from "@sendgrid/mail";
import { getEnvVar } from "./env";
import { shortId } from "./id";

export const cleanEmail = (email: string) => email.trim().toLowerCase();
export const teamEmailAlias = (email: string) =>
  email.replace(/\+\@mindfulness\.com$/gi, `+${shortId(4)}@mindfulness.com`);

sendgrid.setApiKey(getEnvVar("SENDGRID_API_KEY"));

interface User {
  id: string;
  publicId: string;
  firstName: Maybe<string>;
  lastName: Maybe<string>;
  email: Maybe<string>;
}

export const toRecipient = (user: User): string => {
  if (!user.email) {
    throw new Error(`No email address on user: ${user.id}`);
  }

  if (user.firstName) {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    return `${fullName}<${user.email}>`;
  }

  return user.email;
};

export const send = async (
  recipient: string,
  template: string,
  vars: Record<string, string>,
  args?: Record<string, string>,
): Promise<void> => {
  await sendgrid.send({
    from: "Mindfulness.com<support@mindfulness.com>",
    to: recipient,
    templateId: template,
    dynamicTemplateData: vars,
    customArgs: args,
  });
};

export const sendToUser = async (
  user: User,
  template: string,
  vars: Record<string, string>,
  args?: Record<string, string>,
) => {
  return await send(toRecipient(user), template, vars, {
    ...args,
    userId: user.publicId,
  });
};
