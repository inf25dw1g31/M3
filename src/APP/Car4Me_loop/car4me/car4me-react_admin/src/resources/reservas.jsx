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
  ChipField,
} from 'react-admin';

const estadosReserva = [
  { id: 'ativa', name: 'Ativa' },
  { id: 'concluida', name: 'Concluída' },
  { id: 'cancelada', name: 'Cancelada' },
];

export const ReservaList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id_reserva" label="ID" />
      <ReferenceField source="id_cliente" reference="clientes" label="Cliente">
        <TextField source="nome" />
      </ReferenceField>
      <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo">
        <TextField source="modelo" />
      </ReferenceField>
      <ReferenceField source="id_funcionario" reference="funcionarios" label="Funcionário">
        <TextField source="nome" />
      </ReferenceField>
      <DateField source="data_inicio" label="Data Início" showTime />
      <DateField source="data_fim" label="Data Fim" showTime />
      <NumberField 
        source="preco_total" 
        label="Preço Total (€)" 
        options={{ style: 'currency', currency: 'EUR' }}
      />
      <ChipField source="estado" label="Estado" />
    </Datagrid>
  </List>
);

export const ReservaEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id_reserva" label="ID" disabled />
      <ReferenceInput source="id_cliente" reference="clientes" label="Cliente">
        <SelectInput optionText="nome" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="id_veiculo" reference="veiculos" label="Veículo">
        <SelectInput 
          optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula}`}
          validate={[required()]} 
        />
      </ReferenceInput>
      <ReferenceInput source="id_funcionario" reference="funcionarios" label="Funcionário">
        <SelectInput optionText="nome" validate={[required()]} />
      </ReferenceInput>
      <DateTimeInput source="data_inicio" label="Data e Hora de Início" validate={[required()]} />
      <DateTimeInput source="data_fim" label="Data e Hora de Fim" validate={[required()]} />
      <NumberInput source="preco_total" label="Preço Total (€)" validate={[number(), minValue(0)]} />
      <SelectInput source="estado" label="Estado da Reserva" choices={estadosReserva} defaultValue="ativa" />
    </SimpleForm>
  </Edit>
);

export const ReservaCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="id_cliente" reference="clientes" label="Cliente">
        <SelectInput optionText="nome" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="id_veiculo" reference="veiculos" label="Veículo">
        <SelectInput 
          optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula}`}
          validate={[required()]} 
        />
      </ReferenceInput>
      <ReferenceInput source="id_funcionario" reference="funcionarios" label="Funcionário">
        <SelectInput optionText="nome" validate={[required()]} />
      </ReferenceInput>
      <DateTimeInput source="data_inicio" label="Data e Hora de Início" validate={[required()]} />
      <DateTimeInput source="data_fim" label="Data e Hora de Fim" validate={[required()]} />
      <NumberInput source="preco_total" label="Preço Total (€)" validate={[number(), minValue(0)]} />
      <SelectInput source="estado" label="Estado da Reserva" choices={estadosReserva} defaultValue="ativa" />
    </SimpleForm>
  </Create>
);

export const ReservaShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id_reserva" label="ID da Reserva" />
      <ReferenceField source="id_cliente" reference="clientes" label="Cliente" link="show">
        <TextField source="nome" />
      </ReferenceField>
      <ReferenceField source="id_veiculo" reference="veiculos" label="Veículo" link="show">
        <TextField source="modelo" />
      </ReferenceField>
      <ReferenceField source="id_funcionario" reference="funcionarios" label="Funcionário Responsável" link="show">
        <TextField source="nome" />
      </ReferenceField>
      <DateField source="data_inicio" label="Data e Hora de Início" showTime />
      <DateField source="data_fim" label="Data e Hora de Fim" showTime />
      <NumberField 
        source="preco_total" 
        label="Preço Total (€)" 
        options={{ style: 'currency', currency: 'EUR' }}
      />
      <ChipField source="estado" label="Estado da Reserva" />
    </SimpleShowLayout>
  </Show>
);
