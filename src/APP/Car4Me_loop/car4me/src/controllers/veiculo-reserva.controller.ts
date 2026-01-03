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
  Reserva,
} from '../models';
import {VeiculoRepository} from '../repositories';

export class VeiculoReservaController {
  constructor(
    @repository(VeiculoRepository) protected veiculoRepository: VeiculoRepository,
  ) { }

  @get('/veiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Array of Veiculo has many Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reserva)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.veiculoRepository.reservas(id).find(filter);
  }

  @post('/veiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Veiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Veiculo.prototype.id_veiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReservaInVeiculo',
            exclude: ['id_reserva'],
            optional: ['id_veiculo']
          }),
        },
      },
    }) reserva: Omit<Reserva, 'id_reserva'>,
  ): Promise<Reserva> {
    return this.veiculoRepository.reservas(id).create(reserva);
  }

  @patch('/veiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Veiculo.Reserva PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Partial<Reserva>,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.veiculoRepository.reservas(id).patch(reserva, where);
  }

  @del('/veiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Veiculo.Reserva DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.veiculoRepository.reservas(id).delete(where);
  }
}
