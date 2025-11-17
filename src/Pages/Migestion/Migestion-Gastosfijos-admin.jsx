import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BottomNav from '../../Components/BottomNav';
import {
	MdLocalMovies,
	MdHome,
	MdWaterDrop,
	MdLocalGasStation,
	MdSportsMartialArts,
	MdEdit,
	MdClose,
} from 'react-icons/md';

const MigestionGastosFijosAdmin = () => {
	const Nav = useNavigate();

	const iconMap = {
		1: MdLocalMovies,
		2: MdHome,
		3: MdWaterDrop,
		4: MdLocalGasStation,
		5: MdSportsMartialArts,
		6: MdLocalMovies,
		7: MdLocalMovies,
	};

	const initialItems = [
		{ id: 1, title: 'Netflix', date: '11 de cada mes', amount: 36000 },
		{ id: 2, title: 'Renta', date: '21 de cada mes', amount: 1200000 },
		{ id: 3, title: 'Agua', date: '21 de cada mes', amount: 230000 },
		{ id: 4, title: 'Gas', date: '21 de cada mes', amount: 200000 },
		{ id: 5, title: 'Club de volleyball', date: '18 de cada mes', amount: 30000 },
		{ id: 6, title: 'Disney +', date: '13 de cada mes', amount: 22000 },
		{ id: 7, title: 'HBO max', date: '12 de cada mes', amount: 30000 },
	];

	const initialItemsDetails = {
		1: {
			title: 'Netflix',
			amount: 36000,
			frequency: 'Mensual',
			category: 'Entretenimiento',
			bank: 'Nu',
			date: '11 de cada mes',
		},
		2: {
			title: 'Renta',
			amount: 900000,
			frequency: 'Mensual',
			category: 'Vivienda',
			bank: 'BBVA',
			date: '3 de cada mes',
		},
		3: {
			title: 'Agua',
			amount: 230000,
			frequency: 'Mensual',
			category: 'Vivienda',
			bank: 'BBVA',
			date: '21 de cada mes',
		},
		4: {
			title: 'Gas',
			amount: 200000,
			frequency: 'Mensual',
			category: 'Vivienda',
			bank: 'BBVA',
			date: '21 de cada mes',
		},
		5: {
			title: 'Club de volleyball',
			amount: 30000,
			frequency: 'Mensual',
			category: 'Deporte',
			bank: 'Nequi',
			date: '18 de cada mes',
		},
		6: {
			title: 'Disney +',
			amount: 22000,
			frequency: 'Mensual',
			category: 'Entretenimiento',
			bank: 'Nu',
			date: '13 de cada mes',
		},
		7: {
			title: 'HBO max',
			amount: 30000,
			frequency: 'Mensual',
			category: 'Entretenimiento',
			bank: 'Nu',
			date: '12 de cada mes',
		},
	};

	const [items, setItems] = useState(initialItems);
	const [itemsDetailsState, setItemsDetailsState] = useState(initialItemsDetails);
	const [showDetail, setShowDetail] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [editData, setEditData] = useState(null);
	const [frequency, setFrequency] = useState('Mensual');

	const openDetail = (item) => {
		setSelectedItem(item);
		setEditData({ ...itemsDetailsState[item.id] });
		setFrequency(itemsDetailsState[item.id].frequency);
		setShowDetail(true);
	};

	const openEdit = () => {
		setShowDetail(false);
		setShowEdit(true);
	};

	const handleSaveEdit = () => {
		if (selectedItem && editData) {
			// Actualizar itemsDetailsState
			const updatedDetails = {
				...itemsDetailsState,
				[selectedItem.id]: { ...editData, frequency },
			};
			setItemsDetailsState(updatedDetails);

			// Actualizar items array para reflejar cambios en la lista
			const updatedItems = items.map((item) =>
				item.id === selectedItem.id
					? { ...item, title: editData.title, amount: editData.amount, date: editData.date }
					: item
			);
			setItems(updatedItems);

			setShowEdit(false);
		}
	};

	const formatCurrency = (v) => `- $${v.toLocaleString('es-CO')}`;

	return (
		<div className='gf-admin-page'>
			{/* Header - REEMPLAZADO */}
			<div
				style={{
					padding: '15px 20px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottom: '1px solid #eee',
				}}
			>
				<button
					onClick={() => Nav('/Migestion-gastos-fijos')}
					style={{ border: 'none', background: 'none', fontSize: '1.2em', cursor: 'pointer' }}
				>
					←
				</button>
				<h2 style={{ margin: 0, fontSize: '1.2em' }}>Suscripciones activas</h2>
				<div style={{ width: '24px' }}></div> {/* Spacer */}
			</div>

			<main className='gf-admin-container'>
				{items.map((it) => (
					<article key={it.id} className='gf-admin-card' onClick={() => openDetail(it)}>
						<div className='gf-admin-left'>
							<div className='gf-admin-icon'>{iconMap[it.id] && iconMap[it.id]({ size: 32 })}</div>
							<div className='gf-admin-meta'>
								<strong className='gf-admin-title-item'>{it.title}</strong>
								<span className='gf-admin-sub'>{it.date}</span>
							</div>
						</div>
						<div className='gf-admin-amount'>{formatCurrency(it.amount)}</div>
					</article>
				))}
			</main>

			{/* Modal de Detalle */}
			{showDetail && selectedItem && (
				<div className='gf-admin-modal-overlay' onClick={() => setShowDetail(false)}>
					<div className='gf-admin-modal' onClick={(e) => e.stopPropagation()}>
						<div className='gf-admin-detail-header'>
							<button className='gf-back' onClick={() => setShowDetail(false)} aria-label='Atrás'>
								<MdClose size={24} />
							</button>
							<h2>Detalle de gasto fijo</h2>
							<button className='gf-admin-edit-btn' onClick={openEdit} aria-label='Editar'>
								<MdEdit size={24} />
							</button>
						</div>{' '}
						<div className='gf-admin-detail-body'>
							<div className='gf-admin-detail-card'>
								<div className='gf-admin-detail-icon'>
									{iconMap[selectedItem.id] && iconMap[selectedItem.id]({ size: 48 })}
								</div>
								<h3 className='gf-admin-detail-title'>{editData?.title}</h3>
								<p className='gf-admin-detail-amount'>- $ {editData?.amount.toLocaleString('es-CO')}</p>
							</div>

							<div className='gf-admin-detail-info'>
								<div className='gf-admin-info-item'>
									<span className='gf-admin-info-label'>{editData?.date}</span>
									<span className='gf-admin-info-title'>Fecha</span>
								</div>
								<div className='gf-admin-info-item'>
									<span className='gf-admin-info-label'>{editData?.bank}</span>
									<span className='gf-admin-info-title'>Método de pago</span>
								</div>
								<div className='gf-admin-info-item'>
									<span className='gf-admin-info-label'>{editData?.category}</span>
									<span className='gf-admin-info-title'>Categoría</span>
								</div>
							</div>
						</div>
						<button className='gf-admin-detail-btn' onClick={() => setShowDetail(false)}>
							Salir
						</button>
					</div>
				</div>
			)}

			{/* Modal de Edición */}
			{showEdit && editData && (
				<div className='gf-admin-modal-overlay' onClick={() => setShowEdit(false)}>
					<div className='gf-admin-modal' onClick={(e) => e.stopPropagation()}>
						<div className='gf-admin-edit-header'>
							<button className='gf-back' onClick={() => setShowEdit(false)} aria-label='Atrás'>
								◀
							</button>
							<h2>Edita tu gasto fijo</h2>
						</div>

						<div className='gf-admin-edit-body'>
							<div className='gf-admin-amount-display'>$ {editData.amount.toLocaleString('es-CO')}</div>

							<div className='gf-admin-frequency'>
								{['Mensual', 'Semanal', 'Quincenal'].map((f) => (
									<button
										key={f}
										className={`gf-admin-frequency-btn ${frequency === f ? 'active' : ''}`}
										onClick={() => setFrequency(f)}
									>
										{f}
									</button>
								))}
							</div>

							<div className='gf-admin-form-group'>
								<label>Monto</label>
								<input
									type='number'
									value={editData.amount}
									onChange={(e) => setEditData({ ...editData, amount: parseInt(e.target.value) || 0 })}
									className='gf-admin-input'
								/>
							</div>

							<div className='gf-admin-form-group'>
								<label>Titulos</label>
								<input
									type='text'
									value={editData.title}
									onChange={(e) => setEditData({ ...editData, title: e.target.value })}
									className='gf-admin-input'
								/>
							</div>

							<div className='gf-admin-form-group'>
								<label>Categoría</label>
								<input
									type='text'
									value={editData.category}
									onChange={(e) => setEditData({ ...editData, category: e.target.value })}
									className='gf-admin-input'
								/>
							</div>

							<div className='gf-admin-form-group'>
								<label>Desde</label>
								<input
									type='text'
									value={editData.bank}
									onChange={(e) => setEditData({ ...editData, bank: e.target.value })}
									className='gf-admin-input'
								/>
							</div>

							<div className='gf-admin-form-group'>
								<label>Fecha</label>
								<input
									type='text'
									value={editData.date}
									onChange={(e) => setEditData({ ...editData, date: e.target.value })}
									className='gf-admin-input'
								/>
							</div>
						</div>
						<button className='gf-admin-edit-save-btn' onClick={handleSaveEdit}>
							Guardar
						</button>
					</div>
				</div>
			)}
			<BottomNav />
		</div>
	);
};

export default MigestionGastosFijosAdmin;
