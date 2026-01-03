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
ClienteFavorito,
Cliente,
} from '../models';
import {VeiculoRepository} from '../repositories';

export class VeiculoClienteController {
  constructor(
    @repository(VeiculoRepository) protected veiculoRepository: VeiculoRepository,
  ) { }

  @get('/veiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Veiculo has many Cliente through ClienteFavorito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.veiculoRepository.clientes(id).find(filter);
  }

  @post('/veiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'create a Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Veiculo.prototype.id_veiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInVeiculo',
            exclude: ['id_cliente'],
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id_cliente'>,
  ): Promise<Cliente> {
    return this.veiculoRepository.clientes(id).create(cliente);
  }

  @patch('/veiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Veiculo.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.veiculoRepository.clientes(id).patch(cliente, where);
  }

  @del('/veiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Veiculo.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.veiculoRepository.clientes(id).delete(where);
  }
}
