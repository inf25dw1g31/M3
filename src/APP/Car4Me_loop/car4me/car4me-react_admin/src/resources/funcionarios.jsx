import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  Show,
  SimpleShowLayout,
  required,
  email,
  ReferenceManyField,
  Labeled,
  ReferenceField,
  ChipField,
  NumberField,
} from 'react-admin';

const validatePhone = (value) => {
  if (!value) return undefined;
  if (!/^\d{9}$/.test(value)) {
    return 'Telefone deve ter 9 dígitos';
  }
  return undefined;
};

export const FuncionarioList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id_funcionario" label="ID" />
      <TextField source="nome" label="Nome" />
      <EmailField source="email" label="Email" />
      <TextField source="cargo" label="Cargo" />
      <TextField source="telefone" label="Telefone" />
    </Datagrid>
  </List>
);

export const FuncionarioEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id_funcionario" label="ID" disabled />
      <TextInput source="nome" label="Nome Completo" validate={[required()]} fullWidth />
      <TextInput source="email" label="Email" type="email" validate={[required(), email()]} fullWidth />
      <TextInput source="cargo" label="Cargo" fullWidth />
      <TextInput source="telefone" label="Telefone" validate={[validatePhone]} />
    </SimpleForm>
  </Edit>
);

export const FuncionarioCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="nome" label="Nome Completo" validate={[required()]} fullWidth />
      <TextInput source="email" label="Email" type="email" validate={[required(), email()]} fullWidth />
      <TextInput source="cargo" label="Cargo" fullWidth />
      <TextInput source="telefone" label="Telefone" validate={[validatePhone]} />
    </SimpleForm>
  </Create>
);

export const FuncionarioShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id_funcionario" label="ID" />
      <TextField source="nome" label="Nome" />
      <EmailField source="email" label="Email" />
      <TextField source="cargo" label="Cargo" />
      <TextField source="telefone" label="Telefone" />

      <Labeled label="Reservas Processadas">
        <ReferenceManyField reference="reservas" target="id_funcionario">
          <Datagrid rowClick="show">
            <TextField source="id_reserva" label="ID" />
            <ReferenceField source="id_cliente" reference="clientes" label="Cliente">
              <TextField source="nome" />
            </ReferenceField>
            <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo">
              <TextField source="modelo" />
            </ReferenceField>
            <TextField source="data_inicio" label="Data Início" />
            <TextField source="data_fim" label="Data Fim" />
            <NumberField 
              source="preco_total" 
              label="Preço (€)" 
              options={{ style: 'currency', currency: 'EUR' }}
            />
            <ChipField source="estado" label="Estado" />
          </Datagrid>
        </ReferenceManyField>
      </Labeled>
    </SimpleShowLayout>
  </Show>
);
