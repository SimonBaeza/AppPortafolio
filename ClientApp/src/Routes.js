import { Home } from "./components/Home";
import Login  from "./components/auth/Login";
import { Logout } from "./components/auth/Logout";

import { Register } from "./components/auth/Register";
import { GetAllUsers } from "./components/admin/GetAllUsers";
import { UpdateUser } from "./components/admin/UpdateUser";
import { GetUsersId } from "./components/admin/GetUsersId";

import { RegisterCompany } from "./components/admin/RegisterCompany";
import { GetAllCompanies } from "./components/admin/maintainerCompany/GetAllCompanies";
import { GetCompanyRut } from "./components/admin/maintainerCompany/GetCompanyRut";
import { UpdateCompany } from "./components/admin/maintainerCompany/UpdateCompany";

import { DoContract } from "./components/admin/maintainerContract/DoContract";
import { GetAllContracts } from "./components/admin/maintainerContract/GetAllContracts";
import { GetContractRut } from "./components/admin/maintainerContract/GetContractRut";
import { UpdateContract } from "./components/admin/maintainerContract/UpdateContract";

// Negocio
import { Consultation, RegisterConsultation } from "./components/profesional/RegisterConsultation";
import { RegisterVisit } from "./components/profesional/RegisterVisit";
import { GetAllAccidents } from "./components/profesional/GetAllAccidents";
import { GetMyConsultation } from "./components/profesional/GetMyConsultation";

import { ReportAccident } from "./components/client/ReportAccident";
import { RequestACtivities } from "./components/client/RequestActivities";
import { Dummy } from "./Dummy";
import { format } from "path";
import { GetMyVisit } from "./components/profesional/GetMyVisit";
import { GetAllConsultations } from "./components/admin/control/GetAllConsultations";
import { GetAllVisits } from "./components/admin/control/GetAllVisits";
import { GetVisitByClient2 } from "./components/admin/control/GetVisitByClient";
import { GetConsultationByClient } from "./components/client/GetConsultationByClient";
import { RegisterImprove } from "./components/profesional/RegisterImprove";
import Session from "./components/auth/Session";
import { CheckListMyConsultation } from "./components/profesional/CheckListMyConsultation";
import { CheckListMyVisit } from "./components/profesional/CheckListMyVisist";
import { GetAllImproves } from "./components/profesional/GetAllImproves";
import { RegisterPay } from "./components/admin/control/RegisterPay";
import { GetAllPays } from "./components/admin/control/GetAllPays";
import { GetPayCompany } from "./components/admin/control/GetPayCompany";
import { GetPDFConsultation } from "./components/profesional/GetPDFConsultation";
import { GetPDFVisit } from "./components/profesional/GetPDFVisit";
import { GetAsesoryByClient } from "./components/admin/control/GetAsesoryByClient";

import { GetVisitByClient } from "./components/client/GetVisitByClient";
import { GetAllRequestedActivities } from "./components/profesional/GetAllRequestedActivities";
import { CalculateAccidentRate } from "./components/admin/control/CalculateAccidentRate";

/*
1 = admin
2 = profesional
3 = cliente
*/

