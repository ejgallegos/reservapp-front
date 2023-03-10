import { IResourceComponentsProps } from "@pankod/refine-core";

import {
	Create,
	Form,
	Input,
	Select,
	useForm,
	useSelect,
	Upload,
	Radio,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import {
	useStrapiUpload,
	mediaUploadMapper,
	getValueProps,
} from "@pankod/refine-strapi-v4";

import { IHabitacion, IHotel } from "../../interfaces";

export const HabitacionCreate: React.FC<IResourceComponentsProps> = () => {
	const { formProps, saveButtonProps } = useForm<IHabitacion>();

	const { selectProps: hotelSelectProps } = useSelect<IHotel>({
		resource: "hoteles",
		optionLabel: "denominacion",
		optionValue: "id",
	});

	const { ...uploadProps } = useStrapiUpload({
		maxCount: 1,
	});

	return (
		<Create saveButtonProps={saveButtonProps}>
			<Form
				{...formProps}
				layout='vertical'
				onFinish={(values) => {
					return (
						formProps.onFinish &&
						formProps.onFinish(mediaUploadMapper(values))
					);
				}}>
				<Form.Item
					label='Número'
					name='numero'
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label='Hotel'
					name='hotel'
					rules={[
						{
							required: true,
						},
					]}>
					<Select {...hotelSelectProps} />
				</Form.Item>
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
				<Form.Item label='Estado' name='disponible'>
					<Radio name='disponible'>Disponible</Radio>
				</Form.Item>
				{/* <Form.Item label='Cover'>
					<Form.Item
						name='cover'
						valuePropName='fileList'
						getValueProps={(data) => getValueProps(data, API_URL)}
						noStyle>
						<Upload.Dragger
							name='files'
							action={`${API_URL}/upload`}
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
		</Create>
	);
};
