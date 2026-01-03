import { Manutencao, Veiculo } from '../models';
import { ManutencaoRepository } from '../repositories';
export declare class ManutencaoVeiculoController {
    manutencaoRepository: ManutencaoRepository;
    constructor(manutencaoRepository: ManutencaoRepository);
    getVeiculo(id: typeof Manutencao.prototype.id_manutencao): Promise<Veiculo>;
}
