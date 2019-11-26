using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class RequestActivities
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public decimal IdCompany { get; set; }

        public virtual Company IdCompanyNavigation { get; set; }
    }
}
