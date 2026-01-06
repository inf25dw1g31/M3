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
  SelectInput,
  ReferenceInput,
  Show,
  SimpleShowLayout,
  ReferenceField,
  required,
  number,
  minValue,
  maxValue,
  ChipField,
  ReferenceManyField,
  Labeled,
} from 'react-admin';

/* =========================
   CONSTANTES
========================= */

const marcas = [
  'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Renault', 'Peugeot', 'Citroen', 'Toyota',
  'Nissan', 'Honda', 'Hyundai', 'Kia', 'Ford', 'Opel', 'Volvo', 'Fiat', 'Seat', 'Skoda',
  'Mazda', 'Mitsubishi', 'Jeep', 'Land Rover', 'Mini', 'Porsche', 'Lexus', 'Subaru',
  'Alfa Romeo', 'Dacia', 'Jaguar', 'Chevrolet',
];

const estados = [
  { id: 'Disponivel', name: 'Disponível' },
  { id: 'Alugado', name: 'Alugado' },
  { id: 'Manutencao', name: 'Manutenção' },
];

/* =========================
   TRANSFORM (CRÍTICO)
========================= */

const transformVeiculo = (data) => ({
  marca: data.marca,
  modelo: data.modelo,
  matricula: data.matricula,
  ano: Number(data.ano),
  cor: data.cor || null,
  quilometragem: Number(data.quilometragem || 0),
  estado: data.estado,
  id_categoria: Number(data.id_categoria),
});

/* =========================
   LIST
========================= */

export const VeiculoList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id_veiculo" label="ID" />
      <TextField source="marca" label="Marca" />
      <TextField source="modelo" label="Modelo" />
      <TextField source="matricula" label="Matrícula" />
      <NumberField source="ano" label="Ano" />
      <TextField source="cor" label="Cor" />
      <NumberField source="quilometragem" label="Km" />
      <ChipField source="estado" label="Estado" />
      <ReferenceField source="id_categoria" reference="categorias" label="Categoria">
        <TextField source="nome" />
      </ReferenceField>
    </Datagrid>
  </List>
);

/* =========================
   EDIT (CORRIGIDO)
========================= */

export const VeiculoEdit = () => (
  <Edit transform={transformVeiculo}>
    <SimpleForm>
      <TextInput source="id_veiculo" label="ID" disabled />

      <SelectInput
        source="marca"
        label="Marca"
        choices={marcas.map(m => ({ id: m, name: m }))}
        validate={[required()]}
      />

      <TextInput source="modelo" label="Modelo" validate={[required()]} fullWidth />

      <TextInput source="matricula" label="Matrícula" validate={[required()]} />

      <NumberInput
        source="ano"
        label="Ano"
        validate={[
          required(),
          number(),
          minValue(1900),
          maxValue(new Date().getFullYear() + 1),
        ]}
      />

      <TextInput source="cor" label="Cor" />

      <NumberInput
        source="quilometragem"
        label="Quilometragem"
        validate={[number(), minValue(0)]}
      />

      <SelectInput
        source="estado"
        label="Estado"
        choices={estados}
        validate={[required()]}
      />

      <ReferenceInput source="id_categoria" reference="categorias" label="Categoria">
        <SelectInput optionText="nome" validate={[required()]} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

/* =========================
   CREATE
========================= */

export const VeiculoCreate = () => (
  <Create transform={transformVeiculo}>
    <SimpleForm>
      <SelectInput
        source="marca"
        label="Marca"
        choices={marcas.map(m => ({ id: m, name: m }))}
        validate={[required()]}
      />

      <TextInput source="modelo" label="Modelo" validate={[required()]} fullWidth />

      <TextInput source="matricula" label="Matrícula" validate={[required()]} />

      <NumberInput
        source="ano"
        label="Ano"
        validate={[
          required(),
          number(),
          minValue(1900),
          maxValue(new Date().getFullYear() + 1),
        ]}
      />

      <TextInput source="cor" label="Cor" />

      <NumberInput
        source="quilometragem"
        label="Quilometragem"
        validate={[number(), minValue(0)]}
        defaultValue={0}
      />

      <SelectInput
        source="estado"
        label="Estado"
        choices={estados}
        defaultValue="Disponivel"
        validate={[required()]}
      />

      <ReferenceInput source="id_categoria" reference="categorias" label="Categoria">
        <SelectInput optionText="nome" validate={[required()]} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

/* =========================
   SHOW
========================= */

export const VeiculoShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id_veiculo" label="ID" />
      <TextField source="marca" label="Marca" />
      <TextField source="modelo" label="Modelo" />
      <TextField source="matricula" label="Matrícula" />
      <NumberField source="ano" label="Ano" />
      <TextField source="cor" label="Cor" />
      <NumberField source="quilometragem" label="Quilometragem (km)" />
      <ChipField source="estado" label="Estado" />

      <ReferenceField source="id_categoria" reference="categorias" label="Categoria">
        <TextField source="nome" />
      </ReferenceField>

      <Labeled label="Histórico de Reservas">
        <ReferenceManyField reference="reservas" target="id_veiculo">
          <Datagrid rowClick="show">
            <TextField source="id_reserva" label="ID Reserva" />
            <ReferenceField source="id_cliente" reference="clientes" label="Cliente">
              <TextField source="nome" />
            </ReferenceField>
            <TextField source="data_inicio" label="Data Início" />
            <TextField source="data_fim" label="Data Fim" />
            <ChipField source="estado" label="Estado" />
          </Datagrid>
        </ReferenceManyField>
      </Labeled>

      <Labeled label="Histórico de Manutenções">
        <ReferenceManyField reference="manutencaos" target="id_veiculo">
          <Datagrid rowClick="show">
            <TextField source="data_manutencao" label="Data" />
            <TextField source="descricao" label="Descrição" />
            <NumberField
              source="custo"
              label="Custo (€)"
              options={{ style: 'currency', currency: 'EUR' }}
            />
          </Datagrid>
        </ReferenceManyField>
      </Labeled>
    </SimpleShowLayout>
  </Show>
);
