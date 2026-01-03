"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteFavorito = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ClienteFavorito = class ClienteFavorito extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.ClienteFavorito = ClienteFavorito;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ClienteFavorito.prototype, "id_cliente", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ClienteFavorito.prototype, "id_veiculo", void 0);
exports.ClienteFavorito = ClienteFavorito = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { mysql: { table: 'clientes_favoritos' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClienteFavorito);
//# sourceMappingURL=cliente-favorito.model.js.map