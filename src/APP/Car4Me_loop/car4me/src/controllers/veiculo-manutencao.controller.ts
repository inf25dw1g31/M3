import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Veiculo,
  Manutencao,
} from '../models';
import {VeiculoRepository} from '../repositories';

export class VeiculoManutencaoController {
  constructor(
    @repository(VeiculoRepository) protected veiculoRepository: VeiculoRepository,
  ) { }

  @get('/veiculos/{id}/manutencaos', {
    responses: {
      '200': {
        description: 'Array of Veiculo has many Manutencao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manutencao)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Manutencao>,
  ): Promise<Manutencao[]> {
    return this.veiculoRepository.manutencoes(id).find(filter);
  }

  @post('/veiculos/{id}/manutencaos', {
    responses: {
      '200': {
        description: 'Veiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manutencao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Veiculo.prototype.id_veiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manutencao, {
            title: 'NewManutencaoInVeiculo',
            exclude: ['id_manutencao'],
            optional: ['id_veiculo']
          }),
        },
      },
    }) manutencao: Omit<Manutencao, 'id_manutencao'>,
  ): Promise<Manutencao> {
    return this.veiculoRepository.manutencoes(id).create(manutencao);
  }

  @patch('/veiculos/{id}/manutencaos', {
    responses: {
      '200': {
        description: 'Veiculo.Manutencao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manutencao, {partial: true}),
        },
      },
    })
    manutencao: Partial<Manutencao>,
    @param.query.object('where', getWhereSchemaFor(Manutencao)) where?: Where<Manutencao>,
  ): Promise<Count> {
    return this.veiculoRepository.manutencoes(id).patch(manutencao, where);
  }

  @del('/veiculos/{id}/manutencaos', {
    responses: {
      '200': {
        description: 'Veiculo.Manutencao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Manutencao)) where?: Where<Manutencao>,
  ): Promise<Count> {
    return this.veiculoRepository.manutencoes(id).delete(where);
  }
}
