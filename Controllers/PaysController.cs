using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using no_mas_accidentes.Models12;
using Oracle.ManagedDataAccess.Client;

namespace no_mas_accidentes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaysController : ControllerBase
    {
        private readonly ModelContext _context;

        public PaysController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Pays
        [Route("register")]
        [HttpPost]
        public JsonResult RegisterPay([FromBody]JObject data)
        {
            try
            {

                int id_company = data["a"]["id_company"].ToObject<int>();
                int cost = data["a"]["cost"].ToObject<int>();
                DateTime date_pay = data["a"]["date_pay"].ToObject<DateTime>();
                int count = 0;

                /*
                string dataAsesoryExtra = data["asesory"]["extra"].ToObject<string>();
                string dataVisitExtra = data["visit"]["extra"].ToObject<string>();
                string dataAsesoryDate = data["asesory"]["dateAsesory"].ToObject<DateTime>().ToString();
                */
                dynamic dataAsesory = JsonConvert.DeserializeObject(data["asesory"].ToString());
                dynamic dataVisit = JsonConvert.DeserializeObject(data["visit"].ToString());

                string today = DateTime.Today.ToString("MM-yyyy");
                var todaySplitted = today.Split("-");

                string dateAsesorySplitted = "";
                string dateVisitSplitted = "";

                foreach (var element in dataAsesory)
                {
                    //dateAsesorySplitted = element.dateAsesory.Split("-"); dateAsesorySplitted
                    dateAsesorySplitted = element.dateAsesory.ToString();
                    if (dateAsesorySplitted.Contains(today))
                    {
                        if (element.extra == "Si")
                        {
                            count = count + 15000;
                        }
                    } 
                }

                foreach (var element in dataVisit)
                {
                    //dateAsesorySplitted = element.dateAsesory.Split("-"); dateAsesorySplitted
                    dateVisitSplitted = element.dateVisit.ToString();
                    if (dateAsesorySplitted.Contains(today))
                    {
                        if (element.extra == "Si")
                        {
                            count = count + 30000;
                        }
                    }

                }

                cost = cost + count;
                var pay = new
                {
                    id_company,
                    cost,
                    date_pay
                };
                //await _context.SaveChangesAsync();
                OracleParameter param_id_company = new OracleParameter("v_id_company", OracleDbType.NVarchar2, pay.id_company, ParameterDirection.Input);
                OracleParameter param_cost = new OracleParameter("v_cost", OracleDbType.NVarchar2, pay.cost, ParameterDirection.Input);
                OracleParameter param_date_pay = new OracleParameter("v_date_pay", OracleDbType.Date, pay.date_pay, ParameterDirection.Input);

                object[] parameters = new object[] {
                    param_id_company,
                    param_cost,
                    param_date_pay
                };

                string query = "begin pkg_create_pay.sp_create_pay(:v_id_company,:v_cost,:v_date_pay); end; ";

                int success123 = _context.Database.ExecuteSqlCommand(query, parameters);

                var response = new
                {
                    success = true,
                    message = "Registrado"
                };
                return new JsonResult(response);
            }
            catch (Exception ex)
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

        [HttpGet("getAllPays")]
        public async Task<JsonResult> GetAllPays()
        {
            return new JsonResult(await _context.Pay.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getPaysByCompany/{rut}")]
        public async Task<JsonResult> GetPaysByCompany(decimal rut)
        {

            return new JsonResult(from com in _context.Pay
                                  where com.IdCompany == rut
                                  select com);
        }
    }
}
