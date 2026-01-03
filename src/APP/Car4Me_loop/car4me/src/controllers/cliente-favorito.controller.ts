import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ClienteFavorito} from '../models';
import {ClienteFavoritoRepository} from '../repositories';

export class ClienteFavoritoController {
  constructor(
    @repository(ClienteFavoritoRepository)
    public clienteFavoritoRepository: ClienteFavoritoRepository,
  ) {}

  @post('/cliente-favoritos')
  @response(200, {
    description: 'ClienteFavorito model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClienteFavorito)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteFavorito, {
            title: 'NewClienteFavorito',
            exclude: [],
          }),
        },
      },
    })
    clienteFavorito: ClienteFavorito,
  ): Promise<ClienteFavorito> {
    return this.clienteFavoritoRepository.create(clienteFavorito);
  }

  @get('/cliente-favoritos/count')
  @response(200, {
    description: 'ClienteFavorito model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClienteFavorito) where?: Where<ClienteFavorito>,
  ): Promise<Count> {
    return this.clienteFavoritoRepository.count(where);
  }

  @get('/cliente-favoritos')
  @response(200, {
  description: 'Array of ClienteFavorito model instances',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(ClienteFavorito, {includeRelations: true}),
      },
    },
  },
})
async find(): Promise<ClienteFavorito[]> {
  // Sem parâmetro filter - retorna TUDO sempre
  return this.clienteFavoritoRepository.find();
}

  @get('/cliente-favoritos/{id_cliente}/{id_veiculo}')
  @response(200, {
    description: 'ClienteFavorito model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClienteFavorito, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id_cliente') id_cliente: number,
    @param.path.number('id_veiculo') id_veiculo: number,
  ): Promise<ClienteFavorito> {
    // Usar findOne com where ao invés de findById para chave composta
    const favorito = await this.clienteFavoritoRepository.findOne({
      where: {
        id_cliente: id_cliente,
        id_veiculo: id_veiculo,
      },
    });
    
    if (!favorito) {
      const error: any = new Error('Entity not found');
      error.statusCode = 404;
      throw error;
    }
    
    return favorito;
  }

  @del('/cliente-favoritos/{id_cliente}/{id_veiculo}')
  @response(204, {
    description: 'ClienteFavorito DELETE success',
  })
  async deleteById(
    @param.path.number('id_cliente') id_cliente: number,
    @param.path.number('id_veiculo') id_veiculo: number,
  ): Promise<void> {
    // Usar deleteAll com where ao invés de deleteById para chave composta
    await this.clienteFavoritoRepository.deleteAll({
      id_cliente: id_cliente,
      id_veiculo: id_veiculo,
    });
  }
}