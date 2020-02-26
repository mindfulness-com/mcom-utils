"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendgrid = require("@sendgrid/mail");
const env_1 = require("./env");
const id_1 = require("./id");
exports.cleanEmail = (email) => email.trim().toLowerCase();
exports.teamEmailAlias = (email) => email.replace(/\+\@mindfulness\.com$/gi, `+${id_1.shortId(4)}@mindfulness.com`);
sendgrid.setApiKey(env_1.getEnvVar("SENDGRID_API_KEY"));
exports.toRecipient = (user) => {
    if (!user.email) {
        throw new Error(`No email address on user: ${user.id}`);
    }
    if (user.firstName) {
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
        return `${fullName}<${user.email}>`;
    }
    return user.email;
};
exports.send = (recipient, template, vars, args) => __awaiter(this, void 0, void 0, function* () {
    yield sendgrid.send({
        from: "Mindfulness.com<support@mindfulness.com>",
        to: recipient,
        templateId: template,
        dynamicTemplateData: vars,
        customArgs: args,
    });
});
exports.sendToUser = (user, template, vars, args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.send(exports.toRecipient(user), template, vars, Object.assign({}, args, { userId: user.publicId }));
});
//# sourceMappingURL=email.js.map