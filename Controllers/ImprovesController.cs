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
    public class ImprovesController : ControllerBase
    {
        private readonly ModelContext _context;

        public ImprovesController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Improves
        [Route("register")]
        [HttpPost]
        public JsonResult Register([FromBody]JObject data)
        {
            try
            {
                string name = data["name"].ToObject<string>();
                string type_improve = data["type_improve"].ToObject<string>();
                string description = data["description"].ToObject<string>();

                var imp = new
                {
                    name,
                    type_improve,
                    description
                };
                //await _context.SaveChangesAsync();
                OracleParameter param_name = new OracleParameter("v_name", OracleDbType.NVarchar2, imp.name, ParameterDirection.Input);
                OracleParameter param_type_improve = new OracleParameter("v_type_improve", OracleDbType.NVarchar2, imp.type_improve, ParameterDirection.Input);
                OracleParameter param_description = new OracleParameter("v_description", OracleDbType.NVarchar2, imp.description, ParameterDirection.Input);

                object[] parameters = new object[] {
                    param_name,
                    param_type_improve,
                    param_description
                };

                string query = "begin pkg_create_improve.sp_create_improve(:v_name,:v_type_improve,:v_description); end; ";

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

        [HttpGet("getAllImproves")]
        public async Task<JsonResult> GetAllImproves()
        {
            return new JsonResult(await _context.Improve.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getImproveByType/{typeImprove}")]
        public async Task<JsonResult> GetImproveByType(string typeImprove)
        {
            return new JsonResult(from com in _context.Improve
                                  where com.TypeImprove == typeImprove
                                  select com);
        }
    }
}
