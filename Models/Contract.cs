using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Contract
    {
        public decimal Id { get; set; }
        public decimal Price { get; set; }
        public decimal NumberVisit { get; set; }
        public decimal NumberAsesory { get; set; }
        public decimal RutCompany { get; set; }
        public DateTime DateExpired { get; set; }
        public string Status { get; set; }

        public virtual Company RutCompanyNavigation { get; set; }
    }
}
