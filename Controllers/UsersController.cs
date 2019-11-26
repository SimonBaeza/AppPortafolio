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
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace no_mas_accidentes_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UsersController : ControllerBase
    {
        private readonly ModelContext _context;

        public UsersController(ModelContext context)
        {
            _context = context;
        }

        // POST: api/Users
        [Route("register")]
        [HttpPost]
        public JsonResult Register([FromBody]JObject data)
        {
            try
            {
                int run = data["run"].ToObject<int>();
                string name = data["name"].ToObject<string>();
                string lastName = data["lastName"].ToObject<string>();
                string email = data["email"].ToObject<string>();
                long phone = data["phone"].ToObject<long>();
                int id_role = data["id_role"].ToObject<int>();
                string password = data["password"].ToObject<string>();

                var us = new
                {
                    run,
                    name,
                    lastName,
                    email,
                    phone,
                    id_role,
                    password
                };
                //await _context.SaveChangesAsync();
                OracleParameter param0 = new OracleParameter("v_run", OracleDbType.Int32, us.run, ParameterDirection.Input);
                OracleParameter param1 = new OracleParameter("v_name", OracleDbType.NVarchar2, us.name, ParameterDirection.Input);
                OracleParameter param2 = new OracleParameter("v_last_name", OracleDbType.NVarchar2, us.lastName, ParameterDirection.Input);
                OracleParameter param3 = new OracleParameter("v_email", OracleDbType.NVarchar2, us.email, ParameterDirection.Input);
                OracleParameter param4 = new OracleParameter("v_phone", OracleDbType.Long, us.phone, ParameterDirection.Input);
                OracleParameter param5 = new OracleParameter("v_id_role", OracleDbType.Long, us.id_role, ParameterDirection.Input);
                OracleParameter param6 = new OracleParameter("v_password", OracleDbType.NVarchar2, us.password, ParameterDirection.Input);

                object[] parameters = new object[] {
                param0,
                param1,
                param2,
                param3,
                param4,
                param5,
                param6
                };

                string query = "begin pkg_register.sp_register(:v_run,:v_name,:v_last_name,:v_email,:v_phone,:v_id_role,:v_password); end; ";

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

        [Route("login")]
        [HttpPost]
        public async Task<JsonResult> Login([FromBody]JObject data)
        {
            int run = data["run"].ToObject<int>();
            string pass = data["password"].ToObject<string>();

            User us = await _context.User.FirstOrDefaultAsync(u => u.Run == run && u.Password == pass);

            Company com = await _context.Company.FirstOrDefaultAsync(c => c.Rut == run && c.Password == pass);
            bool success = false;
            string message = "No se ha podido logear";

            decimal rol = 1;


            if (us != null)
            {
                success = true;
                message = "Logeado";
                rol = us.IdRole;
            }
            else
            {
                if (com != null)
                {
                    success = true;
                    message = "Logeado";
                    rol = com.IdRole;
                }
            }

            var output = new
            {
                success,
                message,
                rol
            };

            return new JsonResult(output);

        }
        
        //[Route("getUserId")]
        [HttpGet("getUser/{run}")]
        public async Task<JsonResult> GetUsers(decimal run)
        {
            return new JsonResult(from us in _context.User
                                  where us.Run == run
                                  select us);
        }
        
        [HttpGet("getAllUsers")]
        public async Task<JsonResult> GetAllUsers()
        {
            return new JsonResult(await _context.User.ToListAsync() );
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpPost("deleteUsers/{run}")]
        public async Task<JsonResult> DeleteUser(decimal run)
        {
            //return new JsonResult(await _context.User.ToListAsync());

            User us = await _context.User.FindAsync(run);
            if (us == null)
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido eliminar"
                });
            }
            _context.User.Remove(us);
            await _context.SaveChangesAsync();
            return new JsonResult(new
            {
                success = true,
                message = "Se ha eliminado satisfactoriamente"
            });
        }

        [HttpPost("updateUser/{run}")]
        public async Task<JsonResult> UpdateUser(decimal run,JObject data)
        {

            User foundUser = await _context.User.FindAsync(run);
            if (foundUser == null)
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido actualizar"
                });
            }

            string name = data["name"].ToObject<string>();
            string lastName = data["lastName"].ToObject<string>();
            string email = data["email"].ToObject<string>();
            string phone = data["phone"].ToObject<string>();
            int id_role = data["id_role"].ToObject<int>();
            string password = data["password"].ToObject<string>();

            var us = new
            {
                name,
                lastName,
                email,
                phone,
                id_role,
                password
            };

            foundUser.Name = us.name;
            foundUser.Lastname = us.lastName;
            foundUser.Email = us.email;
            foundUser.Phone = us.phone;
            foundUser.IdRole = us.id_role;
            foundUser.Password = us.password;

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
