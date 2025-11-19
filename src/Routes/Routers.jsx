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
