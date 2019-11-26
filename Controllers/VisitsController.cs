using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using no_mas_accidentes.Models12;
using Oracle.ManagedDataAccess.Client;
using IronPdf;

namespace no_mas_accidentes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitsController : ControllerBase
    {
        private readonly ModelContext _context;

        public VisitsController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Visits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Visit>>> GetVisit()
        {
            return await _context.Visit.ToListAsync();
        }

        // GET: api/Visits/5
        [Route("register")]
        [HttpPost]
        public JsonResult Register([FromBody]JObject data)
        {
            try
            {
                string name = data["name"].ToObject<string>();
                string fecha = data["date_visit"].ToObject<string>();
                string hora = data["time_visit"].ToObject<string>();
                string fechaHora = fecha + " " + hora;
                DateTime date_visit = Convert.ToDateTime(fechaHora);
                string resumen = data["resumen"].ToObject<string>();
                int id_profesional = data["id_profesional"].ToObject<int>();
                int id_company = data["id_company"].ToObject<int>();
                string extra = data["extra"].ToObject<string>();

                var vis = new
                {
                    name,
                    date_visit,
                    id_profesional,
                    id_company,
                    resumen,
                    extra
                };
                //await _context.SaveChangesAsync();
                OracleParameter param_name = new OracleParameter("v_name", OracleDbType.NVarchar2, vis.name, ParameterDirection.Input);
                OracleParameter param_date_visit = new OracleParameter("v_date_visit", OracleDbType.Date, vis.date_visit, ParameterDirection.Input);
                OracleParameter param_id_profesional = new OracleParameter("v_id_profesional", OracleDbType.Int32, vis.id_profesional, ParameterDirection.Input);
                OracleParameter param_id_company = new OracleParameter("v_id_company", OracleDbType.Int32, vis.id_company, ParameterDirection.Input);
                OracleParameter param_resumen = new OracleParameter("v_resumen", OracleDbType.NVarchar2, vis.resumen, ParameterDirection.Input);
                OracleParameter param_extra = new OracleParameter("v_extra", OracleDbType.NVarchar2, vis.extra, ParameterDirection.Input);

                object[] parameters = new object[] {
                    param_name,
                    param_date_visit,
                    param_id_profesional,
                    param_id_company,
                    param_resumen,
                    param_extra
                };

                string query = "begin pkg_create_visit.sp_create_visit(:v_name,:v_date_visit,:v_id_profesional,:v_id_company,:v_resumen,:v_extra); end; ";

                int success123 = _context.Database.ExecuteSqlCommand(query, parameters);

                var response = new
                {
                    success = true,
                    message = "Registrado"
                };
                return new JsonResult(response);
            }
            catch
            {
                var response = new
                {
                    success = false,
                    message = "No se ha podido registrar"
                };
                return new JsonResult(response);
            }
        }

        [HttpGet("getAllVisits")]
        public async Task<JsonResult> GetAllVisits()
        {
            return new JsonResult(await _context.Visit.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getAllVisitsToPay/{rut}")]
        public async Task<JsonResult> GetAllVisitsToPay(decimal rut)
        {
            var date = DateTime.Today.ToString("MM yyyy");
            return new JsonResult(from com in _context.Visit
                                  where com.IdCompany == rut && com.Extra == "Si" && com.DateVisit.ToString("MM yyyy") == date
                                  select com);
        }

        [HttpGet("getVisitsByCompany/{rut}")]
        public async Task<JsonResult> GetVisitByCompany(decimal rut)
        {
            return new JsonResult(from com in _context.Visit
                                  where com.IdCompany == rut
                                  select com);
        }

        [HttpGet("getVisitsByProfesional/{run}")]
        public async Task<JsonResult> GetVisitByProfesional(decimal run)
        {
            return new JsonResult(from com in _context.Visit
                                  where com.IdProfessional == run && com.Status != "Terminado"
                                  select com);
        }

        [HttpGet("getVisitsMyVisit/{run}")]
        public async Task<JsonResult> GetVisitMyVisit(decimal run)
        {
            return new JsonResult(from com in _context.Visit
                                  where com.IdProfessional == run 
                                  select com);
        }

        [HttpPost("updateVisit/{id}")]
        public async Task<JsonResult> UpdateConsultation(decimal id, JObject data)
        {

            Visit foundVisit = await _context.Visit.FindAsync(id);
            if (foundVisit == null)
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido actualizar"
                });
            }

            HtmlToPdf Renderer = new IronPdf.HtmlToPdf();
            var PDF = Renderer.RenderHtmlAsPdf(
                "<div style = 'display:flex; flex-direction: column'>" +
                "<div>" +
                    "<h1 style='text-align: center'>Visita</h1>" +
                "</div>" +
                "<div>" +
                "<table>" +
                "<tr>" +
                "<th style='text-align: left'> ID: </th>" + "<th style='text-align: left'>" + foundVisit.Id + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Nombre: </th>" + "<th style='text-align: left'>" + foundVisit.Name + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Fecha: </th>" + "<th style='text-align: left'>" + foundVisit.DateVisit.ToString("dddd, dd MMMM yyyy") + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Hora: </th>" + "<th style='text-align: left'>" + foundVisit.DateVisit.ToString("HH:mm") + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Resumen: </th>" + "<th style='text-align: left'>" + foundVisit.Resumen + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Estado: </th>" + "<th style='text-align: left'>" + foundVisit.Status + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> RUN Profesional: </th>" + "<th style='text-align: left'>" + foundVisit.IdProfessional + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> RUT Cliente: </th>" + "<th style='text-align: left'>" + foundVisit.IdCompany + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Asesoría Extra: </th>" + "<th style='text-align: left'>" + foundVisit.Extra + "</th>" +
                "</tr>" +
                "</ table > " +
                "</div>" +
                "<br><hr>" +
                "<div>" +
                "<center> &copy; No mas Accidentes - Todos los derechos reservados</center>" +
                "</div>" +
                "</div>"
                );
            var dateAndTime = DateTime.Now;
            var date = dateAndTime.ToShortDateString();

            PDF.SaveAs(foundVisit.IdCompany + "-visita-" + date + ".pdf");

            var proc = Process.Start(@"cmd.exe ", @"/c" + foundVisit.IdCompany + "-visita-" + date + ".pdf");

            string name = data["name"].ToObject<string>();
            //DateTime dateAsesory = data["dateAsesory"].ToObject<DateTime>();
            string resumen = data["resumen"].ToObject<string>();
            int id_profesional = data["id_profesional"].ToObject<int>();
            int rut_company = data["rut_company"].ToObject<int>();
            string status = data["status"].ToObject<string>();

            var us = new
            {
                name,
                resumen,
                id_profesional,
                rut_company,
                status
            };

            foundVisit.Name = us.name;
            //foundVisit.DateAsesory = us.dateAsesory;
            foundVisit.Resumen = us.resumen;
            foundVisit.IdProfessional = us.id_profesional;
            foundVisit.IdCompany = us.rut_company;
            foundVisit.Status = us.status;

            if (await _context.SaveChangesAsync() > 0)
            {
                return new JsonResult(new
                {
                    success = true,
                    message = "Se ha actualizado satisfactoriamente"
                });
            }
            else
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido actualizar"
                });
            }
        }

        [HttpGet("getVisitByID")]
        public async Task<JsonResult> GetVisitByID()
        {
            return new JsonResult(await _context.Visit.ToListAsync());
        }

        [HttpGet("getVisitByID/{id}")]
        public async Task<JsonResult> GetVisitByID(decimal id)
        {
            IQueryable<Visit> con = from com in _context.Visit
                                           where com.Id == id
                                           select com;
            if (con.ToArray().Length == 0)
            {
                return new JsonResult(from com in _context.Visit
                                      where com.Id == id
                                      select com);
            }
            IronPdf.HtmlToPdf Renderer = new IronPdf.HtmlToPdf();
            var PDF = Renderer.RenderHtmlAsPdf(
                "<div style = 'display:flex; flex-direction: column'>" +
                "<div>" +
                    "<h1 style='text-align: center'>Visita</h1>" +
                "</div>" +
                "<div>" +
                "<table>" +
                "<tr>" +
                "<th style='text-align: left'> ID: </th>" + "<th style='text-align: left'>" +  con.First().Id + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Nombre: </th>" + "<th style='text-align: left'>" + con.First().Name + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Fecha: </th>" + "<th style='text-align: left'>" + con.First().DateVisit.ToString("dddd, dd MMMM yyyy") + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Hora: </th>" + "<th style='text-align: left'>" + con.First().DateVisit.ToString("HH:mm") + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Resumen: </th>" + "<th style='text-align: left'>" + con.First().Resumen + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Estado: </th>" + "<th style='text-align: left'>" + con.First().Status + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> RUN Profesional: </th>" + "<th style='text-align: left'>" + con.First().IdProfessional + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> RUT Cliente: </th>" + "<th style='text-align: left'>" + con.First().IdCompany + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th style='text-align: left'> Asesoría Extra: </th>" + "<th style='text-align: left'>" + con.First().Extra + "</th>" +
                "</tr>" +
                "</ table > " +
                "</div>" +
                "<br><hr>" +
                "<div>" +
                "<center> &copy; No mas Accidentes - Todos los derechos reservados</center>" +
                "</div>" +
                "</div>"
                );
            var dateAndTime = DateTime.Now;
            var date = dateAndTime.ToShortDateString();

            PDF.SaveAs(con.First().IdCompany + "-visita-" + date + ".pdf");

            var proc = Process.Start(@"cmd.exe ", @"/c" + con.First().IdCompany + "-visita-" + date + ".pdf");

            return new JsonResult(from com in _context.Visit
                                  where com.Id == id
                                  select com);

            //Renderer.RenderUrlAsPdf("http://localhost:51424/2/getConsultationByID").SaveAs("url.pdf");
        }

        [HttpGet("getVisitByClient/{rut}")]
        public async Task<JsonResult> GetVisitByClient(decimal rut)
        {

            return new JsonResult(from com in _context.Visit
                                  where com.IdCompany == rut
                                  select com);
        }
    }
}
