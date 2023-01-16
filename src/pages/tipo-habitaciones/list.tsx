import { IResourceComponentsProps } from "@pankod/refine-core";

import {
	List,
	Table,
	useTable,
	getDefaultSortOrder,
	Space,
	EditButton,
	DeleteButton,
} from "@pankod/refine-antd";

import { ITipoHabitacion } from "../../interfaces";

export const TipoHabitacionesList: React.FC<IResourceComponentsProps> = () => {
	const { tableProps, sorter } = useTable<ITipoHabitacion>({
		initialSorter: [
			{
				field: "id",
				order: "desc",
			},
		],
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
					dataIndex='tipo'
					key='tipo'
					title='Tipo'
					defaultSortOrder={getDefaultSortOrder("tipo", sorter)}
					sorter={{ multiple: 2 }}
				/>
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
