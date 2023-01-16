import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
	List,
	Table,
	useTable,
	getDefaultSortOrder,
	FilterDropdown,
	Select,
	useSelect,
	DateField,
	Space,
	EditButton,
	DeleteButton,
	ImageField,
	Form,
	Radio,
	Tag,
} from "@pankod/refine-antd";

import { IHotel } from "../../interfaces";

export const HotelesList: React.FC<IResourceComponentsProps> = () => {
	const { tableProps, sorter } = useTable<IHotel>({
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
					sorter={{ multiple: 3 }}
				/>
				<Table.Column
					dataIndex='denominacion'
					key='denominacion'
					title='Denominación'
					defaultSortOrder={getDefaultSortOrder(
						"denominacion",
						sorter
					)}
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
					dataIndex='createdAt'
					title='Alta'
					render={(value) => (
						<DateField value={value} format='DD/MM/YYYY' />
					)}
					defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
					sorter={{ multiple: 1 }}
				/>
				<Table.Column
					dataIndex='publishedAt'
					title='Estado'
					render={(value) => {
						return (
							<Tag color={value ? "green" : "blue"}>
								{value ? "Published" : "Draft"}
							</Tag>
						);
					}}
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
