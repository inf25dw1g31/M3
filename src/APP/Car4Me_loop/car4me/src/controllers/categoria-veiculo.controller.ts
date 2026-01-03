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
  Categoria,
  Veiculo,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaVeiculoController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/veiculos', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Veiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Veiculo>,
  ): Promise<Veiculo[]> {
    return this.categoriaRepository.veiculos(id).find(filter);
  }

  @post('/categorias/{id}/veiculos', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Veiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categoria.prototype.id_categoria,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veiculo, {
            title: 'NewVeiculoInCategoria',
            exclude: ['id_veiculo'],
            optional: ['id_categoria']
          }),
        },
      },
    }) veiculo: Omit<Veiculo, 'id_veiculo'>,
  ): Promise<Veiculo> {
    return this.categoriaRepository.veiculos(id).create(veiculo);
  }

  @patch('/categorias/{id}/veiculos', {
    responses: {
      '200': {
        description: 'Categoria.Veiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veiculo, {partial: true}),
        },
      },
    })
    veiculo: Partial<Veiculo>,
    @param.query.object('where', getWhereSchemaFor(Veiculo)) where?: Where<Veiculo>,
  ): Promise<Count> {
    return this.categoriaRepository.veiculos(id).patch(veiculo, where);
  }

  @del('/categorias/{id}/veiculos', {
    responses: {
      '200': {
        description: 'Categoria.Veiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Veiculo)) where?: Where<Veiculo>,
  ): Promise<Count> {
    return this.categoriaRepository.veiculos(id).delete(where);
  }
}
