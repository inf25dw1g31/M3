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
import {Funcionario} from '../models';
import {FuncionarioRepository} from '../repositories';

export class FuncionarioController {
  constructor(
    @repository(FuncionarioRepository)
    public funcionarioRepository: FuncionarioRepository,
  ) {}

  @post('/funcionarios')
  @response(200, {
    description: 'Funcionario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Funcionario),
        examples: {
          criado: {
            summary: 'Funcionário criado',
            value: {
              id_funcionario: 1,
              nome: 'João Silva',
              email: 'joao.silva@car4me.pt',
              cargo: 'Atendimento',
              telefone: '912345678',
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
          schema: getModelSchemaRef(Funcionario, {
            title: 'NewFuncionario',
            exclude: ['id_funcionario'],
          }),
          examples: {
            criar: {
              summary: 'Criar funcionário',
              value: {
                nome: 'João Silva',
                email: 'joao.silva@car4me.pt',
                cargo: 'Atendimento',
                telefone: '912345678',
              },
            },
            criarSemTelefone: {
              summary: 'Criar funcionário (telefone opcional)',
              value: {
                nome: 'Ana Costa',
                email: 'ana.costa@car4me.pt',
                cargo: 'Gestor',
              },
            },
          },
        },
      },
    })
    funcionario: Omit<Funcionario, 'id_funcionario'>,
  ): Promise<Funcionario> {
    return this.funcionarioRepository.create(funcionario);
  }

  @get('/funcionarios/count')
  @response(200, {
    description: 'Funcionario model count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          total: {summary: 'Total de funcionários', value: {count: 7}},
        },
      },
    },
  })
  async count(
    @param.where(Funcionario) where?: Where<Funcionario>,
  ): Promise<Count> {
    return this.funcionarioRepository.count(where);
  }

  @get('/funcionarios')
  @response(200, {
    description: 'Array of Funcionario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Funcionario, {includeRelations: true}),
        },
        examples: {
          lista: {
            summary: 'Lista de funcionários',
            value: [
              {
                id_funcionario: 1,
                nome: 'João Silva',
                email: 'joao.silva@car4me.pt',
                cargo: 'Atendimento',
                telefone: '912345678',
              },
              {
                id_funcionario: 2,
                nome: 'Ana Costa',
                email: 'ana.costa@car4me.pt',
                cargo: 'Gestor',
                telefone: '934567890',
              },
            ],
          },
        },
      },
    },
  })
  async find(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find();
  }

  // Mantido: updateAll (PATCH em lote) com "where"
  @patch('/funcionarios')
  @response(200, {
    description: 'Funcionario PATCH success count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          alterados: {summary: 'Número de funcionários alterados', value: {count: 2}},
        },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, {partial: true}),
          examples: {
            atualizarCargo: {
              summary: 'Atualizar cargo em lote',
              value: {cargo: 'Atendimento'},
            },
            atualizarTelefone: {
              summary: 'Atualizar telefone em lote',
              value: {telefone: '910000000'},
            },
          },
        },
      },
    })
    funcionario: Partial<Funcionario>,
    @param.where(Funcionario) where?: Where<Funcionario>,
  ): Promise<Count> {
    return this.funcionarioRepository.updateAll(funcionario, where);
  }

  @get('/funcionarios/{id}')
  @response(200, {
    description: 'Funcionario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Funcionario, {includeRelations: true}),
        examples: {
          detalhe: {
            summary: 'Funcionário por id',
            value: {
              id_funcionario: 1,
              nome: 'João Silva',
              email: 'joao.silva@car4me.pt',
              cargo: 'Atendimento',
              telefone: '912345678',
            },
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Funcionario> {
    return this.funcionarioRepository.findById(id);
  }

  @patch('/funcionarios/{id}')
  @response(204, {
    description: 'Funcionario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, {partial: true}),
          examples: {
            mudarCargo: {
              summary: 'Alterar cargo',
              value: {cargo: 'Gestor'},
            },
            mudarTelefone: {
              summary: 'Alterar telefone',
              value: {telefone: '913333333'},
            },
          },
        },
      },
    })
    funcionario: Partial<Funcionario>,
  ): Promise<void> {
    await this.funcionarioRepository.updateById(id, funcionario);
  }

  @put('/funcionarios/{id}')
  @response(204, {
    description: 'Funcionario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, {exclude: ['id_funcionario']}),
          examples: {
            substituir: {
              summary: 'Substituir funcionário (PUT)',
              value: {
                nome: 'João Silva',
                email: 'joao.silva@car4me.pt',
                cargo: 'Atendimento',
                telefone: '912345678',
              },
            },
          },
        },
      },
    })
    funcionario: Omit<Funcionario, 'id_funcionario'>,
  ): Promise<void> {
    await this.funcionarioRepository.replaceById(
      id,
      funcionario as Funcionario,
    );
  }

  @del('/funcionarios/{id}')
  @response(204, {
    description: 'Funcionario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.funcionarioRepository.deleteById(id);
  }
}