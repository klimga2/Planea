import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard - Inicio.jsx';
import Presupuesto from '../Pages/Dashboard/Presupuesto.jsx';
import GastosMes from "../Pages/Dashboard/DistribucionGastosMes.jsx";
import GastosSemana from "../Pages/Dashboard/GastosSemana.jsx";
import Simuladores from '../Pages/Dashboard/Simuladores.jsx';
import MigestiongestionDiaria from '../Pages/Migestion/Migestion-gestionDiaria.jsx';
import MigestionMovimientos from '../Pages/Migestion/Migestion-gestionDiariaMovimient.jsx';
import MigestionPresupuesto from '../Pages/Migestion/Migestion-presupuesto.jsx';
import MigestionGastosFijos from '../Pages/Migestion/Migestion-Gastosfijos.jsx';
import MigestionGastosFijosAdmin from '../Pages/Migestion/Migestion-Gastosfijos-admin.jsx';
import MigestionPlaneacionMetas from '../Pages/Migestion/planeacion/Migestion-PlaneacionMetas.jsx';
import MigestionCrearMeta from '../Pages/Migestion/planeacion/Migestion-CrearMeta.jsx';
import MigestionDetalleMeta from '../Pages/Migestion/planeacion/Migestion-DetalleMeta.jsx';
import MigestionMisProductos from '../Pages/Migestion/Misproductos/Misproductos.jsx';
import MigestionEfectivo from '../Pages/Migestion/Efectivo/Efectivo.jsx';
import AgregarEfectivo from '../Pages/Migestion/Efectivo/AgregarEfectivo.jsx';
import MisCuentas from '../Pages/Migestion/Cuentas/MisCuentas.jsx';
import MigestionAgregarCuentaAhorro from '../Pages/Migestion/Cuentas/AgregarCuenta.jsx';
import DetalleCuenta from '../Pages/Migestion/Cuentas/DetalleCuenta.jsx';
import MediosDePago from '../Pages/Migestion/MediosDePago/MediosDePago.jsx';
import AgregarMediodePago from '../Pages/Migestion/MediosDePago/AgregarMediodepago.jsx';
import DetalleMediodePago from '../Pages/Migestion/MediosDePago/DetalleMediodepago.jsx';
import MisCreditos from '../Pages/Migestion/Creditos/Creditos.jsx';
import MigestionAgregarCredito from '../Pages/Migestion/Creditos/AgregarCreditos.jsx';
import DetalleCredito from '../Pages/Migestion/Creditos/DetalleCredito.jsx';
import MisInversiones from '../Pages/Migestion/Inversiones/Inversiones.jsx';
import MigestionAgregarInversion from '../Pages/Migestion/Inversiones/AgregarInversion.jsx';
import DetalleInversion from '../Pages/Migestion/Inversiones/DetalleInversion.jsx';
import MisSeguros from '../Pages/Migestion/Seguros/Seguros.jsx';
import MigestionAgregarPoliza from '../Pages/Migestion/Seguros/AgregarSeguro.jsx';
import DetalleSeguro from '../Pages/Migestion/Seguros/DetalleSeguros.jsx';
import MisPensiones from '../Pages/Migestion/Pension/Pension.jsx';
import MigestionAgregarPension from '../Pages/Migestion/Pension/AgregarPension.jsx';
import DetallePension from '../Pages/Migestion/Pension/DetallePension.jsx';
import MisDocumentosTributarios from '../Pages/Migestion/DocTributarios/DocTributarios.jsx';
import MigestionAgregarDocumento from '../Pages/Migestion/DocTributarios/AgregarTributario.jsx';
import MisDocumentosPatrimoniales from '../Pages/Migestion/DocPatrimonial/DocPatrimonial.jsx';
import MigestionAgregarDocumentoPatrimonial from '../Pages/Migestion/DocPatrimonial/AgregarPatrimonial.jsx';
import WelcomeFirstTime from "../Pages/OnBoarding/WelcomeFirstTime.jsx";
import FinancialLevel from "../Pages/OnBoarding/FinancialLevel.jsx";
import Objetives from "../Pages/OnBoarding/Objetives.jsx";
import SmsAuthorization from "../Pages/OnBoarding/SmsAuthorization.jsx";
import InvestmentObjectives from "../Pages/OnBoarding/InvestmentObjectives.jsx";
import SavingObjectives from "../Pages/OnBoarding/SavingObjectives.jsx";
import TaxPlanningObjectives from "../Pages/OnBoarding/TaxPlanningObjectives.jsx";
import InsuranceObjectives from "../Pages/OnBoarding/InsuranceObjectives.jsx";
import SuccessionPlanningObjectives from "../Pages/OnBoarding/SuccessionPlanningObjectives.jsx";
import OtherFinancialServicesObjectives from "../Pages/OnBoarding/OtherFinancialServicesObjectives.jsx";
import WelcomeStart from "../Pages/OnBoarding/WelcomeStart.jsx";
import SplashScreen from "../Pages/SplashScreen/SplashScreen.jsx";
import SignIn from "../Pages/FirstTime/SignIn.jsx";
import SignUp from "../Pages/FirstTime/SignUp.jsx";
import Login from "../Pages/FirstTime/Login.jsx";
import ForgotPassword from "../Pages/FirstTime/ForgotPassword.jsx";
import ResetPassword from "../Pages/FirstTime/ResetPassword.jsx";
import StartFirstTime from "../Pages/FirstTime/StartFirstTime.jsx";


