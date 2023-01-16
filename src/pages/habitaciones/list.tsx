import { IResourceComponentsProps, useMany } from "@pankod/refine-core";

import {
	List,
	Table,
	useTable,
	getDefaultSortOrder,
	FilterDropdown,
	Select,
	useSelect,
	Space,
	EditButton,
	DeleteButton,
	Tag,
	TextField,
} from "@pankod/refine-antd";

import { IHabitacion, IHotel, ITipoHabitacion } from "../../interfaces";

export const HabitacionesList: React.FC<IResourceComponentsProps> = () => {
	const { tableProps, sorter } = useTable<IHabitacion>({
		initialSorter: [
			{
				field: "id",
				order: "desc",
			},
		],
		metaData: {
			populate: "*",
		},
	});

	const { selectProps: hotelSelectProps } = useSelect<IHotel>({
		resource: "hoteles",
		optionLabel: "denominacion",
		optionValue: "id",
	});

	const { selectProps: tipoSelectProps } = useSelect<ITipoHabitacion>({
		resource: "tipo-habitaciones",
		optionLabel: "tipo",
		optionValue: "id",
	});

	// const hotelesIds =
	// 	tableProps?.dataSource?.map((item) => item.hotel.id) ?? [];
	// const { data: hotelesData } = useMany<IHotel>({
	// 	resource: "hoteles",
	// 	ids: hotelesIds,
	// 	queryOptions: {
	// 		enabled: hotelesIds.length > 0,
	// 	},
	// });

	const tipoHabitacionesIds =
		tableProps?.dataSource?.map((item) => item.tipo.id) ?? [];
	const { data: habitacionesData } = useMany<ITipoHabitacion>({
		resource: "tipo-habitaciones",
		ids: tipoHabitacionesIds,
		queryOptions: {
			enabled: tipoHabitacionesIds.length > 0,
		},
	});
	return (
		<List>
			<Table
				{...tableProps}
				rowKey='id'
				pagination={{
					...tableProps.pagination,
					showSizeChanger: true,
				}}>
				<Table.Column
					dataIndex='id'
					key='id'
					title='ID'
					defaultSortOrder={getDefaultSortOrder("id", sorter)}
					sorter={{ multiple: 2 }}
				/>
				<Table.Column
					dataIndex='numero'
					key='numero'
					title='Número'
					defaultSortOrder={getDefaultSortOrder("numero", sorter)}
					sorter={{ multiple: 2 }}
				/>
				<Table.Column
					dataIndex='descripcion'
					key='descripcion'
					title='Descripción'
					defaultSortOrder={getDefaultSortOrder(
						"descripcion",
						sorter
					)}
					sorter={{ multiple: 2 }}
				/>
				<Table.Column
					key='[tipo][id]'
					dataIndex={["tipo", "id"]}
					title='Tipo'
					render={(value) => {
						return (
							<TextField
								value={
									habitacionesData?.data.find(
										(item) => item.id === value
									)?.tipo
								}
							/>
						);
					}}
					filterDropdown={(props) => (
						<FilterDropdown {...props}>
							<Select
								style={{ minWidth: 200 }}
								mode='multiple'
								placeholder='Seleccione Tipo'
								{...tipoSelectProps}
							/>
						</FilterDropdown>
					)}
				/>
				<Table.Column
					dataIndex='disponible'
					title='Estado'
					render={(value) => {
						return (
							<Tag color={value ? "green" : "red"}>
								{value ? "Disponible" : "No Disponible"}
							</Tag>
						);
					}}
				/>

				{/* <Table.Column
					key='[hotel][id]'
					dataIndex={["hotel", "id"]}
					title='Hotel'
					render={(value) => {
						return (
							<TextField
								value={
									hotelesData?.data.find(
										(item) => item.id === value
									)?.denominacion
								}
							/>
						);
					}}
					filterDropdown={(props) => (
						<FilterDropdown {...props}>
							<Select
								style={{ minWidth: 200 }}
								mode='multiple'
								placeholder='Seleccione Hotel'
								{...hotelSelectProps}
							/>
						</FilterDropdown>
					)}
				/> */}
				<Table.Column<{ id: string }>
					title='Acciones'
					dataIndex='actions'
					render={(_, record) => (
						<Space>
							<EditButton
								hideText
								size='small'
								recordItemId={record.id}
							/>
							<DeleteButton
								hideText
								size='small'
								recordItemId={record.id}
							/>
						</Space>
					)}
				/>
			</Table>
		</List>
	);
};
