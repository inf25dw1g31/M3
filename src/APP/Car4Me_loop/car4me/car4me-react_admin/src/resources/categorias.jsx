import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  Show,
  SimpleShowLayout,
  required,
  number,
  minValue,
  ReferenceManyField,
  ChipField,
} from 'react-admin';

export const CategoriaList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id_categoria" label="ID" />
      <TextField source="nome" label="Nome da Categoria" />
      <NumberField 
        source="preco_dia" 
        label="Preço/Dia (€)" 
        options={{ style: 'currency', currency: 'EUR' }}
      />
    </Datagrid>
  </List>
);

export const CategoriaEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id_categoria" label="ID" disabled />
      <TextInput 
        source="nome" 
        label="Nome da Categoria" 
        validate={[required()]}
        fullWidth
      />
      <NumberInput 
        source="preco_dia" 
        label="Preço por Dia (€)" 
        validate={[required(), number(), minValue(0)]}
      />
    </SimpleForm>
  </Edit>
);

export const CategoriaCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput 
        source="nome" 
        label="Nome da Categoria" 
        validate={[required()]}
        fullWidth
      />
      <NumberInput 
        source="preco_dia" 
        label="Preço por Dia (€)" 
        validate={[required(), number(), minValue(0)]}
        defaultValue={0}
      />
    </SimpleForm>
  </Create>
);

export const CategoriaShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id_categoria" label="ID" />
      <TextField source="nome" label="Nome da Categoria" />
      <NumberField 
        source="preco_dia" 
        label="Preço/Dia (€)" 
        options={{ style: 'currency', currency: 'EUR' }}
      />
      
      <ReferenceManyField
        label="Veículos nesta Categoria"
        reference="veiculos"
        target="id_categoria"
      >
        <Datagrid rowClick="show">
          <TextField source="marca" label="Marca" />
          <TextField source="modelo" label="Modelo" />
          <TextField source="matricula" label="Matrícula" />
          <ChipField source="estado" label="Estado" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
