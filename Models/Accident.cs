using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Accident
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public string Severity { get; set; }
        public DateTime DateAccident { get; set; }
        public string Resumen { get; set; }
        public decimal IdCompany { get; set; }

        public virtual Company IdCompanyNavigation { get; set; }
    }
}
