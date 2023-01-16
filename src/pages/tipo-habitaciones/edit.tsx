import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
	Edit,
	Form,
	Input,
	Select,
	useForm,
	useSelect,
	Upload,
	Radio,
} from "@pankod/refine-antd";
import {
	useStrapiUpload,
	getValueProps,
	mediaUploadMapper,
} from "@pankod/refine-strapi-v4";

import MDEditor from "@uiw/react-md-editor";

import { IHabitacion } from "../../interfaces";

export const HabitacionEdit: React.FC<IResourceComponentsProps> = () => {
	const { formProps, saveButtonProps, queryResult } = useForm<IHabitacion>({
		metaData: { populate: ["category", "cover"] },
	});

	// const { selectProps } = useSelect<ICategory>({
	// 	resource: "categories",
	// 	defaultValue: queryResult?.data?.data?.category?.id,
	// 	metaData: { locale: queryResult?.data?.data.locale },
	// });

	const { ...uploadProps } = useStrapiUpload({
		maxCount: 1,
	});

	return (
		<Edit saveButtonProps={saveButtonProps}>
			<Form
				{...formProps}
				layout='vertical'
				// eslint-disable-next-line
				onFinish={(values: any) => {
					return formProps.onFinish?.(mediaUploadMapper(values));
				}}>
				<Form.Item label='Locale' name='locale'>
					<Radio.Group disabled>
						<Radio.Button value='en'>English</Radio.Button>
						<Radio.Button value='de'>Deutsch</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					wrapperCol={{ span: 14 }}
					label='Número'
					name='numero'
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				{/* <Form.Item
					wrapperCol={{ span: 8 }}
					label='Category'
					name={["category", "id"]}
					rules={[
						{
							required: true,
						},
					]}>
					<Select {...selectProps} />
				</Form.Item> */}
				<Form.Item
					label='Descripción'
					name='descripcion'
					rules={[
						{
							required: true,
						},
					]}>
					<MDEditor data-color-mode='light' />
				</Form.Item>
				{/* <Form.Item label='Cover'>
					<Form.Item
						name='cover'
						valuePropName='fileList'
						getValueProps={(data) => getValueProps(data, API_URL)}
						noStyle>
						<Upload.Dragger
							name='files'
							action={`${API_URL}/api/upload`}
							headers={{
								Authorization: `Bearer ${localStorage.getItem(
									TOKEN_KEY
								)}`,
							}}
							listType='picture'
							multiple
							{...uploadProps}>
							<p className='ant-upload-text'>
								Drag & drop a file in this area
							</p>
						</Upload.Dragger>
					</Form.Item>
				</Form.Item> */}
			</Form>
		</Edit>
	);
};
