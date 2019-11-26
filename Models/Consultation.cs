using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Consultation
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public DateTime DateAsesory { get; set; }
        public string Resumen { get; set; }
        public decimal IdProfesional { get; set; }
        public decimal RutCompany { get; set; }
        public string Status { get; set; }
        public string Extra { get; set; }

        public virtual User IdProfesionalNavigation { get; set; }
        public virtual Company RutCompanyNavigation { get; set; }
    }
}
