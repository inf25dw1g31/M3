import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Veiculo,
  Categoria,
} from '../models';
import {VeiculoRepository} from '../repositories';

export class VeiculoCategoriaController {
  constructor(
    @repository(VeiculoRepository)
    public veiculoRepository: VeiculoRepository,
  ) { }

  @get('/veiculos/{id}/categoria', {
    responses: {
      '200': {
        description: 'Categoria belonging to Veiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Categoria),
          },
        },
      },
    },
  })
  async getCategoria(
    @param.path.number('id') id: typeof Veiculo.prototype.id_veiculo,
  ): Promise<Categoria> {
    return this.veiculoRepository.categoria(id);
  }
}
