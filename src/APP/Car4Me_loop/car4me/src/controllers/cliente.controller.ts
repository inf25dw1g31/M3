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
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) {}

  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente),
        examples: {
          criado: {
            summary: 'Cliente criado',
            value: {
              id_cliente: 1,
              nome: 'Miguel Santos',
              email: 'miguel.santos@email.pt',
              telefone: '913456789',
              nif: '245678901',
              morada: 'Rua das Flores, 10, Porto',
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
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id_cliente'],
          }),
          examples: {
            criar: {
              summary: 'Criar cliente',
              value: {
                nome: 'Miguel Santos',
                email: 'miguel.santos@email.pt',
                telefone: '913456789',
                nif: '245678901',
                morada: 'Rua das Flores, 10, Porto',
              },
            },
            criarSemTelefone: {
              summary: 'Criar cliente (telefone opcional)',
              value: {
                nome: 'Sara Almeida',
                email: 'sara.almeida@email.pt',
                nif: '298765432',
                morada: 'Av. da Liberdade, 100, Lisboa',
              },
            },
          },
        },
      },
    })
    cliente: Omit<Cliente, 'id_cliente'>,
  ): Promise<Cliente> {
    return this.clienteRepository.create(cliente);
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          total: {summary: 'Total de clientes', value: {count: 50}},
        },
      },
    },
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
        examples: {
          lista: {
            summary: 'Lista de clientes',
            value: [
              {
                id_cliente: 1,
                nome: 'Miguel Santos',
                email: 'miguel.santos@email.pt',
                telefone: '913456789',
                nif: '245678901',
                morada: 'Rua das Flores, 10, Porto',
              },
              {
                id_cliente: 2,
                nome: 'Sara Almeida',
                email: 'sara.almeida@email.pt',
                telefone: '919999999',
                nif: '298765432',
                morada: 'Av. da Liberdade, 100, Lisboa',
              },
            ],
          },
        },
      },
    },
  })
  async find(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  // Mantido: updateAll (PATCH em lote) com "where"
  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          alterados: {summary: 'Número de clientes alterados', value: {count: 2}},
        },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
          examples: {
            atualizarMorada: {
              summary: 'Atualizar morada em lote',
              value: {morada: 'Lisboa'},
            },
            atualizarTelefone: {
              summary: 'Atualizar telefone em lote',
              value: {telefone: '910000000'},
            },
          },
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
        examples: {
          detalhe: {
            summary: 'Cliente por id',
            value: {
              id_cliente: 1,
              nome: 'Miguel Santos',
              email: 'miguel.santos@email.pt',
              telefone: '913456789',
              nif: '245678901',
              morada: 'Rua das Flores, 10, Porto',
            },
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
          examples: {
            mudarMorada: {
              summary: 'Alterar morada',
              value: {morada: 'Rua Nova, 50, Braga'},
            },
            mudarTelefone: {
              summary: 'Alterar telefone',
              value: {telefone: '912222222'},
            },
          },
        },
      },
    })
    cliente: Partial<Cliente>,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {exclude: ['id_cliente']}),
          examples: {
            substituir: {
              summary: 'Substituir cliente (PUT)',
              value: {
                nome: 'Miguel Santos',
                email: 'miguel.santos@email.pt',
                telefone: '913456789',
                nif: '245678901',
                morada: 'Rua das Flores, 10, Porto',
              },
            },
          },
        },
      },
    })
    cliente: Omit<Cliente, 'id_cliente'>,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente as Cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
