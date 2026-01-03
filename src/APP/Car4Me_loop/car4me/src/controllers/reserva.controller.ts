import {
  Count,
  CountSchema,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Reserva} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) {}

  @post('/reservas')
  @response(200, {
    description: 'Reserva model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reserva),
        examples: {
          sucesso: {
            summary: 'Reserva criada (ativa)',
            value: {
              id_reserva: 1,
              estado: 'ativa',
              data_inicio: '2025-12-20T10:00:00.000Z',
              data_fim: '2025-12-21T10:00:00.000Z',
              id_cliente: 1,
              id_funcionario: 1,
              id_veiculo: 2,
              preco_total: 35.5,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReserva',
            exclude: ['id_reserva'],
          }),
          examples: {
            criarAtiva: {
              summary: 'Criar reserva ativa',
              value: {
                estado: 'ativa',
                data_inicio: '2025-12-20T10:00:00.000Z',
                data_fim: '2025-12-21T10:00:00.000Z',
                id_cliente: 1,
                id_funcionario: 1,
                id_veiculo: 2,
                preco_total: 35.5,
              },
            },
            criarSemPreco: {
              summary: 'Criar reserva (preco_total calculado no backend)',
              value: {
                estado: 'ativa',
                data_inicio: '2025-12-20T10:00:00.000Z',
                data_fim: '2025-12-22T10:00:00.000Z',
                id_cliente: 2,
                id_funcionario: 1,
                id_veiculo: 3,
              },
            },
          },
        },
      },
    })
    reserva: Omit<Reserva, 'id_reserva'>,
  ): Promise<Reserva> {
    return this.reservaRepository.create(reserva);
  }

  @get('/reservas/count')
  @response(200, {
    description: 'Reserva model count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          total: {summary: 'Total de reservas', value: {count: 12}},
        },
      },
    },
  })
  async count(): Promise<Count> {
    return this.reservaRepository.count();
  }

  @get('/reservas')
  @response(200, {
    description: 'Array of Reserva model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reserva, {includeRelations: true}),
        },
        examples: {
          lista: {
            summary: 'Lista de reservas',
            value: [
              {
                id_reserva: 1,
                estado: 'ativa',
                data_inicio: '2025-12-20T10:00:00.000Z',
                data_fim: '2025-12-21T10:00:00.000Z',
                id_cliente: 1,
                id_funcionario: 1,
                id_veiculo: 2,
                preco_total: 35.5,
              },
              {
                id_reserva: 2,
                estado: 'cancelada',
                data_inicio: '2025-12-18T09:00:00.000Z',
                data_fim: '2025-12-19T09:00:00.000Z',
                id_cliente: 2,
                id_funcionario: 1,
                id_veiculo: 3,
                preco_total: 0,
              },
            ],
          },
        },
      },
    },
  })
  async find(): Promise<Reserva[]> {
    return this.reservaRepository.find();
  }

  @patch('/reservas')
  @response(200, {
    description: 'Reserva PATCH success count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          alteradas: {summary: 'Número de reservas alteradas', value: {count: 3}},
        },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
          examples: {
            cancelarPorLote: {
              summary: 'Exemplo de update parcial (por lote)',
              value: {estado: 'cancelada'},
            },
            corrigirPreco: {
              summary: 'Atualizar só o preco_total',
              value: {preco_total: 49.99},
            },
          },
        },
      },
    })
    reserva: Partial<Reserva>,
    @param.where(Reserva) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.reservaRepository.updateAll(reserva, where);
  }

  @get('/reservas/{id}')
  @response(200, {
    description: 'Reserva model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reserva, {includeRelations: true}),
        examples: {
          detalhe: {
            summary: 'Reserva por id',
            value: {
              id_reserva: 1,
              estado: 'ativa',
              data_inicio: '2025-12-20T10:00:00.000Z',
              data_fim: '2025-12-21T10:00:00.000Z',
              id_cliente: 1,
              id_funcionario: 1,
              id_veiculo: 2,
              preco_total: 35.5,
            },
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Reserva> {
    return this.reservaRepository.findById(id);
  }

  @patch('/reservas/{id}')
  @response(204, {
    description: 'Reserva PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
          examples: {
            cancelar: {
              summary: 'Cancelar reserva',
              value: {estado: 'cancelada'},
            },
            remarcarDatas: {
              summary: 'Remarcar datas',
              value: {
                data_inicio: '2025-12-21T10:00:00.000Z',
                data_fim: '2025-12-22T10:00:00.000Z',
              },
            },
            trocarVeiculo: {
              summary: 'Trocar veículo associado',
              value: {id_veiculo: 3},
            },
          },
        },
      },
    })
    reserva: Partial<Reserva>,
  ): Promise<void> {
    await this.reservaRepository.updateById(id, reserva);
  }

  @put('/reservas/{id}')
  @response(204, {
    description: 'Reserva PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {exclude: ['id_reserva']}),
          examples: {
            substituir: {
              summary: 'Substituir reserva (PUT)',
              value: {
                estado: 'ativa',
                data_inicio: '2025-12-23T10:00:00.000Z',
                data_fim: '2025-12-24T10:00:00.000Z',
                id_cliente: 1,
                id_funcionario: 1,
                id_veiculo: 2,
                preco_total: 59.99,
              },
            },
          },
        },
      },
    })
    reserva: Omit<Reserva, 'id_reserva'>,
  ): Promise<void> {
    await this.reservaRepository.replaceById(id, reserva as Reserva);
  }

  @del('/reservas/{id}')
  @response(204, {
    description: 'Reserva DELETE success',
  })
  async deleteById(
    @param.path.number('id') id: number,
  ): Promise<void> {
    await this.reservaRepository.deleteById(id);
  }
}
