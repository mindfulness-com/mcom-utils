"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = (amount, currency) => {
    try {
        return (Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            currencyDisplay: "symbol",
            minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
            useGrouping: true,
            maximumFractionDigits: 2,
        })
            // Format to local currency with JS Intl
            .format(amount)
            // Clean out any technical dollars (A$, CA$)
            .replace(/[A-Z]{1,3}\$/, "$"));
    }
    catch (err) {
        throw new Error(`Invalid currency: ${currency}`);
    }
};
//# sourceMappingURL=currency.js.map