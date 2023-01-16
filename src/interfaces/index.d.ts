export interface ICategory {
	id: string;
	title: string;
}
export interface IPost {
	id: string;
	title: string;
	category: ICategory;
	content: string;
	locale: string;
	createdAt: string;
}
export interface IHotel {
	id: number;
	denominacion: string;
	descripcion: string;
	createdAt: string;
	status: "published" | "draft" | "rejected";
	publishedAt: string;
}
export interface ICliente {
	id: numer;
	denominacion: string;
	email: string;
	telefono: number;
	createdAt: string;
}
export interface ITipoHabitacion {
	id: number;
	tipo: string;
}
export interface IHabitacion {
	id: number;
	numero: number;
	descripcion: string;
	disponible: boolean;
	hotel: IHotel;
	tipo: ITipoHabitacion;
}
export interface IReserva {
	id: number;
	cliente: ICliente;
	habitacion: IHabitacion;
	fechaDesde: date;
	fechaHasta: date;
	fechaReserva: date;
}

export interface IReservaFilterVariables {
	cliente: { denominacion: string };
	habitacion: { id: number };
	fecha: [Dayjs, Dayjs];
}