export const Routes = {
  "1": [
    {
      path: "/Home",
      component: Home,
      layout: "/1",
      label: "Inicio",
      belong: "Home"
    },
    {
      path: "/register",
      component: Register,
      layout: "/1",
      label: "Registrar",
      belong: "Usuario"
    },
    {
      path: "/getAllUsers",
      component: GetAllUsers,
      layout: "/1",
      label: "Ver Usuarios",
      belong: "Usuario"
    },
    {
      path: "/getUsersId",
      component: GetUsersId,
      layout: "/1",
      label: "Buscar Usuarios",
      belong: "Usuario"
    },
    {
      path: "/updateUser",
      component: UpdateUser,
      layout: "/1",
      label: "Actualizar Usuario",
      belong: "Usuario"
    },
    {
      path: "/registerCompany",
      component: RegisterCompany,
      layout: "/1",
      label: "Registrar Empresa",
      belong: "Cliente"
    },
    {
      path: "/getAllCompanies",
      component: GetAllCompanies,
      layout: "/1",
      label: "Ver Clientes",
      belong: "Cliente"
    },
    {
      path: "/getcompanyRut",
      component: GetCompanyRut,
      layout: "/1",
      label: "Buscar Cliente",
      belong: "Cliente"
    },
    {
      path: "/updateCompany",
      component: UpdateCompany,
      layout: "/1",
      label: "Actualizar Cliente",
      belong: "Cliente"
    },
    {
      path: "/doContract",
      component: DoContract,
      layout: "/1",
      label: "Realizar un Contrato",
      belong: "Contrato"
    },
    {
      path: "/getAllContracts",
      component: GetAllContracts,
      layout: "/1",
      label: "Ver Contratos",
      belong: "Contrato"
    },
    {
      path: "/getContractRut",
      component: GetContractRut,
      layout: "/1",
      label: "Buscar Contrato",
      belong: "Contrato"
    },
    {
      path: "/updateContract",
      component: UpdateContract,
      layout: "/1",
      label: "Actualizar Contrato",
      belong: "Contrato"
    },
    {
      path: "/getAllVisits",
      component: GetAllVisits,
      layout: "/1",
      label: "Ver Visitas",
      belong: "Acciones"
    },
    {
      path: "/getAllConsultations",
      component: GetAllConsultations,
      layout: "/1",
      label: "Ver Asesorias",
      belong: "Acciones"
    },
    {
      path: "/registerPay",
      component: RegisterPay,
      layout: "/1",
      label: "Registrar Pago",
      belong: "Pago"
    },
    {
      path: "/getAllPay",
      component: GetAllPays,
      layout: "/1",
      label: "Ver Pagos",
      belong: "Pago"
    },
    {
      path: "/getPayCompany",
      component: GetPayCompany,
      layout: "/1",
      label: "Buscar Pagos",
      belong: "Acciones"
    },
    {
      path: "/getVisitByClient",
      component: GetVisitByClient2,
      layout: "/1",
      label: "Buscar Visitas por Cliente",
      belong: "Acciones"
    },
    {
      path: "/getAsesoryByClient",
      component: GetAsesoryByClient,
      layout: "/1",
      label: "Buscar Asesorías por Cliente",
      belong: "Acciones"
    },
    {
      path: "/logout",
      component: Logout,
      layout: "/1",
      label: "Salir",
      belong: "Cerrar Sesión"
    },
    {
      path: "/calculateAccidentRate",
      component: CalculateAccidentRate,
      layout: "/1",
      label: "Calcular Accidentabilidad",
      belong: "Acciones"
    }
  ],
  "2": [
    {
      path: "/Home",
      component: Home,
      layout: "/2",
      label: "Inicio",
      belong: "Home"
    },
    {
      path: "/registerConsultation",
      component: RegisterConsultation,
      layout: "/2",
      label: "Registrar Asesoría",
      belong: "Acciones"
    },
    {
      path: "/registerVisit",
      component: RegisterVisit,
      layout: "/2",
      label: "Registrar Visita",
      belong: "Acciones"
    },
    {
      path: "/getAllCompanies",
      component: GetAllCompanies,
      layout: "/2",
      label: "Ver Clientes",
      belong: "Acciones"
    },
    {
      path: "/getAllAccidents",
      component: GetAllAccidents,
      layout: "/2",
      label: "Ver Accidentes",
      belong: "Acciones"
    },
    {
      path: "/getMyConsultation",
      component: GetMyConsultation,
      layout: "/2",
      label: "Ver mis Asesorías",
      belong: "Acciones"
    },
    {
      path: "/getMyVisit",
      component: GetMyVisit,
      layout: "/2",
      label: "Ver mis Visitas",
      belong: "Acciones"
    },
    {
      path: "/registerImprove",
      component: RegisterImprove,
      layout: "/2",
      label: "Realizar Mejora",
      belong: "Acciones"
    },
    {
      path: "/checkListMyConsultation",
      component: CheckListMyConsultation,
      layout: "/2",
      label: "Finalizar Asesorias",
      belong: "Check List"
    },
    {
      path: "/checkListMyVisit",
      component: CheckListMyVisit,
      layout: "/2",
      label: "Finalizar Visitas",
      belong: "Check List"
    },
    {
      path: "/getAllImproves",
      component: GetAllImproves,
      layout: "/2",
      label: "Revisar Mejoras",
      belong: "Acciones"
    },
    {
      path: "/getPDFConsultation",
      component: GetPDFConsultation,
      layout: "/2",
      label: "Generar PDF de Asesoría",
      belong: "Reporte"
    },
    {
      path: "/getPDFVisit",
      component: GetPDFVisit,
      layout: "/2",
      label: "Generar PDF de Visita",
      belong: "Reporte"
    },
    {
      path: "/logout",
      component: Logout,
      layout: "/2",
      label: "Salir",
      belong: "Cerrar Sesión"
    },
    {
      path: "/getAllRequestedActivities",
      component: GetAllRequestedActivities,
      layout: "/2",
      label: "Ver todas las Actividades solicitadas",
      belong: "Acciones"
    }
  ],
  "3": [
    {
      path: "/Home",
      component: Home,
      layout: "/3",
      label: "Home",
      belong: "Inicio"
    },
    {
      path: "/reportAccident",
      component: ReportAccident,
      layout: "/3",
      label: "Reportar Accidente",
      belong: "Accidente"
    },
    {
      path: "/getConsultationByClient",
      component: GetConsultationByClient,
      layout: "/3",
      label: "Ver mis Asesorías",
      belong: "Acciones"
    },
    {
      path: "/getVisitByClient",
      component: GetVisitByClient,
      layout: "/3",
      label: "Ver mis Visitas",
      belong: "Acciones"
    },
    {
      path: "/requestActivities",
      component: RequestACtivities,
      layout: "/3",
      label: "Soliticar Actividad",
      belong: "Acciones"
    },
    {
      path: "/logout",
      component: Logout,
      layout: "/3",
      label: "Salir",
      belong: "Cerrar Sesión"
    }
  ]
};
