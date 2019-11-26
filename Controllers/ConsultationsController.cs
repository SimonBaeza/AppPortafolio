using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using no_mas_accidentes.Models12;
using Oracle.ManagedDataAccess.Client;
using IronPdf;
using System.Diagnostics;
using IronPdf;

namespace no_mas_accidentes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultationsController : ControllerBase
    {
        private readonly ModelContext _context;

        public ConsultationsController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Consultations
        [Route("registerConsultation")]
        [HttpPost]
        public JsonResult RegisterConsultation([FromBody]JObject data)
        {
            try
            {

                string name = data["name"].ToObject<string>();
                string fecha = data["date_asesory"].ToObject<string>();
                string hora = data["time_asesory"].ToObject<string>();
                string fechaHora = fecha + " " + hora;
                DateTime date_asesory = Convert.ToDateTime(fechaHora);
                string resumen = data["resumen"].ToObject<string>();
                int id_profesional = data["id_profesional"].ToObject<int>();
                int rut_company = data["rut_company"].ToObject<int>();
                string extra = data["extra"].ToObject<string>();

                var cons = new
                {
                    name,
                    date_asesory,
                    resumen,
                    id_profesional,
                    rut_company,
                    extra
                };
                //await _context.SaveChangesAsync();
                
                OracleParameter param_name = new OracleParameter("v_name", OracleDbType.NVarchar2, cons.name, ParameterDirection.Input);
                OracleParameter param_date_asesory = new OracleParameter("v_date_asesory", OracleDbType.Date, cons.date_asesory, ParameterDirection.Input);
                OracleParameter param_resumen = new OracleParameter("v_resumen", OracleDbType.NVarchar2, cons.resumen, ParameterDirection.Input);
                OracleParameter param_id_profesional = new OracleParameter("v_id_profesional", OracleDbType.Int32, cons.id_profesional, ParameterDirection.Input);
                OracleParameter param_rut_company = new OracleParameter("v_rut_company", OracleDbType.Int32, cons.rut_company, ParameterDirection.Input);
                OracleParameter param_extra = new OracleParameter("v_extra", OracleDbType.NVarchar2, cons.extra, ParameterDirection.Input);

                object[] parameters = new object[] {
                param_name,
                param_date_asesory,
                param_resumen,
                param_id_profesional,
                param_rut_company,
                param_extra
                };
                
                string query = "begin pkg_create_consultation.sp_create_consultation(:v_name,:v_date_asesory,:v_resumen,:v_id_profesional,:v_rut_company,:v_extra); end; ";

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

        [HttpGet("getAllConsultations")]
        public async Task<JsonResult> GetAllConsultations()
        {
            return new JsonResult(await _context.Consultation.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getAllConsultationsToPay/{rut}")]
        public async Task<JsonResult> GetAllConsultationsToPay(decimal rut)
        {
            var date = DateTime.Today.ToString("MM yyyy");
            return new JsonResult(from com in _context.Consultation
                                  where com.RutCompany == rut && com.Extra == "Si" && com.DateAsesory.ToString("MM yyyy") == date
                                  select com);
        }

        [HttpGet("getConsultationByRut/{rut}")]
        public async Task<JsonResult> GetConsultation(decimal rut)
        {
            return new JsonResult(from com in _context.Consultation
                                  where com.RutCompany == rut
                                  select com);
        }

        [HttpGet("getConsultationByRunProfesional/{run}")]
        public async Task<JsonResult> GetConsultationByRunProfesional(decimal run)
        {

            return new JsonResult(from com in _context.Consultation
                                  where com.IdProfesional == run && com.Status != "Terminado"
                                  select com);
        }

        [HttpGet("getConsultationMyConsultation/{run}")]
        public async Task<JsonResult> GetConsultationMyConsultation(decimal run)
        {

            return new JsonResult(from com in _context.Consultation
                                  where com.IdProfesional == run
                                  select com);
        }

        [HttpGet("getConsultationByID/{id}")]
        public async Task<JsonResult> GetConsultationByID(decimal id)
        {
            IQueryable<Consultation> con = from com in _context.Consultation
                                           where com.Id == id
                                           select com;
            if (con.ToArray().Length == 0)
            {
                return new JsonResult(from com in _context.Consultation
                                      where com.Id == id
                                      select com);
            }
            IronPdf.HtmlToPdf Renderer = new IronPdf.HtmlToPdf();
            var PDF = Renderer.RenderHtmlAsPdf(
                "<div style = 'display:flex; flex-direction: column'>"+
                "<div>" +
                    "<h1 style='text-align: center'>Asesoría</h1>" +
                "</div>" +
                "<div>"+
                "<table>" +
                "<tr>"+
                    "<th style='text-align: left'>ID: </th> " + "<th style='text-align: left'>" + con.First().Id + "</th>" +
                "</tr>"+
                "<tr>" +
                    "<th style='text-align: left'> Nombre: </th> " + "<th style='text-align: left'>" + con.First().Name + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Fecha: </th> " + "<th style='text-align: left'>" + con.First().DateAsesory.ToString("dddd, dd MMMM yyyy") + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Hora: </th> " + "<th style='text-align: left'>" + con.First().DateAsesory.ToString("HH:mm") + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Resumen: </th> " + "<th style='text-align: left'>" + con.First().Resumen + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Estado: </th> " + "<th style='text-align: left'>" + con.First().Status + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> RUN Profesional: </th> " + "<th style='text-align: left'>" + con.First().IdProfesional + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> RUT Cliente: </th> " + "<th style='text-align: left'>" + con.First().RutCompany + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Asesoría Extra: </th> " + "<th style='text-align: left'>" + con.First().Extra + "</th>" +
                "</tr>" +
                "</ table > " +
                "</div>"+
                "<br><hr>" +
                "<div>"+
                "<center> &copy; No mas Accidentes - Todos los derechos reservados</center>"+
                "</div>"+
                "</div>"
                );

            var dateAndTime = DateTime.Now;
            var date = dateAndTime.ToShortDateString();

            PDF.SaveAs(con.First().RutCompany + "-asesoria-" + date + ".pdf");

            var proc = Process.Start(@"cmd.exe ", @"/c" + con.First().RutCompany + "-asesoria-" + date + ".pdf");

            return new JsonResult(from com in _context.Consultation
                                  where com.Id == id
                                  select com);

            //Renderer.RenderUrlAsPdf("http://localhost:51424/2/getConsultationByID").SaveAs("url.pdf");
        }

        [HttpGet("getConsultationVerifyProfesional")]
        public async Task<JsonResult> GetConsultationVerifyProfesional([FromBody]JObject data)
        {
            int id_profesional = data["id_profesional"].ToObject<int>();
            int rut_company = data["rut_company"].ToObject<int>();

            return new JsonResult(from com in _context.Consultation
                                  where com.IdProfesional == id_profesional && com.RutCompany == rut_company
                                  select com.DateAsesory);
        }

        [HttpPost("updateConsultation/{id}")]
        public async Task<JsonResult> UpdateConsultation(decimal id, JObject data)
        {

            Consultation foundConsultation = await _context.Consultation.FindAsync(id);
            if (foundConsultation == null)
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
                    "<h1 style='text-align: center'>Asesoría</h1>" +
                "</div>" +
                "<div>" +
                "<table>" +
                "<tr>" +
                    "<th style='text-align: left'>ID: </th> " + "<th style='text-align: left'>" + foundConsultation.Id + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Nombre: </th> " + "<th style='text-align: left'>" + foundConsultation.Name + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Fecha: </th> " + "<th style='text-align: left'>" + foundConsultation.DateAsesory.ToString("dddd, dd MMMM yyyy") + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Hora: </th> " + "<th style='text-align: left'>" + foundConsultation.DateAsesory.ToString("HH:mm") + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Resumen: </th> " + "<th style='text-align: left'>" + foundConsultation.Resumen + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Estado: </th> " + "<th style='text-align: left'>" + foundConsultation.Status + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> RUN Profesional: </th> " + "<th style='text-align: left'>" + foundConsultation.IdProfesional + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> RUT Cliente: </th> " + "<th style='text-align: left'>" + foundConsultation.RutCompany + "</th>" +
                "</tr>" +
                "<tr>" +
                    "<th style='text-align: left'> Asesoría Extra: </th> " + "<th style='text-align: left'>" + foundConsultation.Extra + "</th>" +
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

            PDF.SaveAs(foundConsultation.RutCompany + "-asesoria-" + date + ".pdf");

            var proc = Process.Start(@"cmd.exe ", @"/c" + foundConsultation.RutCompany + "-asesoria-" + date + ".pdf");

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

            foundConsultation.Name = us.name;
            //foundConsultation.DateAsesory = us.dateAsesory;
            foundConsultation.Resumen = us.resumen;
            foundConsultation.IdProfesional = us.id_profesional;
            foundConsultation.RutCompany = us.rut_company;
            foundConsultation.Status = us.status;

            if (await _context.SaveChangesAsync() > 0)
            {
                return new JsonResult(new
                {
                    success = true,
                    message = "Se ha actualizado satisfactoriamente",
                    id,
                    us.status
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
    }
}
