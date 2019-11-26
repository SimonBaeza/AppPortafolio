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
//using no_mas_accidentes.Modelss;
using Oracle.ManagedDataAccess.Client;

namespace no_mas_accidentes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ModelContext _context;

        public CompaniesController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [Route("register")]
        [HttpPost]
        public JsonResult Register([FromBody]JObject data)
        {
            try
            {
                int rut = data["rut"].ToObject<int>();
                string social_reason = data["social_reason"].ToObject<string>();
                string email = data["email"].ToObject<string>();
                string address = data["address"].ToObject<string>();
                string comercial_business = data["comercial_business"].ToObject<string>();
                long phone = data["phone"].ToObject<long>();
                int id_role = data["id_role"].ToObject<int>();
                string password = data["password"].ToObject<string>();

                var com = new
                {
                    rut,
                    social_reason,
                    email,
                    address,
                    comercial_business,
                    phone,
                    id_role,
                    password
                };
                //await _context.SaveChangesAsync();
                OracleParameter param_rut = new OracleParameter("v_rut", OracleDbType.NVarchar2, com.rut, ParameterDirection.Input);
                OracleParameter param_social_reason = new OracleParameter("v_social_reason", OracleDbType.NVarchar2, com.social_reason, ParameterDirection.Input);
                OracleParameter param_email = new OracleParameter("v_email", OracleDbType.NVarchar2, com.email, ParameterDirection.Input);
                OracleParameter param_address = new OracleParameter("v_address", OracleDbType.NVarchar2, com.address, ParameterDirection.Input);
                OracleParameter param_comercial_business = new OracleParameter("v_comercial_business", OracleDbType.NVarchar2, com.comercial_business, ParameterDirection.Input);
                OracleParameter param_phone = new OracleParameter("v_phone", OracleDbType.NVarchar2, com.phone, ParameterDirection.Input);
                OracleParameter param_id_role = new OracleParameter("v_id_role", OracleDbType.NVarchar2, com.id_role, ParameterDirection.Input);
                OracleParameter param_password = new OracleParameter("v_password", OracleDbType.NVarchar2, com.password, ParameterDirection.Input);

                object[] parameters = new object[] {
                    param_rut,
                    param_social_reason,
                    param_email,
                    param_address,
                    param_comercial_business,
                    param_phone,
                    param_id_role,
                    param_password
                };

                string query = "begin pkg_register_company.sp_create_company(:v_rut,:v_social_reason,:v_email,:v_address,:v_comercial_business,:v_phone,:v_id_role,:v_password); end; ";

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

        [HttpGet("getAllcompanies")]
        public async Task<JsonResult> GetAllCompanies()
        {
            return new JsonResult(await _context.Company.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getAllcompaniesForContract")]
        public async Task<JsonResult> GetAllcompaniesForContract()
        {
            var listRutCompanies = (_context.Contract.Where(c => c.Status != "Activado").Select(c => c.RutCompany).ToList());
            var companies = (_context.Company.ToList());

            companies = companies.Where(c => listRutCompanies.Contains(c.Rut)).ToList();

            if (listRutCompanies.ToArray().Length == 0)
            {
                return new JsonResult(await _context.Company.ToListAsync());
            }
                

            return new JsonResult(companies);
        }

        [HttpGet("getCompanyRut/{rut}")]
        public async Task<JsonResult> GetCompanyRut(decimal rut)
        {
            return new JsonResult(from com in _context.Company
                                  where com.Rut == rut
                                  select com);
        }

        [HttpPost("deleteCompany/{id}")]
        public async Task<JsonResult> DeleteCompany(decimal id)
        {
            //return new JsonResult(await _context.User.ToListAsync());

            Company com = await _context.Company.FindAsync(id);
            if (com == null)
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido eliminar"
                });
            }
            _context.Company.Remove(com);
            await _context.SaveChangesAsync();
            return new JsonResult(new
            {
                success = true,
                message = "Se ha eliminado satisfactoriamente"
            });
        }

        [HttpPost("updateCompany/{id}")]
        public async Task<JsonResult> UpdateCompany(decimal id, JObject data)
        {

            Company companyFound = await _context.Company.FindAsync(id);

            if (companyFound == null)
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido actualizar"
                });
            }


            string address = data["address"].ToObject<string>();
            string comercial_business = data["comercial_business"].ToObject<string>();
            string email = data["email"].ToObject<string>();
            string password = data["password"].ToObject<string>();
            string phone = data["phone"].ToObject<string>();
            decimal rut = data["rut"].ToObject<decimal>();
            string social_reason = data["social_reason"].ToObject<string>();
            //int id_role = data["id_role"].ToObject<int>();

            var com = new
            {
                rut,
                social_reason,
                email,
                address,
                comercial_business,
                phone,
                password
            };

            companyFound.Rut = com.rut;
            companyFound.SocialReason = com.social_reason;
            companyFound.Email = com.email;
            companyFound.Address = com.address;
            companyFound.ComercialBusiness = com.comercial_business;
            companyFound.Phone = com.phone;
            //companyFound.Id_role = com.id_role;
            companyFound.Password = com.password;

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
    }
}
