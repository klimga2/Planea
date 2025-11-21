import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard - Inicio';
import Presupuesto from '../Pages/Dashboard/Presupuesto';
import GastosMes from '../Pages/Dashboard/GastosMes';
import GastosSemana from '../Pages/Dashboard/GastosSemana';
import Simuladores from '../Pages/Dashboard/Simuladores';
import MigestiongestionDiaria from '../Pages/Migestion/Migestion-gestionDiaria';
import MigestionMovimientos from '../Pages/Migestion/Migestion-gestionDiariaMovimient';
import MigestionPresupuesto from '../Pages/Migestion/Migestion-presupuesto';
import MigestionGastosFijos from '../Pages/Migestion/Migestion-Gastosfijos';
import MigestionGastosFijosAdmin from '../Pages/Migestion/Migestion-Gastosfijos-admin';
import MigestionPlaneacionMetas from '../Pages/Migestion/planeacion/Migestion-PlaneacionMetas';
import MigestionCrearMeta from '../Pages/Migestion/planeacion/Migestion-CrearMeta';
import MigestionDetalleMeta from '../Pages/Migestion/planeacion/Migestion-DetalleMeta';
import MigestionMisProductos from '../Pages/Migestion/Misproductos/Misproductos';
import MigestionEfectivo from '../Pages/Migestion/Efectivo/Efectivo';
import AgregarEfectivo from '../Pages/Migestion/Efectivo/AgregarEfectivo';
import MisCuentas from '../Pages/Migestion/Cuentas/MisCuentas';
import MigestionAgregarCuentaAhorro from '../Pages/Migestion/Cuentas/AgregarCuenta';
import DetalleCuenta from '../Pages/Migestion/Cuentas/DetalleCuenta';
import MediosDePago from '../Pages/Migestion/MediosDePago/MediosDePago';
import AgregarMediodePago from '../Pages/Migestion/MediosDePago/AgregarMediodepago';
import DetalleMediodePago from '../Pages/Migestion/MediosDePago/DetalleMediodepago';
import MisCreditos from '../Pages/Migestion/Creditos/Creditos';
import MigestionAgregarCredito from '../Pages/Migestion/Creditos/AgregarCreditos';
import DetalleCredito from '../Pages/Migestion/Creditos/DetalleCredito';
import MisInversiones from '../Pages/Migestion/Inversiones/Inversiones';
import MigestionAgregarInversion from '../Pages/Migestion/Inversiones/AgregarInversion';
import DetalleInversion from '../Pages/Migestion/Inversiones/DetalleInversion';
import MisSeguros from '../Pages/Migestion/Seguros/Seguros';
import MigestionAgregarPoliza from '../Pages/Migestion/Seguros/AgregarSeguro';
import DetalleSeguro from '../Pages/Migestion/Seguros/DetalleSeguros';
import MisPensiones from '../Pages/Migestion/Pension/Pension';
import MigestionAgregarPension from '../Pages/Migestion/Pension/AgregarPension';
import DetallePension from '../Pages/Migestion/Pension/DetallePension';
import MisDocumentosTributarios from '../Pages/Migestion/DocTributarios/DocTributarios';
import MigestionAgregarDocumento from '../Pages/Migestion/DocTributarios/AgregarTributario';
import MisDocumentosPatrimoniales from '../Pages/Migestion/DocPatrimonial/DocPatrimonial';
import MigestionAgregarDocumentoPatrimonial from '../Pages/Migestion/DocPatrimonial/AgregarPatrimonial';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard - Inicio";
import Presupuesto from "../Pages/Dashboard/Presupuesto";
import GastosMes from "../Pages/Dashboard/Distribución gastos x mes";
import GastosSemana from "../Pages/Dashboard/Distribución gastos x semana";
import WelcomeFirstTime from "../Pages/OnBoarding/WelcomeFirstTime";
import FinancialLevel from "../Pages/OnBoarding/FinancialLevel";
import Objetives from "../Pages/OnBoarding/Objetives";
import SmsAuthorization from "../Pages/OnBoarding/SmsAuthorization";
import InvestmentObjectives from "../Pages/OnBoarding/InvestmentObjectives";
import SavingObjectives from "../Pages/OnBoarding/SavingObjectives";
import TaxPlanningObjectives from "../Pages/OnBoarding/TaxPlanningObjectives";
import InsuranceObjectives from "../Pages/OnBoarding/InsuranceObjectives";
import SuccessionPlanningObjectives from "../Pages/OnBoarding/SuccessionPlanningObjectives";
import OtherFinancialServicesObjectives from "../Pages/OnBoarding/OtherFinancialServicesObjectives";
import WelcomeStart from "../Pages/OnBoarding/WelcomeStart";
import SplashScreen from "../Pages/SplashScreen/SplashScreen";
import SignIn from "../Pages/FirstTime/SignIn";
import SignUp from "../Pages/FirstTime/SignUp";
import Login from "../Pages/FirstTime/Login";
import ForgotPassword from "../Pages/FirstTime/ForgotPassword";
import ResetPassword from "../Pages/FirstTime/ResetPassword";
import StartFirstTime from "../Pages/FirstTime/StartFirstTime";


const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
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
			</Routes>
		</BrowserRouter>
	);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/GastosMes" element={<GastosMes />} />
        <Route path="/GastosSemana" element={<GastosSemana />} />
        <Route path="/Presupuesto" element={<Presupuesto />} />
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
