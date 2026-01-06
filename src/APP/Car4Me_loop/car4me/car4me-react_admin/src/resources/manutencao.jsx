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

// Função para transformar as datas antes de enviar para a API
const transformManutencao = (data) => {
  const transformed = { ...data };
  
  // Converter data para ISO 8601 format
  if (data.data_manutencao) {
    const dataManutencao = new Date(data.data_manutencao);
    transformed.data_manutencao = dataManutencao.toISOString();
  }
  
  console.log('Dados de manutenção transformados:', transformed);
  return transformed;
};

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
  <Edit transform={transformManutencao}>
    <SimpleForm>
      <TextInput source="id_manutencao" label="ID" disabled />
      <ReferenceInput source="id_veiculo" reference="veiculos" label="Veículo">
        <SelectInput 
          optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula}`}
          validate={[required()]} 
        />
      </ReferenceInput>
      <DateTimeInput 
        source="data_manutencao" 
        label="Data e Hora da Manutenção" 
        validate={[required(), validateDate]}
        inputProps={{
          max: '2100-12-31T23:59',
          min: '2000-01-01T00:00'
        }}
      />
      <TextInput 
        source="descricao" 
        label="Descrição da Manutenção" 
        validate={[required()]} 
        multiline 
        fullWidth 
      />
      <NumberInput 
        source="custo" 
        label="Custo (€)" 
        validate={[required(), number(), minValue(0)]} 
      />
    </SimpleForm>
  </Edit>
);

export const ManutencaoCreate = () => (
  <Create transform={transformManutencao}>
    <SimpleForm>
      <ReferenceInput source="id_veiculo" reference="veiculos" label="Veículo">
        <SelectInput 
          optionText={(choice) => `${choice.marca} ${choice.modelo} - ${choice.matricula}`}
          validate={[required()]} 
        />
      </ReferenceInput>
      <DateTimeInput 
        source="data_manutencao" 
        label="Data e Hora da Manutenção" 
        validate={[required(), validateDate]}
        inputProps={{
          max: '2100-12-31T23:59',
          min: '2000-01-01T00:00'
        }}
      />
      <TextInput 
        source="descricao" 
        label="Descrição da Manutenção" 
        validate={[required()]} 
        multiline 
        fullWidth 
      />
      <NumberInput 
        source="custo" 
        label="Custo (€)" 
        validate={[required(), number(), minValue(0)]} 
      />
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