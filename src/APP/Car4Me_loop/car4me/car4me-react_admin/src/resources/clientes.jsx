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
  ChipField,
  Labeled,
  ReferenceField,
  NumberField,
} from 'react-admin';

const validateNIF = (value) => {
  if (!value) return undefined;
  if (!/^\d{9}$/.test(value)) {
    return 'NIF deve ter exatamente 9 dígitos';
  }
  return undefined;
};

const validatePhone = (value) => {
  if (!value) return undefined;
  if (!/^\d{9}$/.test(value)) {
    return 'Telefone deve ter 9 dígitos';
  }
  return undefined;
};

export const ClienteList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id_cliente" label="ID" />
      <TextField source="nome" label="Nome" />
      <EmailField source="email" label="Email" />
      <TextField source="telefone" label="Telefone" />
      <TextField source="nif" label="NIF" />
    </Datagrid>
  </List>
);

export const ClienteEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id_cliente" label="ID" disabled />
      <TextInput source="nome" label="Nome Completo" validate={[required()]} fullWidth />
      <TextInput source="email" label="Email" type="email" validate={[required(), email()]} fullWidth />
      <TextInput source="telefone" label="Telefone" validate={[validatePhone]} />
      <TextInput source="nif" label="NIF" validate={[required(), validateNIF]} />
      <TextInput source="morada" label="Morada" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

export const ClienteCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="nome" label="Nome Completo" validate={[required()]} fullWidth />
      <TextInput source="email" label="Email" type="email" validate={[required(), email()]} fullWidth />
      <TextInput source="telefone" label="Telefone" validate={[validatePhone]} />
      <TextInput source="nif" label="NIF" validate={[required(), validateNIF]} />
      <TextInput source="morada" label="Morada" multiline fullWidth />
    </SimpleForm>
  </Create>
);

export const ClienteShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id_cliente" label="ID" />
      <TextField source="nome" label="Nome" />
      <EmailField source="email" label="Email" />
      <TextField source="telefone" label="Telefone" />
      <TextField source="nif" label="NIF" />
      <TextField source="morada" label="Morada" />

      <Labeled label="Histórico de Reservas">
        <ReferenceManyField reference="reservas" target="id_cliente">
          <Datagrid rowClick="show">
            <TextField source="id_reserva" label="ID" />
            <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo">
              <TextField source="modelo" />
            </ReferenceField>
            <TextField source="data_inicio" label="Data Início" />
            <TextField source="data_fim" label="Data Fim" />
            <NumberField 
              source="preco_total" 
              label="Preço Total (€)" 
              options={{ style: 'currency', currency: 'EUR' }}
            />
            <ChipField source="estado" label="Estado" />
          </Datagrid>
        </ReferenceManyField>
      </Labeled>

      <Labeled label="Veículos Favoritos">
        <ReferenceManyField reference="cliente-favoritos" target="id_cliente">
          <Datagrid rowClick="show">
            <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo">
              <TextField source="modelo" />
            </ReferenceField>
            <ReferenceField source="id_veiculo" reference="veiculos" label="Marca">
              <TextField source="marca" />
            </ReferenceField>
            <ReferenceField source="id_veiculo" reference="veiculos" label="Matrícula">
              <TextField source="matricula" />
            </ReferenceField>
            <ReferenceField source="id_veiculo" reference="veiculos" label="Estado">
              <ChipField source="estado" />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </Labeled>
    </SimpleShowLayout>
  </Show>
);
