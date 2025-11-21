import {
	FaArrowRight,
	FaRegCreditCard,
	FaRegCalendarCheck,
	FaPlusSquare,
	FaChartBar,
	FaFolderOpen,
	FaClipboardList,
} from 'react-icons/fa';

export const SeccionGestiontData = [
	{
		id: 1,
		title: 'Movimientos',
		description: 'Registro actualizado de ingresos y gastos recientes.',
		icon: FaArrowRight,
	},
	{
		id: 2,
		title: 'Presupuesto',
		description: 'Control de lo planeado vs. lo gastado en el mes.',
		icon: FaClipboardList,
	},
	{
		id: 3,
		title: 'Gastos fijos',
		description: 'Pagos organizados para evitar olvidos.',
		icon: FaRegCreditCard,
	},
	{
		id: 4,
		title: 'Planeación de metas',
		description: 'Creación y seguimiento de tus metas financieras.',
		icon: FaPlusSquare,
	},
	{
		id: 5,
		title: 'Mis productos',
		description: 'Resumen de tus cuentas, tarjetas y ahorros en un solo lugar.',
		icon: FaFolderOpen,
	},
	{
		id: 6,
		title: 'Planeación tributaria',
		description: 'Planea tu declaración de renta sin enredos.',
		icon: FaChartBar,
	},
	{
		id: 7,
		title: 'Planeación patrimonial',
		description: 'Descubre cuánto vale realmente tu patrimonio.',
		icon: FaRegCalendarCheck,
	},
];
