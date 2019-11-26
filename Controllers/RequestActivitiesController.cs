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

namespace no_mas_accidentes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestActivitiesController : ControllerBase
    {
        private readonly ModelContext _context;

        public RequestActivitiesController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/RequestActivities
        [Route("registerRequestActivities")]
        [HttpPost]
        public JsonResult RegisterRequestActivities([FromBody]JObject data)
        {
            try
            {
                string name = data["name"].ToObject<string>();
                string type = data["type"].ToObject<string>();
                int id_company = data["id_company"].ToObject<int>();

                var req = new
                {
                    name,
                    type,
                    id_company
                };
                //await _context.SaveChangesAsync();
                OracleParameter param_name = new OracleParameter("v_name", OracleDbType.NVarchar2, req.name, ParameterDirection.Input);
                OracleParameter param_type = new OracleParameter("v_type", OracleDbType.NVarchar2, req.type, ParameterDirection.Input);
                OracleParameter param_id_company = new OracleParameter("v_rut_company", OracleDbType.Int32, req.id_company, ParameterDirection.Input);

                object[] parameters = new object[] {
                    param_name,
                    param_type,
                    param_id_company
                };

                string query = "begin pkg_create_request_activities.sp_craete_request_activities(:v_name,:v_type,:v_rut_company); end; ";

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

        [HttpGet("getAllRequestActivities")]
        public async Task<JsonResult> GetAllRequestActivities()
        {
            return new JsonResult(await _context.RequestActivities.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getRequestActivities/{rut}")]
        public async Task<JsonResult> GetRequestActivities(decimal rut)
        {
            return new JsonResult(from com in _context.RequestActivities
                                  where com.IdCompany == rut
                                  select com);
        }



    }
}
