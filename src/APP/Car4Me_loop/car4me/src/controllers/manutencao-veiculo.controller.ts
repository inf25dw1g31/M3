import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Manutencao,
  Veiculo,
} from '../models';
import {ManutencaoRepository} from '../repositories';

export class ManutencaoVeiculoController {
  constructor(
    @repository(ManutencaoRepository)
    public manutencaoRepository: ManutencaoRepository,
  ) { }

  @get('/manutencaos/{id}/veiculo', {
    responses: {
      '200': {
        description: 'Veiculo belonging to Manutencao',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Veiculo),
          },
        },
      },
    },
  })
  async getVeiculo(
    @param.path.number('id') id: typeof Manutencao.prototype.id_manutencao,
  ): Promise<Veiculo> {
    return this.manutencaoRepository.veiculo(id);
  }
}
