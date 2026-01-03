import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reserva,
  Veiculo,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaVeiculoController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/veiculo', {
    responses: {
      '200': {
        description: 'Veiculo belonging to Reserva',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Veiculo),
          },
        },
      },
    },
  })
  async getVeiculo(
    @param.path.number('id') id: typeof Reserva.prototype.id_reserva,
  ): Promise<Veiculo> {
    return this.reservaRepository.veiculo(id);
  }
}
