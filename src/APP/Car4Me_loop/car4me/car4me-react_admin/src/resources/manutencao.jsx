import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  ReferenceField,
  required,
  number,
  minValue,
} from 'react-admin';

export const ManutencaoList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id_manutencao" label="ID" />
      <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo">
        <TextField source="modelo" />
      </ReferenceField>
      <DateField source="data_manutencao" label="Data da Manutenção" showTime />
      <TextField source="descricao" label="Descrição" />
      <NumberField 
        source="custo" 
        label="Custo (€)" 
        options={{ style: 'currency', currency: 'EUR' }}
      />
    </Datagrid>
  </List>
);

export const ManutencaoEdit = () => (
  <Edit transform={(data) => ({
    ...data,
    data_manutencao: data.data_manutencao ? new Date(data.data_manutencao).toISOString() : null,
  })}>
    <SimpleForm>
      <TextInput source="id_manutencao" label="ID" disabled />
      <ReferenceInput source="id_veiculo" reference="veiculos" label="Veículo">
        <SelectInput 
          optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula}`}
          validate={[required()]} 
        />
      </ReferenceInput>
      <DateTimeInput source="data_manutencao" label="Data e Hora da Manutenção" validate={[required()]} />
      <TextInput source="descricao" label="Descrição da Manutenção" validate={[required()]} multiline fullWidth />
      <NumberInput source="custo" label="Custo (€)" validate={[number(), minValue(0)]} />
    </SimpleForm>
  </Edit>
);

export const ManutencaoCreate = () => (
  <Create transform={(data) => ({
    ...data,
    data_manutencao: data.data_manutencao ? new Date(data.data_manutencao).toISOString() : null,
  })}>
    <SimpleForm>
      <ReferenceInput source="id_veiculo" reference="veiculos" label="Veículo">
        <SelectInput 
          optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula}`}
          validate={[required()]} 
        />
      </ReferenceInput>
      <DateTimeInput source="data_manutencao" label="Data e Hora da Manutenção" validate={[required()]} />
      <TextInput source="descricao" label="Descrição da Manutenção" validate={[required()]} multiline fullWidth />
      <NumberInput source="custo" label="Custo (€)" validate={[number(), minValue(0)]} />
    </SimpleForm>
  </Create>
);

export const ManutencaoShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id_manutencao" label="ID da Manutenção" />
      <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo" link="show">
        <TextField source="modelo" />
      </ReferenceField>
      <DateField source="data_manutencao" label="Data e Hora da Manutenção" showTime />
      <TextField source="descricao" label="Descrição" />
      <NumberField 
        source="custo" 
        label="Custo (€)" 
        options={{ style: 'currency', currency: 'EUR' }}
      />
    </SimpleShowLayout>
  </Show>
);
