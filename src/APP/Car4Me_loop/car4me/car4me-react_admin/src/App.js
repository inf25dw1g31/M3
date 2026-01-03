import React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import portugueseMessages from 'ra-language-portuguese';

import { dataProvider } from './dataProvider';

import { CategoriaList, CategoriaEdit, CategoriaCreate, CategoriaShow } from './resources/categorias';
import { VeiculoList, VeiculoEdit, VeiculoCreate, VeiculoShow } from './resources/veiculos';
import { ClienteList, ClienteEdit, ClienteCreate, ClienteShow } from './resources/clientes';
import { FuncionarioList, FuncionarioEdit, FuncionarioCreate, FuncionarioShow } from './resources/funcionarios';
import { ReservaList, ReservaEdit, ReservaCreate, ReservaShow } from './resources/reservas';
import { ManutencaoList, ManutencaoEdit, ManutencaoCreate, ManutencaoShow } from './resources/manutencao';
import { ClienteFavoritoList, ClienteFavoritoCreate, ClienteFavoritoShow } from './resources/cliente-favoritos';

import Dashboard from './Dashboard';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import EventIcon from '@mui/icons-material/Event';
import BuildIcon from '@mui/icons-material/Build';
import FavoriteIcon from '@mui/icons-material/Favorite';

const i18nProvider = polyglotI18nProvider(() => portugueseMessages, 'pt');

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    dashboard={Dashboard}
    title="Car4Me - Backoffice"
  >
    <Resource
      name="categorias"
      list={CategoriaList}
      edit={CategoriaEdit}
      create={CategoriaCreate}
      show={CategoriaShow}
      icon={CategoryIcon}
      options={{ label: 'Categorias' }}
    />
    <Resource
      name="veiculos"
      list={VeiculoList}
      edit={VeiculoEdit}
      create={VeiculoCreate}
      show={VeiculoShow}
      icon={DirectionsCarIcon}
      options={{ label: 'Veículos' }}
    />
    <Resource
      name="clientes"
      list={ClienteList}
      edit={ClienteEdit}
      create={ClienteCreate}
      show={ClienteShow}
      icon={PeopleIcon}
      options={{ label: 'Clientes' }}
    />
    <Resource
      name="funcionarios"
      list={FuncionarioList}
      edit={FuncionarioEdit}
      create={FuncionarioCreate}
      show={FuncionarioShow}
      icon={BadgeIcon}
      options={{ label: 'Funcionários' }}
    />
    <Resource
      name="reservas"
      list={ReservaList}
      edit={ReservaEdit}
      create={ReservaCreate}
      show={ReservaShow}
      icon={EventIcon}
      options={{ label: 'Reservas' }}
    />
    <Resource
      name="manutencaos"
      list={ManutencaoList}
      edit={ManutencaoEdit}
      create={ManutencaoCreate}
      show={ManutencaoShow}
      icon={BuildIcon}
      options={{ label: 'Manutenções' }}
    />
    <Resource
      name="cliente-favoritos"
      list={ClienteFavoritoList}
      create={ClienteFavoritoCreate}
      show={ClienteFavoritoShow}
      icon={FavoriteIcon}
      options={{ label: 'Favoritos' }}
    />
  </Admin>
);

export default App;
