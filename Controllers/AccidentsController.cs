using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using no_mas_accidentes.Models12;
using Oracle.ManagedDataAccess.Client;

namespace no_mas_accidentes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccidentsController : ControllerBase
    {
        private readonly ModelContext _context;

        public AccidentsController(ModelContext context)
        {
            _context = context;
        }


        // GET: api/Accidents
        [Route("registerAccident")]
        [HttpPost]
        public JsonResult RegisterAccident([FromBody]JObject data)
        {
            try
            {
                CultureInfo provider = CultureInfo.InvariantCulture;

                string name = data["name"].ToObject<string>();
                string severity = data["severity"].ToObject<string>();
                DateTime date_accident = data["date_accident"].ToObject<DateTime>();
                string resumen = data["resumen"].ToObject<string>();
                int id_company = data["id_company"].ToObject<int>();

                var acc = new
                {
                    name,
                    severity,
                    date_accident,
                    resumen,
                    id_company
                };
                //await _context.SaveChangesAsync();
                OracleParameter param_name = new OracleParameter("v_name", OracleDbType.NVarchar2, acc.name, ParameterDirection.Input);
                OracleParameter param_severity = new OracleParameter("v_severity", OracleDbType.NVarchar2, acc.severity, ParameterDirection.Input);
                OracleParameter param_date_accident = new OracleParameter("v_date_accident", OracleDbType.Date, acc.date_accident, ParameterDirection.Input);
                OracleParameter param_resumen = new OracleParameter("v_resumen", OracleDbType.NVarchar2, acc.resumen, ParameterDirection.Input);
                OracleParameter param_id_company = new OracleParameter("v_id_company", OracleDbType.Int32, acc.id_company, ParameterDirection.Input);

                object[] parameters = new object[] {
                    param_name,
                    param_severity,
                    param_date_accident,
                    param_resumen,
                    param_id_company
                };

                string query = "begin pkg_create_accident.sp_create_accident(:v_name,:v_severity,:v_date_accident, :v_resumen, :v_id_company); end; ";

                int success123 = _context.Database.ExecuteSqlCommand(query, parameters);

                var response = new
                {
                    success = true,
                    message = "Registrado"
                };
                return new JsonResult(response);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());

                var response = new
                {
                    success = false,
                    message = "No se ha podido registrar",
                    ex
                   
                };
                return new JsonResult(response);
            }
        }

        [HttpGet("getAllAccidents")]
        public async Task<JsonResult> GetAllAccidents()
        {
            return new JsonResult(await _context.Accident.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getAccidentsByCompany/{rut}")]
        public async Task<JsonResult> GetAccidentsByCompany(decimal rut)
        {
            return new JsonResult(from com in _context.Accident
                                  where com.IdCompany == rut
                                  select com);
        }

        [HttpGet("getAccidentsByCompanyToTA/{rut}")]
        public async Task<JsonResult> GetAccidentsByCompanyTA(decimal rut)
        {

            var date = DateTime.Today.ToString("MM yyyy");
            return new JsonResult(from com in _context.Accident
                                  where com.IdCompany == rut && com.DateAccident.ToString("MM yyyy") == date
                                  select com);
        }
    }
}
