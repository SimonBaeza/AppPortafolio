using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Visit
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public DateTime DateVisit { get; set; }
        public decimal IdProfessional { get; set; }
        public decimal IdCompany { get; set; }
        public string Status { get; set; }
        public string Resumen { get; set; }
        public string Extra { get; set; }

        public virtual Company IdCompanyNavigation { get; set; }
        public virtual User IdProfessionalNavigation { get; set; }
    }
}
