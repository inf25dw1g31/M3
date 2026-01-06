import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  required,
  DeleteButton,
  useRecordContext,
} from 'react-admin';
import { Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Custom field para mostrar favorito com ícone
const FavoritoField = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  return (
    <Chip 
      icon={<FavoriteIcon />} 
      label="Favorito" 
      color="error" 
      size="small" 
      variant="outlined"
    />
  );
};

export const ClienteFavoritoList = () => (
  <List>
    <Datagrid rowClick="show">
      <ReferenceField source="id_cliente" reference="clientes" label="Cliente">
        <TextField source="nome" />
      </ReferenceField>
      
      <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo">
        <TextField source="modelo" />
      </ReferenceField>
      
      <ReferenceField source="id_veiculo" reference="veiculos" label="Marca">
        <TextField source="marca" />
      </ReferenceField>
      
      <ReferenceField source="id_veiculo" reference="veiculos" label="Matrícula">
        <TextField source="matricula" />
      </ReferenceField>
      
      <FavoritoField />
      
      <DeleteButton />
    </Datagrid>
  </List>
);

// Edit não faz sentido para tabela de relação M:N pura (só tem chaves primárias)
// export const ClienteFavoritoEdit = () => (
//   <Edit>
//     <SimpleForm>
//       <ReferenceInput source="id_cliente" reference="clientes" label="Cliente">
//         <SelectInput optionText="nome" validate={[required()]} disabled />
//       </ReferenceInput>
//       
//       <ReferenceInput source="id_veiculo" reference="veiculos" label="Veículo">
//         <SelectInput 
//           optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula}`}
//           validate={[required()]} 
//           disabled
//         />
//       </ReferenceInput>
//     </SimpleForm>
//   </Edit>
// );

export const ClienteFavoritoCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput 
        source="id_cliente" 
        reference="clientes" 
        label="Cliente"
        sort={{ field: 'nome', order: 'ASC' }}
      >
        <SelectInput 
          optionText={(choice) => `${choice.nome} (ID: ${choice.id_cliente})`}
          validate={[required()]} 
        />
      </ReferenceInput>
      
      <ReferenceInput 
        source="id_veiculo" 
        reference="veiculos" 
        label="Veículo Favorito"
        sort={{ field: 'marca', order: 'ASC' }}
      >
        <SelectInput 
          optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula} (ID: ${choice.id_veiculo})`}
          validate={[required()]} 
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const ClienteFavoritoShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField source="id_cliente" reference="clientes" label="Cliente" link="show">
        <TextField source="nome" />
      </ReferenceField>
      
      <ReferenceField source="id_cliente" reference="clientes" label="Email do Cliente">
        <TextField source="email" />
      </ReferenceField>
      
      <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo Favorito" link="show">
        <TextField source="modelo" />
      </ReferenceField>
      
      <ReferenceField source="id_veiculo" reference="veiculos" label="Marca">
        <TextField source="marca" />
      </ReferenceField>
      
      <ReferenceField source="id_veiculo" reference="veiculos" label="Matrícula">
        <TextField source="matricula" />
      </ReferenceField>
      
      <ReferenceField source="id_veiculo" reference="veiculos" label="Estado do Veículo">
        <TextField source="estado" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