const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SplashScreen />} />
        <Route path='/dashboard' element={<Dashboard />} />
				<Route path='/GastosMes' element={<GastosMes />} />
				<Route path='/GastosSemana' element={<GastosSemana />} />
				<Route path='/Presupuesto' element={<Presupuesto />} />
				<Route path='/Simuladores' element={<Simuladores />} />
				<Route path='/Migestion-gestionDiaria' element={<MigestiongestionDiaria />} />
				<Route path='/Migestion-gestionDiariaMovimientos' element={<MigestionMovimientos />} />
				<Route path='/Migestion-presupuesto' element={<MigestionPresupuesto />} />
				<Route path='/Migestion-gastos-fijos' element={<MigestionGastosFijos />} />
				<Route path='/Migestion-Gastosfijos-admin' element={<MigestionGastosFijosAdmin />} />
				<Route path='/Migestion-planeacionmetas' element={<MigestionPlaneacionMetas />} />
				<Route path='/Migestion-crearmeta' element={<MigestionCrearMeta />} />
				<Route path="/Migestion-meta/:name" element={<MigestionDetalleMeta />} />
				<Route path="/Migestion-misproductos" element={<MigestionMisProductos />} />
				<Route path="/Migestion-efectivo" element={<MigestionEfectivo />} />
				<Route path="/Migestion-agregarefectivo" element={<AgregarEfectivo />} />
				<Route path="/Migestion-miscuentas" element={<MisCuentas />} />
				<Route path="/Migestion-agregarahorro" element={<MigestionAgregarCuentaAhorro/>} />
				<Route path="/Migestion-miscuentas/detalle/:id" element={<DetalleCuenta/>} />
				<Route path="/Migestion-mediosdepago" element={<MediosDePago/>} />
				<Route path="/Migestion-agregarmediodepago" element={<AgregarMediodePago/>} />
				<Route path="/Migestion-mediosdepago/detalle/:id" element={<DetalleMediodePago />} />
				<Route path="/Migestion-miscreditos" element={<MisCreditos/>} />
				<Route path="/Migestion-agregarcreditos" element={<MigestionAgregarCredito/>} />
				<Route path="/Migestion-creditos/detalle/:id" element={<DetalleCredito />}/>
				<Route path="/Migestion-misinversiones" element={<MisInversiones />}/>
				<Route path="/Migestion-agregarinversion" element={<MigestionAgregarInversion />}/>
				<Route path="/Migestion-detalleinversion/:id" element={<DetalleInversion />} />
				<Route path="/Migestion-polizasyseguros" element={<MisSeguros />} />
				<Route path="/Migestion-agregarseguro" element={<MigestionAgregarPoliza />} />
				<Route path="/Migestion-detalleseguros/:id" element={<DetalleSeguro />} />
				<Route path="/Migestion-pensiones" element={<MisPensiones />} />
				<Route path="/Migestion-agregarpension" element={<MigestionAgregarPension />} />
				<Route path="/Migestion-detallepension/:id" element={<DetallePension />} />
				<Route path="/Migestion-documentostributarios" element={<MisDocumentosTributarios />} />
				<Route path="/Migestion-agregardocumentostributarios" element={<MigestionAgregarDocumento />} />
				<Route path="/Migestion-documentosptrimoniales" element={<MisDocumentosPatrimoniales />} />
				<Route path="/Migestion-agregardocumentosptrimoniales" element={<MigestionAgregarDocumentoPatrimonial />} />
        <Route path="/onBoarding" element={<WelcomeFirstTime />} />
        <Route path="/start-first-time" element={<StartFirstTime />} />
        <Route path="/sms-authorization" element={<SmsAuthorization />} />
        <Route path="/financialLevel" element={<FinancialLevel />} />
        <Route path="/objetives" element={<Objetives />} />
        <Route path="/investment-objectives" element={<InvestmentObjectives />} />
        <Route path="/saving-objectives" element={<SavingObjectives />} />
        <Route path="/tax-planning-objectives" element={<TaxPlanningObjectives />} />
        <Route path="/insurance-objectives" element={<InsuranceObjectives />} />
        <Route path="/succession-planning-objectives" element={<SuccessionPlanningObjectives />} />
        <Route path="/other-financial-services-objectives" element={<OtherFinancialServicesObjectives />} />
        <Route path="/welcome-start" element={<WelcomeStart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;