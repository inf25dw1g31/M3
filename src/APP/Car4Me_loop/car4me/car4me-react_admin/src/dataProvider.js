import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';



//const apiUrl = 'http://localhost:3000';
//const httpClient = fetchUtils.fetchJson; 
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const httpClient = fetchUtils.fetchJson;


// Mapeamento de recursos para seus IDs corretos no LoopBack
const resourceIdMap = {
  categorias: 'id_categoria',
  veiculos: 'id_veiculo',
  clientes: 'id_cliente',
  funcionarios: 'id_funcionario',
  reservas: 'id_reserva',
  manutencao: 'id_manutencao',
  manutencaos: 'id_manutencao', // Alias para manutenção
  'cliente-favoritos': 'id_cliente', // Composta: id_cliente + id_veiculo
};

// Função auxiliar para obter o ID correto do recurso
const getIdField = (resource) => resourceIdMap[resource] || 'id';

// Função auxiliar para normalizar dados com ID correto
const normalizeData = (resource, data) => {
  const idField = getIdField(resource);
  
  // Tratamento especial para cliente-favoritos (chave composta)
  if (resource === 'cliente-favoritos') {
    if (Array.isArray(data)) {
      return data.map(item => ({
        ...item,
        id: `${item.id_cliente}_${item.id_veiculo}`, // ID único combinado
      }));
    }
    return {
      ...data,
      id: `${data.id_cliente}_${data.id_veiculo}`,
    };
  }
  
  // Tratamento normal para outros recursos
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      id: item[idField] || item.id,
    }));
  }
  return {
    ...data,
    id: data[idField] || data.id,
  };
};

export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
    const query = {
      filter: JSON.stringify({
        limit: perPage,
        skip: (page - 1) * perPage,
        order: field ? `${field} ${order}` : undefined,
        where: params.filter || undefined,
      }),
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      return httpClient(`${apiUrl}/${resource}/count`).then(({ json: countJson }) => ({
        data: normalizeData(resource, json),
        total: countJson.count,
      }));
    });
  },

  getOne: (resource, params) => {
    // Para cliente-favoritos, desconstruir o ID composto
    if (resource === 'cliente-favoritos') {
      const [id_cliente, id_veiculo] = params.id.split('_');
      return httpClient(`${apiUrl}/${resource}/${id_cliente}/${id_veiculo}`).then(({ json }) => ({
        data: normalizeData(resource, json),
      }));
    }
    
    // Para outros recursos (normal)
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: normalizeData(resource, json),
    }));
  },

  getMany: (resource, params) => {
    const idField = getIdField(resource);
    const query = {
      filter: JSON.stringify({
        where: { [idField]: { inq: params.ids } },
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ 
      data: normalizeData(resource, json)
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      filter: JSON.stringify({
        limit: perPage,
        skip: (page - 1) * perPage,
        order: field ? `${field} ${order}` : undefined,
        where: {
          ...params.filter,
          [params.target]: params.id,
        },
      }),
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      return httpClient(`${apiUrl}/${resource}/count`).then(({ json: countJson }) => ({
        data: normalizeData(resource, json),
        total: countJson.count,
      }));
    });
  },

  create: (resource, params) => {
    // Para cliente-favoritos, não precisa converter IDs
    if (resource === 'cliente-favoritos') {
      return httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        // Retorna com ID composto
        data: {
          ...json,
          id: `${json.id_cliente}_${json.id_veiculo}`, // ID único para React Admin
        },
      }));
    }
    
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: normalizeData(resource, json),
    }));
  },

  update: (resource, params) => {
    // cliente-favoritos não permite update (chave primária composta não pode mudar)
    if (resource === 'cliente-favoritos') {
      return Promise.reject(new Error('Cannot update cliente-favoritos. Delete and create a new one instead.'));
    }
    
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ 
      data: normalizeData(resource, json)
    }));
  },

  updateMany: (resource, params) => {
    // cliente-favoritos não permite update
    if (resource === 'cliente-favoritos') {
      return Promise.reject(new Error('Cannot update cliente-favoritos. Delete and create new ones instead.'));
    }
    
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(params.data),
        })
      )
    ).then((responses) => ({ 
      data: responses.map(({ json }) => normalizeData(resource, json).id)
    }));
  },

  delete: (resource, params) => {
    // Para cliente-favoritos, desconstruir o ID composto
    if (resource === 'cliente-favoritos') {
      const [id_cliente, id_veiculo] = params.id.split('_');
      return httpClient(`${apiUrl}/${resource}/${id_cliente}/${id_veiculo}`, {
        method: 'DELETE',
      }).then(({ json }) => ({ 
        data: { id: params.id } // Retorna o ID original
      }));
    }
    
    // Para outros recursos (normal)
    const idField = getIdField(resource);
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ 
      data: { ...json, id: params.id }
    }));
  },

  deleteMany: (resource, params) => {
    // Para cliente-favoritos, desconstruir cada ID composto
    if (resource === 'cliente-favoritos') {
      return Promise.all(
        params.ids.map((id) => {
          const [id_cliente, id_veiculo] = id.split('_');
          return httpClient(`${apiUrl}/${resource}/${id_cliente}/${id_veiculo}`, {
            method: 'DELETE',
          });
        })
      ).then(() => ({ data: params.ids }));
    }
    
    // Para outros recursos (normal)
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })
      )
    ).then(() => ({ data: params.ids }));
  },
};