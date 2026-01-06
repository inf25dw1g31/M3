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

// Validação customizada para datas - limita o ano máximo
const validateDate = (value) => {
  if (!value) return undefined;
  
  const date = new Date(value);
  const year = date.getFullYear();
  
  // Limitar ao ano 2100
  if (year > 2100) {
    return 'O ano não pode ser superior a 2100';
  }
  
  // Limitar ao ano mínimo 2000
  if (year < 2000) {
    return 'O ano não pode ser inferior a 2000';
  }
  
  return undefined;
};

// Validação para data de fim (deve ser depois da data de início)
const validateDataFim = (value, allValues) => {
  if (!value) return undefined;
  
  const year = new Date(value).getFullYear();
  if (year > 2100) {
    return 'O ano não pode ser superior a 2100';
  }
  if (year < 2000) {
    return 'O ano não pode ser inferior a 2000';
  }
  
  if (!allValues.data_inicio) return undefined;
  
  const dataInicio = new Date(allValues.data_inicio);
  const dataFim = new Date(value);
  
  if (dataFim <= dataInicio) {
    return 'A data de fim deve ser posterior à data de início';
  }
  
  return undefined;
};

// Função para transformar as datas antes de enviar para a API
const transformReserva = (data) => {
  const transformed = { ...data };
  
  // Converter datas para ISO 8601 format
  if (data.data_inicio) {
    const dataInicio = new Date(data.data_inicio);
    transformed.data_inicio = dataInicio.toISOString();
  }
  
  if (data.data_fim) {
    const dataFim = new Date(data.data_fim);
    transformed.data_fim = dataFim.toISOString();
  }
  
  // Garantir que o estado existe
  if (!transformed.estado) {
    transformed.estado = 'ativa';
  }
  
  console.log('Dados da reserva transformados:', transformed);
  return transformed;
};

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
  <Edit transform={transformReserva}>
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
      <DateTimeInput 
        source="data_inicio" 
        label="Data e Hora de Início" 
        validate={[required(), validateDate]} 
      />
      <DateTimeInput 
        source="data_fim" 
        label="Data e Hora de Fim" 
        validate={[required(), validateDataFim]} 
      />
      <NumberInput 
        source="preco_total" 
        label="Preço Total (€)" 
        validate={[required(), number(), minValue(0)]} 
      />
      <SelectInput 
        source="estado" 
        label="Estado da Reserva" 
        choices={estadosReserva} 
        validate={[required()]} 
      />
    </SimpleForm>
  </Edit>
);

export const ReservaCreate = () => (
  <Create transform={transformReserva}>
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
      <DateTimeInput 
        source="data_inicio" 
        label="Data e Hora de Início" 
        validate={[required(), validateDate]} 
      />
      <DateTimeInput 
        source="data_fim" 
        label="Data e Hora de Fim" 
        validate={[required(), validateDataFim]} 
      />
      <NumberInput 
        source="preco_total" 
        label="Preço Total (€)" 
        validate={[required(), number(), minValue(0)]} 
      />
      <SelectInput 
        source="estado" 
        label="Estado da Reserva" 
        choices={estadosReserva} 
        defaultValue="ativa" 
        validate={[required()]} 
      />
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