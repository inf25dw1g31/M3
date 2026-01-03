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
import {Categoria} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaController {
  constructor(
    @repository(CategoriaRepository)
    public categoriaRepository: CategoriaRepository,
  ) {}

  @post('/categorias')
  @response(200, {
    description: 'Categoria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categoria),
        examples: {
          criado: {
            summary: 'Categoria criada',
            value: {
              id_categoria: 1,
              nome: 'Económica',
              preco_dia: 25.0,
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
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoria',
            exclude: ['id_categoria'],
          }),
          examples: {
            criar: {
              summary: 'Criar categoria',
              value: {
                nome: 'Económica',
                preco_dia: 25.0,
              },
            },
            criarSUV: {
              summary: 'Criar categoria SUV',
              value: {
                nome: 'SUV',
                preco_dia: 45.5,
              },
            },
          },
        },
      },
    })
    categoria: Omit<Categoria, 'id_categoria'>,
  ): Promise<Categoria> {
    return this.categoriaRepository.create(categoria);
  }

  @get('/categorias/count')
  @response(200, {
    description: 'Categoria model count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          total: {summary: 'Total de categorias', value: {count: 6}},
        },
      },
    },
  })
  async count(
    @param.where(Categoria) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.categoriaRepository.count(where);
  }

  @get('/categorias')
  @response(200, {
    description: 'Array of Categoria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categoria, {includeRelations: true}),
        },
        examples: {
          lista: {
            summary: 'Lista de categorias',
            value: [
              {id_categoria: 1, nome: 'Económica', preco_dia: 25.0},
              {id_categoria: 2, nome: 'SUV', preco_dia: 45.5},
            ],
          },
        },
      },
    },
  })
  async find(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  // Mantido: updateAll (PATCH em lote) com "where"
  @patch('/categorias')
  @response(200, {
    description: 'Categoria PATCH success count',
    content: {
      'application/json': {
        schema: CountSchema,
        examples: {
          alteradas: {summary: 'Número de categorias alteradas', value: {count: 2}},
        },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
          examples: {
            atualizarPreco: {
              summary: 'Atualizar preço/dia em lote',
              value: {preco_dia: 29.99},
            },
            renomear: {
              summary: 'Atualizar nome em lote',
              value: {nome: 'Económica Plus'},
            },
          },
        },
      },
    })
    categoria: Partial<Categoria>,
    @param.where(Categoria) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.categoriaRepository.updateAll(categoria, where);
  }

  @get('/categorias/{id}')
  @response(200, {
    description: 'Categoria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categoria, {includeRelations: true}),
        examples: {
          detalhe: {
            summary: 'Categoria por id',
            value: {
              id_categoria: 1,
              nome: 'Económica',
              preco_dia: 25.0,
            },
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Categoria> {
    return this.categoriaRepository.findById(id);
  }

  @patch('/categorias/{id}')
  @response(204, {
    description: 'Categoria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
          examples: {
            mudarPreco: {
              summary: 'Alterar preço/dia',
              value: {preco_dia: 27.5},
            },
            mudarNome: {
              summary: 'Alterar nome',
              value: {nome: 'Económica Plus'},
            },
          },
        },
      },
    })
    categoria: Partial<Categoria>,
  ): Promise<void> {
    await this.categoriaRepository.updateById(id, categoria);
  }

  @put('/categorias/{id}')
  @response(204, {
    description: 'Categoria PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {exclude: ['id_categoria']}),
          examples: {
            substituir: {
              summary: 'Substituir categoria (PUT)',
              value: {
                nome: 'SUV',
                preco_dia: 45.5,
              },
            },
          },
        },
      },
    })
    categoria: Omit<Categoria, 'id_categoria'>,
  ): Promise<void> {
    await this.categoriaRepository.replaceById(id, categoria as Categoria);
  }

  @del('/categorias/{id}')
  @response(204, {
    description: 'Categoria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoriaRepository.deleteById(id);
  }
}
