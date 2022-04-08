"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const logic_1 = require("./logic");
const definetly_1 = require("./definetly");
exports.batch = (fn, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const total = opts.total;
    const concurrent = opts.concurrent || 1;
    const batches = Math.ceil(total / concurrent);
    return lodash_1.reduce(lodash_1.times(batches, n => n), (acc, batch) => __awaiter(void 0, void 0, void 0, function* () {
        // First wait for previous batch to finish
        const prev = yield acc;
        const skip = batch * concurrent;
        return [
            ...prev,
            // Then complete your batch of jobs
            ...(yield Promise.all(lodash_1.times(logic_1.ifDo(batch === batches - 1, () => total % concurrent) || concurrent, cur => fn(skip + cur, total)))),
        ];
    }), Promise.resolve([]));
});
exports.paginate = (fn, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const concurrent = opts.concurrent || 1;
    const pages = Math.floor(opts.total / opts.size) || 1;
    return yield exports.batch((page, total) => fn(page, opts.size, total), {
        total: pages,
        concurrent,
    });
});
exports.batchMap = (fn, opts) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.batch((g) => __awaiter(void 0, void 0, void 0, function* () {
        const item = definetly_1.definetly(opts.items[g], "Batch error on index.");
        return fn(item, g, opts.items.length);
    }), {
        total: opts.items.length,
        concurrent: opts.concurrent,
    });
});
//# sourceMappingURL=batch.js.map