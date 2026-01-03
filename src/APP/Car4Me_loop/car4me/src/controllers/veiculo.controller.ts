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
import {Veiculo} from '../models';
import {VeiculoRepository} from '../repositories';

export class VeiculoController {
  constructor(
    @repository(VeiculoRepository)
    public veiculoRepository: VeiculoRepository,
  ) {}

  @post('/veiculos')
  @response(200, {
    description: 'Veiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veiculo),
        examples: {
          criado: {
            summary: 'Veículo criado',
            value: {
              id_veiculo: 1,
              marca: 'BMW',
              modelo: '320d Touring',
              matricula: '12-AB-34',
              ano: 2001,
              cor: 'Preto',
              quilometragem: 180000,
              estado: 'Disponivel',
              id_categoria: 1,
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
          schema: getModelSchemaRef(Veiculo, {
            title: 'NewVeiculo',
            exclude: ['id_veiculo'],
          }),
          examples: {
            criarDisponivel: {
              summary: 'Criar veículo disponível',
              value: {
                marca: 'BMW',
                modelo: '320d Touring',
                matricula: '12-AB-34',
                ano: 2001,
                cor: 'Preto',
                quilometragem: 180000,
                estado: 'Disponivel',
                id_categoria: 1,
              },
            },
            criarSemEstado: {
              summary: 'Criar veículo (estado por defeito)',
              value: {
                marca: 'Audi',
                modelo: 'A3',
                matricula: '55-CD-66',
                ano: 2016,
                cor: 'Branco',
                quilometragem: 98000,
                id_categoria: 2,
              },
            },
          },
        },
      },
    })
    veiculo: Omit<Veiculo, 'id_veiculo'>,
  ): Promise<Veiculo> {
    return this.veiculoRepository.create(veiculo);
  }

  @get('/veiculos/count')
  @response(200, {
    description: 'Veiculo model count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          total: {summary: 'Total de veículos', value: {count: 25}},
        },
      },
    },
  })
  async count(): Promise<Count> {
    return this.veiculoRepository.count();
  }

  @get('/veiculos')
  @response(200, {
    description: 'Array of Veiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veiculo, {includeRelations: true}),
        },
        examples: {
          lista: {
            summary: 'Lista de veículos',
            value: [
              {
                id_veiculo: 1,
                marca: 'BMW',
                modelo: '320d Touring',
                matricula: '12-AB-34',
                ano: 2001,
                cor: 'Preto',
                quilometragem: 180000,
                estado: 'Disponivel',
                id_categoria: 1,
              },
              {
                id_veiculo: 2,
                marca: 'Volkswagen',
                modelo: 'Golf',
                matricula: '77-EF-88',
                ano: 2018,
                cor: 'Cinzento',
                quilometragem: 65000,
                estado: 'Manutencao',
                id_categoria: 2,
              },
            ],
          },
        },
      },
    },
  })
  async find(): Promise<Veiculo[]> {
    return this.veiculoRepository.find();
  }

  @patch('/veiculos')
  @response(200, {
    description: 'Veiculo PATCH success count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          alterados: {summary: 'Número de veículos alterados', value: {count: 3}},
        },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veiculo, {partial: true}),
          examples: {
            marcarManutencao: {
              summary: 'Alterar estado em lote',
              value: {estado: 'Manutencao'},
            },
            corrigirKm: {
              summary: 'Atualizar quilometragem',
              value: {quilometragem: 181500},
            },
          },
        },
      },
    })
    veiculo: Partial<Veiculo>,
    @param.where(Veiculo) where?: Where<Veiculo>,
  ): Promise<Count> {
    return this.veiculoRepository.updateAll(veiculo, where);
  }

  @get('/veiculos/{id}')
  @response(200, {
    description: 'Veiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veiculo, {includeRelations: true}),
        examples: {
          detalhe: {
            summary: 'Veículo por id',
            value: {
              id_veiculo: 1,
              marca: 'BMW',
              modelo: '320d Touring',
              matricula: '12-AB-34',
              ano: 2001,
              cor: 'Preto',
              quilometragem: 180000,
              estado: 'Disponivel',
              id_categoria: 1,
            },
          },
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Veiculo> {
    return this.veiculoRepository.findById(id);
  }

  @patch('/veiculos/{id}')
  @response(204, {
    description: 'Veiculo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veiculo, {partial: true}),
          examples: {
            mudarEstado: {
              summary: 'Alterar estado',
              value: {estado: 'Alugado'},
            },
            mudarCategoria: {
              summary: 'Alterar categoria',
              value: {id_categoria: 2},
            },
            atualizarCorEKm: {
              summary: 'Atualizar cor e quilometragem',
              value: {cor: 'Azul', quilometragem: 182000},
            },
          },
        },
      },
    })
    veiculo: Partial<Veiculo>,
  ): Promise<void> {
    await this.veiculoRepository.updateById(id, veiculo);
  }

  @put('/veiculos/{id}')
  @response(204, {
    description: 'Veiculo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veiculo, {exclude: ['id_veiculo']}),
          examples: {
            substituir: {
              summary: 'Substituir veículo (PUT)',
              value: {
                marca: 'BMW',
                modelo: '320d Touring',
                matricula: '12-AB-34',
                ano: 2001,
                cor: 'Preto',
                quilometragem: 182000,
                estado: 'Disponivel',
                id_categoria: 1,
              },
            },
          },
        },
      },
    })
    veiculo: Omit<Veiculo, 'id_veiculo'>,
  ): Promise<void> {
    await this.veiculoRepository.replaceById(id, veiculo as Veiculo);
  }

  @del('/veiculos/{id}')
  @response(204, {
    description: 'Veiculo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.veiculoRepository.deleteById(id);
  }
}
