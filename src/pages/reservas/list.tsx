import {
	CrudFilters,
	IResourceComponentsProps,
	useMany,
	HttpError,
} from "@pankod/refine-core";
import "dayjs/locale/es";
// import { Dayjs } from "dayjs";

import {
	List,
	Table,
	useTable,
	getDefaultSortOrder,
	Space,
	EditButton,
	DeleteButton,
	TextField,
	DateField,
	Row,
	Col,
	Form,
	Input,
	Icons,
	Button,
	DatePicker,
	Card,
	Select,
	useSelect,
} from "@pankod/refine-antd";

import {
	IHabitacion,
	IReserva,
	ICliente,
	IReservaFilterVariables,
} from "../../interfaces";
const { RangePicker } = DatePicker;

export const ReservasList: React.FC<IResourceComponentsProps> = () => {
	const { tableProps, sorter, searchFormProps } = useTable<
		IReserva,
		HttpError,
		IReservaFilterVariables
	>({
		initialSorter: [
			{
				field: "id",
				order: "desc",
			},
		],
		metaData: {
			populate: "*",
		},
		onSearch: (params) => {
			const filters: CrudFilters = [];
			const { cliente, habitacion, fecha } = params;

			filters.push(
				{
					field: "cliente.denominacion",
					operator: "containss",
					value: cliente,
				},
				{
					field: "habitacion.id",
					operator: "eq",
					value: habitacion,
				},
				{
					field: "fechaReserva",
					operator: "gte",
					value: fecha ? fecha[0].toISOString() : undefined,
				},
				{
					field: "fechaReserva",
					operator: "lte",
					value: fecha ? fecha[1].toISOString() : undefined,
				}
			);
			console.log(filters);
			return filters;
		},
	});

	// const { selectProps: clienteSelectProps } = useSelect<ICliente>({
	// 	resource: "clientes",
	// 	optionLabel: "denominacion",
	// 	optionValue: "id",
	// });

	const { selectProps: habitacionSelectProps } = useSelect<IHabitacion>({
		resource: "habitaciones",
		optionLabel: "numero",
		optionValue: "id",
	});

	const habitacionesIds =
		tableProps?.dataSource?.map((item) => item.habitacion.id) ?? [];
	const { data: habitacionData } = useMany<IHabitacion>({
		resource: "habitaciones",
		ids: habitacionesIds,
		queryOptions: {
			enabled: habitacionesIds.length > 0,
		},
	});

	const clientesIds =
		tableProps?.dataSource?.map((item) => item.cliente.id) ?? [];
	const { data: clientesData } = useMany<ICliente>({
		resource: "clientes",
		ids: clientesIds,
		queryOptions: {
			enabled: clientesIds.length > 0,
		},
	});
	return (
		<Row gutter={[16, 16]}>
			<Card title='Filtrar'>
				<Col lg={24} xs={24}>
					<Form layout='vertical' {...searchFormProps}>
						<Form.Item label='Cliente' name='cliente'>
							<Input
								placeholder='Nombre Cliente'
								prefix={<Icons.SearchOutlined />}
							/>
						</Form.Item>
						<Form.Item label='Habitación' name='habitacion'>
							<Select
								{...habitacionSelectProps}
								allowClear
								placeholder='Número Habitación'
							/>
						</Form.Item>
						<Form.Item label='Fecha' name='fecha'>
							<RangePicker />
						</Form.Item>
						<Form.Item>
							<Button htmlType='submit' type='primary'>
								Buscar
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Card>
			<Col lg={18} xs={24}>
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
							key='[habitacion][id]'
							dataIndex={["habitacion", "id"]}
							title='Habitación'
							render={(value) => {
								return (
									<TextField
										value={
											habitacionData?.data.find(
												(item) => item.id === value
											)?.numero
										}
									/>
								);
							}}
						/>
						<Table.Column
							key='[cliente][id]'
							dataIndex={["cliente", "id"]}
							title='Cliente'
							render={(value) => {
								return (
									<TextField
										value={
											clientesData?.data.find(
												(item) => item.id === value
											)?.denominacion
										}
									/>
								);
							}}
						/>
						<Table.Column
							dataIndex='fechaReserva'
							key='fechaDesde'
							title='Reserva'
							render={(value) => (
								<DateField
									locales='es'
									value={value}
									format='dddd LL'
								/>
							)}
							defaultSortOrder={getDefaultSortOrder(
								"tipo",
								sorter
							)}
							sorter={{ multiple: 2 }}
						/>
						<Table.Column
							dataIndex='fechaDesde'
							key='fechaDesde'
							title='Fecha Desde'
							render={(value) => (
								<DateField
									locales='es'
									value={value}
									format='dddd LL'
								/>
							)}
							sorter={{ multiple: 2 }}
						/>
						<Table.Column
							dataIndex='fechaHasta'
							key='fechaHasta'
							title='Fecha Hasta'
							render={(value) => (
								<DateField
									locales='es'
									value={value}
									format='dddd LL'
								/>
							)}
							sorter={{ multiple: 2 }}
						/>
						<Table.Column<{ id: number }>
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
			</Col>
		</Row>
	);
};
