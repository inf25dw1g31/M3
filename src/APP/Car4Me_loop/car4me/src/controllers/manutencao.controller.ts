import {Count, CountSchema, repository, Where} from '@loopback/repository';
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
import {Manutencao} from '../models';
import {ManutencaoRepository} from '../repositories';

export class ManutencaoController {
  constructor(
    @repository(ManutencaoRepository)
    public manutencaoRepository: ManutencaoRepository,
  ) {}

  @post('/manutencaos')
  @response(200, {
    description: 'Manutencao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Manutencao),
        examples: {
          criado: {
            summary: 'Manutenção criada',
            value: {
              id_manutencao: 1,
              id_veiculo: 2,
              descricao: 'Troca de óleo e filtros',
              data_manutencao: '2025-12-21T10:00:00.000Z',
              custo: 89.99,
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
          schema: getModelSchemaRef(Manutencao, {
            title: 'NewManutencao',
            exclude: ['id_manutencao'],
          }),
          examples: {
            criar: {
              summary: 'Criar manutenção',
              value: {
                id_veiculo: 2,
                descricao: 'Troca de óleo e filtros',
                data_manutencao: '2025-12-21T10:00:00.000Z',
                custo: 89.99,
              },
            },
            criarSemCusto: {
              summary: 'Criar manutenção (custo opcional)',
              value: {
                id_veiculo: 3,
                descricao: 'Substituição de pastilhas de travão',
                data_manutencao: '2025-12-22T15:30:00.000Z',
              },
            },
          },
        },
      },
    })
    manutencao: Omit<Manutencao, 'id_manutencao'>,
  ): Promise<Manutencao> {
    return this.manutencaoRepository.create(manutencao);
  }

  @get('/manutencaos/count')
  @response(200, {
    description: 'Manutencao model count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          total: {summary: 'Total de manutenções', value: {count: 10}},
        },
      },
    },
  })
  async count(): Promise<Count> {
    return this.manutencaoRepository.count();
  }

  @get('/manutencaos')
  @response(200, {
    description: 'Array of Manutencao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Manutencao, {includeRelations: true}),
        },
        examples: {
          lista: {
            summary: 'Lista de manutenções',
            value: [
              {
                id_manutencao: 1,
                id_veiculo: 2,
                descricao: 'Troca de óleo e filtros',
                data_manutencao: '2025-12-21T10:00:00.000Z',
                custo: 89.99,
              },
              {
                id_manutencao: 2,
                id_veiculo: 3,
                descricao: 'Substituição de pastilhas de travão',
                data_manutencao: '2025-12-22T15:30:00.000Z',
                custo: 120.0,
              },
            ],
          },
        },
      },
    },
  })
  async find(): Promise<Manutencao[]> {
    return this.manutencaoRepository.find();
  }

  @get('/manutencaos/{id}')
  @response(200, {
    description: 'Manutencao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Manutencao, {includeRelations: true}),
        examples: {
          detalhe: {
            summary: 'Manutenção por id',
            value: {
              id_manutencao: 1,
              id_veiculo: 2,
              descricao: 'Troca de óleo e filtros',
              data_manutencao: '2025-12-21T10:00:00.000Z',
              custo: 89.99,
            },
          },
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Manutencao> {
    return this.manutencaoRepository.findById(id);
  }

  // Mantido: updateAll (PATCH em lote), mas o "where" continua a existir.
  // Isto é o comportamento do LoopBack para updates em lote.
  @patch('/manutencaos')
  @response(200, {
    description: 'Manutencao PATCH success count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          alteradas: {summary: 'Número de manutenções alteradas', value: {count: 3}},
        },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manutencao, {partial: true}),
          examples: {
            corrigirCusto: {
              summary: 'Atualizar custo em lote',
              value: {custo: 99.99},
            },
            atualizarDescricao: {
              summary: 'Atualizar descrição em lote',
              value: {descricao: 'Revisão geral'},
            },
          },
        },
      },
    })
    manutencao: Partial<Manutencao>,
    @param.where(Manutencao) where?: Where<Manutencao>,
  ): Promise<Count> {
    return this.manutencaoRepository.updateAll(manutencao, where);
  }

  @patch('/manutencaos/{id}')
  @response(204, {
    description: 'Manutencao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manutencao, {partial: true}),
          examples: {
            atualizarCusto: {
              summary: 'Atualizar custo',
              value: {custo: 99.99},
            },
            atualizarDescricao: {
              summary: 'Atualizar descrição',
              value: {descricao: 'Troca de óleo, filtros e inspeção geral'},
            },
          },
        },
      },
    })
    manutencao: Partial<Manutencao>,
  ): Promise<void> {
    await this.manutencaoRepository.updateById(id, manutencao);
  }

  @put('/manutencaos/{id}')
  @response(204, {
    description: 'Manutencao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manutencao, {exclude: ['id_manutencao']}),
          examples: {
            substituir: {
              summary: 'Substituir manutenção (PUT)',
              value: {
                id_veiculo: 2,
                descricao: 'Revisão completa',
                data_manutencao: '2025-12-23T09:00:00.000Z',
                custo: 200.0,
              },
            },
          },
        },
      },
    })
    manutencao: Omit<Manutencao, 'id_manutencao'>,
  ): Promise<void> {
    await this.manutencaoRepository.replaceById(id, manutencao as Manutencao);
  }

  @del('/manutencaos/{id}')
  @response(204, {
    description: 'Manutencao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.manutencaoRepository.deleteById(id);
  }
}
