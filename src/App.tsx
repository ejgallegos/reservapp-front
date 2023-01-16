import authProvider from "./authProvider";
import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router-v6";
import axios from "axios";

import { Refine } from "@pankod/refine-core";
import {
	notificationProvider,
	LoginPage,
	Layout,
	ErrorComponent,
	Icons,
} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/styles.min.css";
import { NameLogo } from "./components/Title";

import { UsersList } from "./pages/users";
// import { HotelesList, HotelEdit, HotelCreate } from "./pages/hoteles";
import { ClientesList, ClienteEdit, ClienteCreate } from "./pages/clientes";
import { ReservasList } from "./pages/reservas";
import {
	TipoHabitacionesList,
	// TipoHotelEdit,
	// TipoHotelCreate,
} from "./pages/tipo-habitaciones";
import {
	HabitacionesList,
	HabitacionEdit,
	HabitacionCreate,
} from "./pages/habitaciones";

import { API_URL } from "./constants";

const App: React.FC = () => {
	const axiosInstance = axios.create();

	return (
		<Refine
			Title={NameLogo}
			authProvider={authProvider}
			dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
			routerProvider={routerProvider}
			resources={[
				// {
				// 	name: "hoteles",
				// 	list: HotelesList,
				// 	edit: HotelEdit,
				// 	create: HotelCreate,
				// },
				{
					icon: <Icons.CalendarOutlined />,
					name: "Reservas",
					list: ReservasList,
				},
				{
					icon: <Icons.TeamOutlined />,
					name: "clientes",
					list: ClientesList,
					edit: ClienteEdit,
					create: ClienteCreate,
				},
				{
					icon: <Icons.TagsOutlined />,
					name: "habitaciones",
					list: HabitacionesList,
					edit: HabitacionEdit,
					create: HabitacionCreate,
				},
				{
					icon: <Icons.BorderlessTableOutlined />,
					name: "tipo-habitaciones",
					list: TipoHabitacionesList,
				},
				{
					icon: <Icons.UserOutlined />,
					options: { label: "Usuarios" },
					name: "users",
					list: UsersList,
				},
			]}
			notificationProvider={notificationProvider}
			LoginPage={LoginPage}
			Layout={Layout}
			catchAll={<ErrorComponent />}
		/>
	);
};

export default App;
