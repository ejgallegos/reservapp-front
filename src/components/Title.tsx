import { Divider, Icons, Typography } from "@pankod/refine-antd";
type TitleProps = {
	collapsed: boolean;
};
const { Title } = Typography;
export const NameLogo: React.FC<TitleProps> = ({ collapsed }) => {
	return (
		<div>
			{collapsed ? (
				<>
					<Icons.AlertOutlined
						style={{
							color: "white",
							fontSize: "32px",
							margin: "15px 25px",
						}}
					/>
					<Divider style={{ background: "gray" }} />
				</>
			) : (
				<>
					<Title
						level={2}
						style={{ margin: "15px 10px", color: "#fff" }}>
						ReservApp
					</Title>
					<Divider style={{ background: "gray" }} />
				</>
			)}
		</div>
	);
};
